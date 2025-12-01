import { Button, Form, Input, Row } from 'antd'
import { inject, Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import forgetHooks from './hooks'
import type { PageProps } from '@/types'
import { useEffect } from 'react'
import validateRule from '@/components/Global/ValidateRule'
import { TCaptcha } from '@wotu/wotu-components'
import { SuperLink } from '@wotu/wotu-components'

const Forget = (props: PageProps) => {
    const { userStore, siteStore } = props || {}
    const { siteData } = siteStore

    const [form] = Form.useForm()

    const hooks = useLocalObservable(() => new forgetHooks())

    useEffect(() => {
        document.title = '忘记密码'
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
        <Observer>
            {() => {
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
                                hooks.forgetHandler(form, e, siteData)
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
                                            disabled={
                                                hooks.codeBtnStr !== '发送验证码' ? true : false
                                            }
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
                                        message:
                                            '密码包含数字、字母或特殊字符中的两种，且长度在8-20位之间',
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
                            <Form.Item
                                name="passwordRepeat"
                                dependencies={['password']}
                                rules={[validatePsw2]}
                            >
                                <Input.Password
                                    className={styles.input}
                                    placeholder="请再次输入密码"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={styles.login_btn}
                                >
                                    重置密码
                                </Button>
                            </Form.Item>
                            <Form.Item noStyle>
                                <div className={styles.login_tool}>
                                    <SuperLink href={'/user/login'} onClick={() => history.back()}>
                                        回到登录
                                    </SuperLink>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                )
            }}
        </Observer>
    )
}

export default inject('userStore', 'siteStore')(Forget)
