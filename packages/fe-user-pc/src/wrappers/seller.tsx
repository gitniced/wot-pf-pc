import { inject, observer } from 'mobx-react'
import type { IRouteComponentProps } from 'umi'
import { Redirect } from 'umi'
import { getCookie, setCookie } from '@/storage'
import { assertCurrentOrigin } from '@/utils/urlUtils'
import { findSiteData } from '@wotu/wotu-components'
import { useEffect } from 'react'
import { PERSON_TEACHER_IDENTITY_MAP } from '@/types'
import domainJson from '@/domain/domain.json'

const SellerWrapper = (props: IRouteComponentProps) => {
    const { siteStore, match, location } = props
    const { params } = match || {}
    const { orderIdentity } = params || {}
    // @ts-ignore
    const { siteData } = siteStore || {}

    const userToken = getCookie('TOKEN')
    const merchantPath = findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
    const kp_org_login_theme = findSiteData(siteData, 'kp_org_login_theme')?.value
    const toLogin = ['/teacher/mlh', '/teacher/job', '/teacher/mlh/', '/teacher/job/']

    useEffect(() => {
        const orderIdentityNum =
            PERSON_TEACHER_IDENTITY_MAP[orderIdentity as keyof typeof PERSON_TEACHER_IDENTITY_MAP]
        if (orderIdentityNum) {
            setCookie('SELECT_IDENTITY_CODE', orderIdentityNum)
            setCookie('PERSON_MERCHANT_ROUTE', orderIdentity)
        }
    }, [location.pathname])

    if (toLogin.includes(location.pathname)) {
        return <Redirect to={`/teacher/${orderIdentity}/login`} />
    }

    if (userToken && !props.location.query?.redirectUrl) {
        return <Redirect to="/account" />
    }

    if (RUN_ENV === 'local') {
        if (!isNaN(Number(domainJson?.SPECIAL_USER)) && Number(domainJson?.SPECIAL_USER) === 1) {
            // 是资源方展示
            return <div>{props.children}</div>
        } else {
            // 非资源方跳转对应的登录页
            if (kp_org_login_theme === '/egzlogin') {
                return <Redirect to="/egzlogin" />
            } else if (kp_org_login_theme === '/sclogin') {
                return <Redirect to="/sclogin" />
            } else {
                return <Redirect to="/user/login" />
            }
        }
    } else {
        if (assertCurrentOrigin(merchantPath)) {
            // 是资源方展示
            return <div>{props.children}</div>
        } else {
            // 非资源方跳转对应的登录页
            if (kp_org_login_theme === '/egzlogin') {
                return <Redirect to="/egzlogin" />
            } else if (kp_org_login_theme === '/sclogin') {
                return <Redirect to="/sclogin" />
            } else {
                return <Redirect to="/user/login" />
            }
        }
    }
}

export default inject('siteStore')(observer(SellerWrapper))
