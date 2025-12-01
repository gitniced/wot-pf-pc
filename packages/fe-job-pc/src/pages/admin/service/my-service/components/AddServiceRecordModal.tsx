// 添加服务记录

import { DatePicker } from '@/components/Picker'
import type { ModalProps } from 'antd'
import { Form, Input, Modal, Select } from 'antd'
import { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import dayjs from 'dayjs'

const AddServiceRecordModal = ({
    open,
    onOk,
    onCancel,
    currentRecord,
}: ModalProps & {
    currentRecord?: any
    onOk: (values: any) => void
    onCancel: () => void
}) => {
    const store = useLocalObservable(() => Store)
    const { assistanceInfo } = store
    const { measureList } = assistanceInfo
    const [form] = Form.useForm()

    useEffect(() => {
        if (open && currentRecord) {
            form.setFieldsValue({
                ...currentRecord,
                measureCode: currentRecord?.measureCode || currentRecord?.code,
                serverAt: currentRecord?.serverAt ? dayjs(currentRecord?.serverAt) : undefined,
            })
        } else if (!open) {
            form.resetFields()
        }
    }, [open, currentRecord])

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            onOk(values)
        })
    }

    return (
        <Modal
            centered
            open={open}
            title={`${currentRecord?.serverAt ? '编辑' : '新增'}服务记录`}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                <Form.Item
                    required
                    label="关联措施"
                    name="measureCode"
                    rules={[
                        {
                            required: true,
                            message: '请选择具体措施',
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择具体措施"
                        options={measureList}
                        fieldNames={{ value: 'code', label: 'title' }}
                    />
                </Form.Item>
                <Form.Item
                    required
                    label="服务日期"
                    name="serverAt"
                    rules={[
                        {
                            required: true,
                            message: '请选择服务日期',
                        },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    required
                    label="服务记录"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: '请输入服务记录',
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder="请输入具体服务过程信息，包括不限于服务实施步骤、求职者意见与建议、实际取的成果等。"
                        rows={3}
                        maxLength={1000}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default observer(AddServiceRecordModal)
