import React, { useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import { Radio, Form, Input, Switch, Checkbox } from 'antd'
import { getViewStore as getPcViewStore } from '@/pages/gateway/pc-web/create/store'
import { getViewStore as getMobileViewStore } from '@/pages/gateway/web/create/store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import CustomLink from '@/components/CustomLink'
import MiniHeader from '../../../../../components/MiniHeader'
import SubTitle from '../../../../../components/SubTitle'
import { PlusOutlined } from '@ant-design/icons'
import GlobalUpload from '@/components/GlobalUpload'

function Customer(props: { data: PreviewItem | any; mode?: 'pc' | 'mobile' }) {
    const { data, mode = 'mobile' } = props
    // 获取全局唯一的store
    let getViewStore = mode === 'pc' ? getPcViewStore : getMobileViewStore
    const stores = useLocalObservable(() => getViewStore(mode))

    const [form] = Form.useForm()

    const onValuesChange = () => {
        setTimeout(() => {
            const {
                iconType = false,
                iconUrl,
                nameType = false,
                name,
                interactionType = false,
                enableContactNumber = false,
                contactNumberLeadCopy,
                contactNumber,
                enableWechatScanCode = false,
                wechatLeadCopy,
                wechatImgUrl,
                url,
            } = form.getFieldsValue()
            let result = {
                ...data,
                wechatImgUrl: (!interactionType && wechatImgUrl?.[0]?.response?.url) || null,
                iconUrl: (iconType && iconUrl?.[0]?.response?.url) || null,
                name: name ?? '联系客服',
                nameType,
                iconType,
                interactionType,
                enableContactNumber,
                contactNumberLeadCopy,
                contactNumber,
                enableWechatScanCode,
                wechatLeadCopy,
                url,
            }
            console.log(result)
            stores.fixPreviewList(result)
        })
    }

    useEffect(() => {
        const { iconUrl, wechatImgUrl, ...rest } = data
        let imgFields: any = {}
        if (iconUrl) {
            imgFields.iconUrl = iconUrl
                ? [
                      {
                          url: iconUrl,
                          uid: '-1',
                          name: 'image.png',
                          status: 'done',
                          response: {
                              url: iconUrl,
                          },
                      },
                  ]
                : []
        }
        if (wechatImgUrl) {
            imgFields.wechatImgUrl = wechatImgUrl
                ? [
                      {
                          url: wechatImgUrl,
                          uid: '-1',
                          name: 'image.png',
                          status: 'done',
                          response: {
                              url: wechatImgUrl,
                          },
                      },
                  ]
                : []
        }

        form?.setFieldsValue({
            ...rest,
            ...imgFields,
        })
    }, [data])

    return (
        <div className={styles.content}>
            <MiniHeader title="联系客服" />
            <div className={styles.center}>
                <div className={styles.section_show}>
                    <SubTitle title="添加内容" />
                    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
                        <Form.Item
                            className={styles.form_item}
                            label="图标"
                            name="iconType"
                            initialValue={false}
                            required
                        >
                            <Radio.Group>
                                <Radio value={false}>默认图标</Radio>
                                <Radio value={true}>自定义</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item shouldUpdate={(c, p) => c.iconType !== p.iconType} noStyle>
                            {({ getFieldValue }) => {
                                const iconType = getFieldValue('iconType')
                                return iconType ? (
                                    <div
                                        className={`${styles.sub_content} ${styles.sub_form_item}`}
                                    >
                                        <Form.Item
                                            name="iconUrl"
                                            extra="支持上传jpg、jpeg、png格式图片，大小不超过10M"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请上传图标',
                                                },
                                            ]}
                                            preserve={false}
                                        >
                                            <GlobalUpload
                                                amount={1}
                                                otherProps={{
                                                    listType: 'picture-card',
                                                }}
                                                drag={false}
                                                size={10}
                                                type={11}
                                                accept={'image'}
                                                className={styles.image_upload}
                                            >
                                                <div className={styles.image_upload_placeholder}>
                                                    <PlusOutlined />
                                                    上传
                                                </div>
                                            </GlobalUpload>
                                        </Form.Item>
                                    </div>
                                ) : null
                            }}
                        </Form.Item>
                    </Form>
                    <Form form={form} layout="horizontal" onValuesChange={onValuesChange}>
                        <Form.Item
                            className={styles.form_item}
                            label="名称"
                            required={true}
                            name={'nameType'}
                            style={{ textAlign: 'right' }}
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Form>
                    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
                        <Form.Item shouldUpdate={(c, p) => c.nameType !== p.nameType} noStyle>
                            {({ getFieldValue }) => {
                                const nameType = getFieldValue('nameType')
                                return nameType ? (
                                    <div className={styles.sub_form_item}>
                                        <Form.Item
                                            className={styles.form_item}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入',
                                                },
                                            ]}
                                            name={'name'}
                                        >
                                            <Input placeholder="请输入" maxLength={5} showCount />
                                        </Form.Item>
                                    </div>
                                ) : null
                            }}
                        </Form.Item>
                        <Form.Item
                            className={styles.form_item}
                            label="交互"
                            name="interactionType"
                            initialValue={false}
                            required
                        >
                            <Radio.Group>
                                <Radio value={false}>弹窗引导</Radio>
                                <Radio value={true}>跳转链接</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div className={`${styles.sub_content} ${styles.sub_form_item}`}>
                            <Form.Item
                                shouldUpdate={(c, p) => c.interactionType !== p.interactionType}
                                noStyle
                            >
                                {({ getFieldValue }) => {
                                    const interactionType = getFieldValue('interactionType')
                                    return interactionType ? (
                                        <Form.Item label="跳转链接" required={true} name={'url'}>
                                            <CustomLink type={mode} list={stores.customLinkList} />
                                        </Form.Item>
                                    ) : (
                                        <>
                                            <Form.Item
                                                name="enableContactNumber"
                                                valuePropName="checked"
                                            >
                                                <Checkbox>联系电话</Checkbox>
                                            </Form.Item>
                                            <Form.Item
                                                shouldUpdate={(c, p) =>
                                                    c.enableContactNumber !== p.enableContactNumber
                                                }
                                                noStyle
                                            >
                                                {({ getFieldValue: get }) => {
                                                    const enableContactNumber =
                                                        get('enableContactNumber')
                                                    return enableContactNumber ? (
                                                        <>
                                                            <Form.Item
                                                                label="引导文案"
                                                                required={true}
                                                                name={'contactNumberLeadCopy'}
                                                                initialValue="您可拨打客服热线"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: '请输入',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input
                                                                    placeholder="请输入"
                                                                    maxLength={12}
                                                                    showCount
                                                                />
                                                            </Form.Item>

                                                            <Form.Item
                                                                label="联系电话"
                                                                required={true}
                                                                name={'contactNumber'}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: '请输入',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input
                                                                    placeholder="请输入"
                                                                    maxLength={12}
                                                                    showCount
                                                                />
                                                            </Form.Item>
                                                        </>
                                                    ) : null
                                                }}
                                            </Form.Item>
                                            <Form.Item
                                                name="enableWechatScanCode"
                                                valuePropName="checked"
                                            >
                                                <Checkbox>微信扫码</Checkbox>
                                            </Form.Item>
                                            <Form.Item
                                                shouldUpdate={(c, p) =>
                                                    c.enableWechatScanCode !==
                                                    p.enableWechatScanCode
                                                }
                                                noStyle
                                            >
                                                {({ getFieldValue: get }) => {
                                                    const enableWechatScanCode =
                                                        get('enableWechatScanCode')
                                                    return enableWechatScanCode ? (
                                                        <>
                                                            <Form.Item
                                                                label="引导文案"
                                                                required={true}
                                                                name={'wechatLeadCopy'}
                                                                initialValue="微信扫码添加客服微信"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: '请输入',
                                                                    },
                                                                ]}
                                                            >
                                                                <Input
                                                                    placeholder="请输入"
                                                                    maxLength={12}
                                                                    showCount
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="上传二维码"
                                                                name="wechatImgUrl"
                                                                extra="支持上传jpg、jpeg、png格式图片，大小不超过10M"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: '请上传图标',
                                                                    },
                                                                ]}
                                                                preserve={false}
                                                            >
                                                                <GlobalUpload
                                                                    amount={1}
                                                                    otherProps={{
                                                                        listType: 'picture-card',
                                                                    }}
                                                                    drag={false}
                                                                    size={10}
                                                                    type={11}
                                                                    accept={'image'}
                                                                    className={styles.image_upload}
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.image_upload_placeholder
                                                                        }
                                                                    >
                                                                        <PlusOutlined />
                                                                        上传
                                                                    </div>
                                                                </GlobalUpload>
                                                            </Form.Item>
                                                        </>
                                                    ) : null
                                                }}
                                            </Form.Item>
                                        </>
                                    )
                                }}
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default observer(Customer)
