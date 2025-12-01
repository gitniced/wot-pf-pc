import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Upload, Image, Row, Modal, Spin, Alert } from 'antd'
import CustomerStore from './store'
import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import CustomTitle from '@/components/CustomTitle'
import type { FormValuesType } from './interface'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { MICRO_APP_TYPE } from '@/types'
import type UserStore from '@/stores/userStore'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import type SiteStore from '@/stores/siteStore'
import {
    ORG_APPROVE_STATUS_TYPE,
    ORG_CERTIFY_STATUS_TYPE,
} from '@wotu/wotu-components/dist/esm/Types'
import { history } from 'umi'
import Minititle from '@/components/Minititle'
import { SelectAuthSubject, SelectCertificate } from '../SelectOrgMainAndType'
import { DOCUMENT_TYPE_ARR, UNIFIED_SOCIAL_CREDIT, getMaxLength, getRuleOfType } from './const'

const Prove = observer(
    (props: {
        userStore?: UserStore
        siteStore?: SiteStore
        // 是否在创建机构页面，在的话认证完成跳往机构工作台
        isCreate?: boolean
        // 创建机构时，回显机构名称
        name?: string
    }) => {
        let store = useLocalObservable(() => new CustomerStore())
        const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
        let { updateCurrentOrganization, getCurrentOrganization, tag } = masterStore
        let currentOrganization = getCurrentOrganization?.()
        let { userStore, isCreate = false, name = '' } = props || {}
        // 认证后是否需要跳转：是创建机构页面&&不在工作台
        let isSkipAfterCreate = isCreate && tag !== MICRO_APP_TYPE.WORK_BENCH

        // 全局的工作台地址
        const workBenchObj = {
            // 个人中心
            //@ts-ignore
            userWorkBench: userStore?.workBench?.[1],
            // 机构工作台
            //@ts-ignore
            orgWorkBench: userStore?.workBench?.[2],
            // 资源方工作台
            //@ts-ignore
            merchantWorkBench: userStore?.workBench?.[3],
        }
        const [form] = Form.useForm()
        const attachments = Form.useWatch('attachments', form);
        /**  监听选择认证主体   */
        const subject = Form.useWatch('certifyCompanyType', form)
        const certifyType = Form.useWatch('certifyDocumentType', form)

        useEffect(() => {
            console.log('机构认证页面isCreate', isCreate)

            if (!isCreate) {
                // 机构认证页面，获取当前机构详情并回显
                store?.getOrgDetail(currentOrganization).then(res => {
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
                    // 机构认证状态为审核中，不可编辑
                    if (certifyStatus === ORG_CERTIFY_STATUS_TYPE.APPROVE) {
                        store.setIsDisabled(true)
                    } else {
                        store.setIsDisabled(false)
                    }
                })
            } else {
                // 机构创建页面回显props中传过来的机构名称
                form.setFieldsValue({ name })
            }
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
        const submitForm = (values: FormValuesType, manualCertifyFlag?: boolean) => {
            /**  资质证件类型 不等于  多合一证书、普通营业执照 提交后走人工审核流程  */
            if (DOCUMENT_TYPE_ARR.includes(values.certifyDocumentType)) {
                values.manualCertifyFlag = false
            } else {
                values.manualCertifyFlag = true
            }
            // 人工认证标志 true/false
            if (manualCertifyFlag) {
                values.manualCertifyFlag = manualCertifyFlag
            }

            let title = values.manualCertifyFlag
                ? '确定要申请人工审核吗？'
                : '请保证信息真实性,是否提交'
            Modal.confirm({
                title: title,
                icon: <ExclamationCircleOutlined />,
                closable: true,
                okText: '确认',
                cancelText: '取消',
                centered: true,
                onOk: () => {
                    store.orgCertify(
                        values,
                        updateCurrentOrganization,
                        isSkipAfterCreate,
                        currentOrganization!,
                        workBenchObj,
                    )
                },
            })
        }
        // 人工审核
        const onApprove = () => {
            form.validateFields().then(values => {
                submitForm(values, true)
            })
        }
        // 取消按钮
        const onReset = () => {
            if (isSkipAfterCreate) {
                // 认证需要跳转：机构认证回到对应工作台地址or首页
                store.historyAfterProve(workBenchObj)
            } else {
                // 机构认证页面回到上一个页面
                history.goBack()
            }
        }

        /**  审核  */
        const renderAuditing = () => {
            /**  资质证件类型=多合一证书、普通营业执照：展示  */
            if (DOCUMENT_TYPE_ARR.includes(certifyType)) {
                /* 	认证状态 0未认证 1已认证 2审批中 */
                if (
                    isCreate ||
                    store.orgInfo?.certifyStatus === ORG_CERTIFY_STATUS_TYPE.UNVERIFIED
                ) {
                    return (
                        <div className={styles.approve} onClick={onApprove}>
                            <ExclamationCircleFilled className={styles.icon} />
                            若认证识别无法通过，可<span>申请人工审核</span>
                        </div>
                    )
                }
            }
        }

        return (
            <div className={styles.page}>
                {!isCreate && <CustomTitle title="机构认证" style={{ marginBottom: '32px' }} />}
                {!isCreate && store.orgInfo?.certifyStatus === ORG_CERTIFY_STATUS_TYPE.APPROVE && (
                    <Alert
                        className={styles.alert}
                        message="审核中，请耐心等待"
                        type="warning"
                        showIcon
                    />
                )}
                {!isCreate && store.orgInfo?.approveStatus === ORG_APPROVE_STATUS_TYPE.UN_PASS && (
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
                        <Minititle title="选择认证主体" size="small" />
                        <Form.Item
                            name="certifyCompanyType"
                            validateTrigger="onBlur"
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: '请选择认证主体' }]}
                            initialValue={0}
                        >
                            <SelectAuthSubject disabled={store.isDisabled} form={form} />
                        </Form.Item>
                        <Minititle
                            title="选择资质证件类型"
                            size="small"
                            titleStyles={{ marginTop: 48 }}
                        />
                        <Form.Item
                            name="certifyDocumentType"
                            validateTrigger="onBlur"
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: '请选择资质证件类型' }]}
                        >
                            <SelectCertificate subject={subject} disabled={store.isDisabled} />
                        </Form.Item>
                        <Minititle
                            title="填写资质信息"
                            size="small"
                            titleStyles={{ marginTop: 48 }}
                        />
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
                            multiple={true}
                            maxCount={5}
                            accept={'.jpg,.png,.jpeg'}
                            listType="picture-card"
                            className={styles.avatar_uploader}
                            customRequest={store.handleUpload}
                        >
                            <>{(attachments?.length >= 5) ? null : uploadButton}</>
                        </Upload>
                    </Form.Item>

                    {isCreate ||
                        store.orgInfo?.certifyStatus === ORG_CERTIFY_STATUS_TYPE.UNVERIFIED ? (
                        <Form.Item wrapperCol={{ span: 24 }} className={styles.btn_box}>
                            <Row justify="center">
                                <Button htmlType="button" className={styles.btn} onClick={onReset}>
                                    {isCreate ? '跳 过' : '取 消'}
                                </Button>
                                <Button type="primary" htmlType="submit" className={styles.ok}>
                                    提 交
                                </Button>
                            </Row>
                        </Form.Item>
                    ) : null}
                    {/* 人工审核按钮 */}
                    {renderAuditing()}
                </Form>
            </div>
        )
    },
)
const ObserverAccount = inject('userStore', 'siteStore')(Prove)

export default ObserverAccount
