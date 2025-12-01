import styles from './index.modules.less'

/**
 * 证书电子化，高校易查询
 */
const TextualCriticism: React.FC = () => {
    const dataList = [
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/icon_13%402x.png',
            title: '准考证查询',
        },
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/icon_14%402x.png',
            title: '成绩查询',
        },
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/icon_15%402x.png',
            title: '证书查询',
        },
    ]

    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <div className={[styles.title, 'animated'].join(' ')}>证书电子化，高效易查询</div>
                <div className={[styles.content, 'animated'].join(' ')}>
                    {dataList.map(item => (
                        <div className={styles.card} key={item.url}>
                            <img src={item.url} className={styles.image} />
                            <div className={styles.text}>{item.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TextualCriticism
