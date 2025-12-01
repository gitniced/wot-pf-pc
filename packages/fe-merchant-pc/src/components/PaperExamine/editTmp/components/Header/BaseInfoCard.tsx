/**
 * 基本信息卡片
 */
import type { FC } from 'react'
import type { ExamineDetailType } from '../../interface'
import { compositionMap } from '../../../list/enums'
import styles from '../../index.modules.less'
import { Tooltip } from 'antd'

const BaseInfoCard: FC<{ data?: ExamineDetailType }> = props => {
    const { data } = props

    const getJobInfo = (value?: ExamineDetailType) => {
        let str = '-'
        const { jobName, jobType, jobLevel } = value?.customContent?.commonJob || {}
        if (!jobName) {
            return str
        }
        str = jobName
        if (jobType) {
            str = `${str}/${jobType}`
        }
        if (jobLevel) {
            str = `${str}/${jobLevel}`
        }
        return <Tooltip title={str}>{str}</Tooltip>
    }

    return (
        <div className={styles.card} style={{ flex: '1 1 0%' }}>
            <div className={styles.card_title}>
                基本信息
                <div className={styles.shadow} />
            </div>
            <div className={styles.card_content}>
                <div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>考试名称：</div>
                        <div className={styles.value}>
                            {data?.title ? (
                                <Tooltip title={data?.title}>{data?.title}</Tooltip>
                            ) : (
                                '-'
                            )}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>职业/工种/等级：</div>
                        <div className={styles.value}>{getJobInfo(data)}</div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>组卷模板：</div>
                        <div className={styles.value}>
                            {data?.templateTitle ? (
                                <Tooltip title={data?.templateTitle}>{data?.templateTitle}</Tooltip>
                            ) : (
                                '未使用'
                            )}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>组卷方式：</div>
                        <div className={styles.value}>
                            {data?.composition ? (compositionMap as any)[data?.composition] : '-'}
                        </div>
                    </div>
                    <div className={styles.card_list_item}>
                        <div className={styles.key}>要素细目表：</div>
                        <div className={styles.value}>
                            {data?.authenticateTitle ? (
                                <Tooltip title={data?.authenticateTitle}>
                                    {data?.authenticateTitle}
                                </Tooltip>
                            ) : (
                                '未使用'
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseInfoCard
