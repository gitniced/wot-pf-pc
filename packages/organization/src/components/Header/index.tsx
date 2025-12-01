import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { Button, Dropdown, Menu } from 'antd'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
// import type { HeaderProps } from './interface'
// import * as Storage from '@/storage'
import { getMasterHistory } from '@/utils/masterHistoryVO'
import { findSiteData } from '@/utils/valueGet'
import { history } from 'umi'
import { getCookie, getLocalStorage } from '@/storage'
import { getMerchantWorkBench } from '@wotu/wotu-components'

const Header = observer(
    (props: {
        noUser: boolean
        noBg?: boolean
        noBack?: boolean
        userStore?: UserStore
        siteStore?: SiteStore
    }) => {
        const masterHistoryVO = getMasterHistory() || {}
        const { userStore, siteStore, noUser, noBg = false, noBack = false } = props || {}

        let { userOrg } = userStore!
        let { siteData } = siteStore!
        const userToken = getCookie('TOKEN')

        const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value
        const sid = findSiteData(siteData, 'sid')

        const backMenuFirst = () => {
            history.push('/detail')
        }

        const backHomePage = (path?: string) => {
            if (userToken) {
                if (sid.toString() === '1') {
                    const redirectUrl = getMerchantWorkBench?.(
                        siteStore?.siteData,
                        getLocalStorage('SOURCE_TYPE'),
                    )
                    if (RUN_ENV !== 'local') {
                        window.location.href = redirectUrl
                    } else {
                        masterHistoryVO?.masterHistory?.push('/account')
                    }
                } else {
                    const pcDomain =
                        findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' }) || ''
                    if (pcDomain) {
                        window.location.href = path || pcDomain
                    } else {
                        masterHistoryVO?.masterHistory?.push('/account')
                    }
                }
            } else {
                if ((sid || '')?.toString() !== '1') {
                    if (kp_org_login_theme === '/egzlogin') {
                        masterHistoryVO?.masterHistory?.replace('/account/egzlogin')
                    } else if (kp_org_login_theme === '/sclogin') {
                        masterHistoryVO?.masterHistory?.replace('/account/sclogin')
                    } else {
                        masterHistoryVO?.masterHistory?.replace('/account/user/login')
                    }
                } else {
                    masterHistoryVO?.masterHistory?.replace(
                        `/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`,
                    )
                }
            }
        }

        const gotoPcDomain = () => {
            masterHistoryVO?.masterHistory?.push('/account')
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
        const getHeaderLogo = () => {
            const currentLogo = findSiteData(siteData, 'pc_logo')?.value || ''
            return currentLogo
        }

        return (
            <div
                className={styles.page}
                style={noBg ? { boxShadow: 'none', background: 'none' } : {}}
            >
                <div className={styles.logo_content} onClick={backMenuFirst}>
                    <img
                        src={getHeaderLogo()}
                        style={{ objectFit: 'contain' }}
                        className={styles.ract}
                    />
                    {/* <div className={styles.site_name}>机构中心</div> */}
                </div>

                {userOrg?.length > 0 ? (
                    <div className={styles.setting}>
                        {!noBack && (
                            <>
                                <Button className={styles.back_user} onClick={gotoPcDomain}>
                                    回到用户中心
                                </Button>
                                {siteStore?.siteData?.data?.sid?.toString() === '1' ? (
                                    <div className={styles.back} onClick={() => backHomePage()}>
                                        <svg
                                            className={[styles.icon, 'icon'].join(' ')}
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref={`#icon_top_home`} />
                                        </svg>
                                        <span>回到首页</span>
                                    </div>
                                ) : (
                                    <div className={styles.back} onClick={() => backHomePage()}>
                                        <svg
                                            className={[styles.icon, 'icon'].join(' ')}
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref={`#icon_top_home`} />
                                        </svg>
                                        <span>回到首页</span>
                                    </div>
                                )}
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
                ) : (
                    <div className={styles.setting}>
                        {userStore?.userData?.lastLoginTs ? (
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
