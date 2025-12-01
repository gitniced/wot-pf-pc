import { inject, observer, useLocalObservable } from 'mobx-react'
import React, { useEffect } from 'react'
import AuthLoginStore from './store'
import { useLocation } from 'umi'
import type { IRoute } from 'umi'
import type { PageProps } from '@/types'
import { getDomainInfoBySid } from '@/utils/getDomainInfoBySid'
import { findSiteData } from '@wotu/wotu-components'
import { getPathParams } from '@/utils/urlUtils'
import PageLoading from '@/components/Global/PageLoading'
import { history } from 'umi'
import type { AuthQueryTYPE } from './interface'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'

const AuthMiddle = (props: PageProps) => {
    const store = useLocalObservable(() => new AuthLoginStore())

    let location = useLocation() || {}
    let { query } = location || {}
    let { code, authCode, formSid, redirect_url, action, authType } = (query as AuthQueryTYPE) || {}
    const { userStore } = props || {}

    const getToRedirectUrL = async () => {
        let domainInfo = await getDomainInfoBySid(formSid!)
        const loginUrl =
            findSiteData(domainInfo, 'pcDomain', { findKey: 'configList' })?.value || ''
        let search = getPathParams()
        let redirectUrl = encodeURIComponent(`${loginUrl}/account/user/authmiddle${search}`)
        // 先跳转当前页面，携带回调函数做参数
        // 再ajax中直接跳转会被浏览器拦截
        history.replace(`/user/authmiddle?redirect_url=${encodeURIComponent(redirectUrl)}`)
        // window.location.replace(redirect_uri)
    }
    useEffect(() => {
        let openId = code || authCode
        if(action === 'bind'){
            store.checkUidBindStatus(openId!, query, (authOpenId) => {
                http(api.userBind, 'POST', { openId: authOpenId, authType }).then(() =>{
                    message.success('绑定成功')
                    history.replace('/bind')
                })
            })
            return
        }
        // 存在回调地址，直接跳转
        if (redirect_url) {
            console.log('getToRedirectUrL', decodeURIComponent(redirect_url))

            window.location.replace(decodeURIComponent(redirect_url))
            return
        }

        if (formSid && store.sid && Number(formSid) !== Number(store.sid)) {
            // 获取来源站点的授权登录页
            getToRedirectUrL()
        } else {
            store.getAccessToken(openId, query, userStore?.afterScanningCode)
        }
    }, [query?.code, query?.authCode])

    return <PageLoading />
}
const ObserverIdCard: IRoute = inject('userStore')(observer(AuthMiddle))

ObserverIdCard.title = '授权登录'

export default ObserverIdCard
