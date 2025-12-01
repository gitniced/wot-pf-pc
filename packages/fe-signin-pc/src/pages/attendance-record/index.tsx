import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import type { IRoute } from 'umi'
import { Col, Input, Pagination, Row, Tabs } from 'antd'
import Store from './store'

import SignTask from '../face-sign-in/components/SignTask'
import { useEffect, useState } from 'react'
import SignInDetail from '../face-sign-in/components/SignInDetail'
import type { PaginationProps } from 'antd/es/pagination'
import { SIGN_TYPE } from '../face-sign-in/const'
const { Search } = Input

const Index: React.FC = () => {
    const [type, setType] = useState<string>('') // 签到状态
    const Hooks = useLocalObservable(() => new Store())


    /** 用户真实姓名查询查询 */
    const onSearch = (name: string) => {
        Hooks.setTaskSignParams({ name })
        Hooks.getTaskSignTable()
    }

    /** tab切换 */
    const tabChange = (e: string) => {
        setType(e)
        Hooks.setTaskSignParams({
            [Hooks.signType === SIGN_TYPE.SIGN_IN ? 'signStatus' : 'signOutStatus']: e,
        })

        Hooks.getTaskSignTable()
    }

    /** 翻页 */
    const pageChange: PaginationProps['onShowSizeChange'] = (pageNo, pageSize) => {
        Hooks.setTaskSignParams({
            pageNo,
            pageSize,
        })
        Hooks.getTaskSignTable()
    }

    useEffect(() => {
        document.title = '签到记录'
        Hooks.getTaskRule()
        // Hooks.getTaskSignTable()
    }, [])

    useEffect(() => {
        if (Hooks.signType) {
            Hooks.getTabCounts()
            tabChange('')
        }
    }, [Hooks.signType])

    /** tab切换头部 */
    const renderTabBar = () => {
        return (
            <div className={styles.tab_box}>
                {Hooks.tabCounts.map(({ key, name, length }) => (
                    <div
                        key={key}
                        className={key === type ? styles.active : styles.no_active}
                        onClick={() => tabChange(key)}
                    >
                        {name} {length}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.attendance_record}>
            <header className={styles.header}>
                <SignTask
                    signType={Hooks.signType}
                    taskRule={Hooks.taskRule}
                    // SearchDom={
                    //     <Search
                    //         className={styles.search}
                    //         placeholder="请输入用户姓名"
                    //         allowClear
                    //         enterButton="搜 索"
                    //         size="middle"
                    //         onSearch={onSearch}
                    //     />
                    // }
                />
            </header>
            <div className={styles.sign_header}>
                <div
                    className={[
                        styles.sign_tab,
                        Hooks.showSignTypeToggle ? '' : styles.hide_tab,
                    ].join(' ')}
                >
                    <div
                        className={[
                            styles.sign_tab_item,
                            Hooks.signType === SIGN_TYPE.SIGN_IN ? styles.active : '',
                        ].join(' ')}
                        onClick={() => {
                            Hooks.toggleSignType(1)
                        }}
                    >
                        签到
                    </div>
                    <div
                        className={[
                            styles.sign_tab_item,
                            Hooks.signType === SIGN_TYPE.SIGN_OUT ? styles.active : '',
                        ].join(' ')}
                        onClick={() => {
                            Hooks.toggleSignType(2)
                        }}
                    >
                        签退
                    </div>
                </div>
            </div>

            <div className={styles.tabs_content}>
                <Tabs
                    activeKey={type}
                    className={styles.tabs}
                    renderTabBar={Hooks.tabCounts.length > 0 ? renderTabBar : undefined}
                />

                <Search
                    className={styles.search}
                    placeholder="请输入用户姓名"
                    allowClear
                    enterButton="搜 索"
                    onSearch={onSearch}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.card_box}>
                    <Row className={styles.cards} wrap gutter={[24, 24]}>
                        {Hooks.taskSignTable?.data?.map((item, index) => (
                            <Col className={styles.card} key={item.code} xxl={6} lg={8} span={12}>
                                <SignInDetail
                                    index={index + 1}
                                    data={item}
                                    signType={Hooks.signType}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className={styles.pagination_box}>
                    <Pagination
                        hideOnSinglePage
                        className={styles.pagination}
                        showQuickJumper
                        defaultCurrent={1}
                        total={Hooks.taskSignTable.totalCount}
                        onChange={pageChange}
                    />
                </div>
            </div>
        </div>
    )
}

const Page: IRoute = observer(Index)

export default Page
