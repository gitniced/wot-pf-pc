import styles from './index.module.less'
import { Empty } from '@wotu/wotu-components'
import { Tooltip } from 'antd'

/** 相似职位 */
const SimilarPositions: React.FC<{ list: any[] }> = ({ list }) => {
    return (
        <div className={styles.similar_positions}>
            <div className={styles.header}>
                <div className={styles.title}>相似职位</div>
            </div>
            <div className={styles.content}>
                {list?.length ? (
                    list?.map(item => {
                        const { provinceName, cityName, regionName } = item?.addressDto ?? {}
                        const _addressText = [provinceName, cityName, regionName]
                            .filter(Boolean)
                            .join('/')

                        return (
                            <div
                                className={styles.item}
                                key={item.code}
                                onClick={() => {
                                    const isApp = location.pathname.includes('/job-center/')
                                    if (isApp) {
                                        location.href = `/job-center/square/job-detail?code=${item.code}`
                                    } else {
                                        location.href = `/square/job-detail?code=${item.code}`
                                    }
                                }}
                            >
                                <div className={styles.name}>{item.professionName}</div>
                                {item?.tagDtoList?.length > 0 && (
                                    <div className={styles.tags}>
                                        {item?.tagDtoList?.map((tag: any) => (
                                            <div className={styles.tag} key={tag.tagCode}>
                                                {tag.tagName}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className={styles.org_info}>
                                    <Tooltip title={item?.organization?.organizationName}>
                                        <div className={styles.organizationName}>
                                            {item?.organization?.organizationName}
                                        </div>
                                    </Tooltip>
                                    {item?.organization?.financingName && (
                                        <div className={styles.financing}>
                                            {item?.organization?.financingName}
                                        </div>
                                    )}
                                    {item?.organization?.scaleName &&
                                    item?.organization?.scaleName !== '未知' ? (
                                        <div className={styles.scale}>
                                            {item?.organization?.scaleName}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <Empty size="small" text=" " />
                )}
            </div>
        </div>
    )
}

export default SimilarPositions
