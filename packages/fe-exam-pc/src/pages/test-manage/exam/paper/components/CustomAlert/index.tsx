import { Space, Typography } from 'antd'
import styles from './index.module.less'
import { CloseOutlined } from '@ant-design/icons'

interface CustomAlertProps {
    open: boolean
    cutCount: number
    cutAutoWindingNum: number
    onClose: () => void
}

const CustomAlert = ({ cutCount, cutAutoWindingNum, open, onClose }: CustomAlertProps) => {
    return open ? (
        <div className={styles.component_custom_alert}>
            <Space size={4} align="start">
                <img
                    src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/notification.png"
                    width={20}
                    height={20}
                />
                <Space>
                    <Space size={4} direction="vertical">
                        <Typography>您已离开考试界面{cutCount}次</Typography>
                        <Typography>离开考试界面{cutAutoWindingNum}次系统将自动收卷</Typography>
                    </Space>
                </Space>
            </Space>
            <CloseOutlined onClick={onClose} />
        </div>
    ) : null
}

export default CustomAlert
