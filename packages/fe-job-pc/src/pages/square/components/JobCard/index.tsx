import { Avatar } from 'antd'
import styles from './index.module.less'
import { history } from 'umi'
import { salaryCount } from '../../utils'
import classNames from 'classnames'

interface JobCardProps {
    data: any
    type: 'mini' | 'default'
    source?: string // 来源 职位列表 ｜ 投递记录
}

const JobCard: React.FC<JobCardProps> = ({ data, type, source }) => {
    const {
        professionName,
        recruiter,
        recruitSimpleDto,
        tagDtoList = [],
        organization,
        addressDto,
    } = data ?? {}

    const tags = [
        recruitSimpleDto?.educationName,
        recruitSimpleDto?.experienceName,
        ...(type === 'mini' ? [] : tagDtoList.map((item: any) => item.tagName)),
    ]
    const { salaryMin, salaryMax, salaryType, salaryMonth, uint, salaryDesc } =
        recruitSimpleDto ?? {}

    const onLinkToJobDetail = () => {
        history.push(`/square/job-detail?code=${data.code}`)
    }

    return (
        <div
            className={classNames(styles.job_card, {
                [styles.mini]: type === 'mini',
            })}
            onClick={() => onLinkToJobDetail()}
        >
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.profession_name}>{professionName}</div>
                    <div className={styles.salary}>
                        {salaryCount({
                            salaryMin,
                            salaryMax,
                            salaryType,
                            salaryMonth,
                            uint,
                            salaryDesc,
                        })}
                    </div>
                </div>
                {tags.length > 0 && (
                    <div className={styles.tags}>
                        {tags.map(item => (
                            <div
                                className={type === 'mini' ? styles.mini_tag : styles.default_tag}
                                key={item}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {source !== 'company_detail' && (
                <div className={styles.company_box}>
                    <div className={styles.company}>
                        <Avatar
                            size={30}
                            className={styles.image}
                            src={organization?.logo || defaultOrgLogo}
                        />
                        <span className={styles.name}>{organization?.name}</span>
                    </div>
                    {type === 'mini' ? (
                        <div className={styles.user_mini}>
                            {addressDto?.provinceName}·{addressDto?.regionName}
                        </div>
                    ) : (
                        <div className={styles.user_info}>
                            <Avatar
                                size={32}
                                className={styles.image}
                                src={recruiter?.icon || defaultAvatar}
                            />
                            <div className={styles.name}>{recruiter?.userName}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

/** 职位广场搜索 */
export default JobCard
