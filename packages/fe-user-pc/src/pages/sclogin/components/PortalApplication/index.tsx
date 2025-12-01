import styles from './index.modules.less'

/**
 * 打造全链路门户应用，赋能机构数字化升级
 */
const PortalApplication: React.FC = () => {
    const imageList = [
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/icon_11%402x.png',
            title: '在线报名',
        },
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/icon_12%402x.png',
            title: '考前测练',
        },
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
                <div className={[styles.title, 'animated'].join(' ')}>
                    打造全链路门户应用，赋能机构数字化升级
                </div>
                <div className={[styles.content, 'animated'].join(' ')}>
                    {imageList.map(item => (
                        <div key={item.url} className={styles.card}>
                            <img className={styles.image} src={item.url} />
                            <div className={styles.title}>{item.title}</div>
                        </div>
                    ))}
                </div>
                {/* <div
                    className={[styles.buttons, 'animated'].join(' ')}
                    onClick={() => setIsModal(true)}
                >
                    <Button className={styles.button} type="primary">
                        <span className={styles.text}>了解更多</span>
                        <ArrowRightOutlined className={styles.icon} />
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default PortalApplication
