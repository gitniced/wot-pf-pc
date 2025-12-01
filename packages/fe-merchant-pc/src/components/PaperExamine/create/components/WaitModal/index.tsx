import { Modal, Spin } from 'antd'
import styles from './index.module.less'

interface WaitModalProps {
    title: string
    visible: boolean
    content: string
}

export default (props: WaitModalProps) => {
    const { title, visible, content } = props || {}

    return (
        <Modal title={title} visible={visible} width={600} closable={false} centered footer={null}>
            <div className={styles.wait_box}>
                <Spin size="large" tip={content} />
            </div>
        </Modal>
    )
}
