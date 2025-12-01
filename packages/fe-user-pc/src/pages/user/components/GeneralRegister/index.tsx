// 普通的机构注册，按照原流程
import { Button, Checkbox, Form, Input, message, Modal, Row } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import forgetHooks from './hooks'
import { useLocation, history } from 'umi'
import { CURRENT_STEP_TYPE, REG_TYPE, Type } from './const'
import type { PageProps } from '@/types'
import React, { useEffect } from 'react'
import Http from '@/servers/http'
import api from './api'
import { findSiteData, TCaptcha } from '@wotu/wotu-components'
import validateRule from '@/components/Global/ValidateRule'
import type { RegisterQueryType } from './interface'
// import MoreSelect from '@/components/Global/MoreSelect'

const Register = (props: PageProps) => {
    const { siteStore, userStore } = props || {}

    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new forgetHooks())
    const { query }: { query: RegisterQueryType } = useLocation() || {}
    const location = useLocation()
    const state = location.state || {}
    /**
     *  type 1个人   //2机构
     *  authOpenId 扫码后的openId
     *  authType wx  dd
     */
    const { type, authOpenId, authType } = query || {}

    useEffect(() => {
        if (authOpenId && authType) {
            hooks.getAuth(authOpenId, authType)
        }
    }, [authOpenId, authType])

    const asyncFucTab = () => {
        type && hooks.getTabIndex(type)
        let { siteData } = siteStore || {}
        let { groupList }: any = siteData?.data || {}
        hooks.getGroup(groupList)
    }

    useEffect(() => {
        asyncFucTab()
        const name = findSiteData(siteStore?.siteData, 'name', { findKey: 'baseInfo' }) || ''
        if (type === Type.ORG) {
            document.title = name ? `机构注册-${name}` : '机构注册'
        } else {
            document.title = name ? `个人注册-${name}` : '个人注册'
        }
    }, [type])

    useEffect(() => {
        hooks.bindForm(form)
        // 跳过第一步校验手机号 直接到第二步
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
        let baseUrl = `/user/login?logintype=${query?.type}`
        if (authOpenId && authType) {
            history.replace(`${baseUrl}&authOpenId=${authOpenId}&authType=${authType}`)
        } else {
            history.replace(baseUrl)
        }
    }

    // 注册
    const forgetHandler = (formValues: any, formRef: any) => {
        if (!hooks.done) {
            message.error('请先获取验证码')
            return
        }
        if (formValues.agreement === false) {
            Modal.confirm({
                title: '用户协议和隐私政策',
                content: (
                    <>
                        阅读并同意
                        <a href="/account/user/agreement?type=agreement">《用户协议》</a>和
                        <a href="/account/user/agreement?type=policy">《隐私政策》</a>
                    </>
                ),
                okText: '同意并继续',
                cancelText: '不同意',
                onOk: () => {
                    formRef.setFieldValue('agreement', true)
                    forgetHandler(formRef.getFieldsValue(), formRef)
                },
            })
            return
        }

        let argument = {
            formValues,
            formRef,
            query,
            site: siteStore,
            user: userStore,
        }
        if (type === Type.PERSONAL) {
            hooks.personalRegister(argument)
        } else {
            hooks.orgRegister(argument)
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
                        let { siteData } = siteStore || {}
                        let { sid } = siteData?.data || {}
                        // 发起后台数据请求，校验手机号是否存在
                        const res = await Http(
                            api.isExistence,
                            'get',
                            { sid, phone: value },
                            {
                                repeatFilter: true,
                            },
                        )
                        if (res) {
                            message.error('该手机号已注册,请前往登录')
                            hooks?.changeBtn?.(true)
                        } else {
                            hooks?.changeBtn?.(false)
                            return await Promise.resolve()
                        }
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
                <div className={styles.forget}>{REG_TYPE[type]}</div>
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
                    forgetHandler(e, form)
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
                                <a href="/account/user/agreement?type=agreement">《用户协议》</a>和
                                <a href="/account/user/agreement?type=policy">《隐私政策》</a>
                            </Checkbox>
                        </Form.Item>
                    </>
                )}

                {hooks.currentStep === CURRENT_STEP_TYPE.IDENTITY && (
                    <>
                        <Form.Item
                            name="realName"
                            rules={[{ required: true, message: '请输入姓名' }]}
                        >
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
                        注册
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
