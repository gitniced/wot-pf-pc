import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/storage'
import type { AuthAppInfoTYPE, AccessTokenTYPE, AuthQueryType } from './interface'
import type { AuthTypeEnum } from './interface.d'
import { history } from 'umi'
class AuthLoginStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 授权登录相关信息
    authAppInfo: AuthAppInfoTYPE = {
        appId: '',
        redirectUrl: '',
    }
    // 当前站点id
    sid: string = getLocalStorage('SID')
    // 授权登录的用户类型
    auth_user_type: string = getSessionStorage('AUTH_USER_TYPE')

    // 获取授权登录信息 appid、redirectUrl
    getAuthAppInfo = async (authType: AuthTypeEnum) => {
        this.authAppInfo = (await http(
            api.getAuthAppInfo,
            'get',
            {
                // 授权类型,wx:微信;dd:钉钉
                authType: authType,
                // 站点id
                sid: this.sid,
            },
            { repeatFilter: true },
        )) as unknown as AuthAppInfoTYPE

        setSessionStorage('AUTH_APP_ID', this.authAppInfo.appId)
    }
    // 请求用户access_token
    getAccessToken = async (
        openId: string,
        query: AuthQueryType,
        afterScanningCode: (obj: AccessTokenTYPE) => void,
    ) => {
        if (!openId) return
        let { state, appId: id, formSid, authUserType } = query
        let appId = id || getSessionStorage('AUTH_APP_ID')
        let type = authUserType || this.auth_user_type
        let sid = formSid || this.sid
        let tempParams = {
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
        }

        if (getSessionStorage('EXTRA_TIME_STATUS')?.toString?.() === '1') {
            //@ts-ignore
            tempParams = { ...tempParams, extraTimeStatus: 1 }
        }

        let accessTokenInfo = (await http(
            api.getAccessToken,
            'post',
            {
                ...tempParams,
            },
            { repeatFilter: true },
        )) as unknown as AccessTokenTYPE
        afterScanningCode?.({
            ...accessTokenInfo,
            userType: type,
        })
    }
    // 置换 unionId
    checkUidBindStatus = async (
        openId: string,
        query: AuthQueryType,
        afterScanningCode: (obj: AccessTokenTYPE) => void,
    ) => {
        if (!openId) return
        let { state, appId: id, formSid, authUserType } = query
        let appId = id || getSessionStorage('AUTH_APP_ID')
        let type = authUserType || this.auth_user_type
        let sid = formSid || this.sid

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
}

export default AuthLoginStore
