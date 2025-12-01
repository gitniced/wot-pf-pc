import styles from './index.modules.less'
import { Button, Image } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

interface ExaminationManagementProps {
    setIsModal: (e: boolean) => void
}
/**
 *一站式考试设计，全流程考务保障
 */
const ExaminationManagement: React.FC<ExaminationManagementProps> = ({ setIsModal }) => {
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
                <div className={[styles.buttons, 'animated'].join(' ')}>
                    <Button
                        className={styles.button}
                        type="primary"
                        onClick={() => setIsModal(true)}
                    >
                        <span className={styles.text}>了解更多</span>
                        <ArrowRightOutlined className={styles.icon} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ExaminationManagement
