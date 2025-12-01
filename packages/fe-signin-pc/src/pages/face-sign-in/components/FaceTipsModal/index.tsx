import { Button, Modal } from 'antd'
import React from 'react'
import styles from './index.module.less'
import type { TipsModalProps } from './interface'

/** 签到前提示 */
const FaceTipsModal: React.FC<TipsModalProps> = ({ visible, handleKnow }) => {
  return (
    <Modal
      open={visible}
      width={600}
      closable={false}
      maskClosable={false}
      className={styles.tips}
      footer={null}
    >
      <div className={styles.wrap}>
        <Button type="primary" onClick={handleKnow}>我知道了</Button>
      </div>
    </Modal>
  )
}

export default FaceTipsModal
