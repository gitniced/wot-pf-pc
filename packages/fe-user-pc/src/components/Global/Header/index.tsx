import type SiteStore from '@/stores/siteStore'
import { useEffect, useState } from 'react'
import type UserStore from '@/stores/userStore'
import { Dropdown, Menu, Button } from 'antd'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
// import type { HeaderProps } from './interface'
import headerHooks from './hooks'
import { history } from 'umi'
import { findSiteData, getMerchantWorkBench, SuperLink } from '@wotu/wotu-components'
import { getCookie, getLocalStorage } from '@/storage'
import { getDomain } from '@/utils/urlUtils'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
// import { getMasterHistory } from '@/utils/masterHistoryVO'

const Header = observer(
    (props: {
        userStore?: UserStore
        siteStore?: SiteStore
        noUser?: boolean
        title?: string
        noBg?: boolean
        isLock?: boolean
        padding?: boolean
        // 是否展示右边的按钮区域 默认为true 展示
        showSetting?: boolean
        // 是否展示回到首页按钮 (账号锁定和选择机构 隐藏回到首页按钮)
        showGoToHome?: boolean
    }) => {
        let {
            userStore,
            siteStore,
            noUser,
            title,
            noBg = false,
            padding = true,
            showSetting = true,
            showGoToHome = true,
        } = props || {}
        const { location } = history
        const { pathname } = location
        const firstPath = location.pathname?.split('/').filter(Boolean)[0] || ''
        // 选择机构页隐藏回到首页按钮
        showGoToHome = firstPath === 'select' ? false : showGoToHome

        // 登录流程相关页面,需要有一些定制
        const loginUrlList = [
            '/select/organization',
            '/user/login',
            '/user/school/login',
            '/user/company/login',
            '/user/register',
            '/user/agreement',
            '/user/forget',
            '/lock/person',
            '/select/seller-organization',
            '/user/agreement',
            '/user/authmiddle',
            '/user/middle/qq',
            '/user/binding',
            '/user/qrcode',
            '/reset-pwd',
            '/seller/login',
            '/account/select/organization',
            '/account/user/login',
            '/account/user/school/login',
            '/account/user/company/login',
            '/account/user/register',
            '/account/user/agreement',
            '/account/user/forget',
            '/account/lock/person',
            '/account/select/seller-organization',
            '/account/user/agreement',
            '/account/user/authmiddle',
            '/account/user/middle/qq',
            '/account/user/binding',
            '/account/user/qrcode',
            '/account/reset-pwd',
            '/account/seller/login',
        ]

        const userToken = getCookie('TOKEN')
        const [isLoginPage, setIsLoginPage] = useState(false)
        useEffect(() => {
            if (pathname.includes('/user/login') || pathname.includes('/select/organization')) {
                setIsLoginPage(true)
            }
        }, [])
        let { siteData } = siteStore!
        // let { data } = siteData
        // data = data || {}
        const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value
        // const sid = findSiteData(siteData, 'sid')
        const hooks = headerHooks()

        const gotoPcDomain = (path?: string) => {
            // 资源方工作台地址
            const merchantUserDomain =
                findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''

            if (merchantUserDomain === getDomain()) {
                const redirectUrl = getMerchantWorkBench(
                    siteStore?.siteData,
                    getLocalStorage('SOURCE_TYPE') || getCookie('SOURCE_TYPE'),
                )
                if (RUN_ENV !== 'local') {
                    return redirectUrl
                } else {
                    return '/account/account'
                }
            } else {
                const portalCode = getPortalCodeFromUrl()
                if (portalCode) {
                    const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
                    return `/${currentDomain}/home`
                } else {
                    const pcDomain =
                        findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
                    if (pcDomain) {
                        return path || pcDomain
                    } else {
                        return '/account/account'
                    }
                }
            }
        }

        const HeaderMenu = () => {
            return (
                <Menu>
                    <Menu.Item key={`my_header_menu`} onClick={userStore?.login_out}>
                        <div className={styles.header_menu}>
                            <svg
                                className={[styles.header_menu_icon, 'icon'].join(' ')}
                                aria-hidden="true"
                            >
                                <use xlinkHref={`#icon_tuichu`} />
                            </svg>
                            <div className={styles.header_menu_name}>退出登录</div>
                        </div>
                    </Menu.Item>
                </Menu>
            )
        }

        /** 获取页面文字描述 */
        const getHeaderTitle = () => {
            if (firstPath.includes('organization')) {
                return '机构中心'
            } else if (firstPath.includes('transaction')) {
                return '订单中心'
            }
            let titleFlag = loginUrlList.includes(pathname)
            // 特殊页面以及未登陆页面不显示title
            if (titleFlag || !userToken) {
                if (pathname === '/user/login' && siteStore?.portalCode) {
                    const getawayData: any = siteStore?.portalData?.[siteStore?.portalCode] || {}
                    return (
                        getawayData?.navigationImgType === 0 &&
                        (getawayData?.shortName || getawayData?.organizationName)
                    )
                }
                return ''
            } else {
                return '账号设置'
            }
        }

        /** 获取页面log */
        const getHeaderLogo = () => {
            let defaultKey = Number(siteData?.data?.sid) === 1 ? 'merchant_logo' : 'pc_logo'
            let currentLogo = ''

            if (kp_org_login_theme === '/egzlogin' && getCookie('SELECT_USER_TYPE') === 'org') {
                // 如果是贵州定制登录页并且是机构身份 写死logo
                return 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/nx_wap.jpg'
            }

            if (kp_org_login_theme === '/sclogin') {
                // 如果是贵州定制登录页并且是机构身份 写死logo
                return 'https://static.zpimg.cn/public/sclogin/sc_rect_logo_1.png'
            }

            console.log(siteStore?.portalCode)
            // 当当前为门户子应用时使用门户logo
            if (siteStore?.portalData?.[siteStore?.portalCode]) {
                return siteStore?.portalData?.[siteStore?.portalCode]?.naviLogo
            }

            defaultKey = loginUrlList.includes(pathname) ? defaultKey : 'wap_logo'

            currentLogo = findSiteData(siteData, defaultKey)?.value || defaultLogo
            return currentLogo
        }
        const toUserCenter = () => {
            let loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
            return gotoPcDomain(loginUrl)
        }
        const showToUserCenterTitle = ['transaction']
        const isShowToUserCenter = (_title: string) => showToUserCenterTitle.includes(_title)

        return (
            <div
                className={[
                    styles.page,
                    isLoginPage && styles.login,
                    padding && styles.page_pad,
                ].join(' ')}
                style={noBg ? { boxShadow: 'none', background: 'none' } : {}}
            >
                <div
                    className={styles.logo_content}
                    onClick={() => {
                        if (pathname === '/reset-pwd') {
                            return
                        }
                        hooks.backToHome(title)
                    }}
                >
                    <img
                        src={getHeaderLogo()}
                        style={{ objectFit: 'contain' }}
                        className={[styles.ract, padding && styles.logo_pad].join(' ')}
                    />
                    <div className={styles.site_name}>{getHeaderTitle()}</div>
                </div>

                {showSetting && (
                    <div className={styles.setting}>
                        {showGoToHome &&
                        findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) ===
                            getDomain() &&
                        kp_org_login_theme !== '/sclogin' &&
                        kp_org_login_theme !== '/egzlogin' ? (
                            <SuperLink href={gotoPcDomain()} className={styles.back}>
                                <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                                    <use xlinkHref={`#icon_top_home`} />
                                </svg>
                                <span>回到首页</span>
                            </SuperLink>
                        ) : (
                            <>
                                {isShowToUserCenter(title!) && (
                                    <Button
                                        className={styles.back_user_center}
                                        href={toUserCenter()}
                                        onClick={e => {
                                            e.preventDefault()
                                            window.location.href = toUserCenter()
                                        }}
                                    >
                                        回到用户中心
                                    </Button>
                                )}

                                {showGoToHome &&
                                    kp_org_login_theme !== '/sclogin' &&
                                    kp_org_login_theme !== '/egzlogin' && (
                                        <SuperLink href={gotoPcDomain()} className={styles.back}>
                                            <svg
                                                className={[styles.icon, 'icon'].join(' ')}
                                                aria-hidden="true"
                                            >
                                                <use xlinkHref={`#icon_top_home`} />
                                            </svg>
                                            <span>回到首页</span>
                                        </SuperLink>
                                    )}
                            </>
                        )}
                        {!noUser && userToken ? (
                            <Dropdown overlay={HeaderMenu} overlayClassName={styles.header_menu_bg}>
                                <div
                                    className={styles.avatar}
                                    style={{
                                        background: `url('${
                                            userStore?.userData?.avatar ||
                                            siteStore?.siteAvatar ||
                                            defaultAvatar
                                        }')
                no-repeat center / contain`,
                                    }}
                                />
                            </Dropdown>
                        ) : null}
                    </div>
                )}
            </div>
        )
    },
)

export default inject('userStore', 'siteStore')(Header)
