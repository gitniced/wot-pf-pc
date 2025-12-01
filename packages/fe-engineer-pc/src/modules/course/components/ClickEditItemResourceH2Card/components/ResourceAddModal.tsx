import { Form, Input, Modal, Radio, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { UploadProps } from 'antd'
import { uploadResourceFile } from '@/modules/course/service'
import {
    RESOURCE_FORMAT,
    RESOURCE_FORMAT_LABEL,
    resourceFormatLabel,
} from '@/modules/resource/const'

interface IResourceAddModalProps {
    open: boolean
    onCancel: () => void
    onOk: (data: { format: RESOURCE_FORMAT; name: string; url?: string }) => void
}

const ResourceAddModal = (props: IResourceAddModalProps) => {
    const { open, onCancel, onOk } = props
    const [resourceType, setResourceType] = useState<RESOURCE_FORMAT>(RESOURCE_FORMAT.device)
    const [resourceName, setResourceName] = useState('')
    const [uploadFile, setUploadFile] = useState<File>()
    const [fileList, setFileList] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const resourceTypeOptions = resourceFormatLabel.filter(option =>
        [RESOURCE_FORMAT.device, RESOURCE_FORMAT.drawing, RESOURCE_FORMAT.attachment].includes(
            option.value,
        ),
    )

    const uploadProps: UploadProps = {
        name: 'file',
        maxCount: 1,
        fileList,
        beforeUpload: file => {
            setUploadFile(file)
            setFileList([file])
            return false
        },
        onRemove: () => {
            setUploadFile(undefined)
            setFileList([])
        },
    }

    const handleCancel = () => {
        setResourceType(RESOURCE_FORMAT.device)
        setResourceName('')
        setUploadFile(undefined)
        setFileList([])
        setLoading(false)
        form.resetFields()
        onCancel()
    }

    const handleOk = async () => {
        try {
            setLoading(true)

            if (resourceType === RESOURCE_FORMAT.device) {
                // 设备类型只需要名称
                if (!resourceName.trim()) {
                    message.warning('请输入设备名称')
                    setLoading(false)
                    return
                }

                onOk({
                    format: resourceType,
                    name: resourceName,
                })
            } else {
                // 图纸和附件类型需要上传文件
                if (!uploadFile) {
                    message.warning(`请上传${RESOURCE_FORMAT_LABEL[resourceType]}`)
                    setLoading(false)
                    return
                }

                // 上传文件
                const uploadResult = await uploadResourceFile(uploadFile)

                onOk({
                    format: resourceType,
                    name: uploadFile.name,
                    url: uploadResult.url,
                })
            }

            handleCancel()
        } catch (error) {
            console.error('操作失败:', error)
            message.error('操作失败，请重试')
        } finally {
            setLoading(false)
        }
    }

    const getTypeLabel = () => {
        return RESOURCE_FORMAT_LABEL[resourceType] || ''
    }

    return (
        <Modal
            title="手动添加资源"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            okText="确定"
            cancelText="取消"
            width={500}
            confirmLoading={loading}
        >
            <Form form={form}>
                <Form.Item label="资源类型：" labelCol={{ span: 5 }} required>
                    <Radio.Group
                        value={resourceType}
                        onChange={e => {
                            setResourceType(e.target.value)
                            setResourceName('')
                            setUploadFile(undefined)
                            setFileList([])
                            form.resetFields(['resourceName', 'uploadFile'])
                        }}
                        options={resourceTypeOptions}
                    />
                </Form.Item>

                {resourceType === RESOURCE_FORMAT.device && (
                    <Form.Item label="设备名称：" labelCol={{ span: 5 }} required>
                        <Input
                            placeholder="请输入"
                            value={resourceName}
                            onChange={e => setResourceName(e.target.value)}
                            maxLength={50}
                        />
                    </Form.Item>
                )}

                {resourceType !== RESOURCE_FORMAT.device && (
                    <Form.Item
                        wrapperCol={{ offset: 5 }}
                        rules={[{ required: true, message: `请上传${getTypeLabel()}` }]}
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>上传{getTypeLabel()}</Button>
                        </Upload>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}

export default ResourceAddModal
