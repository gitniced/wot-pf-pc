import { Button, Checkbox, Divider, Form, Input, message, Modal, Row } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import SellerLoginHooks from './hooks'
import type { PageProps } from '@/types'
import { useEffect } from 'react'
import validateRule from '@/components/Global/ValidateRule'
import { SuperLink, TCaptcha } from '@wotu/wotu-components'
// @ts-ignore
import type { IRoute } from 'umi'
import { useLocation, history } from 'umi'
import { getParamsHistory } from '@/utils/urlUtils'
import { findSiteData, findConfigValueToBoolean } from '@wotu/wotu-components'
import type UserStore from '@/stores/userStore'
import { methods1Key, methods2Key, placeHolderMap, stackKey } from './const'
import classNames from 'classnames'
import QQBtn from '@/pages/user/login/components/QQBtn'
import { getCookie, getLocalStorage, getSessionStorage } from '@/storage'
import http from '@/servers/http'
import api from './api'

const Login = (props: PageProps) => {
    const { siteStore, userStore } = props || {}

    const [apForm] = Form.useForm()

    const hooks = useLocalObservable(() => new SellerLoginHooks())
    hooks.setUserStore(userStore, siteStore)
    // @ts-ignore
    const { query } = useLocation() || {}
    const { authOpenId, authType } = query || {}

    const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')

    useEffect(() => {
        hooks.bindForm(apForm)
        document.title = `登录-讲师`
        /**  记住登上次登录  */
        let lastLoginAccount = getSessionStorage('LAST_LOGIN_ACCOUNT') || ''
        if (lastLoginAccount) {
            apForm.setFieldValue('account', lastLoginAccount)
        }
    }, [])
    useEffect(() => {
        authOpenId && authType && hooks.getLoginAuth(authOpenId, authType)
    }, [authOpenId, authType])

    const RenderBySite = () => {
        const placeholderStack: string[] = []
        let loginType: string[] = []

        const { siteData } = siteStore!
        let { data } = siteData || {}
        let { configList } = data || {}
        configList = configList || []

        configList.forEach(item => {
            if (stackKey.includes(item.key)) {
                placeholderStack.push(placeHolderMap[item.key])
                loginType.push(item.key)
            }
        })

        const getPlaceholder = () => {
            return placeholderStack.filter(Boolean).join('/')
        }

        /**是否存在账号登录 */
        const isUsingMethods1 = loginType.some(k => methods1Key.includes(k))
        /**是否存在验证码登录 */
        const isUsingMethods2 = loginType.some(k => methods2Key.includes(k))
        /**是否可以短信注册 */
        const hasRegisterPower = findConfigValueToBoolean(
            siteStore?.siteData || {},
            'login_personal_center_register',
        )

        /** 当前是否为账号登录 */
        const isPswLogin = hooks.loginType === 'login_personal_center_certificate_psw'

        /** 是否展示注册 */
        const isShowRegister = isUsingMethods2 && hasRegisterPower

        // TODO 默认都用账号密码登陆，这块逻辑先注释，后续迭代需要再打开，不要删除
        // useEffect(() => {
        //     if (isShowRegister) {
        //         hooks.setLoginType('login_personal_center_mobile_verify')
        //     } else {
        //         hooks.setLoginType('login_personal_center_certificate_psw')
        //     }
        // }, [isShowRegister])

        // 获取账号密码方式登录
        const loginMethods2 = () => (
            <>
                <Form.Item name="account" rules={[{ required: true, message: getPlaceholder() }]}>
                    <Input className={styles.input} placeholder={getPlaceholder()} maxLength={30} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password
                        className={styles.input}
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>
            </>
        )

        // 默认内容
        const defaultLoginMethods = () => (
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
                <Form.Item
                    name="verifyCode"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                >
                    <Row>
                        <Input className={styles.code} placeholder="请输入验证码" />

                        <TCaptcha
                            depend={{ form: apForm, key: 'account' }}
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
        )

        // 判断进行方式的切换
        const isShowCheckLoginMethods = () => {
            if (isPswLogin) {
                return (
                    isUsingMethods2 && (
                        <a
                            onClick={() => {
                                hooks.setLoginType('login_personal_center_mobile_verify')
                            }}
                        >
                            切换短信登录
                        </a>
                    )
                )
            } else {
                return (
                    isUsingMethods1 && (
                        <a
                            onClick={() => {
                                hooks.setLoginType('login_personal_center_certificate_psw')
                            }}
                        >
                            切换账号登录
                        </a>
                    )
                )
            }
        }
        // 是否展示 重置密码
        const isShowResetPassWord = () => {
            if (isPswLogin) {
                return (
                    <a
                        className={styles.forget_btn}
                        href={`/teacher/${personMerchantRoute}/forget${location.search}`}
                        onClick={e => {
                            e.preventDefault()
                            history.push(`/teacher/${personMerchantRoute}/forget${location.search}`)
                        }}
                    >
                        忘记密码？
                    </a>
                )
            }
        }
        // 展示登录方式的from
        const showLoginMethodsFrom = () => {
            return isPswLogin ? loginMethods2() : defaultLoginMethods()
        }

        const renderRegistBtn = () => {
            // 站点是否打开中心个人注册
            const isPersonRegister = findConfigValueToBoolean(
                siteData || {},
                'login_personal_center_register',
            )
            if (hooks.loginType === 'login_personal_center_mobile_verify' || !isPersonRegister)
                return null

            return (
                <a
                    className={styles.register}
                    onClick={() => {
                        hooks.setLoginType('login_personal_center_mobile_verify')
                    }}
                >
                    还没有账号？<span>立即注册</span>
                </a>
            )
        }

        // 展示其他的登录方式
        const showResetLoginMethods = () => {
            let isWxLogin = findConfigValueToBoolean(siteData, 'login_personal_center_wx')
            let isddLogin = findConfigValueToBoolean(siteData, 'login_personal_center_dd')
            let isQQLogin = findConfigValueToBoolean(siteData, 'login_personal_center_qq')
            const qqAppid = findSiteData(siteData, 'qq_appid')?.value || '102105867'
            if (!isWxLogin && !isddLogin) return <></>
            return (
                <>
                    <Divider className={styles.login_methods}>
                        <div className={styles.other_way}>
                            其他登录方式
                            {isWxLogin && (
                                <SuperLink
                                    className={styles.wei_xin}
                                    href={`/teacher/${personMerchantRoute}/qrcode-login?type=wx&auth_user_type=4`}
                                    onClick={() => {
                                        getParamsHistory.push(
                                            `/teacher/${personMerchantRoute}/qrcode-login?type=wx&auth_user_type=4`,
                                        )
                                    }}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className={classNames('icon', styles.svg_icon)}
                                    >
                                        <use xlinkHref={`#icon_wechat`} />
                                    </svg>
                                </SuperLink>
                            )}
                            {isddLogin && (
                                <SuperLink
                                    className={styles.ding_ding}
                                    href={`/teacher/${personMerchantRoute}/qrcode-login?type=dd&auth_user_type=4`}
                                    onClick={() => {
                                        getParamsHistory.push(
                                            `/teacher/${personMerchantRoute}/qrcode-login?type=dd&auth_user_type=4`,
                                        )
                                    }}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className={classNames('icon', styles.svg_icon)}
                                    >
                                        <use xlinkHref={`#icon_dingding`} />
                                    </svg>
                                </SuperLink>
                            )}
                            {isQQLogin && <QQBtn qqAppid={qqAppid} userType={4} />}
                        </div>
                    </Divider>
                </>
            )
        }

        const doLoginHandler = async (form: any) => {
            if (!form.agreement && isShowRegister && !isPswLogin) {
                Modal.confirm({
                    title: '用户协议和隐私政策',
                    content: (
                        <>
                            阅读并同意
                            <a href={`/teacher/${personMerchantRoute}/agreement?type=agreement`}>
                                《用户协议》
                            </a>
                            和
                            <a href={`/teacher/${personMerchantRoute}/agreement?type=policy`}>
                                《隐私政策》
                            </a>
                        </>
                    ),
                    okText: '同意并继续',
                    cancelText: '不同意',
                    onOk: () => {
                        apForm.setFieldValue('agreement', true)
                        hooks.loginHandler(form, userStore as UserStore, apForm, query)
                    },
                })
            } else if (isShowRegister) {
                /** 开启注册 短信登录不需要校验 */
                hooks.loginHandler(form, userStore as UserStore, apForm, query)
            } else {
                /** 登录时校验身份 */
                const { account } = form
                const hasIdentity = await http(api.checkIdentity, 'post', {
                    account: account,
                    identity: getCookie('SELECT_IDENTITY_CODE'),
                    sid: getLocalStorage('SID'),
                })
                if (hasIdentity) {
                    hooks.loginHandler(form, userStore as UserStore, apForm, query)
                } else {
                    message.error('账号不存在')
                }
            }
        }

        const loginFrom = () => {
            return (
                <>
                    <div className={styles.tabs}>讲师登录</div>
                    {/* {isPswLogin && (
                        <Alert
                            className={styles.alert}
                            showIcon
                            message="若未设置过密码，可尝试初始密码：证件号后6位或手机号后6位"
                            type="warning"
                        />
                    )} */}
                    <Form
                        form={apForm}
                        validateTrigger={'onBlur'}
                        size="large"
                        name="normal_login"
                        className={styles.login_form}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={doLoginHandler}
                    >
                        {showLoginMethodsFrom()}
                        <div className={styles.forget_option}>
                            {isShowCheckLoginMethods()}
                            {isShowResetPassWord()}
                        </div>

                        <Form.Item className={styles.login_item}>
                            <Button type="primary" htmlType="submit" className={styles.login_btn}>
                                {isShowRegister && !isPswLogin && '注册/'}登录
                            </Button>
                        </Form.Item>
                        {renderRegistBtn()}
                        {isShowRegister && !isPswLogin && (
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
                                    >
                                        《用户协议》
                                    </a>
                                    和
                                    <a
                                        href={`/teacher/${personMerchantRoute}/agreement?type=policy`}
                                    >
                                        《隐私政策》
                                    </a>
                                </Checkbox>
                            </Form.Item>
                        )}
                    </Form>
                    {showResetLoginMethods()}
                </>
            )
        }

        const qrcodeLogin = () => {
            return (
                <div>
                    <Button type="text">
                        <div className={styles.login_title}>
                            <svg className={styles.back_icon}>
                                <use xlinkHref="#back">{/*  */}</use>
                            </svg>
                            <div className={styles.back_text}>返回</div>
                        </div>
                    </Button>
                </div>
            )
        }

        const isQrCodeLogin = () => {
            if (hooks.loginMethods) {
                return qrcodeLogin()
            } else {
                return loginFrom()
            }
        }

        return <div className={styles.page}>{isQrCodeLogin()}</div>
    }
    return RenderBySite()
}

const ObserverLogin: IRoute = inject('siteStore', 'userStore')(observer(Login))

ObserverLogin.title = '登录'

export default ObserverLogin
