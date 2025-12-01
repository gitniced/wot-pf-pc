import { useEffect, useState } from 'react'
import { ConfigProvider, message } from 'antd'
import 'dayjs/locale/zh-cn'
// import type { ThemeObj } from '@/utils/changeTheme'
// import { getThemeClass } from '@/utils/changeTheme'
import initFontSize from '@/utils/initFontSize'
// @ts-ignore
import { history, useModel } from 'umi'
import type { IRoute } from 'umi'
// import 'antd/dist/antd.less'
// import '@/styles/global.css'
import '@/styles/antd.variable.css'
import '@/styles/global.css'
import Hooks from './hook'
import Global from './global'
import LogoAndOut from './logoAndOut'
import User from './user'
// import Organization from './organization'
import Transaction from './transaction'
import { observer, inject } from 'mobx-react'
import {
    delCookie,
    delSessionStorage,
    getCookie,
    setCookie,
    setLocalStorage,
    setSessionStorage,
} from '@/storage'
import customMatchPath from '@/utils/customMatchPath'
import { findSiteData } from '@wotu/wotu-components'
import { getLocalPaths } from '@/utils/getPortalCodeFromUrl'
import { getMasterHistory } from '@/utils/masterHistoryVO'
import needLoaderUtils from '@/utils/needLoaderUtils'
import setCssVars from '@/utils/setCssVars'
import packageInfo from '../../package.json'
import zhCN from 'antd/es/locale/zh_CN'
import MyEmpty from '@/components/Global/Empty'
import { PERSON_TEACHER_IDENTITY_MAP } from '@/types'
import { getNowType } from '@/utils/userUtils'
import { USER_TYPE_NUM } from '@wotu/wotu-components/dist/esm/Types/user'

const GlobalLayout = observer((props: IRoute) => {
    const { name: packageName } = packageInfo
    const masterProps = useModel('@@qiankunStateFromMaster')
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
    const { userStore, siteStore, match } = props || {}

    // const { addOnlineListen, removeOnlineListen, redirectLogin, autoGetUserData, initPageSize } =
    //     Hooks()
    const { addOnlineListen, removeOnlineListen, redirectLogin, initPageSize } = Hooks()

    // const [themed, setThemed] = useState<boolean>(false)

    const [themeChanged, setThemeChanged] = useState(false)
    const [portalInfo, setPortalInfo] = useState(portalData)

    const updateTheme = (themeColor: string = '#1890ff') => {
        setCssVars({ primaryColor: themeColor })
        ConfigProvider.config({
            prefixCls: packageInfo.name,
            theme: { primaryColor: themeColor },
        })
        setThemeChanged(true)
    }

    const updateByTag = async (currentTag: string) => {
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
                // 单点登录 首次访问时需要先获取站点信息 否则无法获取token
                await siteStore.getSiteConfigByDebounce(updateTheme)
                if (
                    !location.pathname.includes('/teacher/mlh') &&
                    !location.pathname.includes('/teacher/job') &&
                    getCookie('TOKEN')
                ) {
                    userStore.getUserData()
                    userStore.getUserGroup()
                }

                siteStore.updateTag('site')
                siteStore.updateHistory(masterHistory)
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
    }, [tag, masterStore, gatewayUserStore, gatewaySiteStore, portalInfo])

    useEffect(() => {
        if (Object.keys(portalData).length) {
            setPortalInfo(portalData)
        }
    }, [portalData])

    const getLayout = () => {
        let pathname = props?.history?.location?.pathname || ''

        const logoAndOutLayout = ['select']
        const userLayout = ['user']
        const organizationLayout = ['organization']
        const transactionLayout = ['transaction']
        // 没有layout的一级路由
        const noLayout = [
            '404',
            '500',
            'lock',
            'enroll',
            'egzlogin',
            'sclogin',
            'quick-login',
            'reset-pwd',
            'keepalive',
            'engineer',
        ]
        // 没有layout的完整路由
        const fillNoLayout = [
            '/user/agreement',
            '/bind/idcard/policy',
            '/user/authmiddle',
            '/user/middle/qq',
            '/user/middle/social-security',
            '/engineer',  
            '/account/user/agreement',
            '/account/bind/idcard/policy',
            '/account/user/authmiddle',
            '/account/user/middle/qq',
            '/account/user/middle/social-security',
            '/account/engineer',
        ]
        const isSellerLayout = (currentPath: string) => {
            const sellerPath = currentPath.indexOf('/seller')
            const teacherPath = currentPath.indexOf('/teacher')
            if (sellerPath === 0 || teacherPath === 0) {
                return true
            } else {
                return false
            }
        }

        // 没有全部和没有部分layout的路由+资源方页面
        if (
            customMatchPath(noLayout) ||
            customMatchPath(fillNoLayout, true) ||
            isSellerLayout(pathname)
        ) {
            return props.children
        } else {
            /** 重置密码 */
            const whiteList = ['/lock', '/user', '/select']
            const inWhiteList = whiteList.some(item => location.href.indexOf(item) > -1)
            const userTypeList = ['2', '3']

            console.log(userStore?.userData?.isInitPassword && !inWhiteList)
            if (
                userStore?.userData?.isInitPassword &&
                !inWhiteList &&
                userTypeList.indexOf(getNowType()) > -1
            ) {
                history.push('/reset-pwd')
                return
            }

            const pathArr = props?.history?.location?.pathname.split('/')
            if (pathArr.length > 1 && pathArr[1]) {
                if (userLayout.includes(pathArr[1])) {
                    return <User {...props} />
                }
                if (logoAndOutLayout.includes(pathArr[1])) {
                    return <LogoAndOut {...props} />
                } else if (organizationLayout.includes(pathArr[1])) {
                    return props.children
                } else if (transactionLayout.includes(pathArr[1])) {
                    return <Transaction {...props} />
                } else {
                    return <Global {...props} />
                }
            } else {
                return null
            }
        }
    }

    /**tag变化后 更新父应用信息 */
    useEffect(() => {
        if (tag) {
            setSessionStorage('PLATFORM', tag)
        } else {
            delSessionStorage('PLATFORM')
        }
    }, [tag])

    /**页面初始化 数据获取 */
    useEffect(() => {
        getLocalPaths(props)
        let {
            location: { query },
        } = props
        let { logintype, extraTimeStatus } = query || {}
        /** 创培定制token过期时间 */
        if (extraTimeStatus?.toString?.() === '1') {
            setSessionStorage('EXTRA_TIME_STATUS', '1')
        }
        if (logintype) {
            setCookie('URL_LOGIN_TYPE', logintype)
        } else {
            delCookie('URL_LOGIN_TYPE')
        }
        needLoaderUtils()
        addOnlineListen()
        initFontSize()
        window.self_store = { userStore, siteStore }
        message.config({
            top: 100,
            duration: 2,
            maxCount: 3,
        })
        initPageSize()
        return removeOnlineListen
    }, [])

    /**数据监听 获取数据成功后 根据sid和token重定向 */
    useEffect(() => {
        const masterHistoryVO = getMasterHistory()
        let { sid } = siteStore?.siteData?.data || {}
        // 根据站点判断没有token时前往哪里
        if (sid) {
            setLocalStorage('SID', sid)
            // 当tag为portal时 说明是门户子应用
            // 此时需要判断是否是处于自身应用中，防止干扰主应用路由拦截
            if (siteStore?.tag === 'portal') {
                if (masterHistoryVO?.masterHistory?.location?.pathname.includes('/user-center')) {
                    redirectLogin(sid, siteStore, userStore)
                }
            } else if (props.location.pathname.indexOf('/keepalive') !== 0) {
                const { params } = match || {}
                const { orderIdentity } = params || {}
                const orderIdentityNum =
                    PERSON_TEACHER_IDENTITY_MAP[
                    orderIdentity as keyof typeof PERSON_TEACHER_IDENTITY_MAP
                    ]
                if (orderIdentityNum) {
                    setCookie('SELECT_IDENTITY_CODE', orderIdentityNum)
                }
                redirectLogin(sid, siteStore, userStore)
            }

            const { userType, workBench } = userStore || {}
            /*
            * 未登录情况
            *    判断锄禾单点登录情况 判断当前用角色是否启用单点登录
            * 已登录
            *    判断对应角色是否开启单点登录
            **/
            const orgSSO = findSiteData(siteStore?.siteData || {}, 'login_org_sso')?.value
            const personalSSO = findSiteData(siteStore?.siteData || {}, 'login_personal_sso')?.value
            const personalLogin = findSiteData(siteStore?.siteData || {}, 'login_personal_device_pc')?.value
            const orgLogin = findSiteData(siteStore?.siteData || {}, 'login_org_device_pc')?.value
            const curUserTypeNumber = getNowType()
            if (
                siteStore?.tag !== 'portal' &&
                siteStore?.siteData?.data?.sid !== 1 &&
                ((!getCookie('TOKEN') &&  
                    (Number(orgLogin) === 1 && Number(orgSSO) === 1 && (Number(personalLogin) !== 1 || Number(personalSSO) === 1) ||
                    Number(personalLogin) === 1 && Number(personalSSO) === 1 && (Number(orgLogin) !== 1 || Number(orgSSO) === 1))
                ) ||
                (
                    getCookie('TOKEN') &&
                    ((Number(curUserTypeNumber) === 1 && Number(personalSSO) === 1) ||
                    (Number(curUserTypeNumber) === 2 && Number(orgSSO) === 1))
                ))
            ) {
                let currentWorkBenchUrl = workBench[USER_TYPE_NUM[userType]]
                if (
                    currentWorkBenchUrl ||
                    findSiteData(siteStore?.siteData || {}, 'pcDomain')?.value
                ) {
                    window.location.href = currentWorkBenchUrl
                        ? currentWorkBenchUrl
                        : findSiteData(siteStore?.siteData || {}, 'pcDomain')?.value
                }
            }
        }
    }, [siteStore?.siteData?.data?.sid, props.location.pathname])

    return (
        <ConfigProvider prefixCls={packageName} locale={zhCN} renderEmpty={MyEmpty}>
            {themeChanged ? getLayout() : null}
        </ConfigProvider>
    )
})

export default inject('userStore', 'siteStore')(GlobalLayout)
