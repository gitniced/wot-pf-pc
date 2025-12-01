import React, { useEffect } from 'react'
import { Modal, Form } from 'antd'
import styles from './index.module.less'
import FormItems from './FormItems'

interface IProps {
    visible: boolean
    onCancel: () => void
    onOk: (values: any) => boolean
    loading?: boolean
    editingField?: any
    customFieldType: string
}
const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

const CustomFieldModal: React.FC<IProps> = ({
    visible,
    onCancel,
    onOk,
    loading,
    editingField,
    customFieldType,
}) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (visible) {
            if (editingField) {
                form.setFieldsValue({
                    renderType: editingField.renderType,
                    name: editingField.name,
                    extra: editingField.extra,
                    options: editingField.options?.map((item: string | Record<string, any>) =>
                        typeof item === 'string' ? item : item.value,
                    ),
                    max: editingField.max && Number(editingField.max),
                    maxSize: editingField.maxSize && Number(editingField.maxSize),
                })
            } else {
                form.resetFields()
            }
        }
    }, [visible, editingField])

    const handleOk = async () => {
        const values = await form.validateFields()
        const success = await onOk(values)
        if (success) {
            form.resetFields()
        }
    }

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    return (
        <Modal
            title={editingField ? '编辑字段' : '添加字段'}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
            destroyOnClose
            width={640}
        >
            <Form
                form={form}
                layout="horizontal"
                className={styles.customFieldForm}
                initialValues={{
                    max: 9999,
                    maxSize: 9999,
                    options: [''],
                }}
                {...formLayout}
            >
                <FormItems fieldType={editingField?.fieldType || customFieldType} form={form} />
            </Form>
        </Modal>
    )
}

export default CustomFieldModal
