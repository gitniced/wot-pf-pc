import { Modal, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import type { IProps } from '../../interface'

export default (props: IProps) => {
    const { visible, onCancel, onSubmit, records } = props
    const title = records ? '编辑分类' : '新增分类'
    const [loading, setLoading] = useState<boolean>(false) //加载
    const [form] = Form.useForm()

    const Finish = () => {
        form.validateFields()
            .then(values => {
                let tempValues = values
                if (records) {
                    tempValues = { ...records, ...values }
                }
                if (!loading) {
                    setLoading(true)
                    onSubmit(tempValues, () => setLoading(false))
                }
            })
            .catch(err => {
                return err
            })
    }

    useEffect(() => {
        if (!visible) {
            form.resetFields()
            return
        }
        if (records) {
            form.setFieldsValue(records)
        } else {
            form.resetFields()
        }
    }, [visible, records])

    return (
        <>
            <Modal
                forceRender
                centered
                destroyOnClose
                title={title}
                visible={visible}
                onCancel={onCancel}
                onOk={Finish}
                confirmLoading={loading}
                maskClosable={false}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="分类名称"
                        name="name"
                        rules={[{ required: true, message: '请输入分类名称' }]}
                    >
                        <Input placeholder="请输入" maxLength={15} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
