import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import 'dayjs/locale/zh-cn'
import initFontSize from '@/utils/initFontSize'
import { Redirect, history } from 'umi'
import type { IRoute } from 'umi'
import 'antd/dist/antd.less'
import '@/styles/global.css'
import '@/styles/antd.variable.css'
import Hooks from './hook'
import { getLocalPaths, getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { getThemeClass } from '@/utils/changeTheme'
import { getCookie, getSessionStorage, setCookie, setSessionStorage } from '@/storage'
import { findSiteData, bsaasTerminalMap, useSingleVConsole } from '@wotu/wotu-components'
import { getCurrentConfig, splitPath } from '@/utils/layoutConfig'
import type { LayoutConfigItem } from '@/stores/interface'
import MineLayout from './components/MineLayout'
import NormalLayout from './components/NormalLayout'
import { getFirstMenuRoute } from '@/utils/routeAnalysis'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import BrushQstDetailsModal from '@/components/BrushQstDetailsModal'
import TerminalModal from '@/components/TerminalModal'
import BaseLayout from './components/BaseLayout'
// import VConsole from 'vconsole'

let globalStorageEvent: NodeJS.Timeout | null = null
const GlobalLayout = (props: IRoute) => {
    useSingleVConsole()
    const {
        userStore,
        siteStore,
        location: { query = {} },
    } = props || {}

    const { addOnlineListen, removeOnlineListen, redirectLogin } = Hooks()
    const [portalCode, setPortalCode] = useState('')
    const [hasPortal, setHasPortal] = useState(false)
    const [themeChanged, setThemeChanged] = useState(false)
    const [rightTerminalJudge, setRightTerminalJudge] = useState<boolean>(true)
    const [terminalMapUrl, setTerminalMapUrl] = useState<string>('')
    const [currentLayoutConfig, setCurrentLayoutConfig] = useState<LayoutConfigItem>({
        path: '',
        header: true,
        footer: true,
    })

    const doRequestOrgCode = () => {
        let currentAlias = location.pathname.split('/')?.[1] || ''
        const currentPortalCodeObj = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ') || {}
        // 当本地存在别名对应机构code时 直接使用本地
        if (currentPortalCodeObj[currentAlias]) {
            setPortalCode(currentPortalCodeObj[currentAlias])
            setHasPortal(true)
        } else {
            // 当本地不存在别名对应机构code时 通过接口去换取机构code并存入本地
            Http(`${globalApi.getPortalCodeByAlias}${currentAlias}`, 'get', {
                customDomain: currentAlias,
            }).then(res => {
                if (res) {
                    currentPortalCodeObj[currentAlias] = res
                    setSessionStorage('CURRENT_PORTAL_ALIAS_OBJ', currentPortalCodeObj)
                    setPortalCode(res as unknown as string)
                    setHasPortal(true)
                } else {
                    message.error('您访问的页面不存在')
                }
            })
        }
    }

    const doLoopVerify = () => {
        if (!globalStorageEvent) {
            globalStorageEvent = setInterval(() => {
                const tempPlatform = getSessionStorage('PLATFORM')
                if (!tempPlatform) {
                    console.log('PLATFORM被清除')
                    setPortalCode('')
                    setSessionStorage('PLATFORM', 'portal')
                    doRequestOrgCode()
                }
            }, 1000)
        }
    }


    /**页面初始化 数据获取 */
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // BUILD_ENV !== 'pro' ? new VConsole({ theme: 'dark' }) : ''

        setSessionStorage('PLATFORM', 'portal')
        doLoopVerify()
        getLocalPaths(props)
        addOnlineListen()
        initFontSize()
        siteStore.getSiteConfigByDebounce()
        message.config({
            top: 100,
            duration: 2,
            maxCount: 3,
        })
        return () => {
            globalStorageEvent
                ? (clearInterval(globalStorageEvent), (globalStorageEvent = null))
                : ''
            removeOnlineListen()
        }
    }, [])

    // 当layoutConfig或者pathname更新时判断当前布局
    useEffect(() => {
        const currentConfig = getCurrentConfig(userStore.layoutConfig)
        console.log('currentConfig', currentConfig)

        setCurrentLayoutConfig(currentConfig)
    }, [userStore.layoutConfig, location.pathname])

    // 当机构code改变时,或者路由改变,获取机构门户信息
    useEffect(() => {
        if (portalCode) {
            const userToken = getCookie('TOKEN')
            if (userToken) {
                setCookie('TOKEN', userToken, 7)
                // setCookie('SELECT_USER_TYPE', 'user')
                userStore.get_user_info()
            }

            userStore.getMicroNavData()
            siteStore.getPortalData(portalCode)
            /**  获取门户的页脚配置  */
            userStore.getPortalFooterConfig()
            /**  获取门户的悬浮窗配置  */
            userStore.getPortalFloatWindowConfig()
        }
    }, [portalCode, location.pathname])

    // 当路由改变时 更新门户code
    useEffect(() => {
        let currentAlias = location.pathname.split('/')?.[1] || ''
        if (!currentAlias) {
            message.error('您访问的页面不存在')
            return
        }
        const token = getCookie('TOKEN')
        const inLoginList = ['/user/login', '/user/forget', '/user/register']
        const isInLogin = inLoginList.some(i => location.pathname.includes(i))
        if (token && isInLogin) {
            location.href = `/${currentAlias}/home`
        }
        doRequestOrgCode()
        window.scrollTo(0, 0)
    }, [location.pathname])

    // 当机构code改变时,或者路由改变,获取机构门户信息
    useEffect(() => {
        const currentPortalData = siteStore.portalData?.[portalCode]
        if (currentPortalData) {
            const { themeColor, privacyPortalFlag } = currentPortalData || {}
            const themeChangeHandler = getThemeClass()
            themeChangeHandler.changeTheme(
                {
                    theme_color: themeColor,
                    theme_color2: themeColor,
                    theme_color3: themeColor,
                },
                () => {
                    setThemeChanged(true)
                },
            )
            // 当门户为私密门户时 必须先登录才可以浏览
            if (!isNaN(privacyPortalFlag)) {
                const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
                const loginUrl = `/${currentDomain}/user-center/user/login`
                const token = getCookie('TOKEN')
                const inLoginList = ['/user/login', '/user/forget', '/user/register']
                const isInLogin = inLoginList.some(i => location.pathname.includes(i))
                if (Number(privacyPortalFlag) === 1) {
                    if (!isInLogin) {
                        if (token) {
                            userStore.isPortalUser(portalCode)
                        } else {
                            setCookie('FROM_URL', location.href)
                            location.href = loginUrl
                        }
                    }
                }
            }
        }
    }, [siteStore.portalData, location.pathname])

    /**数据监听 获取数据成功后 根据sid和pathname重定向 */
    useEffect(() => {
        if (siteStore?.siteData?.data?.sid) {
            //@ts-ignore
            redirectLogin(siteStore?.siteData?.data?.sid, siteStore?.siteData)
            // const userToken = getCookie('TOKEN')
            // const userType = getCookie('SELECT_USER_TYPE')

            // if (userToken) {
            //     setCookie('TOKEN', userToken)
            //     setCookie('SELECT_USER_TYPE', userType)
            //     userStore.get_user_info()
            // }

            if (
                query.terminal !== 'none' &&
                !getSessionStorage('TERMINAL_NONE') &&
                props.location.pathname !== '/'
            ) {
                const currentTerminalMap = bsaasTerminalMap(siteStore?.siteData?.data || {})
                const { rightTerminal = true, url = '' } = currentTerminalMap || {}
                setRightTerminalJudge(rightTerminal)
                setTerminalMapUrl(url)
                console.log(currentTerminalMap, currentTerminalMap)
            } else {
                setSessionStorage('TERMINAL_NONE', 'none')
            }
        }
    }, [siteStore?.siteData?.data?.sid, props.location.pathname])

    /**用户权限数据不为空，且pathname为mine时 前往第一个路由 */
    useEffect(() => {
        let currentAlias = location.pathname.split('/')?.[1] || ''
        if (userStore.permissionList?.[currentAlias]?.length > 0) {
            if (portalCode) {
                if (
                    props.location.pathname === `/${currentAlias}/mine` ||
                    props.location.pathname === `/${currentAlias}/mine/`
                ) {
                    let routeList = getFirstMenuRoute(
                        userStore.permissionList?.[currentAlias] || [],
                    )
                    history.replace(`/${currentAlias}/mine${routeList[0]}`)
                }
            }
        }
    }, [props.location.pathname, userStore.permissionList])

    /**当获取到门户code时 再判断token是否存在 */
    useEffect(() => {
        if (portalCode) {
            if (!getCookie('TOKEN')) {
                userStore.initData()
            }
        }
    }, [portalCode, getCookie('TOKEN')])

    const isMineRoute = () => {
        const pathArr = splitPath(location.pathname)
        if (pathArr.length > 2) {
            if (pathArr[2] === 'mine') {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const getLayout = useCallback(() => {
        const { header, footer } = currentLayoutConfig || {}
        const policeCode = findSiteData(siteStore!.siteData, 'police_code')?.value || ''
        const icpCode = findSiteData(siteStore!.siteData, 'icp_code')?.value || ''
        const linkPoliceCode = findSiteData(siteStore!.siteData, 'link_police_code')?.value || ''
        const isMineLayout = isMineRoute()
        const userToken = getCookie('TOKEN')
        const currentDomain = getPortalCodeFromUrl({ isGetDomain: true }) || ''
        const currentPortalData = siteStore.portalData?.[portalCode] || {}
        const { privacyPortalFlag } = currentPortalData || {}

        const getPrivateLayoutVisible = (bool: boolean) => {
            if (userToken) {
                return bool
            } else {
                return false
            }
        }

        const showHeader =
            privacyPortalFlag?.toString() === '1' ? getPrivateLayoutVisible(header) : header
        const showFooter =
            privacyPortalFlag?.toString() === '1' ? getPrivateLayoutVisible(footer) : footer

        if (portalCode) {
            if (isMineLayout) {
                if (userToken) {
                    //@ts-ignore
                    return <MineLayout {...props} />
                } else {
                    setCookie('FROM_URL', location.href)
                    //@ts-ignore
                    return <Redirect to={`/${currentDomain}/user-center/user/login`} />
                }
            } else {
                const baseRoute = ['prohibit']
                const pathArr = splitPath(location.pathname)
                const isBase = baseRoute.includes(pathArr?.[2] || '')
                if (isBase) {
                    return <BaseLayout  {...props} />
                }

                return (
                    //@ts-ignore
                    <NormalLayout
                        {...props}
                        {...{
                            header: showHeader,
                            footer: showFooter,
                            policeCode,
                            icpCode,
                            linkPoliceCode,
                        }}
                    />
                )
            }
        } else {
            return null
        }
    }, [
        currentLayoutConfig,
        portalCode,
        userStore.microNav,
        location.pathname,
        window.location.search,
    ])

    /**
     * 当不是对应终端打开 且有对应页面时
     * 存储当前url到cookie
     * 跳转到对应终端的对应页面
     */
    useEffect(() => {
        if (query.terminal !== 'none' && !getSessionStorage('TERMINAL_NONE')) {
            if (!rightTerminalJudge && terminalMapUrl) {
                const old_url = getCookie('FROM_URL')
                setCookie('FROM_TERMINAL_URL', old_url || location.href)
                window.location.href = terminalMapUrl
            }
        }
    }, [rightTerminalJudge, terminalMapUrl])

    return themeChanged && hasPortal ? (
        <>
            {!rightTerminalJudge && !terminalMapUrl ? <TerminalModal /> : null}
            {getLayout()}
            {/* 刷题详情modal  */}
            {/*//@ts-ignore */}
            <BrushQstDetailsModal
                visible={userStore.brushQst.visible}
                onCancel={() => userStore.setBrushQstVisible(false)}
                practiceCode={userStore.brushQst.code}
                siteStore={siteStore}
            />
        </>
    ) : null
}

const ObserverGlobalLayout = inject('userStore', 'siteStore')(observer(GlobalLayout))

export default ObserverGlobalLayout
