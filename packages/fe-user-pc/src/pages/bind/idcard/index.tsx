import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import idcardHooks from './hooks'
import CustomTitle from '@/components/Global/CustomTitle'
import { Button, Col, Form, Row, Alert, Checkbox, message } from 'antd'
import type { IRoute } from 'umi'
import { useLocation } from 'umi'
import { MODAL_FORM_ITEM_LAYOUT } from '@/types'
import type { PageProps } from '@/types'
import MyBreadcrumbs from '@/components/Global/MyBreadcrumbs'
import { useEffect } from 'react'
import { CERTIFICATE_TYPE } from './const'
import { history } from 'umi'
import BaseFormItem from './components/BaseFormItem'
import checkModal from './components/CheckModal'
import IdCardImageItem from './components/IdCardImageItem'
import type { IdCArdQueryType } from '../interface'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl, SuperLink } from '@wotu/wotu-components'
const IdCard = observer((props: PageProps) => {
    let { siteStore, userStore } = props || {}
    let { siteData } = siteStore || {}

    let { query }: { query: IdCArdQueryType } = useLocation() || {}

    const hooks = useLocalObservable(() => new idcardHooks())

    const [form] = Form.useForm()

    let routePrefix = ''

    getSessionStorage('PLATFORM') !== 'portal'
        ? (routePrefix = '/account')
        : (routePrefix = '/user-center')

    useEffect(() => {
        if (userStore?.userData?.isValidateIdCard) {
            hooks.getCertificate(
                userStore?.userData?.certificateType as unknown as string,
                userStore?.userData,
            )
        }
    }, [])

    let { name = '', idCardNo = '', certificateType } = userStore?.userData || {}
    certificateType ||= CERTIFICATE_TYPE.IDCARD
    // let realName = '*' + name.substring(1)

    // 绑定身份证
    function onBind(formValues?: Record<string, string>) {
        if (!formValues?.agreement) {
            message.error('请先勾选实名认证协议')
            return
        }

        let params = form.getFieldsValue()

        if (query?.type === 'audit') {
            hooks
                .ocrIdCard()
                .then(res => {
                    let idCardInfo = res.data
                    if (userStore?.userData?.idCardNo) {
                        // 用户信息中有身份证号直接提交审核
                        hooks.onAuditApply(certificateType)
                    } else {
                        // 反之 需要弹出modal核对信息后再提交审核
                        checkModal({
                            idCardInfo,
                            onAuditApply: hooks.onAuditApply,
                        })
                    }
                })
                .finally(() => {
                    hooks.setBtnLoading(false)
                })
        } else {
            hooks.bindIdCard(
                userStore?.userData?.certificateType || 1,
                params,
                userStore?.getUserData,
            )
        }
    }

    const customDomain = getPortalCodeFromUrl({
        isGetDomain: true,
    })

    return (
        <div className={styles.page}>
            <MyBreadcrumbs />
            <div className={styles.content}>
                <CustomTitle
                    marginBottom={32}
                    title={query?.type === 'audit' ? '申请人工审核' : '实名认证'}
                />
                {query?.type === 'audit' && (
                    <Row justify="center">
                        <Col span={16}>
                            <Alert
                                message="请上传您本人的证件照片，工作人员将在1-3个工作日内完成审核"
                                type="info"
                                showIcon
                                className={styles.alter}
                            />
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col span={12} offset={6}>
                        <Form
                            className={styles.form}
                            form={form}
                            {...MODAL_FORM_ITEM_LAYOUT}
                            onFinish={onBind}
                        >
                            {userStore?.userData?.isValidateIdCard ? (
                                // 已认证展示默认信息 身份证:姓名+证件号;护照和其他:姓名+证件号+证件照片
                                <BaseFormItem
                                    idCardInfo={{
                                        name,
                                        idCardNo,
                                        certificateType,
                                        idCardImg:
                                            certificateType !== CERTIFICATE_TYPE.IDCARD
                                                ? hooks.idcardFront
                                                : '',
                                    }}
                                    isValidateIdCard={true}
                                    showServer={false}
                                    showCertificateType={
                                        certificateType !== CERTIFICATE_TYPE.IDCARD
                                    }
                                />
                            ) : (
                                <>
                                    {/* 身份证类型且没有证件号无需展示身份信息 */}
                                    {certificateType === CERTIFICATE_TYPE.IDCARD &&
                                    !idCardNo ? null : (
                                        <BaseFormItem
                                            idCardInfo={{
                                                name,
                                                idCardNo,
                                                certificateType,
                                            }}
                                            userData={userStore?.userData}
                                            siteData={siteData?.data}
                                            query={query}
                                            hideName={Boolean(idCardNo)}
                                            showCertificateType={
                                                certificateType !== CERTIFICATE_TYPE.IDCARD
                                            }
                                        />
                                    )}

                                    <IdCardImageItem
                                        certificateType={certificateType}
                                        form={form}
                                        hooks={hooks}
                                        idCardImageList={hooks.idCardImageList}
                                        addImage={hooks.addImage}
                                        removeImage={hooks.removeImage}
                                    />
                                    <Form.Item
                                        name="agreement"
                                        valuePropName="checked"
                                        wrapperCol={{ span: 24 }}
                                        className={styles.agreement}
                                    >
                                        <Checkbox className={styles.agreement_check}>
                                            已阅读并同意
                                            <a
                                                href={`${location.origin}${
                                                    getSessionStorage('PLATFORM') === 'portal'
                                                        ? '/' + customDomain
                                                        : ''
                                                }${routePrefix}/bind/idcard/policy`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    window.open(
                                                        location.origin +
                                                            `${
                                                                getSessionStorage('PLATFORM') ===
                                                                'portal'
                                                                    ? '/' + customDomain
                                                                    : ''
                                                            }${routePrefix}/bind/idcard/policy`,
                                                    )
                                                }}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                《实名认证协议》
                                            </a>
                                        </Checkbox>
                                    </Form.Item>

                                    <Form.Item noStyle>
                                        <div className={styles.form_btn}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                loading={hooks.btnLoading}
                                            >
                                                {query?.type === 'audit' ? '提交审核' : '提交'}
                                            </Button>
                                        </div>
                                    </Form.Item>

                                    {query?.type !== 'audit' &&
                                        certificateType === CERTIFICATE_TYPE.IDCARD && (
                                            <SuperLink
                                                href="/bind/idcard/question"
                                                className={styles.more_question}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    history.push('/bind/idcard/question')
                                                }}
                                            >
                                                遇到问题？
                                            </SuperLink>
                                        )}
                                </>
                            )}
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
})
const ObserverIdCard: IRoute = inject('userStore', 'siteStore')(IdCard)

ObserverIdCard.title = '实名认证'

export default ObserverIdCard
