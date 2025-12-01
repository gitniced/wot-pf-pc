import { salaryCount } from '@/pages/square/utils'
import styles from './index.module.less'
import { history } from 'umi'
import { Tooltip } from 'antd'

const Card: React.FC = ({ data }) => {
    return (
        <div
            className={styles.card_box}
            onClick={() => history.push(`/square/company-details?code=${data?.organizationCode}`)}
        >
            <div className={styles.company}>
                <img src={data.logo || defaultOrgLogo} className={styles.image} />
                <div className={styles.user_info}>
                    <div className={styles.title}>{data?.name}</div>
                    <div className={styles.tags}>
                        {data?.industry && (
                            <Tooltip title={data?.industry}>
                                <div className={styles.tag}>{data?.industry}</div>
                            </Tooltip>
                        )}
                        {data?.scale && (
                            <Tooltip title={data?.scale}>
                                <div className={styles.tag}>{data?.scale}</div>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.job}>
                <span className={styles.label}>热招</span>
                <span className={styles.name}>{data?.professionName}</span>
                <span className={styles.scales}>
                    {salaryCount({
                        salaryMax: data?.salaryMax,
                        salaryMin: data?.salaryMin,
                        salaryMonth: data?.salaryMonth,
                        salaryType: data?.salaryType,
                        uint: data?.uint,
                        salaryDesc: data?.salaryDesc,
                    })}
                </span>
            </div>
        </div>
    )
}

export default Card
