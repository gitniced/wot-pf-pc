import React, { useState } from 'react'
import { ExclamationCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { observer } from 'mobx-react'

function UserItem({ data, onClick, selected }: any) {
    return (
        <div className={`${styles.user_item} ${selected ? styles.selected : ''}`} onClick={onClick}>
            {data.isError && <ExclamationCircleOutlined />}
            <span title={data.name}>{data.name}</span>
        </div>
    )
}

function ChangeUserSwipe({ store, onClick }: any) {
    const { userList } = store
    const [page, setPage] = useState(1)
    const hasNext = page < Math.ceil(userList.length / 10)

    const handlePre = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if (hasNext) {
            setPage(page + 1)
        }
    }

    return (
        <div className={styles.user_change_container}>
            <div className={styles.user_container_top}>
                <div className={styles.user_count}>
                    <span>本次报名人数：</span>
                    <span className={styles.count_number}>{userList.length}人</span>
                </div>
                <div className={styles.swipe_wrapper}>
                    <div
                        className={`${styles.circle_wrapper} ${page > 1 ? '' : styles.disabled}`}
                        onClick={handlePre}
                    >
                        <LeftOutlined />
                    </div>
                    <div
                        className={`${styles.circle_wrapper} ${hasNext ? '' : styles.disabled}`}
                        onClick={handleNext}
                    >
                        <RightOutlined />
                    </div>
                </div>
            </div>
            <div className={styles.user_container_bottom}>
                {userList.slice(10 * (page - 1), 10 * page).map((item: any) => (
                    <UserItem
                        data={item}
                        selected={item.code === store.selectUserCode}
                        key={item.code}
                        onClick={() => {
                            onClick(item)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
export default observer(ChangeUserSwipe)
