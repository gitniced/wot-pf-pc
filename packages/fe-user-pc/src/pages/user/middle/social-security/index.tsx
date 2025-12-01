import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import type { AccessTokenTYPE, AuthQueryType } from './interface'
import api from './api'
import http from '@/servers/http'
import { history, useLocation } from 'umi'
import { findSiteData } from '@wotu/wotu-components'
import { Spin } from 'antd'
import { getSessionStorage } from '@/storage/sessionStorage'

// 电子社保卡中转
const SocialSecurity = (props: {
    qqAppid: string
    siteStore?: SiteStore
    userStore?: UserStore
}) => {
    const { siteStore, userStore } = props || {}
    const { siteData } = siteStore! || {}
    const { query } = useLocation()
    let { dataToken } = (query as AuthQueryType) || {}
    const type = getSessionStorage('AUTH_USER_TYPE')
    const appId = getSessionStorage('AUTH_APP_ID')

    // 请求用户access_token
    const getAccessToken = async (
        openId: string,
        afterScanningCode: (obj: AccessTokenTYPE) => void,
    ) => {
        if (!openId) return
        const tempSid = findSiteData(siteData, 'sid', { findKey: 'baseInfo' })

        let { formSid } = query
        let sid = formSid || tempSid

        let accessTokenInfo = (await http(
            api.getAccessToken,
            'post',
            {
                // 授权码 redirectUrl携带返回
                code: openId,
                appId,
                type,
                // 登录设备
                appKey: 'WEB',
                // 站点id
                sid,
                authType: 'ess',
            },
            { repeatFilter: true },
        ).catch(() => {
            history.replace('/user/login')
            return false
        })) as unknown as AccessTokenTYPE

        if (accessTokenInfo) {
            afterScanningCode?.({
                ...accessTokenInfo,
                // 需要从登录接口获取
                userType: type,
            })
        }
    }

    useEffect(() => {
        getAccessToken(dataToken!, userStore!.afterScanningCode)
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Spin size="large" />
        </div>
    )
}
export default inject('siteStore', 'userStore')(observer(SocialSecurity))
