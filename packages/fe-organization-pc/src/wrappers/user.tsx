import type { IRouteComponentProps } from 'umi'
import { Redirect } from 'umi'
import * as Storage from '@/storage'
import { getLocalStorage } from '@/storage/localStorage'
import { inject, observer } from 'mobx-react'
import { findSiteData } from '@wotu/wotu-components'
import isNotFount from '@/utils/hasRouteMatch'
import { assertCurrentOrigin } from '@/utils/urlUtils'

const UserWrapper = (props: IRouteComponentProps) => {
    const { siteData } = props?.siteStore || {}
    const is404 = isNotFount(props)
    const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value

    const userToken = Storage.getCookie('TOKEN')
    const ignorePathName = ['/user/authmiddle']
    if (ignorePathName.includes(window.location.pathname)) return props.children
    const merchantPath = findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
    if (userToken) return <Redirect to="/account" />
    if (is404) return <Redirect to="/404" />

    if (assertCurrentOrigin(merchantPath)) {
        return <Redirect to={`/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`} />
    } else {
        if (location.pathname === '/account/user/login' && kp_org_login_theme === '/egzlogin') {
            return <Redirect to="/account/egzlogin" />
        } else if (
            location.pathname === '/account/user/login' &&
            kp_org_login_theme === '/sclogin'
        ) {
            return <Redirect to="/account/sclogin" />
        } else {
            return <div>{props.children}</div>
        }
    }
}

export default inject('siteStore')(observer(UserWrapper))
