// 普通的机构注册，按照原流程
import { Button, Checkbox, Form, Input, message, Row, Modal } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import forgetHooks from './hooks'
import { useLocation, history } from 'umi'
import { CURRENT_STEP_TYPE } from './const'
import type { PageProps } from '@/types'
import React, { useEffect } from 'react'
import { findSiteData, TCaptcha } from '@wotu/wotu-components'
import validateRule from '@/components/Global/ValidateRule'
import { getCookie } from '@/storage'

const Register = (props: PageProps) => {
    const { siteStore, userStore } = props || {}

    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new forgetHooks())
    // @ts-ignore
    const { query }: { query: RegisterQueryType } = useLocation() || {}
    /**
     *  authOpenId 扫码后的openId
     *  authType wx  dd
     */
    const { authOpenId, authType, redirectUrl } = query || {}

    const location = useLocation()
    const state = location.state || {}
    const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')

    useEffect(() => {
        if (authOpenId && authType) {
            hooks.getAuth(authOpenId, authType)
        }
    }, [authOpenId, authType])

    useEffect(() => {
        hooks.bindForm(form)
        const name = findSiteData(siteStore?.siteData || {}, 'name', { findKey: 'baseInfo' }) || ''
        document.title = name ? `讲师注册-${name}` : '讲师注册'
        /** 登录及注册携带必要参数直接到第二步填写信息 */
        if (state?.mobile) {
            hooks.setRandomKey(state?.randomKey)
            hooks.setPersonObj(state)
        }
    }, [])

    /**
     * 如果是扫码进来跳转到注册页的 两种情况 一种是已经注册过的 一种是未注册过的
     * 如果是已经注册过的 会自动跳转到登录页携带authOpenId和authType
     */
    const toLogin = () => {
        let baseUrl = `/teacher/${personMerchantRoute}/login`
        if (authOpenId && authType) {
            redirectUrl
                ? history.replace(
                      `${baseUrl}?authOpenId=${authOpenId}&authType=${authType}&redirectUrl=${redirectUrl}`,
                  )
                : history.replace(`${baseUrl}?authOpenId=${authOpenId}&authType=${authType}`)
        } else {
            redirectUrl
                ? history.replace(`${baseUrl}?redirectUrl=${redirectUrl}`)
                : history.replace(baseUrl)
        }
    }
    // 点击用户协议
    const handleAgreement = (agreeType: 'agreement' | 'policy') => {
        Modal.destroyAll()
        history.push(`/teacher/${personMerchantRoute}/agreement?type=${agreeType}`)
    }

    /**
     *  注册 原型: https://lanhuapp.com/link/#/invite?sid=lX0uLF3v
     */
    const forgetHandler = async (formValues: any) => {
        if (!hooks.done) {
            message.error('请先获取验证码')
            return
        }
        // 讲师注册 第一步
        if (hooks.currentStep === CURRENT_STEP_TYPE.ACCOUNT) {
            const handleNextStep = async () => {
                // 1. 手机号是否存在？
                let { siteData } = siteStore || {}
                let { sid } = siteData?.data || {}
                // 发起后台数据请求，校验手机号是否存在
                const isPhoneTrue = await hooks.isExitPhone(sid!, formValues?.mobile)

                if (isPhoneTrue) {
                    hooks?.changeBtn?.(true)
                    // 存在 走 是否有当前注册的身份？
                    await hooks.isExitTeacher(formValues, userStore, redirectUrl)
                } else {
                    hooks?.changeBtn?.(false)
                    // 不存在 去 校验验证码
                    const flag = await hooks.verifyValidate(
                        formValues?.mobile,
                        formValues?.verifyCode,
                    )
                    if (flag) {
                        // 校验验证码 通过 去完成身份信息
                        hooks.changeStep(CURRENT_STEP_TYPE.IDENTITY)
                        return
                    }
                }
            }

            if (formValues.agreement === false) {
                // message.error('请先勾选协议')
                Modal.confirm({
                    title: '用户协议和隐私政策',
                    content: (
                        <>
                            阅读并同意
                            <a
                                href={`/teacher/${personMerchantRoute}/agreement?type=agreement`}
                                onClick={e => {
                                    e.preventDefault()
                                    handleAgreement('agreement')
                                }}
                            >
                                《用户协议》
                            </a>
                            和
                            <a
                                href={`/teacher/${personMerchantRoute}/agreement?type=policy`}
                                onClick={e => {
                                    e.preventDefault()
                                    handleAgreement('policy')
                                }}
                            >
                                《隐私政策》
                            </a>
                        </>
                    ),
                    okText: '同意并继续',
                    cancelText: '不同意',
                    onOk: async () => {
                        form.setFieldValue('agreement', true)
                        handleNextStep()
                    },
                    autoFocusButton: null,
                })
            } else {
                handleNextStep()
            }
        }
        // 完善身份信息
        if (hooks.currentStep === CURRENT_STEP_TYPE.IDENTITY) {
            hooks.impInfoReg(formValues, userStore, redirectUrl!, { ...query, appKey: 'WEB' })
        }
    }

    const validateAccount = () => {
        return {
            validator: async (_, value: string) => {
                const reg = /^1\d{10}$/
                if (value) {
                    if (!reg.test(value)) {
                        return Promise.reject(new Error('手机号格式错误'))
                    } else {
                        return Promise.resolve()
                    }
                } else {
                    hooks.changeBtn(false)
                    return Promise.reject(new Error('请输入手机号'))
                }
            },
        }
    }

    return (
        <div className={styles.page}>
            {hooks.currentStep === CURRENT_STEP_TYPE.ACCOUNT && (
                <div className={styles.forget}>{'讲师注册'}</div>
            )}
            {hooks.currentStep === CURRENT_STEP_TYPE.IDENTITY && (
                <div className={styles.forget}>
                    <div>完善身份信息</div>
                    <div className={styles.extra}>
                        为了更好的保障您的账号安全，防止身份信息被盗用和冒用，请完善您的身份信息
                    </div>
                </div>
            )}
            <Form
                form={form}
                size="large"
                name="normal_login"
                className={styles.login_form}
                initialValues={{ agreement: false }}
                validateTrigger={'onBlur'}
                onFinish={e => {
                    forgetHandler(e)
                }}
            >
                {hooks.currentStep === CURRENT_STEP_TYPE.ACCOUNT && (
                    <>
                        <Form.Item name="mobile" rules={[validateAccount]}>
                            <Input className={styles.input} placeholder="请输入手机号" />
                        </Form.Item>

                        <Form.Item noStyle>
                            <Form.Item
                                name="verifyCode"
                                rules={[{ required: true, message: '请输入验证码' }]}
                            >
                                <Row>
                                    <Input className={styles.code} placeholder="请输入验证码" />
                                    <TCaptcha
                                        depend={{ form: form, key: 'mobile' }}
                                        serverVerify={hooks.serverVerify}
                                    >
                                        <Button
                                            disabled={
                                                hooks.codeBtnStr !== '发送验证码' ||
                                                hooks.veriCodeBtn
                                            }
                                            className={styles.code_btn}
                                            onClick={hooks.getCode}
                                        >
                                            {hooks.codeBtnStr}
                                        </Button>
                                    </TCaptcha>
                                </Row>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            wrapperCol={{ span: 24 }}
                            className={styles.agreement}
                        >
                            <Checkbox className={styles.agreement_check}>
                                已阅读并同意
                                <a
                                    href={`/teacher/${personMerchantRoute}/agreement?type=agreement`}
                                    onClick={e => {
                                        e.preventDefault()
                                        handleAgreement('agreement')
                                    }}
                                >
                                    《用户协议》
                                </a>
                                和
                                <a
                                    href={`/teacher/${personMerchantRoute}/agreement?type=policy`}
                                    onClick={e => {
                                        e.preventDefault()
                                        handleAgreement('policy')
                                    }}
                                >
                                    《隐私政策》
                                </a>
                            </Checkbox>
                        </Form.Item>
                    </>
                )}

                {hooks.currentStep === CURRENT_STEP_TYPE.IDENTITY && (
                    <>
                        <Form.Item name="name" rules={[{ required: true, message: '请输入姓名' }]}>
                            <Input
                                maxLength={25}
                                className={styles.input}
                                placeholder="请输入姓名"
                            />
                        </Form.Item>

                        <Form.Item
                            name="idCardNo"
                            rules={[
                                validateRule({
                                    noEmpty: true,
                                    rule: 'IDCARD',
                                    noEmptyMessage: '请输入身份证号',
                                    message: '身份证号格式错误',
                                }),
                            ]}
                        >
                            <Input className={styles.input} placeholder="请输入身份证号" />
                        </Form.Item>
                    </>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.login_btn}>
                        {hooks.currentStep === CURRENT_STEP_TYPE.IDENTITY ? '完成注册' : '注册'}
                    </Button>
                </Form.Item>
                {hooks.currentStep === CURRENT_STEP_TYPE.ACCOUNT && (
                    <Form.Item noStyle>
                        <div className={styles.login_tool}>
                            我有账号，去<a onClick={toLogin}>登录</a>
                        </div>
                    </Form.Item>
                )}
            </Form>
        </div>
    )
}

export default inject('siteStore', 'userStore')(observer(Register))
