import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import type { ModalProps } from 'antd'
import { Col, Form, Input, Modal, Radio, Row, Space } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { getDecodeInfo } from '@wotu/wotu-components'
import { CERTIFICATE_TYPE_TEXT } from '../../consts'

interface FollowModalProps extends ModalProps {
    data: any
}
const itemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
}

export default function FollowModal(props: FollowModalProps) {
    const { data, onCancel, onOk, ...restProps } = props
    const {
        name,
        mobile,
        idCardNo,
        status,
        certificateType,
        userCode,
        cardType,
        userIdentify,
        userMobile,
        userName,
    } = data || {}
    const [show, setShow] = useState(false)

    const [form] = Form.useForm()

    const handleClick = () => {
        form.validateFields().then(val => {
            onOk?.({ ...val, userCode })
        })
    }
    const handleCancel = (e: any) => {
        onCancel?.(e)
    }

    useEffect(() => {
        form.setFieldsValue({ status: status ? `${status}` : undefined })
    }, [status])

    return (
        <Modal
            title="跟进"
            width={600}
            wrapClassName={styles.modal_wrapper}
            onOk={handleClick}
            onCancel={handleCancel}
            {...restProps}
        >
            <div className={styles.info_wrapper}>
                <Row gutter={[12, 12]}>
                    <Col span={12}>
                        姓名：{getDecodeInfo(name || userName, show ? undefined : '1')}
                        <span onClick={() => setShow(!show)}>
                            &nbsp;
                            {show ? (
                                <EyeFilled style={{ color: 'var(--primary-color)' }} />
                            ) : (
                                <EyeInvisibleFilled style={{ color: 'var(--primary-color)' }} />
                            )}
                        </span>
                    </Col>
                    <Col span={12}>
                        手机号：{getDecodeInfo(mobile || userMobile, show ? undefined : '2') || '-'}
                    </Col>
                    <Col span={12}>
                        证件类型：{CERTIFICATE_TYPE_TEXT[certificateType] || cardType || '-'}
                    </Col>
                    <Col span={12}>
                        证件号码：
                        {getDecodeInfo(idCardNo || userIdentify, show ? undefined : '4') || '-'}
                    </Col>
                </Row>
            </div>
            <Form form={form} layout="horizontal" {...itemLayout}>
                <Form.Item
                    name="status"
                    label="状态"
                    rules={[{ required: true, message: '请选择' }]}
                >
                    <Radio.Group style={{ marginTop: 5 }}>
                        <Space direction="vertical">
                            {[
                                { label: '初步报名', value: '1' },
                                { label: '确认不参训', value: '2' },
                                { label: '暂不参训', value: '3' },
                                { label: '确认参训', value: '4' },
                                { label: '已参训', value: '5' },
                            ].map(item => {
                                return <Radio value={item.value}>{item.label}</Radio>
                            })}
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="remake" label="备注">
                    <Input.TextArea rows={3} maxLength={100} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
