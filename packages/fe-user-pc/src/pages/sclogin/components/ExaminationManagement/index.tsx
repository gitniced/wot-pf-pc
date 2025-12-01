import styles from './index.modules.less'
import { Image } from 'antd'
/**
 *一站式考试设计，全流程考务保障
 */
const ExaminationManagement: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <div className={[styles.title, 'animated'].join(' ')}>
                    一站式考试设计，全流程考务保障
                </div>

                <Image
                    className={[styles.image, 'animated'].join(' ')}
                    src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/gz_origin/bg_yitihua%402x.png"
                    preview={false}
                />
            </div>
        </div>
    )
}

export default ExaminationManagement
