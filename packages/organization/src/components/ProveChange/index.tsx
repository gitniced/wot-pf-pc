import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Upload, Image, Row, Spin, Alert } from 'antd'
import CustomerStore from './store'
import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import CustomTitle from '@/components/CustomTitle'
import type { FormValuesType } from './interface'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import { ORG_APPROVE_STATUS_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import { history } from 'umi'
import Minititle from '@/components/Minititle'
import { SelectAuthSubject, SelectCertificate } from '../SelectOrgMainAndType'
import { UNIFIED_SOCIAL_CREDIT, getMaxLength, getRuleOfType } from './const'

// props: {
//   userStore?: UserStore
//   siteStore?: SiteStore
//   // 创建机构时，回显机构名称
//   name?: string
// }
const ProveChange = observer(() => {
    let store = useLocalObservable(() => new CustomerStore())
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { updateCurrentOrganization, getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()

    const [form] = Form.useForm()
    const attachments = Form.useWatch('attachments', form);
    /**  监听选择认证主体   */
    const subject = Form.useWatch('certifyCompanyType', form)
    const certifyType = Form.useWatch('certifyDocumentType', form)

    useEffect(() => {
        //  @ts-ignore 机构认证页面，获取当前机构详情并回显
        store?.getOrgDetail(currentOrganization).then(res => {
            // @ts-ignore
            let { creditImage, certifyStatus, attachments: att } = res || {}
            // 填充工商照片
            store.setCreditImage(creditImage)
            form.setFieldsValue({
                ...res, attachments: att ? att?.split(',')?.map((item: any) => ({
                    status: 'done',
                    url: item, response: {
                        uid: item,
                        name: item,
                        url: item,
                    }
                })) : undefined
            })
            // @ts-ignore  (3, "变更审核中")
            if (certifyStatus === 3) {
                store.setIsDisabled(true)
            } else {
                store.setIsDisabled(false)
            }
        })
    }, [currentOrganization])

    const uploadButton = (
        <div className={styles.upload_button}>
            <div>
                <PlusOutlined />
                <div className={styles.upload_button_text}>上传照片</div>
            </div>
        </div>
    )

    // 确定按钮
    const submitForm = (values: FormValuesType) => {
        values.manualCertifyFlag = true

        store.orgCertify(values, updateCurrentOrganization, currentOrganization!)
    }

    // 取消按钮
    const onReset = () => {
        history.goBack()
    }

    const renderFooter = () => {
        const { certifyStatus, approveStatus } = store.orgInfo || {}
        //   {/* certifyStatus认证状态 0未认证 1已认证 2审批中  3, "变更审核中"*/}
        if (certifyStatus !== 3) {
            if (certifyStatus === 1 || approveStatus === ORG_APPROVE_STATUS_TYPE.UN_PASS) {
                return (
                    <Form.Item wrapperCol={{ span: 24 }} className={styles.btn_box}>
                        <Row justify="center">
                            <Button htmlType="button" className={styles.btn} onClick={onReset}>
                                {'取 消'}
                            </Button>
                            <Button type="primary" htmlType="submit" className={styles.ok}>
                                提 交
                            </Button>
                        </Row>
                    </Form.Item>
                )
            }
        }
    }

    return (
        <div className={styles.page}>
            {<CustomTitle title="变更工商信息" style={{ marginBottom: '32px' }} />}
            {/* 认证状态 0未认证 1已认证 2审批中  (3, "变更审核中")*/}
            {store.orgInfo?.certifyStatus === 1 &&
                store.orgInfo?.approveStatus !== ORG_APPROVE_STATUS_TYPE.UN_PASS && (
                    <Alert
                        className={styles.alert}
                        message="请填写变更后的组织信息，工作人员将在1-3个工作日内完成审核"
                        type="info"
                        showIcon
                    />
                )}
            {/* @ts-ignore */}
            {store.orgInfo?.certifyStatus === 3 && (
                <Alert
                    className={styles.alert}
                    message={`审核中，请耐心等待`}
                    type="warning"
                    showIcon
                />
            )}
            {/* // @ts-ignore certifyStatus认证状态 0未认证 1已认证 2审批中  3, "变更审核中"*/}
            {store.orgInfo?.approveStatus === ORG_APPROVE_STATUS_TYPE.UN_PASS &&
                store.orgInfo?.certifyStatus !== 3 && (
                    <Alert
                        className={styles.alert}
                        message={`审核失败，原因是：${store.orgInfo?.approveOpinion}`}
                        type="error"
                        showIcon
                    />
                )}
            <Form
                name="basic"
                autoComplete="off"
                form={form}
                className={styles.form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={submitForm}
            >
                <div className={styles.select_main}>
                    <Minititle title="选择认证主体" size="small" titleStyles={{ marginTop: 48 }} />
                    <Form.Item
                        name="certifyCompanyType"
                        validateTrigger="onBlur"
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: '请选择认证主体' }]}
                        initialValue={0}
                    >
                        <SelectAuthSubject disabled={store.isDisabled} form={form} />
                    </Form.Item>
                    <Minititle title="选择资质证件类型" size="small" />
                    <Form.Item
                        name="certifyDocumentType"
                        validateTrigger="onBlur"
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: '请选择资质证件类型' }]}
                    >
                        <SelectCertificate subject={subject} disabled={store.isDisabled} />
                    </Form.Item>
                    <Minititle title="填写资质信息" size="small" titleStyles={{ marginTop: 48 }} />
                </div>
                <Form.Item
                    label="机构名称"
                    name="name"
                    validateTrigger="onBlur"
                    shouldUpdate
                    rules={[{ required: true }]}
                >
                    <Input
                        disabled={store.isDisabled}
                        className={styles.input}
                        placeholder="请输入机构名称"
                    />
                </Form.Item>

                <Form.Item
                    label={UNIFIED_SOCIAL_CREDIT[certifyType] ?? '统一社会信用代码'}
                    name="companyCode"
                    validateTrigger="onBlur"
                    rules={[{ required: true, message: '请输入' }, getRuleOfType(certifyType)]}
                >
                    <Input
                        disabled={store.isDisabled}
                        className={styles.input}
                        placeholder="请输入"
                        maxLength={getMaxLength(certifyType)}
                    />
                </Form.Item>

                <Form.Item
                    label="资质证件照片"
                    name="creditImage"
                    validateTrigger="onBlur"
                    extra="请上传JPG、PNG、JPEG格式图片文件，大小不超过5M"
                    valuePropName="fileList"
                    required={true}
                    rules={[
                        () => ({
                            validator() {
                                if (!store.creditImage) {
                                    return Promise.reject(new Error('请上传资质证件照片'))
                                }
                                return Promise.resolve()
                            },
                        }),
                    ]}
                >
                    <>
                        <Upload
                            disabled={store.isDisabled}
                            name="file"
                            multiple={true}
                            accept={'.jpg,.png,.jpeg'}
                            listType="picture-card"
                            className="avatar_uploader"
                            showUploadList={false}
                            beforeUpload={e => {
                                store.imageUpload(e)
                                return false
                            }}
                        >
                            {store.isUpload ? (
                                <div className={styles.avatar_loading}>
                                    <Spin />
                                </div>
                            ) : store.creditImage ? (
                                <img
                                    className={styles.upload_img}
                                    src={store.creditImage}
                                    alt="avatar"
                                />
                            ) : (
                                <>{uploadButton}</>
                            )}
                        </Upload>

                        <div className={styles.example}>
                            <Image
                                src="https://static.zpimg.cn/public/fe_user_pc/images/png_zhizhao.png"
                                width="0.74rem"
                            />
                        </div>
                    </>
                </Form.Item>
                <Form.Item
                    label="其他附件"
                    name="attachments"
                    validateTrigger="onBlur"
                    extra="可上传其他相关证明文件，请上传JPG、PNG、JPEG格式图片文件，大小不超过5M，最多上传5张"
                    valuePropName="fileList"
                    getValueFromEvent={e => {
                        console.log(e)
                        if (Array.isArray(e)) {
                            return e
                        }
                        return e && e.fileList
                    }}
                >
                    <Upload
                        disabled={store.isDisabled}
                        name="file"
                        maxCount={5}
                        accept={'.jpg,.png,.jpeg'}
                        listType="picture-card"
                        className={styles.avatar_uploader}
                        customRequest={store.handleUpload}
                    >
                        <>{(attachments?.length >= 5) ? null : uploadButton}</>
                    </Upload>
                </Form.Item>
                {renderFooter()}
            </Form>
        </div>
    )
})
const ObserverAccount = inject('userStore', 'siteStore')(ProveChange)

export default ObserverAccount
