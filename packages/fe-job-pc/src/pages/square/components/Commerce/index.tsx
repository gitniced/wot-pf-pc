import styles from './index.module.less'

const Index: React.FC<{ data: any }> = ({ data = [] }) => {
    return (
        <div className={styles.commerce}>
            <div className={styles.content}>
                {data.map((item: any) => (
                    <div className={styles.item}>
                        <div className={styles.label}>{item.label}</div>
                        <div className={styles.value}>{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/** 工商信息 */
export default Index
