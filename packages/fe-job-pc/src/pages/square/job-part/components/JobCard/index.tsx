import { Avatar } from 'antd'
import styles from './index.module.less'
import { history } from 'umi'
import type { JobActivityListItemRespDto } from '../../interface'

interface JobCardProps {
    data: JobActivityListItemRespDto
    type: 'mini' | 'default'
}

const JobCard: React.FC<JobCardProps> = ({ data, type }) => {
    let {
        professionCode,
        professionName,
        salaryDesc,
        tagList,
        recruiterInfo,
        organizationName,
        organizationLogo,
        provinceName,
        regionName,
    } = data ?? {}

    tagList = tagList || []

    recruiterInfo = recruiterInfo || {}

    return (
        <div
            className={[styles.job_card, type === 'mini' && styles.mini].join(' ')}
            onClick={() => history.push(`/square/job-detail?code=${professionCode}`)}
        >
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.profession_name}>{professionName}</div>
                    <div className={styles.salary}>{salaryDesc}</div>
                </div>
                <div className={styles.tags}>
                    {tagList.map(item => (
                        <div
                            className={type === 'mini' ? styles.mini_tag : styles.default_tag}
                            key={item.tagCode}
                        >
                            {item.tagName}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.company_box}>
                <div className={styles.company}>
                    <Avatar
                        size={30}
                        className={styles.image}
                        src={organizationLogo ? organizationLogo : defaultOrgLogo}
                    />
                    <span className={styles.name}>{organizationName}</span>
                </div>
                {type === 'mini' ? (
                    <div className={styles.user_mini}>
                        {provinceName}·{regionName}
                    </div>
                ) : (
                    <div className={styles.user_info}>
                        <Avatar
                            size={32}
                            className={styles.image}
                            src={recruiterInfo?.icon || defaultAvatar}
                        />
                        <div className={styles.name}>{recruiterInfo?.userName}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

/** 职位广场搜索 */
export default JobCard
