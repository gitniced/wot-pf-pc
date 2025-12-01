/* eslint-disable */
import React from 'react'
import { Form, Input, Modal, ModalProps } from 'antd'
import { useEffect } from 'react'

interface RenameProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
    name?: string
    onCancel: () => void
    onOk: (name: string) => void
}

const Rename = ({ open, name, onOk, onCancel }: RenameProps) => {
    const [form] = Form.useForm()

    useEffect(() => {
        open && form.setFieldsValue({ name })
    }, [open, name])

    const handleRename = () => {
        form.validateFields().then(values => {
            onOk(values.name)
        })
    }

    return (
        <Modal title="重命名" open={open} onOk={handleRename} onCancel={onCancel}>
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
                <Form.Item name="name" extra="建议按照姓名-应聘岗位的格式命名">
                    <Input maxLength={30} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Rename
