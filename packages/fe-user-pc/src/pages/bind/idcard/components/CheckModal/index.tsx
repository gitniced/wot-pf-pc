import { wrapper } from '@wotu/wotu-components'
import { Form, Modal, Row, Col, Alert, ConfigProvider } from 'antd'
import styles from './index.module.less'
import { observer } from 'mobx-react'
import BaseFormItem from '../BaseFormItem'
import { MODAL_FORM_ITEM_LAYOUT } from '@/types'
import type { IDCardType } from '../../interface'
import { CERTIFICATE_TYPE } from '../../const'
import packageInfo from '../../../../../../package.json'

interface PreviewModalProps {
    visible: boolean
    closeDialog: () => void
    idCardInfo: IDCardType
    onAuditApply: (certificateType: CERTIFICATE_TYPE, idCardInfo: IDCardType) => void
}
const CheckModal = ({ visible, closeDialog, idCardInfo, onAuditApply }: PreviewModalProps) => {
    const [form] = Form.useForm()

    let { name, number: idCardNo } = idCardInfo || {}
    console.log('核审核', idCardInfo)
    const handleOk = (values: Record<string, string>) => {
        closeDialog()
        onAuditApply(CERTIFICATE_TYPE.IDCARD, values)
    }

    return (
        <ConfigProvider prefixCls={packageInfo.name}>
            <Modal
                title="核对信息"
                open={visible}
                onOk={() => {
                    form.submit()
                }}
                onCancel={closeDialog}
                centered
                wrapClassName={styles.check_modal}
            >
                <Row justify={'center'} style={{ marginBottom: '24px' }}>
                    <Col span={20}>
                        <Alert message="请核对以下信息，确认无误后点击提交" type="info" showIcon />
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col span={18}>
                        <Form
                            form={form}
                            onFinish={handleOk}
                            {...MODAL_FORM_ITEM_LAYOUT}
                            initialValues={{ name, idCardNo }}
                        >
                            <BaseFormItem
                                nameValue={'name'}
                                codeValue={'idCardNo'}
                                hasIdRule={true}
                            />
                        </Form>
                    </Col>
                </Row>
            </Modal>
        </ConfigProvider>
    )
}

export default wrapper(observer(CheckModal))
