import { renameResource } from '@/modules/resource/service'
import type { IResource } from '@/modules/resource/types'
import { Input, message, Modal } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.less'

interface IResourceRenameModalProps {
    resource: IResource
    open: boolean
    onCancel: () => void
    onOk: () => void
}

const ResourceRenameModal: React.FC<IResourceRenameModalProps> = ({
    resource,
    open,
    onCancel,
    onOk,
}) => {
    const [innerName, setInnerName] = useState(resource.name)
    const [confirmLoading, setConfirmLoading] = useState(false)

    useEffect(() => {
        setInnerName(resource.name)
    }, [resource.name])

    return (
        <Modal
            title="资源重命名"
            open={open}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            centered
            width={520}
            onOk={async () => {
                if (!innerName) {
                    message.error('请输入资源名称后保存')
                    return
                }

                setConfirmLoading(true)

                try {
                    const res = await renameResource({
                        code: resource.code,
                        name: innerName,
                    })
                    if (res) {
                        message.success('重命名成功')
                    }
                    onOk()
                } catch (error) {
                    message.error('重命名失败')
                } finally {
                    setConfirmLoading(false)
                }
            }}
        >
            <div className={styles.resource_rename_modal_content}>
                <span>资源名称：</span>
                <Input value={innerName} onChange={e => setInnerName(e.target.value)} />
            </div>
        </Modal>
    )
}

export default ResourceRenameModal
