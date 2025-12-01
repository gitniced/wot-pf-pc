import React from 'react'
import { ConfigProvider, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'
import { history, useLocation, useModel } from 'umi'
import type { IRoute } from 'umi'

import { getPortalCodeFromUrl, SuperProvider } from '@wotu/wotu-components'

import MyEmpty from '@/components/MyEmpty'
import setCssVars from '@/utils/setCssVars'
import needLoaderUtils from '@/utils/needLoaderUtils'
import { delSessionStorage, getCookie, setLocalStorage, setSessionStorage } from '@/storage'

import Header from './header'
import Hooks from './hook'
import Footer from './Footer'

import '@/styles/antd.variable.css'
import '@/styles/global.css'
import styles from './index.module.less'

import packageInfo from '../../package.json'

const GlobalLayout = observer((props: IRoute) => {
    const location = useLocation()
    const { name: packageName } = packageInfo
    const { userStore, siteStore } = props || {}
    const masterModel = useModel('@@qiankunStateFromMaster')
    let {
        tag = 'site',
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
                userStore.updateUserType()

                siteStore.updateTag(currentTag)
                siteStore.getSiteData(updateTheme)

                if (getCookie('TOKEN')) {
                    userStore.getUserData()
                }
                break
            case 'portal':
                userStore.updateTag(currentTag)
                userStore.updateUserData(gatewayUserStore?.userData)
                userStore.updateUserType()

                siteStore.updateTag(currentTag)
                siteStore.updateHistory(masterHistory)
                siteStore.updateSiteData(gatewaySiteStore?.siteData)
                siteStore.updatePortalData(portalData)
                tempThemeColor = portalData?.[currentPortalCode]?.themeColor
                updateTheme(tempThemeColor)
                break
            case 'train':
                userStore.updateTag('train')
                getCookie('TOKEN') && userStore.getUserData()
                userStore.updateUserType()

                siteStore.updateTag('train')
                siteStore.updateHistory(masterHistory)
                siteStore.getSiteData(updateTheme)
                break
            default:
                userStore.updateTag('site')
                userStore.updateHistory(masterHistory)
                getCookie('TOKEN') && userStore.getUserData()
                userStore.updateUserType()

                siteStore.updateTag('site')
                siteStore.getSiteConfigByDebounce(updateTheme)
        }
    }

    /**tag变化后 更新父应用信息 */
    useEffect(() => {
        if (tag) {
            setSessionStorage('PLATFORM', tag)
            const notToSquareTagList = ['portal', 'workbench']
            if (location.pathname === '/' && !notToSquareTagList.includes(tag)) {
                history.replace('/square/index')
            }
        } else {
            delSessionStorage('PLATFORM')
        }
        updateByTag(tag)
    }, [tag, masterStore, gatewayUserStore, gatewaySiteStore])

    const { addOnlineListen, removeOnlineListen } = Hooks()

    // /**页面初始化 数据获取 */
    useEffect(() => {
        // getLocalPaths(props)
        needLoaderUtils()
        addOnlineListen()
        message.config({
            top: 100,
            duration: 2,
            maxCount: 3,
        })
        return removeOnlineListen
    }, [])

    /** 保存来源类型*/
    useEffect(() => {
        setLocalStorage('SOURCE_TYPE', getCookie('SOURCE_TYPE'))
    }, [getCookie('SOURCE_TYPE')])

    useEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [window.location.href])

    const getLayout = () => {
        let pathname = window.location.pathname || ''
        const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
        const isAdminLayout = (currentPath: string) => {
            const adminPath = currentPath.indexOf('/admin') > -1
            const portalAdminPath =
                currentPath.indexOf(`/${currentAlias}/employment-center/admin`) > -1
            const middleAdminPath = currentPath.indexOf(`/employment-center/admin`) > -1
            switch (tag) {
                case 'site':
                    return adminPath
                case 'portal':
                    return portalAdminPath
                case 'middle':
                    return true
                case 'train-gateway':
                    ;(window as any).unDealFontSize = true
                    return true
                default:
                    return middleAdminPath
            }
        }

        if (isAdminLayout(pathname)) {
            // 没有全部和没有部分layout的路由+资源方页面
            return props.children
        } else {
            return (
                <>
                    <Header />
                    <div className={styles.page}>{props.children}</div>
                    <Footer />
                </>
            )
        }
    }

    return (
        <ConfigProvider prefixCls={packageName} locale={zhCN} renderEmpty={MyEmpty}>
            <SuperProvider
                value={{
                    prefixCls: packageName,
                }}
            >
                {themeChanged ? getLayout() : null}
            </SuperProvider>
        </ConfigProvider>
    )
})

export default inject('userStore', 'siteStore')(GlobalLayout)
