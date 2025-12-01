import { Button, Divider, Form, Input, Row } from 'antd'
import { inject, Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import loginHooks from './hooks'
import type { PageProps } from '@/types'
import { useEffect } from 'react'
import validateRule from '@/components/Global/ValidateRule'
import { SuperLink, TCaptcha } from '@wotu/wotu-components'
import { Role } from '../../const'
import { findConfigValueToBoolean, findSiteData } from '@wotu/wotu-components'
import { history, useLocation } from 'umi'
import classNames from 'classnames'

const Login = (props: PageProps) => {
    const hooks = useLocalObservable(() => new loginHooks())
    const { siteStore, userStore, setRole } = props || {}
    const [apForm] = Form.useForm()
    let { siteData } = siteStore! || {}

    const { query } = useLocation() || {}
    const { authOpenId, authType } = query || {}

    useEffect(() => {
        authOpenId && authType && hooks.getLoginAuth(authOpenId, authType)
    }, [authOpenId, authType])

    const loginHandler = (form: any, formRef: any) => {
        hooks.loginHandler(form, siteStore!, userStore!, formRef)
    }

    useEffect(() => {
        hooks.bindForm(apForm)
        userStore?.initStore()
        const { name } = siteData?.data?.baseInfo || {}
        if (name) {
            document.title = '登录-' + name
        } else {
            document.title = '登录'
        }
    }, [])

    /**
     * 遍历配置项 看是否cms配置了登录方式  微信和钉钉登录
     * 是否开启了个人注册 机构注册
     *  //: login_personal_method5 login_personal_method6
     *      findSiteData(siteData, '')?.value
     */
    const mapConfigList = () => {
        const configList = siteData?.data?.configList || []

        const lists: Record<string, string[]> = {
            personList: [],
            orgList: [],
            regList: [],
            personalList: [],
            mechanismList: [],
        }

        configList.forEach(item => {
            if (['login_personal_method5', 'login_personal_method6'].includes(item.key)) {
                lists.personList.push(item.key)
            }
            if (['login_org_method5', 'login_org_method6'].includes(item.key)) {
                lists.orgList.push(item.key)
            }
            if (['login_personal_register', 'login_org_register'].includes(item.key)) {
                lists.regList.push(item.key)
            }
            if (
                [
                    'login_personal_method1',
                    'login_personal_method2',
                    'login_personal_method4',
                ].includes(item.key)
            ) {
                lists.personalList.push(item.key)
            }
            if (
                ['login_org_method1', 'login_org_method2', 'login_org_method4'].includes(item.key)
            ) {
                lists.mechanismList.push(item.key)
            }
        })

        Object.assign(hooks, lists)
    }
    useEffect(() => {
        mapConfigList()
    }, [])

    useEffect(() => {
        if (
            !findConfigValueToBoolean(siteData, 'login_personal_device_pc') &&
            findConfigValueToBoolean(siteData, 'login_org_device_pc')
        ) {
            return hooks.tabClick(2)
        }
        if (
            !findConfigValueToBoolean(siteData, 'login_org_device_pc') &&
            findConfigValueToBoolean(siteData, 'login_personal_device_pc')
        ) {
            return hooks.tabClick(1)
        }
    }, [siteData])

    /**
     *
     * 微信登录 钉钉登录
     * 存AUTH_USER_TYPE 1个人 2机构
     * @param type  type=1或者 机构type=2 auth 1个人 2机构
     */
    const goToQRcode = (_type: string) => {
        history.push(`/user/qrcode?type=${_type}`)
    }

    /**
     *什么类型去注册  type微信或者钉钉
     */
    const goToRegister = () => {
        if (!hooks.tabIndex) return
        history.push(`/user/register?type=${hooks.tabIndex}`)
    }

    const renderBySite = () => {
        /**
         * 渲染Placeholder
         * @returns {*}
         */
        const getPlaceholder = () => {
            const methods = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList
            if (hooks.tabIndex === 1) {
                const fields = [
                    methods.includes('login_personal_method4') && '账号',
                    methods.includes('login_personal_method2') && '证件号码',
                    methods.includes('login_personal_method1') && '手机号码',
                ].filter(Boolean)

                return `请输入${fields.join('/')}`
            } else {
                const fields = [
                    methods.includes('login_org_method4') && '账号',
                    methods.includes('login_org_method2') && '证件号码',
                    methods.includes('login_org_method1') && '手机号码',
                ].filter(Boolean)

                return `请输入${fields.join('/')}`
            }
        }

        // 抽离重复代码
        const AccountInput = ({ placeholder, rules }: { placeholder: string; rules: any }) => (
            <Form.Item name="account" rules={rules}>
                <Input className={styles.input} placeholder={placeholder} />
            </Form.Item>
        )

        const PasswordInput = ({ rules }: any) => (
            <Form.Item name="password" rules={rules}>
                <Input.Password className={styles.input} type="password" placeholder="请输入密码" />
            </Form.Item>
        )

        /**
         * 其他登录方式 微信 钉钉
         */
        const loginMethod = () => {
            const isPersonalTab = hooks.tabIndex === 1
            const loginMethods = isPersonalTab ? hooks.personList : hooks.orgList
            const loginType1 = isPersonalTab ? 'login_personal_method5' : 'login_org_method5'
            const loginType2 = isPersonalTab ? 'login_personal_method6' : 'login_org_method6'

            return (
                <>
                    {loginMethods.includes(loginType1) && (
                        <div>
                            <SuperLink
                                className={styles.wei_xin}
                                href={`/user/qrcode?type=wx`}
                                onClick={() => goToQRcode('wx')}
                            >
                                <svg
                                    aria-hidden="true"
                                    className={classNames('icon', styles.svg_icon)}
                                >
                                    <use xlinkHref={`#icon_wechat`} />
                                </svg>
                                <span>微信登录</span>
                            </SuperLink>
                        </div>
                    )}
                    {loginMethods.includes(loginType2) && (
                        <div className={styles.ding_ding}>
                            <SuperLink
                                href={`/user/qrcode?type=dd`}
                                onClick={() => goToQRcode('dd')}
                            >
                                <svg
                                    aria-hidden="true"
                                    className={classNames('icon', styles.svg_icon)}
                                >
                                    <use xlinkHref={`#icon_dingding`} />
                                </svg>
                                <span>钉钉登录</span>
                            </SuperLink>
                        </div>
                    )}
                </>
            )
        }

        /**
         *其他登录方式
         */
        const otherWay = () => {
            const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value
            if (kp_org_login_theme === '/egzlogin' || kp_org_login_theme === '/sclogin') return null
            const methodList = hooks.tabIndex === 1 ? hooks.personList : hooks.orgList

            if (methodList.length !== 0) {
                return (
                    <Divider className={styles.other_way_divider}>
                        <div className={styles.other_way}>其他登录方式 {loginMethod()}</div>
                    </Divider>
                )
            }

            return null
        }
        //短信
        const shortMessage = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList
            const temp = findConfigValueToBoolean?.(
                siteData!,
                hooks.tabIndex === 1 ? 'login_personal_method3' : 'login_org_method3',
            )
            const length = methodList?.length

            if (temp && length !== 0) {
                return (
                    <a
                        onClick={() => {
                            hooks.setLoginType(2)
                        }}
                        className={styles.shortMessage}
                    >
                        切换短信登录
                    </a>
                )
            }

            return null
        }
        // 账号
        const accountNumber = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList
            const temp = findConfigValueToBoolean(
                siteData!,
                hooks.tabIndex === 1 ? 'login_personal_method3' : 'login_org_method3',
            )
            const length = methodList.length

            if (temp && length !== 0) {
                return (
                    <a
                        onClick={() => {
                            hooks.setLoginType(1)
                        }}
                        className={styles.shortMessage}
                    >
                        切换账号登录
                    </a>
                )
            }

            return null
        }

        /**
         * 渲染短信或者账号登录
         */
        const renderDom = () => {
            return hooks.loginTypes === 1 ? shortMessage() : accountNumber()
        }

        /**
         * 手机号登录
         */
        const numberLogin = () => {
            return (
                <>
                    <AccountInput
                        placeholder={getPlaceholder()}
                        rules={[{ required: true, message: getPlaceholder() }]}
                    />
                    <PasswordInput rules={[{ required: true, message: '请输入密码' }]} />
                </>
            )
        }
        /**
         * 验证码登录
         */
        const verification = () => {
            return (
                <>
                    <AccountInput
                        placeholder="请输入手机号"
                        rules={[
                            validateRule({
                                rule: 'MOBILE',
                                message: '手机号格式错误',
                                noEmpty: true,
                                noEmptyMessage: '请输入手机号',
                            }),
                        ]}
                    />
                    <Form.Item
                        name="verifyCode"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Row>
                            <Input className={styles.code} placeholder="请输入验证码" />
                            <TCaptcha
                                depend={{ form: apForm, key: 'account' }}
                                serverVerify={hooks.serverVerify}
                            >
                                <Button
                                    disabled={hooks.codeBtnStr !== '发送验证码'}
                                    className={styles.code_btn}
                                    onClick={hooks.getCode}
                                >
                                    {hooks.codeBtnStr}
                                </Button>
                            </TCaptcha>
                        </Row>
                    </Form.Item>
                </>
            )
        }

        /**
         * 渲染登录方式
         */
        const renderLoginType = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList

            switch (hooks.loginTypes) {
                case 1:
                    return methodList.length !== 0 ? numberLogin() : verification()
                case 2:
                    return methodList.length !== 0 ? verification() : numberLogin()
                default:
                    return null
            }
        }

        /**
         *忘记密码
         */
        const forgetPassword = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList

            if (hooks.loginTypes === 1 && methodList.length !== 0) {
                return (
                    <a className={styles.forget_btn} href="/account/user/forget">
                        忘记密码？
                    </a>
                )
            }
            return null
        }

        const renderLoginBtn = () => {
            return (
                <>
                    {renderLoginType()}

                    <Form.Item>
                        {renderDom()}

                        {/* 忘记密码 */}
                        {forgetPassword()}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.login_btn}>
                            登录
                        </Button>
                    </Form.Item>
                    {hooks.regList.includes(
                        hooks.tabIndex === 1 ? 'login_personal_register' : 'login_org_register',
                    ) && (
                        <a className={styles.register} onClick={goToRegister}>
                            还没有账号？<span>立即注册</span>
                        </a>
                    )}

                    {otherWay()}
                </>
            )
        }
        const renderIsANailCraftsman = () => {
            return renderLoginBtn()
        }

        return (
            <div className={styles.page}>
                <div className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.tabs}>
                            {findConfigValueToBoolean(siteData!, 'login_personal_device_pc') && (
                                <div
                                    className={[hooks.tabIndex === 1 ? styles.active : ''].join(
                                        ' ',
                                    )}
                                    onClick={() => {
                                        hooks.tabClick(1)
                                        setRole(Role.User)
                                    }}
                                >
                                    个人登录
                                </div>
                            )}
                            {findConfigValueToBoolean(siteData!, 'login_org_device_pc') && (
                                <div
                                    className={[hooks.tabIndex === 2 ? styles.active : ''].join(
                                        ' ',
                                    )}
                                    onClick={() => {
                                        hooks.tabClick(2)
                                        setRole(Role.Origin)
                                    }}
                                >
                                    机构登录
                                </div>
                            )}
                        </div>
                        <Form
                            form={apForm}
                            validateTrigger={'onBlur'}
                            size="large"
                            name="normal_login"
                            className={styles.login_form}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={e => {
                                loginHandler(e, apForm)
                            }}
                        >
                            {renderIsANailCraftsman()}
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
    return <Observer>{() => renderBySite()}</Observer>
}

export default inject('siteStore', 'userStore')(Login)
