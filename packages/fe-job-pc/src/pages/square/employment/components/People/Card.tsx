import styles from './index.module.less'

const Card: React.FC<{ data: any }> = ({ data }) => {
    const { jumpUrl = '' } = data || {}
    if (jumpUrl) {
        return (
            <a className={styles.card_box} href={jumpUrl} target={'_blank'} rel="noreferrer">
                <img src={data.logo[0]?.url} className={styles.image} />
                <div className={styles.title}>{data?.name}</div>
                <div className={styles.desc}>{data?.desc}</div>
            </a>
        )
    } else {
        return (
            // @ts-ignore
            <div className={styles.card_box} href={jumpUrl} target={'_blank'}>
                <img src={data.logo[0]?.url} className={styles.image} />
                <div className={styles.title}>{data?.name}</div>
                <div className={styles.desc}>{data?.desc}</div>
            </div>
        )
    }
}

export default Card
