import { Modal, Form, Button, Input, Row, Select, Alert } from 'antd'
import React, { useEffect } from 'react'
import styles from './index.module.less'
import ApplyStore from './store'
import type { FormValuesType } from './store'
import { observer, useLocalObservable } from 'mobx-react'

export enum INVOICING_TYPE {
    // 未开票
    NORMAL = 1,
    // 已开票
    VALUE_ADDED = 2,
}

const ApplyRedModal = observer(
    ({
        visible,
        applyOrderCode,
        refundOrderCode,
        handleCancel,
        updateListHandler,
    }: {
        visible: boolean
        refundOrderCode: string
        applyOrderCode: string | number
        handleCancel: () => void
        updateListHandler: () => void
    }) => {
        let store = useLocalObservable(() => new ApplyStore())
        const [form] = Form.useForm()

        useEffect(() => {
            form.resetFields()
            if (applyOrderCode) {
                store.getBlurApply(applyOrderCode).then(() => {
                    if (store.invoiceType) {
                        form.setFieldsValue({ invoiceType: store.invoiceType })
                    }
                })
            }
        }, [applyOrderCode])

        const onCancel = () => {
            handleCancel()
        }

        const onFinish = async (values: FormValuesType) => {
            try {
                await store.applyRed(refundOrderCode, values, updateListHandler)
                onCancel()
            } catch (err) {
                console.log('err: ', err)
            }
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 16 },
            },
        }
        return (
            <Modal
                centered
                forceRender
                title={'申请红票'}
                visible={visible}
                onCancel={onCancel}
                footer={false}
                className={styles.content_basic}
            >
                <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
                    <Alert
                        message="请务必依据地址寄回“增值税专用发票”，同时联系品控人员进行相关审核！"
                        type="warning"
                        closable
                    />
                    <Form.Item label="发票类型" name="invoiceType" {...formItemLayout}>
                        <Select
                            disabled={true}
                            options={[
                                {
                                    value: INVOICING_TYPE.VALUE_ADDED,
                                    label: '增值税专用发票',
                                },
                                {
                                    value: INVOICING_TYPE.NORMAL,
                                    label: '增值税普通发票',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="发票代码"
                        name="invoiceMark"
                        {...formItemLayout}
                        rules={[
                            { required: true, message: '请输入发票代码' },
                            {
                                pattern: /^\d{10,12}$/,
                                message: '请输入10-12位数以内的数字',
                            },
                        ]}
                    >
                        <Input placeholder="请输入发票代码" maxLength={12} minLength={10} />
                    </Form.Item>
                    <Form.Item
                        label="发票号码"
                        name="invoiceNumber"
                        {...formItemLayout}
                        rules={[
                            { required: true, message: '请输入发票号码' },
                            {
                                pattern: /^[0-9]{1,8}$/,
                                message: '请输入8位数以内的数字',
                            },
                        ]}
                    >
                        <Input placeholder="请输入发票号码" maxLength={8} />
                    </Form.Item>
                    {store.invoiceType === INVOICING_TYPE.VALUE_ADDED && (
                        <Form.Item
                            label="寄回物流单号"
                            name="backTrackingNo"
                            {...formItemLayout}
                            rules={[{ required: true, message: '请输入寄回物流单号' }]}
                        >
                            <Input placeholder="请输入寄回物流单号" />
                        </Form.Item>
                    )}

                    <Row justify="end" className={styles.footer}>
                        <Button style={{ marginRight: 8 }} onClick={onCancel}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit" loading={store.btnLoading}>
                            提交申请
                        </Button>
                    </Row>
                </Form>
            </Modal>
        )
    },
)

export default ApplyRedModal
