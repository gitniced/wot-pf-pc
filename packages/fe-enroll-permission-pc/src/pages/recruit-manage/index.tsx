import React, { useState, useEffect } from 'react'
import PortalDetailHooks from './hooks'
import { inject, useLocalObservable } from 'mobx-react'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { Button, Col, Form, Input, Row, Alert, Image, message, Switch, Tooltip } from 'antd'
import CustomTitle from '@/components/CustomTitle'
// import type SiteStore from '@/stores/siteStore'
import Minititle from '@/components/Minititle'
import ImageUpload from '@/components/ImageUpload'
import GlobalUpload from '@/components/GlobalUpload'
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { TextArea } = Input
// 门户信息
const PortalInfo = () => {
    const Hooks = useLocalObservable(() => new PortalDetailHooks())
    const {
        name,
        logo,
        provinceName,
        cityName,
        areaName,
        industryList,
        scale,
        enrollmentStatus,
        enrollmentStatusLoading,
    } = Hooks.PortalInfoDetail || []

    const [form] = Form.useForm()
    let titleName = Hooks.PortalInfoDetail?.shortName || name

    useEffect(() => {
        document.title = titleName ? `招生设置-${titleName}` : '招生设置'
    }, [titleName])

    useEffect(() => {
        // 获取门户信息
        Hooks.getPortalInfo().then(() => {
            const { imageUrlList, videoUrl } = Hooks.PortalInfoDetail as any
            form.setFieldsValue({
                ...Hooks.PortalInfoDetail,
                imageUrlList: imageUrlList?.length
                    ? imageUrlList.map((url: string) => ({
                          uid: '-1',
                          name: 'image.jpeg',
                          status: 'done',
                          url,
                          response: { url },
                      }))
                    : [],
                videoUrl: videoUrl
                    ? [
                          {
                              uid: '-1',
                              name: videoUrl?.split('/').slice(-1),
                              status: 'done',
                              url: videoUrl,
                              response: { url: videoUrl },
                          },
                      ]
                    : [],
            })
        })
    }, [])

    //保存按钮
    const onFinish = () => {
        form.validateFields().then((val: any) => {
            let data = {
                ...val,
                imageUrlList: val?.imageUrlList?.length
                    ? val?.imageUrlList.map((item: any) => item?.response?.url || item?.url)
                    : [],
                videoUrl: val?.videoUrl?.length ? val?.videoUrl?.[0]?.response?.url : '',
            }

            Hooks.editPortalInfo(data).then(() => {
                message.success('保存成功')
                Hooks.getPortalInfo()
            })
        })
    }

    // 招生状态切换处理
    const handleEnrollmentStatusChange = (checked: boolean) => {
        Hooks.setEnrollmentStatus({ enrollmentStatus: checked })
    }

    const itemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }

    const [fatherLeft, setFatherLeft] = useState(0)

    useEffect(() => {
        const resizeHandler = () => {
            const fatherDom = document.getElementsByClassName('right_content')?.[0] || null
            if (fatherDom) {
                const { x: left } = fatherDom?.getBoundingClientRect?.() || {}
                setFatherLeft(left || 0)
            }
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        window.addEventListener('scroll', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('scroll', resizeHandler)
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <CustomTitle title="招生设置" />
                <Alert
                    className={styles.tips_wrapper}
                    message="我们将为您提供独立的招生主页"
                    description="您可以详细介绍贵机构的优势，对招生主页进行装修，设置固定报名入口等。"
                    type="info"
                    style={{ margin: '32px 0 0' }}
                    showIcon
                    closable
                />
                <Row>
                    <Col span={14} offset={5}>
                        <Form className={styles.form} form={form} name="create" {...itemLayout}>
                            <Minititle
                                title="基本信息"
                                titleStyles={{
                                    marginTop: '32px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            />
                            <Form.Item label={'机构名称'} name="name">
                                {name ? name : '-'}
                            </Form.Item>
                            <Form.Item label={'机构LOGO'} name="logo">
                                <div className={styles.isLogo}>
                                    <Image
                                        preview={false}
                                        src={
                                            logo ||
                                            'https://i.zpimg.cn/public_read/22102410qdkcjk.png'
                                        }
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label={'所属行业'} name="所属行业">
                                {industryList?.map((item: any) => item.name)?.join(' / ') || '-'}
                            </Form.Item>
                            <Form.Item label={'机构规模'} name="机构规模">
                                {scale || '-'}
                            </Form.Item>

                            <Form.Item label={'所在地'} name="所在地">
                                {[provinceName, cityName, areaName].filter(i => i).join(` / `)}
                            </Form.Item>
                            <Form.Item
                                label={'机构简介'}
                                name="introduction"
                                rules={[{ required: true, message: '请输入' }]}
                            >
                                <TextArea showCount maxLength={300} rows={4} placeholder="请输入" />
                            </Form.Item>
                            <Minititle
                                title="联系信息"
                                titleStyles={{
                                    marginTop: '32px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            />
                            <Form.Item label="联系人" name="contactName">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item label="手机号/座机" name="contactMobile">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item label="邮箱" name="contactEmail">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Minititle
                                title="机构风采"
                                titleStyles={{
                                    marginTop: '32px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            />
                            <Form.Item
                                label={'图片'}
                                name="imageUrlList"
                                extra={'支持上传jpg、jpeg、png格式图片，图片大小不超过5M，最多10张'}
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
                                    type={3}
                                    otherProps={{
                                        maxCount: 10,
                                        size: 10,
                                        accept: ['image/jpeg', 'image/png', 'image/jpg'],
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'视频'}
                                name="videoUrl"
                                extra={'支持上传.mp4格式视频，视频大小不超过100M，限1个'}
                                getValueFromEvent={e => {
                                    if (Array.isArray(e)) {
                                        return e
                                    }
                                    return e && e.fileList
                                }}
                            >
                                <GlobalUpload
                                    amount={1}
                                    size={100}
                                    accept={'mp4'}
                                    drag={false}
                                    type={18}
                                >
                                    <Button icon={<UploadOutlined />}>点击上传文件</Button>
                                </GlobalUpload>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <div
                className={styles.footer}
                style={{ left: fatherLeft, width: `calc(100% - ${fatherLeft}px)` }}
            >
                <div className={styles.enrollment_status_wrapper}>
                    <Tooltip
                        title="关闭后,用户无法通过门户直接看到贵机构信息; 但依旧可以通过独立报名链接进行招生报名。"
                        placement="top"
                    >
                        <div className={styles.enrollment_status_label}>
                            招生状态
                            <InfoCircleOutlined className={styles.info_icon} />
                        </div>
                    </Tooltip>
                    <Switch
                        checked={enrollmentStatus}
                        onChange={handleEnrollmentStatusChange}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        className={styles.enrollment_switch}
                        loading={enrollmentStatusLoading}
                    />
                </div>
                <Button className={styles.input_btn} type="primary" onClick={onFinish}>
                    保存
                </Button>
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(PortalInfo))
1
