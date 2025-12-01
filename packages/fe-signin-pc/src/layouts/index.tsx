/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'
import zhCN from 'antd/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import type { IRoute } from 'umi'
import { useModel } from 'umi'
import '@/styles/antd.variable.css'
import '@/styles/global.css'
import { ConfigProvider } from 'antd'
import packageInfo from '../../package.json'
import MyEmpty from '@/components/Empty'
import { SuperProvider, findSiteData } from '@wotu/wotu-components'
import { setSessionStorage, delSessionStorage, getCookie } from '@/storage'
import styles from './index.module.less'
import setCssVars from '@/utils/setCssVars'
const GlobalLayout = observer((props: IRoute) => {
    const { name: packageName } = packageInfo
    const { userStore, siteStore } = props || {}
    const masterModel = useModel('@@qiankunStateFromMaster')
    let {
        tag,
        masterStore,
        masterHistory,
        gatewayUserStore,
        gatewaySiteStore,
        getOrganizationCode,
        // portalData, //父应用直接解构出的门户对象 未响应mobx数据更新，暂时使用gatewaySiteStore获取
    } = masterModel || {}
    const { portalData = {} } = gatewaySiteStore || {}
    const currentPortalCode = getOrganizationCode?.() || ''

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
                userStore.updatePortalData(portalData)
                siteStore.updateTag(currentTag)
                siteStore.updateHistory(masterHistory)
                siteStore.updateSiteData(gatewaySiteStore?.siteData)
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

    return (
        <ConfigProvider prefixCls={packageName} locale={zhCN} renderEmpty={MyEmpty}>
            {/* <div className={classNames(styles[`container_${tag}`])}>
                {themeChanged ? props.children : null}
            </div> */}
            <SuperProvider
                value={{
                    prefixCls: packageName,
                }}
            >
                {themeChanged ? props.children : null}
            </SuperProvider>
        </ConfigProvider>
    )
})

export default inject('userStore', 'siteStore')(GlobalLayout)
