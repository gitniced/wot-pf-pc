import React, { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Divider, Form, Input, Modal, Row, Space } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import loginHooks from './hooks'
import type { PageProps } from '@/types'
import validateRule from '@/components/Global/ValidateRule'
import { TCaptcha } from '@wotu/wotu-components'
import classNames from 'classnames'
// @ts-ignore
import { useLocation, useModel } from 'umi'
import {
    delLocalStorage,
    getCookie,
    getLocalStorage,
    getSessionStorage,
    setCookie,
    setSessionStorage,
} from '@/storage'
import { findSiteData, findConfigValueToBoolean, SuperLink } from '@wotu/wotu-components'
import OAuthLogin from '../../../components/Global/OAuthLogin'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import QQBtn from './components/QQBtn'
import SocialSecurityBtn from './components/SocialSecurityBtn'
import { SwapOutlined } from '@ant-design/icons'

const Login = (props: PageProps) => {
    const masterStore = useModel('@@qiankunStateFromMaster')
    const { tag } = masterStore || {}
    const portalCode = getPortalCodeFromUrl()
    const hooks = useLocalObservable(() => new loginHooks())
    const [apForm] = Form.useForm()
    const { siteStore, userStore } = props || {}
    let { siteData } = siteStore!
    // @ts-ignore
    const { query, search: urlSearch } = useLocation() || {}
    const { authOpenId, authType, logintype, loginMethod: urlLoginMethod } = query || {}
    const [isloading, setIsloading] = useState(false)

    // 是否为门户登录页
    const isPortal = getSessionStorage('PLATFORM') === 'portal'
    // 站点是否打开个人登录
    const perosonalSSO = findSiteData(siteData, 'login_personal_sso', {
        findKey: 'configList',
    })?.value
    const siteAlias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''
    // 如果站点别名是 engineer，则只保留机构登录，隐藏个人登录
    const isPersonLogin =
        siteAlias === 'engineer'
            ? false
            : findConfigValueToBoolean(siteData, 'login_personal_device_pc') &&
              (perosonalSSO !== '1' || isPortal)

    // 站点是否打开机构登录 门户登录页没有机构登录
    const orgSSO = findSiteData(siteData, 'login_org_sso', { findKey: 'configList' })?.value
    const isOrgLogin =
        findConfigValueToBoolean(siteData, 'login_org_device_pc') && (orgSSO !== '1' || isPortal)

    console.log('isOrgLogin', isOrgLogin)

    const { portalData } = siteStore || {}
    const currentPortalData = portalData?.[portalCode] || {}
    const { privacyPortalFlag } = currentPortalData as any
    /** 是否展示门户注册 */
    const isShowPortalReg =
        !isNaN(privacyPortalFlag) && Number(privacyPortalFlag) === 0 && hooks.tabIndex === 1

    /** 是否展示站点注册 */
    const isShowSiteReg = hooks.regList.includes(
        hooks.tabIndex === 1 ? 'login_personal_register' : 'login_org_register',
    )

    /** 国家网络身份认证 alias  */
    const nncAlias = 'gyxx'

    /** 是否开启学员站点注册 */
    // const isAllowStudentSiteReg = findConfigValueToBoolean(
    //     siteData || {},
    //     'login_personal_register',
    // )
    /** 是否开启机构站点注册 */
    // const isAllowOrgSiteReg = findConfigValueToBoolean(siteData || {}, 'login_org_register')

    /** 当站点或门户开启了注册，页面打开时候默认展示短信登录 */
    useEffect(() => {
        // TODO 默认都用账号密码登陆，这块逻辑先注释，后续迭代需要再打开，不要删除
        // if (isPortal) {
        //     if (isShowPortalReg) {
        //         hooks.initLoginType(2)
        //     }
        // } else {
        //     if (hooks.tabIndex === 1) {
        //         if (isAllowStudentSiteReg) {
        //             hooks.initLoginType(2)
        //         } else {
        //             hooks.initLoginType(1)
        //         }
        //     }
        //     if (hooks.tabIndex === 2) {
        //         if (isAllowOrgSiteReg) {
        //             hooks.initLoginType(2)
        //         } else {
        //             hooks.initLoginType(1)
        //         }
        //     }
        // }
    }, [isPortal, hooks.tabIndex])

    // 是否展示注册
    const isShowRegister = portalCode ? isShowPortalReg : isShowSiteReg

    useEffect(() => {
        authOpenId && authType && hooks.getLoginAuth(authOpenId, authType)
    }, [authOpenId, authType])

    useEffect(() => {
        /**  记住登上次登录  */
        let lastLoginAccount = getSessionStorage('LAST_LOGIN_ACCOUNT') || ''
        if (lastLoginAccount) {
            apForm.setFieldValue('account', lastLoginAccount)
        }
        hooks.setSiteData(siteData, apForm)
    }, [])

    console.log(hooks.loginTypes)
    useEffect(() => {
        // 机构登录判断是否开启 手机短信密码登录
        if (hooks.tabIndex === 2 && !portalCode) {
            const loginOrgMethods = findSiteData(siteData, 'login_org_method7', {
                findKey: 'configList',
            })?.value
            if (loginOrgMethods === '1') {
                hooks.setLoginType(3)
            }
        }
    }, [hooks?.tabIndex])

    /**
     * 遍历配置项 看是否cms配置了登录方式  微信和钉钉登录
     * 是否开启了个人注册 机构注册
     *  //: login_personal_method5 login_personal_method6
     *      findSiteData(siteData, '')?.value
     */
    const mapConfigList = () => {
        const configList = siteData?.data?.configList || []

        const lists: Record<string, string[]> = {
            //第三方登录方式
            personList: [],
            orgList: [],
            regList: [],
            //普通登录方式
            personalList: [],
            mechanismList: [],
        }

        configList.forEach(item => {
            if (
                [
                    'login_personal_method5',
                    'login_personal_method6',
                    'login_personal_method_qq',
                    'login_personal_method_face',
                ].includes(item.key)
            ) {
                lists.personList.push(item.key)
            }
            if (
                ['login_org_method5', 'login_org_method6', 'login_org_method_qq'].includes(item.key)
            ) {
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
                    'login_personal_method7',
                ].includes(item.key)
            ) {
                lists.personalList.push(item.key)
            }
            if (
                [
                    'login_org_method1',
                    'login_org_method2',
                    'login_org_method4',
                    'login_org_method7',
                ].includes(item.key)
            ) {
                lists.mechanismList.push(item.key)
            }
        })

        Object.assign(hooks, lists)
    }

    /**
     *登录
     * @param form
     * @param formRef
     */
    const loginHandler = (form: any, formRef: any) => {
        if (isPortal) {
            setCookie('SELECT_IDENTITY_CODE', 5)
        }
        if (!form.agreement && isShowRegister && hooks.loginTypes === 2) {
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
                    hooks.loginHandler(form, siteStore!, userStore!, formRef)
                },
            })
            return
        } else {
            hooks.loginHandler(form, siteStore!, userStore!, formRef)
        }
    }

    /**
     *
     * 微信登录 钉钉登录
     * 存AUTH_USER_TYPE 1个人 2机构
     * @param type  type=1或者 机构type=2 auth 1个人 2机构
     */
    const goToQRcode = (_type: string) => {
        setSessionStorage('AUTH_USER_TYPE', hooks.tabIndex)

        return `/user/qrcode?type=${_type}`
    }

    /**
     *@name 什么类型去注册  type微信或者钉钉
     */
    const goToRegister = () => {
        hooks.setLoginType(2)
    }

    /** tab的点击事件  */
    const handleTabClick = useCallback(
        (tabIndex: number) => {
            hooks.tabClick(tabIndex)
        },
        [hooks],
    )

    useEffect(() => {
        userStore?.initStore()
        // 进入普通登录页，删除本地存储的来源类型
        delLocalStorage('SOURCE_TYPE')
        // 获取上个用户登录类型
        const fromUrlUserType = getCookie('FROM_URL_USER_TYPE') || 1
        !isNaN(fromUrlUserType) && handleTabClick(Number(fromUrlUserType))
    }, [])

    useEffect(() => {
        if (siteData?.data?.sid) {
            mapConfigList()
            const name = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''
            document.title = name ? `登录-${name}` : '登录'
            if (!isPersonLogin && isOrgLogin) {
                return handleTabClick(2)
            }
        }
    }, [siteData?.data?.sid])

    //有的地方一进来需要默认选中机构登录
    useEffect(() => {
        if (logintype && Number(logintype) === 2 && isOrgLogin) {
            return handleTabClick(2)
        } else if (logintype && Number(logintype) === 1 && isPersonLogin) {
            return handleTabClick(1)
        }
    }, [logintype])

    // 登录方式路径传参
    useEffect(() => {
        const fromUrl = getCookie('FROM_URL') || ''
        const loginMethod2WhiteList = [
            'enroll-gateway/enroll-detail',
            'enroll-gateway/enroll-information',
            'enroll-gateway/group-enroll',
        ]
        let newLoginMethod = urlLoginMethod
        if (loginMethod2WhiteList.filter(url => fromUrl.indexOf(url) > -1).length) {
            newLoginMethod = '2'
        }
        if (newLoginMethod) {
            // 是否开启对应的登录方式
            const openPersonAccount = findConfigValueToBoolean?.(siteData, 'login_personal_method1')
            const openPersonSms = findConfigValueToBoolean?.(siteData, 'login_personal_method3')
            const openOrgAccount = findConfigValueToBoolean?.(siteData, 'login_org_method1')
            const openOrgSms = findConfigValueToBoolean?.(siteData, 'login_org_method3')

            // 个人账号密码登录
            if (newLoginMethod === '1' && openPersonAccount) {
                hooks.setLoginType(1)
            }
            // 个人短信登录
            else if (newLoginMethod === '2' && (openPersonSms || portalCode)) {
                hooks.setLoginType(2)
            }
            // 机构账号密码登录
            else if (newLoginMethod === '1' && openOrgAccount) {
                hooks.setLoginType(1)
            }
            // 机构短信登录
            else if (newLoginMethod === '2' && (openOrgSms || portalCode)) {
                hooks.setLoginType(2)
            }
        }
    }, [urlLoginMethod])

    // 当存在门户指定机构code时 作为门户登录入口 仅仅支持个人登录
    // userStore?.fatherCode 父级门户code
    // hooks.tabIndex 切换的tab索引
    const getAllowLoginType = () => {
        const alias = getLocalStorage('ALIAS')
        // 是否只开启了一种登录，样式有区别
        if (alias === 'engineer') {
            return null
        }

        let isSignLogin = Number(isPersonLogin) + Number(isOrgLogin) === 1
        if (tag === 'portal') {
            return (
                <div className={styles.tabs_portal}>
                    {findConfigValueToBoolean(siteData, 'login_setting_personal') && (
                        <div
                            className={styles.tab_sign}
                            onClick={() => {
                                handleTabClick(1)
                                setIsloading(true)
                            }}
                        >
                            {hooks.tabIndex === 1 ? '个人登录' : '机构登录'}
                        </div>
                    )}
                    {isOrgLogin && (
                        <Space
                            size={4}
                            className={styles.tabs_exchange}
                            onClick={() => {
                                handleTabClick(hooks.tabIndex === 1 ? 2 : 1)
                                setIsloading(true)
                            }}
                        >
                            <SwapOutlined />
                            <span className={styles.tabs_exchange__text}>
                                切换{hooks.tabIndex === 1 ? '机构登录' : '个人登录'}
                            </span>
                        </Space>
                    )}
                </div>
            )
        } else {
            return (
                <div className={styles.tabs}>
                    {isPersonLogin && (
                        <div
                            className={classNames(
                                hooks.tabIndex === 1 && !isSignLogin ? styles.active : '',
                                isSignLogin ? styles.tab_sign : styles.tab,
                            )}
                            onClick={() => {
                                handleTabClick(1)
                                setIsloading(true)
                            }}
                        >
                            个人登录
                        </div>
                    )}
                    {isOrgLogin && (
                        <div
                            className={classNames(
                                hooks.tabIndex === 2 && !isSignLogin ? styles.active : '',
                                isSignLogin ? styles.tab_sign : styles.tab,
                            )}
                            onClick={() => {
                                handleTabClick(2)
                                setIsloading(false)
                            }}
                        >
                            {/* 华数站点定制 */}
                            {alias === 'hs' ? '管理登录' : '机构登录'}
                        </div>
                    )}
                </div>
            )
        }
    }

    const renderBySite = () => {
        /**
         * 渲染Placeholder
         * @returns {*}
         */
        const getPlaceholder = () => {
            const methods = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList

            // 为门户子应用时 直接展示 ['账号', '证件号码', '手机号码', '短信登录'] 登录方式
            if (portalCode) {
                // 区分个人和机构
                const fields = (
                    hooks.tabIndex === 1
                        ? ['账号', '证件号码', '手机号码']
                        : [
                              methods.includes('login_org_method4') && '账号',
                              methods.includes('login_org_method2') && '证件号码',
                              methods.includes('login_org_method1') && '手机号码',
                          ]
                ).filter(Boolean)

                return `请输入${fields.join('/')}`
            }
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
                    methods.includes('login_org_method7') && '手机号码',
                ].filter(Boolean)

                return `请输入${fields.join('/')}`
            }
        }

        // 抽离重复代码
        const AccountInput = ({ placeholder, rules }: { placeholder: string; rules: any }) => (
            <Form.Item name="account" rules={rules}>
                <Input className={styles.input} placeholder={placeholder} maxLength={30} />
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
            const alias = findSiteData(siteData!, 'alias', { findKey: 'baseInfo' }) || ''
            const ess_callback =
                findSiteData(siteData, 'ess_callback', { findKey: 'configList' }) || ''
            const loginType3 = isPersonalTab ? 'login_personal_method_qq' : 'login_org_method_qq'
            const faceLogin = isPersonalTab ? 'login_personal_method_face' : ''

            const qqAppid = findSiteData(siteData, 'qq_appid')?.value || '102105867'

            return (
                <>
                    {loginMethods.includes(loginType1) && (
                        <SuperLink href={goToQRcode('wx')} className={styles.wei_xin}>
                            <svg aria-hidden="true" className={classNames('icon', styles.svg_icon)}>
                                <use xlinkHref={`#icon_wechat`} />
                            </svg>
                        </SuperLink>
                    )}
                    {loginMethods.includes(loginType2) && (
                        <SuperLink href={goToQRcode('dd')} className={styles.ding_ding}>
                            <svg aria-hidden="true" className={classNames('icon', styles.svg_icon)}>
                                <use xlinkHref={`#icon_dingding`} />
                            </svg>
                        </SuperLink>
                    )}

                    {loginMethods.includes(loginType3) || alias === 'hun' ? (
                        <QQBtn qqAppid={qqAppid} userType={hooks.tabIndex} />
                    ) : null}
                    {/** 电子社保卡登录 */}
                    {ess_callback ? (
                        <SocialSecurityBtn userType={hooks.tabIndex} hooks={hooks} />
                    ) : null}
                    {/** 人脸识别登录 */}
                    {loginMethods.includes(faceLogin) ? (
                        <SuperLink
                            href={`/user/face-login${urlSearch ? urlSearch : ''}`}
                            className={styles.wei_xin}
                        >
                            <svg aria-hidden="true" className={classNames('icon', styles.svg_icon)}>
                                <use xlinkHref={`#icon_renlianshibie-copy`} />
                            </svg>
                        </SuperLink>
                    ) : null}
                    {/** 国网 */}
                    {nncAlias === alias && (
                        <SuperLink href={goToQRcode('nnc')} className={styles.ding_ding}>
                            <img
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/icon_guowang_f5b6d830.png"
                                className={styles.svg_icon}
                            />
                        </SuperLink>
                    )}
                </>
            )
        }

        /**
         *其他登录方式
         */
        const otherWay = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personList : hooks.orgList
            const alias = findSiteData(siteData!, 'alias', { findKey: 'baseInfo' }) || ''
            const ess_callback =
                findSiteData(siteData, 'ess_callback', { findKey: 'configList' }) || ''
            /**
             * ess_callback
             * 就创平台（https://www.jczppt.com）、新职业平台（https://www.xzyzxpx.com）
             * 展示电子社保卡登录方式
             * hun
             * 湖南 展示qq登录方式
             * nncAlias
             * 国家网络
             */
            const aliasWhiteList = ['hun', nncAlias]
            console.log('alias', alias)
            if (methodList.length !== 0 || aliasWhiteList.includes(alias) || ess_callback) {
                return (
                    <>
                        <Divider className={styles.other_way_divider}>
                            <div className={styles.other_way}>其他登录方式 {loginMethod()}</div>
                        </Divider>
                    </>
                )
            }

            return null
        }
        //短信
        const shortMessage = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList
            const temp =
                findConfigValueToBoolean?.(
                    siteData,
                    hooks.tabIndex === 1 ? 'login_personal_method3' : 'login_org_method3',
                ) || false

            const length = methodList?.length

            if (temp && length !== 0) {
                return (
                    <a
                        onClick={() => {
                            hooks.setLoginType(2)
                        }}
                    >
                        切换短信登录
                    </a>
                )
            }

            if (portalCode) {
                return (
                    <a
                        onClick={() => {
                            hooks.setLoginType(2)
                        }}
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
                siteData,
                hooks.tabIndex === 1 ? 'login_personal_method3' : 'login_org_method3',
            )
            const length = methodList.length

            if (temp && length !== 0) {
                return (
                    <a
                        onClick={() => {
                            hooks.setLoginType(1)
                        }}
                    >
                        切换账号登录
                    </a>
                )
            }

            if (portalCode) {
                return (
                    <a
                        onClick={() => {
                            hooks.setLoginType(1)
                        }}
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
            if (hooks.loginTypes === 3) return null
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
        /** 手机短信验证码登录 */
        const numberMessageLogin = () => {
            return (
                <div>
                    <Form.Item
                        name="account"
                        rules={[{ required: true, message: getPlaceholder() }]}
                    >
                        <Input
                            className={styles.input}
                            placeholder={getPlaceholder()}
                            maxLength={30}
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input.Password
                            className={styles.input}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
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
                </div>
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
                case 3:
                    return numberMessageLogin()
                default:
                    return null
            }
        }

        /**
         *忘记密码
         */
        const forgetPassword = () => {
            const methodList = hooks.tabIndex === 1 ? hooks.personalList : hooks.mechanismList

            if ((hooks.loginTypes === 1 && methodList.length !== 0) || hooks.loginTypes === 3) {
                return (
                    <SuperLink href="/user/forget" className={styles.forget_btn}>
                        忘记密码？
                    </SuperLink>
                )
            }
            return null
        }

        /**
         * 条件渲染注册按钮
         * 私密门户不渲染注册
         */
        const renderRegistBtn = () => {
            if (hooks.loginTypes === 2) return null
            if (portalCode) {
                if (!isNaN(privacyPortalFlag)) {
                    // 机构没有注册入口
                    if (Number(privacyPortalFlag) === 0 && hooks.tabIndex === 1) {
                        return (
                            <a className={styles.register} onClick={goToRegister}>
                                还没有账号？<span>立即注册</span>
                            </a>
                        )
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            } else {
                return (
                    hooks.regList.includes(
                        hooks.tabIndex === 1 ? 'login_personal_register' : 'login_org_register',
                    ) && (
                        <a className={styles.register} onClick={goToRegister}>
                            还没有账号？<span>立即注册</span>
                        </a>
                    )
                )
            }
        }

        const renderLoginBtn = () => {
            return (
                <>
                    {(isOrgLogin || isPersonLogin) && renderLoginType()}

                    <div className={styles.forget_option}>
                        {renderDom()}

                        {/* 忘记密码 */}
                        {forgetPassword()}
                    </div>

                    {(isOrgLogin || isPersonLogin) && (
                        <Form.Item className={styles.login_item}>
                            <Button type="primary" htmlType="submit" className={styles.login_btn}>
                                {isShowRegister && hooks.loginTypes === 2 && '注册/'}
                                登录
                            </Button>
                        </Form.Item>
                    )}

                    {renderRegistBtn()}
                    {isShowRegister && hooks.loginTypes === 2 && (
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
                    )}

                    {portalCode ? null : otherWay()}
                </>
            )
        }
        //OAuthLogin  判断是否是钉工匠站点
        const renderIsANailCraftsman = () => {
            if (hooks.tabIndex === 1) {
                let alias = findSiteData(siteStore!, 'alias', { findKey: 'baseInfo' }) || ''
                if (alias && alias === 'xzy') {
                    setSessionStorage('AUTH_USER_TYPE', hooks.tabIndex || 1)

                    if (!isloading && Number(logintype) === 2) {
                        return null
                    } else {
                        // @ts-ignore
                        return <OAuthLogin authType={'dd'} isDingGongJiang={true} />
                    }
                } else {
                    return renderLoginBtn()
                }
            } else {
                return renderLoginBtn()
            }
        }

        return (
            <div className={styles.page}>
                {getAllowLoginType()}

                {/* {hooks.tabIndex === 1 ? (
                    hooks.loginTypes === 1 && hooks.personalList.length !== 0 ? (
                        <Alert
                            className={styles.alert}
                            showIcon
                            message="首次建议使用证件号登录，可尝试初始密码：证件号后6位或手机号后6位"
                            type="warning"
                        />
                    ) : null
                ) : null}
                {hooks.tabIndex === 2 ? (
                    hooks.loginTypes === 1 && hooks.mechanismList.length !== 0 ? (
                        <Alert
                            className={styles.alert}
                            showIcon
                            message="若未设置过密码，可尝试初始密码：证件号后6位或手机号后6位"
                            type="warning"
                        />
                    ) : null
                ) : null} */}
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
                    onValuesChange={e => {
                        const { account } = e
                        if (account) {
                            setSessionStorage('LAST_LOGIN_ACCOUNT', account)
                        }
                    }}
                >
                    {renderIsANailCraftsman()}
                </Form>
            </div>
        )
    }

    return renderBySite()
}

export default inject('siteStore', 'userStore')(observer(Login))
