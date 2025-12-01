import { Modal } from 'antd'
import styles from './index.modules.less'

interface ByTelphoteProps {
    isModal: boolean
    setIsModal: (e: boolean) => void
}

const ByTelphote: React.FC<ByTelphoteProps> = ({ isModal, setIsModal }) => {
    return (
        <Modal
            className={styles.modal}
            visible={isModal}
            onCancel={() => setIsModal(false)}
            footer={null}
            centered={true}
        >
            <div className={styles.content}>
                <div className={styles.title}>电话咨询</div>
                <div className={styles.phone}>
                    <span className={styles.text}>俞女士</span>
                    <span className={styles.text}>153 9715 8861</span>
                </div>
            </div>
        </Modal>
    )
}

export default ByTelphote
