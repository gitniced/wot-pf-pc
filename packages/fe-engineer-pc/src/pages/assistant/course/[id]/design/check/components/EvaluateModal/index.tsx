import { Modal, message } from 'antd'
import styles from './index.module.less'
import { Form, InputNumber, Radio, Alert } from 'antd'
import { useEffect } from 'react'

interface Props {
    isModalOpen: boolean
    handleOk: (data: Record<string, any>[]) => void
    handleCancel: () => void
    data: any
}

const Index = (props: Props) => {
    const [form] = Form.useForm()
    const { isModalOpen, handleOk, handleCancel, data } = props

    const peerWeight = Form.useWatch('peerWeight', form)

    useEffect(() => {
        form.setFieldsValue({
            selfWeight: data?.selfWeight || 0,
            peerWeight: data?.peerWeight || 0,
            teacherWeight: data?.teacherWeight || 0,
            peerType: data?.peerType || 2,
        })
    }, [])

    return (
        <Modal
            title="设置评价方式（权重%）"
            open={isModalOpen}
            onCancel={handleCancel}
            width={430}
            onOk={() => {
                form.validateFields().then(res => {
                    if (res.selfWeight + res.peerWeight + res.teacherWeight !== 100) {
                        message.warning('总权重必须=100')
                        return
                    }
                    handleOk(res)
                })
            }}
        >
            <div className={styles.content}>
                <Alert
                    style={{ marginBottom: '24px' }}
                    message="注：总权重必须=100"
                    type="warning"
                    showIcon
                />

                <Form form={form} autoComplete="off">
                    <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div>
                            <Form.Item
                                label="自评"
                                name={'selfWeight'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入！',
                                    },
                                ]}
                            >
                                <InputNumber min={0} placeholder="请输入！" />
                            </Form.Item>
                            <Form.Item
                                label="互评"
                                name={'peerWeight'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入！',
                                    },
                                ]}
                            >
                                <InputNumber min={0} placeholder="请输入！" />
                            </Form.Item>
                            <Form.Item
                                label="师评"
                                name={'teacherWeight'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入！',
                                    },
                                ]}
                            >
                                <InputNumber min={0} placeholder="请输入！" />
                            </Form.Item>
                        </div>

                        {+peerWeight > 0 && (
                            <Form.Item
                                label=""
                                name={'peerType'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入！',
                                    },
                                ]}
                                style={{ marginLeft: '24px' }}
                            >
                                <Radio.Group>
                                    <Radio value={2}>组内互评</Radio>
                                    <Radio value={3}>组间互评</Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default Index
