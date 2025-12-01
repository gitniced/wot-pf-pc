import React, { useState } from 'react'
import { Modal, Form, Radio, Input } from 'antd'
import type { RadioChangeEvent } from 'antd'
import styles from './index.modules.less'
import { auditEnum } from './const'

const { TextArea } = Input

interface IProps {
    visible: boolean //控制显示隐藏
    onCancel: () => void //取消
    onSubmit: (data: any) => void //提交
}

const AuditModal = (props: IProps) => {
    const { visible, onCancel, onSubmit } = props
    const [loading, setLoading] = useState<boolean>(false) //加载
    const [value, setValue] = useState(auditEnum.PASS) //radio值
    const [form] = Form.useForm()

    /**   编辑完成 表单验证 */
    const finish = () => {
        setLoading(true)
        form.validateFields()
            .then(values => {
                return onSubmit(values)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    /**
     * radio值改变
     */
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value)
    }

    return (
        <>
            <Modal
                title="审核"
                open={visible}
                onOk={finish}
                onCancel={onCancel}
                centered
                destroyOnClose
                confirmLoading={loading}
                className={styles.page}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    preserve={false}
                    validateTrigger="onBlur"
                    initialValues={{
                        auditStatus: auditEnum.PASS,
                    }}
                >
                    <Form.Item
                        label="审核结果"
                        name="auditStatus"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={auditEnum.PASS}>通过</Radio>
                            <Radio value={auditEnum.NOT_PASS}>不通过</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        <Form.Item
                            label="审核意见"
                            name="auditComment"
                            rules={[
                                {
                                    required: value === auditEnum.NOT_PASS,
                                },
                            ]}
                        >
                            <TextArea maxLength={50} showCount />
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </>
    )
}

export default AuditModal
