import { useEffect } from 'react'
import { Button, Form, Input, Row } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import { history } from 'umi'
import styles from './index.module.less'
import forgetHooks from './hooks'
import { TCaptcha, findSiteData } from '@wotu/wotu-components'
import { getPathParams } from '@/utils/urlUtils'
import validateRule from '@/components/Global/ValidateRule'
import { SOURCE_TYPE_STATUS_TEXT_MAP } from '@wotu/wotu-components/dist/esm/Types'
const Register = ({ userStore, siteStore }) => {
    const [form] = Form.useForm()
    const { sourceType, authType, authOpenId } = history.location.query || {}
    const hooks = useLocalObservable(() => new forgetHooks())
    hooks.setUserStore(userStore, siteStore)
    hooks.setSourceType(sourceType)
    useEffect(() => {
        hooks.bindForm(form)
        const name =
            findSiteData(siteStore?.siteData || {}, 'name', { findKey: 'baseInfo' }) ||
            '贵州技能人才评价管理服务平台'
        if (name) {
            document.title = '入驻-' + name
        } else {
            document.title = '入驻'
        }
    }, [])

    const validatePsw2 = ({ getFieldValue }) => {
        return {
            validator: (_, value) => {
                // if (!value) return Promise.resolve()
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

    const getStepCurrent = (step: number) => {
        const currenMap: Record<string, React.ReactElement> = {
            1: (
                <>
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
                        <Input className={styles.input} placeholder="请输入手机号" />
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
                </>
            ),
            2: (
                <>
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
                    <Form.Item
                        name="passwordRepeat"
                        dependencies={['password']}
                        rules={[validatePsw2]}
                    >
                        <Input.Password className={styles.input} placeholder="请再次输入密码" />
                    </Form.Item>
                </>
            ),
        }
        return currenMap[step]
    }

    const getStepCurrentButton = (step: number) => {
        const map: Record<string, React.ReactElement> = {
            1: (
                <Form.Item>
                    <Button
                        type="primary"
                        className={styles.login_btn}
                        onClick={() => {
                            form.validateFields(['account', 'verifyCode']).then(res => {
                                hooks.loginInverifyCode({ ...res, authType, authOpenId })
                            })
                        }}
                    >
                        下一步
                    </Button>
                </Form.Item>
            ),
            2: (
                <Form.Item>
                    <Button
                        type="primary"
                        className={styles.login_btn}
                        onClick={() => {
                            form.validateFields(['password', 'passwordRepeat']).then(res => {
                                hooks.setPassWord(res)
                            })
                        }}
                    >
                        完成
                    </Button>
                </Form.Item>
            ),
        }
        return map[step]
    }
    const stepTitle: Record<string, string> = {
        1: `注册成为${SOURCE_TYPE_STATUS_TEXT_MAP[sourceType as string] || '资源方'}`,
        2: `密码设置`,
    }
    return (
        <div className={styles.page}>
            <div className={styles.forget}>{stepTitle[hooks.stepCurrent]}</div>
            <Form
                form={form}
                size="large"
                name="normal_login"
                className={styles.login_form}
                onFinish={e => {
                    hooks.registerHandler(form, e)
                }}
            >
                {getStepCurrent(hooks.stepCurrent)}
                {getStepCurrentButton(hooks.stepCurrent)}

                <Form.Item noStyle>
                    <div className={styles.login_tool}>
                        <span>我有账号, </span>
                        <a
                            onClick={() => {
                                hooks.goPage(`login${getPathParams()}`)
                            }}
                        >
                            去登录
                        </a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

const ObserverRegister = inject('siteStore', 'userStore')(observer(Register))

ObserverRegister.title = '注册'

export default ObserverRegister
