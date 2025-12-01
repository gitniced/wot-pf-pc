// 结束服务

import { Form, Input, Modal, ModalProps, Radio } from 'antd'
import { EMPLOYMENT_STATUS_ENUM, EmploymentStatusOptions } from './consts'

const FinishServiceModal = ({
    open,
    onCancel,
    onOk,
}: ModalProps & {
    onCancel: () => void
    onOk: (values: any) => void
}) => {
    const [form] = Form.useForm()

    const jobState = Form.useWatch('jobState', form)

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            onOk(values)
            form.resetFields()
        })
    }

    return (
        <Modal
            centered
            width={568}
            open={open}
            title="结束本次服务"
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form
                form={form}
                initialValues={{
                    jobState: 1,
                }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <Form.Item required label="求职者就业状态" name="jobState">
                    <Radio.Group options={EmploymentStatusOptions} />
                </Form.Item>
                {jobState === EMPLOYMENT_STATUS_ENUM.EMPLOYED ? (
                    <>
                        <Form.Item
                            required
                            label="就业类型"
                            name="jobType"
                            rules={[{ required: true, message: '请输入就业类型' }]}
                        >
                            <Input placeholder="请输入" maxLength={20} />
                        </Form.Item>
                        <Form.Item
                            required
                            label="就业单位"
                            name="jobUnit"
                            rules={[{ required: true, message: '请输入就业单位' }]}
                        >
                            <Input placeholder="请输入" maxLength={50} />
                        </Form.Item>
                        <Form.Item label="就业岗位" name="jobPosition"  rules={[{ required: true, message: '请输入就业岗位' }]}>
                            <Input placeholder="请输入" maxLength={20} />
                        </Form.Item>
                    </>
                ) : (
                    <Form.Item
                        required
                        label="备注"
                        name="remark"
                        rules={[{ required: true, message: '请输入备注' }]}
                    >
                        <Input.TextArea placeholder="请输入" rows={3} maxLength={100}/>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}

export default FinishServiceModal
