import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'
// @ts-ignore
// import { history } from 'umi'
import Footer from './components/AdminFooter'
import Header from './components/AdminHeader'
import { Layout, message } from 'antd'
import styles from './index.module.less'
import sellerStore from './store'
import type { IRoute } from 'umi'
import type { SiteData } from '@/types'
import { getThemeClass } from '@/utils/changeTheme'
import { findSiteData } from '@wotu/wotu-components'
import type { THEME_ENUM } from '@/layouts/const'
import { THEME_MAP } from '@/layouts/const'
import { setCookie, setLocalStorage } from '@/storage'
// import { getThemeClass } from '@/utils/changeTheme'
// import { delLocalStorage, setLocalStorage } from '@/storage/localStorage'
// import { delCookie, setCookie, setSessionStorage } from '@/storage'
// import { LOGIN_TYPE, SOURCE_TYPE_MAPPING } from '@wotu/wotu-components/dist/esm/Types'

/**
 *  讲师登录
 */
const TeacherLayout = (props: { siteStore: SiteData } & IRoute) => {
    // const { companyBackUrl } = history.location.query || {}
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

    const [isNotLayout, setIsNotLayout] = useState(false)
    const noLayout = ['/teacher/mlh/agreement', '/teacher/job/agreement']

    useEffect(() => {
        setLocalStorage('SOURCE_TYPE', 'person_teacher')
        setCookie('SOURCE_TYPE', 'person_teacher')
        if (noLayout.filter(item => location.pathname.includes(item)).length > 0) {
            setIsNotLayout(true)
        } else {
            setIsNotLayout(false)
        }
    }, [location.pathname])

    useEffect(() => {
        sellerStore.getLinkSellerSite().then(res => {
            updateTheme(res as SiteData)
        })
        if (!findSiteData(siteData, 'login_setting_personal_center')?.value) {
            message.error('该站点暂未开放资源方登录')
            setIsFindLayoutLoad(false)
        }
    }, [])

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
            {isNotLayout && isIsFindLayoutLoad && isLoad ? (
                props.children
            ) : (
                <Layout className={styles.page} style={{ backgroundImage: `url(${bg})` }}>
                    <Header
                        logo={
                            findSiteData(siteData, 'merchant_logo')?.value
                            // 'https://static.zpimg.cn/public/business_pc/gz_logo.png'
                        }
                        lecturerDomain={sellerStore?.sellerSite?.lecturerDomain || ''}
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

const ObserverUserLayout = inject('siteStore')(observer(TeacherLayout))

ObserverUserLayout.wrappers = ['@/wrappers/seller']

export default ObserverUserLayout
