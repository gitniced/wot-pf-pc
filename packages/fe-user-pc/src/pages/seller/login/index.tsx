import { Button, Divider, Form, Input, Row } from 'antd'
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
import { getSessionStorage, setLocalStorage } from '@/storage'
import { getPathParams, getParamsHistory } from '@/utils/urlUtils'
import { findSiteData, findConfigValueToBoolean } from '@wotu/wotu-components'
import type UserStore from '@/stores/userStore'
import { methods1Key, methods2Key, placeHolderMap, stackKey } from './const'
import classNames from 'classnames'
import JobLogin from '@/components/JobLogin'
import { MERCHANT_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import QQBtn from '@/pages/user/login/components/QQBtn'
import { SOURCE_TYPE_STATUS_TEXT_STR_MAP } from '@wotu/wotu-components/dist/esm/Types/user'

const Login = (props: PageProps) => {
    const { siteStore, userStore } = props || {}

    const { sourceType } = history.location.query as { sourceType?: string }
    const [apForm] = Form.useForm()

    const hooks = useLocalObservable(() => new SellerLoginHooks())
    hooks.setUserStore(userStore, siteStore)

    // @ts-ignore
    let { query } = useLocation()
    let sellerSid = Number(useLocation?.()?.pathname?.split('/')?.[2]) || ''
    const getOriginStatusText = () => {
        return SOURCE_TYPE_STATUS_TEXT_STR_MAP[sourceType!] || '资源方'
    }
    useEffect(() => {
        hooks.bindForm(apForm)
        const name =
            findSiteData(siteStore?.siteData || {}, 'name', { findKey: 'baseInfo' }) ||
            '贵州技能人才评价管理服务平台'

        if (name) {
            document.title = '登录-' + name
        } else {
            document.title = '登录'
        }
        document.title = `登录-${getOriginStatusText()}`
        setLocalStorage('SELLER_SID', sellerSid)
        /**  记住登上次登录  */
        let lastLoginAccount = getSessionStorage('LAST_LOGIN_ACCOUNT') || ''
        if (lastLoginAccount) {
            apForm.setFieldValue('account', lastLoginAccount)
        }
    }, [])

    // 是否开启短信登录
    // @ts-ignore
    const isVerifyLogin = findConfigValueToBoolean?.(siteStore?.siteData, 'login_merchant_method3')

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

        // 手机密码登录、证件号码密码登录、账户密码登录
        const isUsingMethods1 = loginType.some(k => methods1Key.includes(k))
        // 手机验证码登录
        const isUsingMethods2 = loginType.some(k => methods2Key.includes(k))

        // 校验内聚
        const verification = {
            // 是否是账号密码登录
            isMehthods2: () => hooks.loginType === 'login_method2',
            // 登录方式是否有 (TODO 这里的判断逻辑代码有问题)
            // isLoginMethods1: () => loginType.includes('login_method1'),
        }

        useEffect(() => {
            if (isUsingMethods1) {
                hooks.setLoginType('login_method2')
            } else if (isUsingMethods2) {
                hooks.setLoginType('login_method1')
            } else {
                hooks.setLoginType('')
            }
        }, [])

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
            if (verification.isMehthods2()) {
                return (
                    Boolean(isVerifyLogin) &&
                    isUsingMethods2 && (
                        <a
                            onClick={() => {
                                hooks.setLoginType('login_method1')
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
                                hooks.setLoginType('login_method2')
                            }}
                        >
                            切换账号登录
                        </a>
                    )
                )
            }
            // }
        }
        // 是否展示 重置密码
        const isShowResetPassWord = () => {
            if (verification.isMehthods2()) {
                return (
                    <a
                        href={`/seller/forget${getPathParams()}`}
                        className={styles.forget_btn}
                        onClick={e => {
                            e.preventDefault()
                            history.push(`/seller/forget${getPathParams()}`)
                        }}
                    >
                        忘记密码？
                    </a>
                )
            }
        }
        // 展示登录方式的from
        const showLoginMethodsFrom = () => {
            return verification.isMehthods2() ? loginMethods2() : defaultLoginMethods()
        }
        // 展示其他的登录方式
        const showResetLoginMethods = () => {
            let isWxLogin = findConfigValueToBoolean(siteData, 'login_merchant_method5')
            let isddLogin = findConfigValueToBoolean(siteData, 'login_merchant_method6')
            let isQQLogin = findConfigValueToBoolean(siteData, 'login_merchant_method_qq')
            const qqAppid = findSiteData(siteData, 'qq_appid')?.value || '102105867'
            if (!isWxLogin && !isddLogin) return <></>
            return (
                <>
                    <Divider className={styles.login_methods}>
                        <div className={styles.other_way}>
                            其他登录方式
                            {isWxLogin && (
                                <SuperLink
                                    href={`/seller/qrcode-login?type=wx`}
                                    className={styles.wei_xin}
                                    onClick={e => {
                                        e.preventDefault()
                                        getParamsHistory.push('/seller/qrcode-login?type=wx')
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
                                    href={`/seller/qrcode-login?type=dd`}
                                    className={styles.ding_ding}
                                    onClick={e => {
                                        e.preventDefault()
                                        getParamsHistory.push('/seller/qrcode-login?type=dd')
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
                            {isQQLogin && <QQBtn qqAppid={qqAppid} userType={3} />}
                        </div>
                    </Divider>
                </>
            )
        }

        const loginFrom = () => {
            return (
                <>
                    <div className={styles.tabs}>{getOriginStatusText()}登录</div>
                    {/* <Alert
                        className={styles.alert}
                        showIcon
                        message="若未设置过密码，可尝试初始密码：证件号后6位或手机号后6位"
                        type="warning"
                    /> */}
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
                            hooks.loginHandler(e, userStore as UserStore, apForm, query)
                        }}
                    >
                        {showLoginMethodsFrom()}
                        <div className={styles.forget_option}>
                            {isShowCheckLoginMethods()}
                            {isShowResetPassWord()}
                        </div>

                        <Form.Item className={styles.login_item}>
                            <Button type="primary" htmlType="submit" className={styles.login_btn}>
                                登录
                            </Button>
                        </Form.Item>
                        {findConfigValueToBoolean(siteData, 'login_merchant_register') ? (
                            <a
                                onClick={() => {
                                    hooks.goPage(`register${getPathParams()}`)
                                }}
                                className={styles.register}
                            >
                                还没有账号？<span>立即入驻</span>
                            </a>
                        ) : null}
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
    switch (sourceType) {
        // 企业身份的资源方前往企业专题登录页
        case MERCHANT_LOGIN_TYPE.COMPANY:
            return <JobLogin sourceType={sourceType} />
        default:
            return RenderBySite()
    }
}

const ObserverLogin: IRoute = inject('siteStore', 'userStore')(observer(Login))

ObserverLogin.title = '登录'

export default ObserverLogin
