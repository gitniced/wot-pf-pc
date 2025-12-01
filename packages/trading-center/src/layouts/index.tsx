import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import type { IRoute } from 'umi'
import packageInfo from '../../package.json'
import WarpLayout from './WarpLayout'
import { history, useModel } from 'umi'
import setCssVars from '@/utils/setCssVars'
import MyEmpty from '@/components/Empty'
import { findSiteData, ErrCatch, SuperProvider } from '@wotu/wotu-components'
import { delSessionStorage, getCookie, setSessionStorage } from '@/storage'
import { inject } from 'mobx-react'
import '@/styles/antd.variable.css'
import '@/styles/global.css'

const GlobalLayout = (props: IRoute) => {
    const { name: packageName } = packageInfo
    const masterProps = useModel('@@qiankunStateFromMaster')
    const organizationCode = getCookie('SELECT_ORG_CODE')
    const {
        tag,
        masterStore,
        masterHistory,
        gatewayUserStore,
        gatewaySiteStore,
        getOrganizationCode,
    } = masterProps || {}
    const { portalData = {} } = gatewaySiteStore || {}
    const currentPortalCode = getOrganizationCode?.() || ''
    const { userStore, siteStore } = props || {}
    // const { redirectLogin } = Hooks()

    const [themeChanged, setThemeChanged] = useState(false)

    const updateTheme = (themeColor: string = '#1890ff') => {
        setCssVars({ primaryColor: themeColor })
        ConfigProvider.config({
            prefixCls: packageInfo.name,
            theme: { primaryColor: themeColor },
        })
        setThemeChanged(true)
    }

    const updateByTag = (currentTag: string) => {
        let tempThemeColor: string = ''
        switch (currentTag) {
            case 'workbench':
                userStore.updateTag(currentTag)
                userStore.updateHistory(masterHistory)
                userStore.updateUserData(masterStore?.userStore?.userData)

                siteStore.updateTag(currentTag)
                siteStore.updateHistory(masterHistory)
                siteStore.updateSiteData(masterStore?.siteStore?.siteData)
                tempThemeColor =
                    findSiteData(masterStore?.siteStore?.siteData || {}, 'theme_color')?.value || ''
                updateTheme(tempThemeColor)
                break
            case 'portal':
                userStore.updateTag(currentTag)
                userStore.updateHistory(masterHistory)
                userStore.updateUserData(gatewayUserStore?.userData)
                userStore.updatePortalCode(currentPortalCode)
                userStore.updatePortalData(portalData)
                siteStore.updateTag(currentTag)
                siteStore.updateHistory(masterHistory)
                siteStore.updateSiteData(gatewaySiteStore?.siteData)
                siteStore.updatePortalCode(currentPortalCode)
                siteStore.updatePortalData(portalData)
                tempThemeColor = portalData?.[currentPortalCode]?.themeColor
                updateTheme(tempThemeColor)
                break
            default:
                userStore.updateTag('site')
                siteStore.updateHistory(masterHistory)
                getCookie('TOKEN') ? userStore.getUserData() : ''

                siteStore.updateTag('site')
                siteStore.updateHistory(masterHistory)
                siteStore.getSiteConfigByDebounce(updateTheme)
        }
    }

    /**tag变化后 更新父应用信息 */
    useEffect(() => {
        if (tag) {
            setSessionStorage('PLATFORM', tag)
        } else {
            delSessionStorage('PLATFORM')
        }
        updateByTag(tag)
    }, [tag, masterStore, gatewayUserStore, gatewaySiteStore, portalData])

    // 获取项目所有页面路由 提供给主应用 用作面包屑数据源
    useEffect(() => {
        let titleRoutes = props?.routes?.[0]?.routes || []
        const usefullyRoutes = titleRoutes
            // .filter((item: any) => item.title)
            .map(({ path, title }: any) => {
                return { path, title }
            })
        let is404 =
            usefullyRoutes?.filter((item: any) => item.path === props?.location?.pathname)
                .length === 0
        if (is404 && props?.location?.pathname !== '/') {
            if (masterStore?.masterHistory) {
                masterStore?.masterHistory.push('/404')
            }
        }
    }, [props?.routes?.[0]?.routes])

    useEffect(() => {
        userStore.getOrganizationData()
    }, [organizationCode])

    const pathName = history.location.pathname
    const ignoreLayoutPath = ['/order/payment', '/order/success', '/refund/apply', '/order/conduct']

    return (
        <ConfigProvider prefixCls={packageName} locale={zhCN} renderEmpty={MyEmpty}>
            <ErrCatch>
                <SuperProvider value={{ prefixCls: packageName }}>
                    {!themeChanged ? null : tag === 'workbench' ? (
                        props.children
                    ) : ignoreLayoutPath.includes(pathName) ? (
                        props.children
                    ) : (
                        <WarpLayout>{props.children}</WarpLayout>
                    )}
                </SuperProvider>
            </ErrCatch>
        </ConfigProvider>
    )
}

export default inject('userStore', 'siteStore')(GlobalLayout)
