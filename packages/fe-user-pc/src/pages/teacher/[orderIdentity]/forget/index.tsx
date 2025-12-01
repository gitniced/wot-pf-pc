import { Button, Form, Input, Row } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import forgetHooks from './hooks'
import type { PageProps } from '@/types'
import { useEffect } from 'react'
import validateRule from '@/components/Global/ValidateRule'
import { TCaptcha } from '@wotu/wotu-components'
import sellerStore from '../store'
import { history } from 'umi'
import { getCookie } from '@/storage'

const Forget = (props: PageProps) => {
    const { userStore } = props || {}

    const [form] = Form.useForm()

    const hooks = useLocalObservable(() => new forgetHooks())
    const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
    // const sellerStore = useLocalObservable(() => getSingleSeller())

    useEffect(() => {
        sellerStore.getSellerSiteData(window?.location?.origin || '')
    }, [window.location.origin])

    useEffect(() => {
        const { name = '贵州技能人才评价管理服务平台' } = sellerStore?.sellerSite?.baseInfo || {}
        if (name) {
            document.title = '忘记密码-' + name
        } else {
            document.title = '忘记密码'
        }
    }, [sellerStore?.sellerSite])

    useEffect(() => {
        hooks.bindForm(form)
        userStore?.initStore()
    }, [])

    const validatePsw2 = ({ getFieldValue }) => {
        return {
            validator: (_, value) => {
                if (value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入密码不一致'))
                } else {
                    return Promise.reject(new Error('请输入密码'))
                }
            },
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.forget}>找回密码</div>
            <Form
                form={form}
                size="large"
                name="normal_login"
                className={styles.login_form}
                initialValues={{ remember: true }}
                validateTrigger={'onBlur'}
                onFinish={e => {
                    hooks.forgetHandler(e)
                }}
            >
                <Form.Item
                    name="account"
                    rules={[
                        validateRule({
                            rule: 'MOBILE',
                            message: '手机号格式错误',
                            noEmpty: true,
                            noEmptyMessage: '请输入手机号',
                        }),
                    ]}
                >
                    <Input className={styles.input} placeholder="请输入账号" />
                </Form.Item>

                <Form.Item noStyle>
                    <Row>
                        <Form.Item
                            name="verifyCode"
                            rules={[{ required: true, message: '请输入验证码' }]}
                        >
                            <Input className={styles.code} placeholder="请输入验证码" />
                        </Form.Item>

                        <TCaptcha
                            depend={{ form: form, key: 'account' }}
                            serverVerify={hooks.serverVerify}
                        >
                            <Button
                                disabled={hooks.codeBtnStr !== '发送验证码' ? true : false}
                                className={styles.code_btn}
                                onClick={hooks.getCode}
                            >
                                {hooks.codeBtnStr}
                            </Button>
                        </TCaptcha>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        validateRule({
                            rule: 'PASSWORD',
                            message: '密码包含数字、字母或特殊字符中的两种，且长度在8-20位之间',
                            noEmpty: true,
                            noEmptyMessage: '请输入新密码',
                        }),
                    ]}
                >
                    <Input.Password
                        className={styles.input}
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>
                <Form.Item name="passwordRepeat" dependencies={['password']} rules={[validatePsw2]}>
                    <Input.Password className={styles.input} placeholder="请再次输入密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.login_btn}>
                        重置密码
                    </Button>
                </Form.Item>
                <Form.Item noStyle>
                    <div className={styles.login_tool}>
                        <a
                            href={`/teacher/${personMerchantRoute}/login${location.search}`}
                            onClick={e => {
                                e.preventDefault()
                                history.push(
                                    `/teacher/${personMerchantRoute}/login${location.search}`,
                                )
                            }}
                        >
                            回到登录
                        </a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

const ObserverForget = inject('userStore', 'siteStore')(observer(Forget))

ObserverForget.title = '忘记密码'

export default ObserverForget
