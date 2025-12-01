import styles from './index.modules.less'

/**
 * 顾问式服务模式, 一站式门户搭建
 */
const ExaminationPortal: React.FC = () => {
    const imageList = [
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/pic_1%402x.png',
            style: {
                left: '500px',
                top: '191px',
                width: '578px',
                height: '383px',
                zIndex: '1',
            },
            className: [styles.image, 'animated', 'down'].join(' '),
        },
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/pic_2%402x.png',
            style: {
                left: '990px',
                top: '211px',
                width: '215px',
                height: '400px',
                zIndex: '2',
            },
            className: [styles.image, 'animated', 'right'].join(' '),
        },
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/pic_3%402x.png',
            style: {
                left: '398px',
                top: '501px',
                width: '168px',
                height: '80px',
                zIndex: '2',
            },
            className: [styles.image, 'animated'].join(' '),
        },
        {
            url: 'https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/pic_4%402x.png',
            style: {
                left: '300px',
                top: '300px',
                width: '191px',
                height: '40px',
                zIndex: '1',
            },
            className: [styles.image, 'animated', 'left'].join(' '),
        },
    ]

    return (
        <div className={styles.page}>
            <div className={styles.examination_portal}>
                <div className={[styles.title, 'animated'].join(' ')}>
                    顾问式服务模式, 一站式门户搭建
                </div>
                <div className={styles.content}>
                    <div className={[styles.sibler, 'animated', 'left'].join(' ')}>
                        <div className={styles.item}>专属独立域名</div>
                        <div className={styles.item}>自定义LOGO</div>
                        <div className={styles.item}>高频信息发布</div>
                    </div>
                    <div className={styles.images}>
                        {imageList.map(item => (
                            <img
                                key={item.url}
                                className={item.className}
                                style={item.style}
                                src={item.url}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExaminationPortal
