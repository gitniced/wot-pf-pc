import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'
// @ts-ignore
import { history } from 'umi'
import Footer from './components/AdminFooter'
import Header from './components/AdminHeader'
import { Layout, message } from 'antd'
import styles from './index.module.less'
import sellerStore from './store'
import type { IRoute } from 'umi'
// import { getThemeClass } from '@/utils/changeTheme'
import type { SiteData } from '@/types'
import { getThemeClass } from '@/utils/changeTheme'
import { delLocalStorage, setLocalStorage } from '@/storage/localStorage'
import { findSiteData } from '@wotu/wotu-components'
import type { THEME_ENUM } from '@/layouts/const'
import { THEME_MAP } from '@/layouts/const'
import { delCookie, setCookie, setSessionStorage } from '@/storage'
import { LOGIN_TYPE, SOURCE_TYPE_MAPPING } from '@wotu/wotu-components/dist/esm/Types'

/**
 * 通过seller的sid和kind判断资源方业务域和资源方类型
 */
const UserLayout = (props: { siteStore: SiteData } & IRoute) => {
    const { sourceType, companyBackUrl } = history.location.query || {}
    const {
        siteStore: { siteData },
    } = props
    const [isLoad, setIsLoad] = useState(false)
    const [isIsFindLayoutLoad, setIsFindLayoutLoad] = useState(true)
    const updateTheme = (_data: SiteData) => {
        try {
            let themeObj: Record<'theme_color' | 'theme_color2' | 'theme_color3', string> = {
                theme_color: findSiteData(_data, 'theme_color')?.value,
                theme_color2: findSiteData(_data, 'theme_color')?.value,
                theme_color3: findSiteData(_data, 'theme_color3')?.value,
            }
            const themeClassObj = getThemeClass()
            themeClassObj.doChangeTheme(themeObj, () => {
                setIsLoad(true)
            })
        } catch (err) {
            setIsLoad(true)
        }
    }
    useEffect(() => {
        if ((sourceType as string) in SOURCE_TYPE_MAPPING) {
            setLocalStorage('SOURCE_TYPE', sourceType)
            setCookie('SELECT_USER_TYPE', LOGIN_TYPE.SELLER_LOGIN)
        } else {
            delLocalStorage('SOURCE_TYPE')
            delCookie('SELECT_USER_TYPE')
            if (location.pathname === '/seller/register') {
                message.error('!未获取到来源身份信息')
                setIsFindLayoutLoad(false)
            }
        }
    }, [sourceType])
    useEffect(() => {
        sellerStore.getLinkSellerSite().then(res => {
            updateTheme(res as SiteData)
        })
        if (!findSiteData(siteData, 'login_setting_merchant')?.value) {
            message.error('该站点暂未开放资源方登录')
            setIsFindLayoutLoad(false)
        }
    }, [])

    useEffect(() => {
        // 将企业资源方的回调地址保存到本地
        companyBackUrl && setSessionStorage('COMPANY_BACK_URL', companyBackUrl)
    }, [companyBackUrl])

    // 不依据站点配置渲染content的（使用专题登录页） 资源方身份的集合：企业
    const NO_CONTENT_CURRENT_SOURCE_LIST = ['company']
    // 在登录页时， 判断当前资源方来源类型是否在 NO_CONTENT_CURRENT_SOURCE_LIST中，是的话不展示默认layout
    let isBlankLayout =
        location.pathname.includes('/login') &&
        NO_CONTENT_CURRENT_SOURCE_LIST?.includes?.(String(sourceType || ''))

    const [bg, setBg] = useState('')
    const [center, setCenter] = useState(false)
    useEffect(() => {
        let loginTheme: THEME_ENUM = Number(findSiteData(siteData, 'login_theme')?.value || '1')
        let loginBackend = findSiteData(siteData, 'login_backend')?.value || ''
        let loginFormPosition = Number(findSiteData(siteData, 'login_form_position')?.value || '1')
        if (loginTheme !== 4) {
            setBg(THEME_MAP[loginTheme]?.bg)
            setCenter(THEME_MAP[loginTheme]?.center)
        } else {
            setBg(loginBackend)
            setCenter(loginFormPosition === 1)
        }
    }, [siteData])

    return (
        <>
            {isBlankLayout ? (
                isIsFindLayoutLoad && isLoad && props.children
            ) : (
                <Layout className={styles.page} style={{ backgroundImage: `url(${bg})` }}>
                    <Header
                        logo={
                            findSiteData(siteData, 'merchant_logo')?.value
                            // 'https://static.zpimg.cn/public/business_pc/gz_logo.png'
                        }
                        pcDomain={sellerStore?.sellerSite?.pc || ''}
                        showBack={false}
                        noBg={true}
                    />

                    <div className={styles.content}>
                        <div
                            className={styles.user_content}
                            style={center ? {} : { marginLeft: '762px' }}
                        >
                            {isIsFindLayoutLoad && isLoad && props.children}
                        </div>
                    </div>

                    <Footer
                        icp={findSiteData(siteData, 'icp_code')?.value}
                        cctv={findSiteData(siteData, 'cctv_code')?.value}
                        police={findSiteData(siteData, 'police_code')?.value}
                        linkPolice={findSiteData(siteData, 'link_police_code')?.value}
                        noBg={true}
                    />
                </Layout>
            )}
        </>
    )
}

const ObserverUserLayout = inject('siteStore')(observer(UserLayout))

ObserverUserLayout.wrappers = ['@/wrappers/seller']

export default ObserverUserLayout
