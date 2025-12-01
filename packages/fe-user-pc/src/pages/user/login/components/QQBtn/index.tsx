import React from 'react'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import { findSiteData, SuperLink } from '@wotu/wotu-components'
import { getSessionStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import type SiteStore from '@/stores/siteStore'

// 默认的用户协议
const QQBtn = (props: { qqAppid: string; userType: number; siteStore?: SiteStore }) => {
    const { qqAppid = '102105867', userType, siteStore } = props || {}
    const { siteData } = siteStore || {}

    const clickHandler = () => {
        const platform = getSessionStorage('PLATFORM')
        const currentOrigin = window.location.origin || ''
        const currentAlias = getPortalCodeFromUrl({ isGetDomain: true })
        const sid = findSiteData(siteData!, 'sid', { findKey: 'baseInfo' })
        let qqRedirect =
            platform === 'portal'
                ? `${currentOrigin}/${currentAlias}/user-center/user/middle/qq`
                : `${currentOrigin}/account/user/middle/qq`
        qqRedirect = encodeURIComponent(`${qqRedirect}?fromSid=${sid}&authUserType=${userType}`)

        return `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${qqAppid}&state=qq&scope=get_user_info&redirect_uri=${qqRedirect}`
    }

    return (
        <SuperLink href={clickHandler()} className={styles.btn}>
            <img
                className={classNames('icon', styles.svg_icon)}
                src="https://static.zpimg.cn/public/fe_user_pc/images/icon_qq%402x.png"
            />
        </SuperLink>
    )
}
export default inject('userStore', 'siteStore')(observer(QQBtn))
