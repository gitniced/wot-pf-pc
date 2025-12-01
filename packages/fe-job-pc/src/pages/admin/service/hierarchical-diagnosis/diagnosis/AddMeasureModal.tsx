// 新建/编辑帮扶措施

import { Form, Input, Modal, ModalProps, Radio, Select } from 'antd'
import { useEffect } from 'react'
import { MeasureItem } from './interface'

const AddMeasureModal = ({
    open,
    isEdit,
    record,
    onOk,
    onCancel,
    sysMeasureList
}: ModalProps & {
    isEdit: boolean
    record?: MeasureItem
    onOk: (values: any) => void
    onCancel: () => void
    sysMeasureList: any[]
}) => {
    const [form] = Form.useForm()

    const measureType = Form.useWatch('type', form)

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({ title: record?.title })
        }
    }, [isEdit, record])

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onOk(values)
        })
    }

    const handleCancel = () => {
        onCancel()
    }

    useEffect(() => {
        if (!open) {
            form.resetFields()
        }
    }, [open])



    return (
        <Modal
            centered
            open={open}
            title={isEdit ? '编辑措施内容' : '新建帮扶措施'}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
                initialValues={{
                    type: 3,
                }}
            >
                {!isEdit && (
                    <Form.Item required label="类型" name="type">
                        <Radio.Group
                            options={[
                                // { label: '系统措施', value: 1 },
                                { label: '自定义措施', value: 3 },
                            ]}
                        />
                    </Form.Item>
                )}
                {isEdit || measureType === 3 ? (
                    <Form.Item
                        required
                        label="措施内容"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '请输入措施内容',
                            },
                        ]}
                    >
                        <Input.TextArea rows={3} placeholder="请输入"  maxLength={50}/>
                    </Form.Item>
                ) : (
                    <Form.Item
                        required
                        label="选择措施"
                        name="measure"
                        rules={[
                            {
                                required: true,
                                message: '请选择具体的措施',
                            },
                        ]}
                    >
                        <Select placeholder="请选择具体的措施" options={sysMeasureList} fieldNames={{ label: 'content', value: 'content' }} labelInValue/>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}

export default AddMeasureModal
