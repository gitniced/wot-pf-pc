import { Tooltip } from 'antd'
import styles from './index.module.less'

/** 高管介绍 */
const Executive: React.FC = ({ dataList }) => {
    const list = dataList?.filter(item => item?.imgUrl || item?.name || item?.introduction)
    if (!list?.length) return <></>
    return (
        <div className={styles.executive}>
            <div className={styles.header}>
                <span className={styles.title}>高管介绍</span>
            </div>
            <div className={styles.content}>
                {list?.map?.(item => (
                    <div className={styles.item} key={item.name}>
                        <img src={item?.imgUrl || defaultAvatar} className={styles.image} />
                        <div className={styles.info}>
                            <div className={styles.name}>{item?.name}</div>
                            <Tooltip title={item?.introduction}>
                                <div className={styles.introduction}>{item?.introduction}</div>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Executive