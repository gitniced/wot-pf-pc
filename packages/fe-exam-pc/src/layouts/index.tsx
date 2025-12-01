// styles
import '@/styles/modified.css'
import '@/styles/global.css'
import styles from './index.module.less'

// components
import { ConfigProvider } from 'antd'
import { Provider } from 'mobx-react'

// locale
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
// type
import type { IRoute } from 'umi'
// @ts-ignore
import { history } from 'umi'
import { useEffect } from 'react'
import getMasterProps from '@/stores/masterStore'
import { defaultColor, withoutColorRoutes } from './config'
import { findSiteData } from '@/utils/valueGet'
import { setRootVarStyleColor } from '@/utils/changeTheme'
import type { ThemeObj } from '@/utils/changeTheme'
import { SuperProvider } from '@wotu/wotu-components'
import { observer } from 'mobx-react'
import useSiteStore from '@/hooks/useSiteStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import MyEmpty from '@/components/MyEmpty'

const GlobalLayout = (props: IRoute) => {
    const {
        masterStore = {},
        gatewaySiteStore = {},
        getOrganizationCode,
        tag = 'workbench',
    } = getMasterProps()

    const siteStore = useSiteStore()
    const masterHistory = useMasterHistory()

    // 是否需要写死主题色
    const isStaticColor = () => {
        const { pathname } = masterHistory.location
        return withoutColorRoutes.some(item => pathname.includes(item))
    }

    const getThemeColor = () => {
        const themeColor = findSiteData(siteStore?.siteData, 'theme_color')?.value
        /**  门户颜色  */
        const { portalData } = gatewaySiteStore || {}
        const currentOrgData = portalData?.[getOrganizationCode()] || {}
        const { themeColor: themeColor_portal } = currentOrgData || {}

        return themeColor || themeColor_portal
    }

    useEffect(() => {
        let themeConfig: Partial<ThemeObj> & Record<string, string> = {}
        const { configList = [] } = siteStore?.siteData.data ?? {}
        configList?.map((item: any) => {
            if (item.key.includes('theme_color')) {
                themeConfig[item.key] = !isStaticColor() ? item?.value : defaultColor
            }
        })

        if (tag === 'portal') {
            themeConfig = {
                ...themeConfig,
                theme_color: getThemeColor(),
                theme_color2: getThemeColor(),
                theme_color3: getThemeColor(),
            }
        }

        setRootVarStyleColor(themeConfig as any, () => {})

        ConfigProvider.config({
            prefixCls: 'exam-center',
            theme: {
                primaryColor: !isStaticColor() ? getThemeColor() : defaultColor,
            },
        })
    }, [gatewaySiteStore])

    useEffect(() => {
        document.onkeydown = () => {
            enterFullPage()
        }
    }, [])

    const enterFullPage = () => {
        if (history.location.pathname.includes('/test-manage')) {
            if (document.fullscreenElement) return
            document.body.requestFullscreen()
        }
    }

    return (
        <div className={styles.page} onClick={enterFullPage}>
            <Provider {...masterStore}>
                <ConfigProvider locale={zhCN} renderEmpty={MyEmpty} prefixCls="exam-center">
                    <SuperProvider
                        value={{
                            prefixCls: 'exam-center',
                            theme: {
                                primaryColor: !isStaticColor() ? getThemeColor() : defaultColor,
                            },
                        }}
                    >
                        {props.children}
                    </SuperProvider>
                </ConfigProvider>
            </Provider>
        </div>
    )
}

export default observer(GlobalLayout)
