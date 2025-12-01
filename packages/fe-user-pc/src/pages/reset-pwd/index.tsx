import { Alert, Button, Form, Input } from 'antd'
import { useLocation } from 'umi'
import styles from './index.module.less'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import { findSiteData } from '@wotu/wotu-components'
import validateRule from '@/components/Global/ValidateRule'
import { useEffect } from 'react'
import forgetHooks from './hooks'
import { USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'

type PersonProps = {
    userStore: UserStore
    siteStore: SiteStore
}

const Person = (props: PersonProps) => {
    const {
        userStore,
        siteStore,
        siteStore: { siteData },
    } = props
    let siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''
    const hooks = useLocalObservable(() => new forgetHooks())
    const [form] = Form.useForm()
    const { state = {} } = useLocation()

    siteName = siteName ? `-${siteName}` : siteName

    useEffect(() => {
        document.title = `设置密码${siteName}`
    }, [siteName])

    const validatePsw2 = ({ getFieldValue }: any) => {
        return {
            validator: (_: any, value: any) => {
                if (value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入密码不一致'))
                } else {
                    return Promise.reject(new Error('请再次输入密码'))
                }
            },
        }
    }

    useEffect(() => {
        hooks.setUserStore(userStore, siteStore)
    }, [])

    return (
        <div className={[styles.page].join(' ')}>
            <div className={styles.title}>设置密码</div>
            <Alert
                className={styles.alert}
                showIcon
                message="当前为初始密码，为保障您的账号安全，请重新设置您的登录密码"
                type="warning"
            />
            <Form
                form={form}
                size="large"
                name="normal_login"
                className={styles.login_form}
            >
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
                        placeholder="请输入新密码"
                    />
                </Form.Item>
                <Form.Item name="passwordRepeat" dependencies={['password']} rules={[validatePsw2]}>
                    <Input.Password className={styles.input} placeholder="请再次输入密码" />
                </Form.Item>
                <Form.Item>
                    <div className={styles.btn_wrapper}>
                        {
                            [USER_LOGIN_TYPE.USER_LOGIN, USER_LOGIN_TYPE.PERSON_TEACHER].indexOf(state?.currentUserType) > -1 &&
                            <Button
                                type="ghost"
                                className={styles.login_btn}
                                style={{ color: 'rgba(0,0,0,0.65)'}}
                                onClick={() => {
                                    hooks.skip(state)
                                }}
                            >
                                跳过
                            </Button>
                        }
                        <Button
                            type="primary"
                            className={styles.login_btn}
                            onClick={() => {
                                form.validateFields(['password', 'passwordRepeat']).then(res => {
                                    hooks.setPassWord(res, state)
                                })
                            }}
                        >
                            确定
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

const ObserverPerson = inject('userStore', 'siteStore')(observer(Person))

export default ObserverPerson
