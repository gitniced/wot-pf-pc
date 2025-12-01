import styles from './index.module.less'

const Index = ({ label, explain, list = [], customStyle = {} }: any) => {
    return (
        <div style={customStyle} className={styles.container}>
            <div className={styles.label}>
                <div className={styles.icon} />
                <span className={styles.name}>{label} </span>
                <span className={styles.explain}>{explain}</span>
            </div>
            {list.map((item: any, i: number) => (
                <div key={i} className={styles.job}>
                    <span>{item?.name}</span>
                    <span className={styles.scale}>{item?.scale}</span>
                </div>
            ))}
        </div>
    )
}

export default Index
