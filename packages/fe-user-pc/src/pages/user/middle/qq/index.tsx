import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import type { AccessTokenTYPE, AuthQueryType } from './interface'
import api from './api'
import http from '@/servers/http'
import { history, useLocation } from 'umi'
import { findSiteData } from '@wotu/wotu-components'
import { message, Spin } from 'antd'
import { getSessionStorage } from '@/storage'

// qq中转
const QQ = (props: { qqAppid: string; siteStore?: SiteStore; userStore?: UserStore }) => {
    const { siteStore, userStore } = props || {}
    const { siteData } = siteStore! || {}
    const qqAppid = findSiteData(siteData, 'qq_appid')?.value || '102105867'
    const { query } = useLocation()
    let { code, action, authType } = (query as AuthQueryType) || {}

    // 请求用户access_token
    const getAccessToken = async (
        openId: string,
        afterScanningCode: (obj: AccessTokenTYPE) => void,
    ) => {
        if (!openId) return
        const tempSid = findSiteData(siteData, 'sid', { findKey: 'baseInfo' })
        let { state, formSid, authUserType } = query
        let appId = qqAppid || getSessionStorage('AUTH_APP_ID')
        let type = authUserType
        let sid = formSid || tempSid

        let accessTokenInfo = (await http(
            api.getAccessToken,
            'post',
            {
                // 授权码 redirectUrl携带返回
                code: openId,
                // 授权应用id
                appId,
                // 登录设备
                appKey: 'WEB',
                // 类型，1个人，2机构，3资源方
                type,
                // 站点id
                sid,
                // 	授权类型,wx:微信;dd:钉钉
                authType: state,
            },
            { repeatFilter: true },
        )) as unknown as AccessTokenTYPE
        afterScanningCode?.({
            ...accessTokenInfo,
            userType: type,
        })
    }

    // 置换 unionId
    const checkUidBindStatus = async (
        openId: string,
        afterScanningCode: (obj: AccessTokenTYPE) => void,
    ) => {
        if (!openId) return
        const tempSid = findSiteData(siteData, 'sid', { findKey: 'baseInfo' })
        let { state, formSid, authUserType } = query
        let appId = qqAppid || getSessionStorage('AUTH_APP_ID')
        let type = authUserType
        let sid = formSid || tempSid

        http(
            api.checkUidBindStatus,
            'post',
            {
                // 授权码 redirectUrl携带返回
                code: openId,
                // 授权应用id
                appId,
                // 登录设备
                appKey: 'WEB',
                // 类型，1个人，2机构，3资源方
                type,
                // 站点id
                sid,
                // 	授权类型,wx:微信;dd:钉钉
                authType: state,
            },
            { repeatFilter: true },
        ).then((data: any) => {
            afterScanningCode?.(data)
        }).catch(() => {
            history.replace('/bind')
        })
    }

    useEffect(() => {
        if (action === 'bind') {
            checkUidBindStatus(code!, (authOpenId) => {
                http(api.userBind, 'POST', { openId: authOpenId, authType }).then(() => {
                    message.success('绑定成功')
                    history.replace('/bind')
                })
            })
            return
        }
        getAccessToken(code!, userStore!.afterScanningCode)
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
export default inject('siteStore', 'userStore')(observer(QQ))
