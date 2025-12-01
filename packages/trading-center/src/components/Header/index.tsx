import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { Dropdown, Menu, Button } from 'antd'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
// import type { HeaderProps } from './interface'
import { useModel } from 'umi'
import { findSiteData, getPortalCodeFromUrl } from '@wotu/wotu-components'
import { getCookie, getLocalStorage, getSessionStorage } from '@/storage'
import { MERCHANT_LOGIN_TYPE } from '@/types'
import type { MasterProps } from '@/types'
import { USER_TYPE_NUM } from '@wotu/wotu-components/dist/esm/Types/user'

const Header = observer(
    (props: { userStore: UserStore; siteStore: SiteStore; noUser: boolean; title: string }) => {
        const masterProps: MasterProps = useModel('@@qiankunStateFromMaster')
        const { userStore, siteStore, noUser, title } = props || {}
        const userToken = getCookie('TOKEN')

        let { siteData } = siteStore
        let { data } = siteData || {}
        data = data || {}
        const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value
        const sid = findSiteData(siteData, 'sid')
        const platform = getSessionStorage('PLATFORM')
        const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })

        const gotoPcDomain = () => {
            if (userToken) {
                if (sid.toString() === '1') {
                    // const pcDomain =
                    //     findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
                    const merchantMidDomain =
                        findSiteData(siteData, 'merchantMidDomain', { findKey: 'baseInfo' }) || ''
                    const courseMerchantDomain =
                        findSiteData(siteData, 'courseMerchantDomain', { findKey: 'baseInfo' }) ||
                        ''
                    const questionMerchantDomain =
                        findSiteData(siteData, 'questionMerchantDomain', { findKey: 'baseInfo' }) ||
                        ''
                    const sourceType = getLocalStorage('SOURCE_TYPE')
                    let redirectUrl = ''
                    switch (sourceType) {
                        case MERCHANT_LOGIN_TYPE.COURSE:
                            redirectUrl = courseMerchantDomain
                            break
                        case MERCHANT_LOGIN_TYPE.QUESTION:
                            redirectUrl = questionMerchantDomain
                            break
                        default:
                            redirectUrl = merchantMidDomain
                    }
                    if (RUN_ENV !== 'local') {
                        window.location.href = redirectUrl
                    } else {
                        location.href = `/account`
                    }
                } else {
                    if (platform === 'portal') {
                        location.href = `/${currentAlias}/home`
                    } else {
                        const pcDomain =
                            findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
                        if (pcDomain) {
                            window.location.href = pcDomain
                        } else {
                            location.href = '/account/account'
                        }
                    }
                }
            } else {
                if (platform === 'portal') {
                    location.href = `/${currentAlias}/home`
                } else {
                    if ((sid || '')?.toString() !== '1') {
                        if (kp_org_login_theme === '/egzlogin') {
                            location.replace('/account/egzlogin')
                        } else if (kp_org_login_theme === '/sclogin') {
                            location.replace('/account/sclogin')
                        } else {
                            location.replace('/account/user/login')
                        }
                    } else {
                        location.replace(
                            `/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`,
                        )
                    }
                }
            }
        }

        const HeaderMenu = () => {
            return (
                <Menu>
                    <Menu.Item key={`my_header_menu`} onClick={masterProps.loginOut}>
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

        /** 获取页面log */
        const getHeaderLogo = () => {
            let { configList } = data
            configList = configList || []
            let defaultKey = 'pc_logo'
            let currentLogo = ''
            if (
                kp_org_login_theme === '/egzlogin' &&
                getCookie('SELECT_USER_TYPE') !== 'merchant'
            ) {
                // 如果是贵州定制登录页并且不是资源方写死logo
                return 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/nx_wap.jpg'
            }

            if (kp_org_login_theme === '/sclogin' && getCookie('SELECT_USER_TYPE') !== 'merchant') {
                // 如果是贵州定制登录页并且不是资源方写死logo
                return 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/nx_wap.jpg'
            }

            switch (location.pathname) {
                case '/account/user/login':
                    defaultKey = 'pc_logo'
                    break
                case '/account/user/register':
                    defaultKey = 'pc_logo'
                    break
                case '/account/user/forget':
                    defaultKey = 'pc_logo'
                    break
                case '/user/login':
                    defaultKey = 'pc_logo'
                    break
                case '/user/register':
                    defaultKey = 'pc_logo'
                    break
                case '/user/forget':
                    defaultKey = 'pc_logo'
                    break
                default:
                    defaultKey = 'wap_logo'
            }

            configList.map(item => {
                if (item.key === defaultKey) {
                    currentLogo = item.value ? item.value : defaultLogo
                }
            })
            return currentLogo
        }
        const toUserCenter = () => {
            const { userType, workBench } = masterProps.masterStore.userStore || {}
            //@ts-ignore
            let currentWorkBenchUrl = workBench?.[USER_TYPE_NUM?.[userType]]

            window.location.href = currentWorkBenchUrl
        }

        const showToUserCenterTitle = ['transaction']
        const isShowToUserCenter = (_title: string) => showToUserCenterTitle.includes(_title)
        return (
            <div className={styles.page}>
                <div
                    className={styles.logo_content}
                    onClick={() => {
                        switch (platform) {
                            case 'portal':
                                location.href = `/${currentAlias}/transaction/order`
                                break
                            case 'workbench':
                                location.href = `/trading-center/order`
                                break
                            case 'middle':
                                location.href = `/transaction/order`
                                break
                            default:
                                location.href = `/order`
                        }
                    }}
                >
                    <img
                        src={getHeaderLogo()}
                        style={{ objectFit: 'contain' }}
                        className={styles.ract}
                    />
                    <div className={styles.site_name}>订单中心</div>
                </div>

                <div className={styles.setting}>
                    {siteStore?.siteData?.data?.sid?.toString() === '1' ? (
                        userStore?.currentOrgCertify ? (
                            <div className={styles.back} onClick={() => gotoPcDomain()}>
                                <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                                    <use xlinkHref={`#icon_top_home`} />
                                </svg>
                                <span>回到首页</span>
                            </div>
                        ) : null
                    ) : (
                        <>
                            {isShowToUserCenter(title) && (
                                <Button className={styles.back_user_center} onClick={toUserCenter}>
                                    回到工作台
                                </Button>
                            )}

                            <div className={styles.back} onClick={() => gotoPcDomain()}>
                                <svg className={[styles.icon, 'icon'].join(' ')} aria-hidden="true">
                                    <use xlinkHref={`#icon_top_home`} />
                                </svg>
                                <span>回到首页</span>
                            </div>
                        </>
                    )}

                    {!noUser && userStore?.userData?.lastLoginTs ? (
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
            </div>
        )
    },
)

export default inject('userStore', 'siteStore')<any>(Header)
