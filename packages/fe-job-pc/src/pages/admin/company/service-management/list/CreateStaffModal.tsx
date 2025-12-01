import ImageUpload from '@/components/ImageUpload'
import type { ModalProps } from 'antd'
import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'
import type { CreateServiceStaffParams, ListItem } from './interface'

const CreateStaffModal = ({
    open,
    isEdit,
    record,
    onCancel,
    onOk,
}: Omit<ModalProps, 'onOk'> & {
    onOk: (values: CreateServiceStaffParams) => void
    onCancel: () => void
    record: ListItem
    isEdit: boolean
}) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (isEdit) {
            const { name, mobile, idCardNo, photo } = record
            const photoField = [
                {
                    name: 'image.png',
                    status: 'done',
                    url: photo,
                    uid: photo,
                    thumbUrl: photo,
                    response: {
                        name: 'image.png',
                        url: photo,
                    },
                },
            ]

            form.setFieldsValue({ name, mobile, idCardNo, photo: photo ? photoField : undefined})
        }
    }, [isEdit])

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            const { photo } = values
            const currentPhoto = photo.find((i: any) => i?.url || i?.response?.url)

            const params = {
                ...values,
                photo: currentPhoto?.url || currentPhoto?.response?.url,
            }

            onOk(params)
        })
    }

    return (
        <Modal centered title="新建" open={open} onCancel={handleCancel} onOk={handleOk}>
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item
                    required
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                    ]}
                >
                    <Input placeholder="请输入" disabled={isEdit} />
                </Form.Item>
                <Form.Item
                    required
                    label="手机号"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号',
                        },
                    ]}
                >
                    <Input placeholder="请输入" disabled={isEdit} />
                </Form.Item>
                <Form.Item
                    required
                    label="身份证号"
                    name="idCardNo"
                    rules={[
                        {
                            required: true,
                            message: '请输入身份证号',
                        },
                    ]}
                >
                    <Input placeholder="请输入" disabled={isEdit} />
                </Form.Item>
                <Form.Item
                    required
                    label="电子照片"
                    name="photo"
                    rules={[
                        {
                            required: true,
                            message: '请上传电子照片',
                        },
                    ]}
                    extra="注：支持上传.jpg.png.jpeg格式图片，图片大小不超过5M"
                    valuePropName="fileList"
                    getValueFromEvent={(e: { file: File; fileList: File[] }) => {
                        if (Array.isArray(e)) {
                            return e
                        }
                        return e.fileList
                    }}
                >
                    <ImageUpload
                        type={10}
                        otherProps={{
                            maxCount: 1,
                            size: 5,
                            accept: ['image/jpeg', 'image/png', 'image/jpg'],
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateStaffModal
