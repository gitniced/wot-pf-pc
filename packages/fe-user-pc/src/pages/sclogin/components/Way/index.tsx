import styles from './index.modules.less'

/**
 * 专业智能题库管理，支持多种组卷形式、灵活实现自由配置
 */
const Way: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <div className={[styles.title, 'animated'].join(' ')}>
                    专业智能题库管理，支持多种组卷形式、灵活实现自由配置
                </div>
                <div className={styles.content}>
                    <div className={[styles.images, 'animated', 'left'].join(' ')}>
                        <img
                            className={styles.image1}
                            src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/pic_5%402x.png"
                        />
                        <img
                            className={styles.image2}
                            src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/pic_6%402x.png"
                        />
                    </div>
                    <div className={[styles.sibler, 'animated', 'right'].join(' ')}>
                        <div className={styles.item}>按鉴定点、按题型组卷</div>
                        <div className={styles.item}>要素细目、试卷结构</div>
                        <div className={styles.item}>题目乱序、答案乱序</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Way
