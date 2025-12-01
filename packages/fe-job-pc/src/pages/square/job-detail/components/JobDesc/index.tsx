import { Avatar, Divider } from 'antd'
import styles from './index.module.less'

/** 职位描述 */
const JobDesc: React.FC<{ data: any }> = ({ data }) => {
    const { desc, recruiter, tags = [] } = data ?? {}

    return (
        <div className={styles.job_desc}>
            <div className={styles.title}>职位描述</div>
            <div className={styles.tags}>
                {tags.map((item: any) => (
                    <div key={item.code} className={styles.tag}>
                        {item.tagName}
                    </div>
                ))}
            </div>
            <div className={styles.desc}>{desc}</div>
            {(recruiter?.icon || recruiter?.userName) && (
                <>
                    <Divider className={styles.divider} />
                    <div className={styles.user_info}>
                        <Avatar
                            size={40}
                            className={styles.avatar}
                            src={recruiter?.icon || defaultAvatar}
                        />
                        <span className={styles.text}>{recruiter?.userName}</span>
                    </div>
                </>
            )}
        </div>
    )
}

export default JobDesc
