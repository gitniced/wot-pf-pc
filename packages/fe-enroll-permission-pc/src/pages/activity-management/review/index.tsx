import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { Button, Col, Form, Input, Modal, Row, message } from 'antd'
import CustomTitle from '@/components/CustomTitle'
import ImageUpload from '@/components/ImageUpload'
import { useLocation, history } from 'umi'
import type { IRoute } from 'umi'
import Hooks from './store'
import GlobalContent from '@/components/GlobalContent'
import { useDocTitle } from '@/hooks/useDocTitle'

// 活动回顾
const Graphic = () => {
    const hooks = useLocalObservable(() => new Hooks())

    let { query }: any = useLocation()
    let { code: activityCode } = query || {}

    const [form] = Form.useForm()
    const [title, setTitle] = useState<string>('活动回顾')
    // const [orgCode, setOrgCode] = useState<string>('')
    // const [siteId, setSiteId] = useState<number | string>('')

    useDocTitle('活动回顾')
    useEffect(() => {
        setTitle('活动回顾')
        hooks.getDetail(activityCode).then((res: any) => {
            console.log(res)
            form.setFieldsValue(res)
        })
    }, [])

    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }
    // onFinish
    const onFinish = (val: any) => {
        /**  附件  */
        const { attachment, summary } = val
        hooks
            .saveReview({
                ...val,
                activityCode,
                attachment: attachment.map(i => i?.url || i?.response?.url).join(','),
                summary: encodeURI(summary),
            })
            .then(() => {
                message.success('保存成功')
                history.goBack()
            })
    }

    return (
        <GlobalContent>
            <div className={styles.page}>
                <div className={styles.content}>
                    <CustomTitle title={title} />
                    <Row>
                        <Col span={14} offset={4}>
                            <Form
                                className={styles.form}
                                form={form}
                                name="create"
                                onFinish={onFinish}
                                style={{ width: 942 }}
                                validateTrigger="onblur"
                                {...itemLayout}
                            >
                                <Form.Item
                                    {...itemLayout}
                                    label={'活动照片'}
                                    name="attachment"
                                    extra={
                                        '注：支持上传.jpg.png.jpeg格式图片，图片大小不超过5M，最多10张'
                                    }
                                    rules={[{ required: true, message: '请上传活动照片' }]}
                                    valuePropName="fileList"
                                    getValueFromEvent={e => {
                                        if (Array.isArray(e)) {
                                            return e
                                        }
                                        return e && e.fileList
                                    }}
                                >
                                    <ImageUpload
                                        listType="picture-card"
                                        type={10}
                                        otherProps={{
                                            maxCount: 10,
                                            size: 5,
                                            accept: ['image/jpeg', 'image/png', 'image/jpg'],
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...itemLayout}
                                    label={'活动总结'}
                                    name="summary"
                                    rules={[{ required: true }]}
                                    required={true}
                                >
                                    <Input.TextArea
                                        className={styles.textarea}
                                        rows={5}
                                        maxLength={5000}
                                    />
                                </Form.Item>
                                <Form.Item noStyle>
                                    <div className={styles.form_btn}>
                                        <Button
                                            type="default"
                                            onClick={() => {
                                                Modal.confirm({
                                                    centered: true,
                                                    title: '取消后无法找回本次已填写的内容， 是否确定取消？',
                                                    onOk: () => {
                                                        history.goBack()
                                                    },
                                                })
                                            }}
                                        >
                                            取消
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={hooks.btnLoading}
                                        >
                                            保存
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </GlobalContent>
    )
}
const ObserverGraphic: IRoute = observer(Graphic)

ObserverGraphic.title = '活动回顾'

export default ObserverGraphic
