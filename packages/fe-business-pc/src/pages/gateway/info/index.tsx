import React, { useState, useEffect } from 'react'
import PortalDetailHooks from './hooks'
import { inject, useLocalObservable } from 'mobx-react'
// import { history } from 'umi'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import { Button, Col, Form, Input, Row, Alert, Image, message, Radio, Space } from 'antd'
import CustomTitle from '@/components/CustomTitle'
import classNames from 'classnames'
import { getCookie } from '@/storage'
import { colorEnum, colorArr } from './const'
import type { valType } from './interface'
import type SiteStore from '@/stores/siteStore'
import { Power } from '@wotu/wotu-pro-components'
import Minititle from '@/components/Minititle'
import ImageUpload from '@/components/ImageUpload'

const { TextArea } = Input
// 门户信息
const PortalInfo = ({ siteStore }: { siteStore: SiteStore }) => {
    const Hooks = useLocalObservable(() => new PortalDetailHooks())
    const { organizationName, organizationLogo } = Hooks.PortalInfoDetail || []

    const [active, setActive] = useState<string>(colorEnum.blue) //主题高亮显示变量
    // 获取机构code
    const orgCode = getCookie('SELECT_ORG_CODE')
    const [form] = Form.useForm()
    let titleName = Hooks.PortalInfoDetail?.shortName || organizationName

    useEffect(() => {
        document.title = titleName ? `门户信息-${titleName}` : '门户信息'
    }, [titleName])

    useEffect(() => {
        //获取门户信息
        Hooks.getPortalInfo(orgCode).then(() => {
            // 将门户信息主题色回填
            const { weChatAccountImg, themeType, themeColor } = Hooks.PortalInfoDetail as any
            if (themeType === 0) {
                Hooks.PortalInfoDetail.themeColor && setActive(Hooks.PortalInfoDetail.themeColor)
            }
            form.setFieldsValue({
                ...Hooks.PortalInfoDetail,
                weChatAccountImg: weChatAccountImg
                    ? [
                          {
                              uid: '-1',
                              name: 'image.jpeg',
                              status: 'done',
                              url: weChatAccountImg,
                              response: { url: weChatAccountImg },
                          },
                      ]
                    : [],
                themeColor: themeColor.slice(1),
            })
        })
    }, [])

    //保存按钮
    const onFinish = (val: valType) => {
        const {
            code,
            organizationName: _organizationName,
            organizationLogo: _organizationLogo,
        } = Hooks.PortalInfoDetail || []
        const data = {
            ...val,
            code,
            organizationName: _organizationName,
            organizationLogo: _organizationLogo,
            organizationCode: orgCode,
            themeColor: val.themeType === 0 ? active : `#${val.themeColor}`,
            weChatAccountImg: val.weChatAccountImg?.length
                ? val.weChatAccountImg[0]?.response?.url
                : '',
        }

        Hooks.editPortalInfo(data).then(() => {
            message.success('保存成功')
            Hooks.getPortalInfo(orgCode)
        })
    }

    const itemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }

    /** 获取h5 saas的基础地址 */
    const mobileSaasBase = siteStore?.siteData?.data?.baseInfo?.portalH5Url
    /** 获取pc saas的基础地址 */
    const PcSaasBase = siteStore?.siteData?.data?.baseInfo?.burl

    /**  如果后端返回的存在用后端的 不然就用站点的  */
    const getSaasBase = (url: string, e: string) => {
        return e ? e : url
    }

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <CustomTitle title="门户信息" />
                <Alert
                    message="您可以拥有一个自己的门户，可以在此处为您的门户进行一些自定义设置。"
                    type="info"
                    showIcon
                    style={{ margin: '24px 0 32px 0' }}
                />
                <Row>
                    <Col span={14} offset={5}>
                        <Form
                            className={styles.form}
                            form={form}
                            name="create"
                            onFinish={onFinish}
                            {...itemLayout}
                        >
                            <Minititle
                                title="基本信息"
                                titleStyles={{
                                    marginTop: '32px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            />
                            <Form.Item label={'门户名称'} name="organizationName">
                                {organizationName ? organizationName : '-'}
                            </Form.Item>
                            <Form.Item label={'logo'} name="organizationLogo">
                                <div className={styles.isLogo}>
                                    {organizationLogo ? (
                                        <Image preview={false} src={organizationLogo} />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={'门户简称'}
                                name="shortName"
                                extra="您可以设置需要对外展示的门户简称，若不设置，默认展示门户名称"
                            >
                                <Input showCount maxLength={20} />
                            </Form.Item>
                            <Form.Item
                                label={'简介'}
                                name="intro"
                                extra="简介填写后，会在H5门户“我的-关于我们”页面展示"
                            >
                                <TextArea showCount maxLength={255} rows={4} placeholder="请输入" />
                            </Form.Item>
                            <Minititle
                                title="品牌形象"
                                titleStyles={{
                                    marginTop: '32px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            />
                            <Form.Item
                                label="自定义域名"
                                name="customDomain"
                                rules={[
                                    { required: true, message: '请输入自定义域名' },
                                    {
                                        pattern: /^[a-zA-Z0-9]{6,34}$/,
                                        message: '请输入6-34位的字母、数字',
                                    },
                                    {
                                        pattern: /^[a-zA-Z]/,
                                        message: '自定义域名需要以字母开头',
                                    },
                                    () => ({
                                        async validator(_, value: string) {
                                            if (value === 'undefined') {
                                                return Promise.reject(
                                                    new Error('请输入合法的自定义域名'),
                                                )
                                            } else {
                                                return Promise.resolve()
                                            }
                                        },
                                    }),
                                ]}
                                extra={
                                    <div className={styles.domain_extra}>
                                        <div className={styles.domain_extra_title}>预览</div>
                                        <div>
                                            PC端域名：
                                            {getSaasBase(
                                                PcSaasBase,
                                                Hooks?.PortalInfoDetail?.customPcDomain,
                                            )}
                                            /{Hooks.customDomain}
                                        </div>
                                        <div>
                                            移动端域名：
                                            {getSaasBase(
                                                mobileSaasBase,
                                                Hooks?.PortalInfoDetail?.customMobileDomain,
                                            )}
                                            /{Hooks.customDomain}
                                        </div>
                                    </div>
                                }
                            >
                                <Input
                                    maxLength={34}
                                    minLength={6}
                                    onChange={Hooks.setCustomDomain}
                                />
                            </Form.Item>
                            <Form.Item label={'主题色'} required>
                                <Form.Item
                                    name="themeType"
                                    initialValue={0}
                                    className={styles.form_no_mb}
                                >
                                    <Radio.Group
                                        options={[
                                            { label: '推荐色', value: 0 },
                                            { label: '自定义', value: 1 },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    dependencies={['themeType']}
                                    initialValue={active}
                                    noStyle
                                >
                                    {({ getFieldValue }) => {
                                        const themeType = getFieldValue('themeType')
                                        return themeType === 0 ? (
                                            <div className={styles.themeColor}>
                                                {colorArr.map(item => {
                                                    return (
                                                        <div
                                                            className={styles.theme_view_item}
                                                            key={item.which}
                                                        >
                                                            <Image
                                                                key={item.which}
                                                                preview={false}
                                                                className={classNames(
                                                                    active === item.which
                                                                        ? styles.color_png
                                                                        : null,
                                                                )}
                                                                src={item.scr}
                                                                onClick={() =>
                                                                    setActive(item.which)
                                                                }
                                                            />
                                                            <div>{item.name}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <Space direction="vertical" size="middle">
                                                <Form.Item
                                                    name="themeColor"
                                                    rules={[
                                                        { required: true, message: '请输入主题色' },
                                                    ]}
                                                    initialValue={'1890FF'}
                                                    noStyle
                                                >
                                                    <Input
                                                        addonBefore="#"
                                                        placeholder="请输入6位数字/字母"
                                                    />
                                                </Form.Item>
                                                <Form.Item dependencies={['themeColor']}>
                                                    {({ getFieldValue: getValue }) => {
                                                        const color =
                                                            getValue('themeColor') || '1890FF'
                                                        console.log(color)
                                                        return (
                                                            <Image
                                                                className={styles.custom_theme_img}
                                                                style={{
                                                                    backgroundColor: `#${color}`,
                                                                }}
                                                                preview={false}
                                                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_saas_pc/image/png_zhuti_bian.png"
                                                            />
                                                        )
                                                    }}
                                                </Form.Item>
                                            </Space>
                                        )
                                    }}
                                </Form.Item>
                            </Form.Item>

                            <Minititle
                                title="联系方式"
                                titleStyles={{
                                    marginTop: '32px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                                footer={
                                    <span className={styles.sub_title}>
                                        联系方式填写后，会在H5门户“我的-关于我们”页面展示
                                    </span>
                                }
                            />
                            <Form.Item
                                label="电话"
                                name="mobile"
                                rules={[
                                    {
                                        pattern: /^(?:\d{3}-\d{7,8}|\d{4}-\d{7,8}|1\d{10})$/,
                                        message: '请输入正确的手机号/座机号格式',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[{ type: 'email', message: '请输入正确的邮箱' }]}
                            >
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item
                                label={'微信公众号'}
                                name="weChatAccountImg"
                                extra={'支持上传jpg、jpeg、png格式图片，大小不超过10M'}
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
                                    type={24}
                                    otherProps={{
                                        maxCount: 1,
                                        size: 10,
                                        accept: ['image/jpeg', 'image/png', 'image/jpg'],
                                    }}
                                    onCustomRequestEnd={() => {}}
                                    onCustomRequestStart={() => {}}
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
                                <Power powerId={11114}>
                                    <Button
                                        className={styles.input_btn}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        保存
                                    </Button>
                                </Power>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(PortalInfo))
