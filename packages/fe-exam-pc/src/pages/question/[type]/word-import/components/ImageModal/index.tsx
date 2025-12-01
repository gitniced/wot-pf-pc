import React from 'react'
import { Modal, Button } from 'antd'
import wrapper from '../../wrapper'
import styles from '../../index.module.less'

interface ImageModalProps {
    templateType: string
    visible: boolean
    closeDialog: () => void
}

/** Word试题格式规范图片Modal */
const ImageModal: React.FC<ImageModalProps> = props => {
    const { templateType, visible, closeDialog } = props
    const footer = () => {
        return (
            <Button type="primary" onClick={closeDialog}>
                我知道了
            </Button>
        )
    }
    return (
        <Modal
            open={visible}
            width={900}
            footer={footer()}
            title="Word试题格式规范"
            onCancel={closeDialog}
            onOk={closeDialog}
            className={styles.image_modal}
        >
            <img
                src={
                    templateType === 'default'
                        ? 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/pic_wendanggehsi.png'
                        : 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/pic_changguigeshi.png'
                }
            />
        </Modal>
    )
}

export default wrapper(ImageModal)
