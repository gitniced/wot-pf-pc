import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd'

import styles from './index.module.less'

const WritingFormatModal = ({ open, onCancel }: ModalProps) => {
    return (
        <Modal
            title="常规格式试题编写规范"
            width={900}
            open={open}
            onCancel={onCancel}
            footer={
                <Button type="primary" onClick={onCancel}>
                    确认
                </Button>
            }
            className={styles.writing_format_modal}
        >
            <img
                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/pic_changguigeshi.png"
                style={{ width: '100%' }}
            />
        </Modal>
    )
}

export default WritingFormatModal
