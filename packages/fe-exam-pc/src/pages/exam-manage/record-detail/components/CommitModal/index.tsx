import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'

export default function CommitModal() {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={styles.button}>
            <Button size='small' style={{ fontSize: 13 }} onClick={() => {
                setOpen(true)
            }}>质检意见</Button>
            <Modal
                open={open}
                title="输入质检意见"
                onCancel={handleClose}
                footer={<Button onClick={handleClose}>关闭</Button>}
                destroyOnClose
            >
                <Input.TextArea
                    placeholder='请输入'
                    rows={3}
                />
            </Modal>
        </div>
    )
}
