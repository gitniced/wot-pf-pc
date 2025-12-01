import type { IRouteComponentProps } from 'umi'
import { Redirect } from 'umi'
import * as Storage from '@/storage'
import { getLocalStorage } from '@/storage/localStorage'
import { inject, observer } from 'mobx-react'
import { findConfigValueToBoolean, findSiteData } from '@wotu/wotu-components'
// import isNotFount from '@/utils/hasRouteMatch'
import { assertCurrentOrigin } from '@/utils/urlUtils'
import { MERCHANT_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import { getCookie } from '@/storage'

const UserWrapper = (props: IRouteComponentProps) => {
    const { siteData } = props?.siteStore || {}
    // const is404 = isNotFount(props)
    const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value

    const userToken = Storage.getCookie('TOKEN')
    const ignorePathName = [
        '/user/authmiddle',
        '/user/middle/qq',
        '/account/user/authmiddle',
        '/account/user/middle/qq',
    ]
    if (ignorePathName.includes(window.location.pathname)) return props.children
    const merchantPath = findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
    if (userToken) return <Redirect to="/account" />
    // TODO 动态路由不前往404
    // if (is404) return <Redirect to="/404" />
    // debugger

    // 是否为门户登录页
    const isPortal = Storage.getSessionStorage('PLATFORM') === 'portal'
    // 站点是否打开个人登录
    const perosonalSSO = findSiteData(siteData, 'login_personal_sso', {
        findKey: 'configList',
    })?.value
    const isPersonLogin =
        findConfigValueToBoolean(siteData, 'login_personal_device_pc') &&
        (perosonalSSO !== '1' || isPortal)
    // 站点是否打开机构登录 门户登录页没有机构登录
    const orgSSO = findSiteData(siteData, 'login_org_sso', { findKey: 'configList' })?.value
    const isOrgLogin =
        findConfigValueToBoolean(siteData, 'login_org_device_pc') && (orgSSO !== '1' || isPortal)

    let isSignLogin = Number(isPersonLogin) + Number(isOrgLogin) === 0
    if (isSignLogin) {
        return null
    } else if (assertCurrentOrigin(merchantPath)) {
        let source_type = getLocalStorage('SOURCE_TYPE')
        const personMerchantRoute = getCookie('PERSON_MERCHANT_ROUTE')
        if (source_type === MERCHANT_LOGIN_TYPE.PERSON_TEACHER) {
            return <Redirect to={`/teacher/${personMerchantRoute}/login`} />
        } else {
            return <Redirect to={`/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`} />
        }
    } else {
        const siteAlias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' })
        if (location.pathname === '/account/user/login' && siteAlias === 'engineer') {
            return <Redirect to="/engineer" />
        } else if (
            location.pathname === '/account/user/login' &&
            kp_org_login_theme === '/egzlogin'
        ) {
            return <Redirect to="/egzlogin" />
        } else if (
            location.pathname === '/account/user/login' &&
            kp_org_login_theme === '/sclogin'
        ) {
            return <Redirect to="/sclogin" />
        } else {
            return <div>{props.children}</div>
        }
    }
}

export default inject('siteStore')(observer(UserWrapper))
