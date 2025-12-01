import { wrapper } from '@wotu/wotu-components'
import { Form, Modal, Row, Col, Input } from 'antd'
import styles from './index.module.less'
import { observer } from 'mobx-react'

interface PreviewModalProps {
    visible: boolean
    closeDialog: () => void
    record: Record<string, any>
    onAudit: () => void
}
const AuditModal = ({ visible, closeDialog, onAudit }: PreviewModalProps) => {
    const [form] = Form.useForm()

    const handleOk = (values: Record<string, string>) => {
        closeDialog()
        onAudit(values)
    }

    const handleCancel = () => {
        closeDialog()
    }

    const itemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    }

    const formData = [
        {
            label: '姓名',
            value: 'name',
            placeholder: '请输入姓名',
        },
        {
            label: '证件号码',
            value: 'idcard',
            placeholder: '请输入证件号码',
        },
    ]

    const renderFormItem = data => {
        return data.map(item => {
            return (
                <Form.Item {...itemLayout} label={item.label} key={item.label} name={item.value}>
                    <Input placeholder={item.placeholder} />
                </Form.Item>
            )
        })
    }

    return (
        <Modal
            title="核对信息"
            visible={visible}
            onOk={() => {
                form.submit()
            }}
            onCancel={handleCancel}
            centered
            className={styles.modal}
        >
            <Row justify={'center'}>
                <Col span={18}>
                    <Form className={styles.content} form={form} onFinish={handleOk}>
                        {renderFormItem(formData)}
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

export default wrapper(observer(AuditModal))
