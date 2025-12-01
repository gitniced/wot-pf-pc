// 试题查重中

import type { ModalProps } from 'antd'
import { Modal, Spin, Typography } from 'antd'

import styles from './index.module.less'

const Loading: React.FC<ModalProps> = ({ open }) => {
    return (
        <Modal
            centered
            closable={false}
            title="试题查重"
            open={open}
            footer={null}
            className={styles.polling_loading_modal}
        >
            <Spin
                spinning={true}
                tip={<Typography.Text type="secondary">试题查重中，请稍候…</Typography.Text>}
                size="large"
            />
        </Modal>
    )
}

export default Loading
