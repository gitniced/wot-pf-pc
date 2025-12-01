import api from '@/servers/globalApi'
import http from '@/servers/http'
import { setCookie } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'

// 只有机构使用
const KeepAlive = (props: any) => {
    const { location, userStore, siteStore } = props || {}
    const { query } = location
    const { randomCode = '', portalCode = '', redirectUrl = '' } = query || {}

    const getTokenBySecretKey = async () => {
        const currentToken = (await http(api.getTokenBySecretKey, 'get', { randomCode })) || {}
        console.log(currentToken)
        const { token, tokenExpire = 0 } = (currentToken || {}) as any
        setCookie('TOKEN', token, Number(tokenExpire))
        await userStore.getLoginInfoByToken({ accessToken: token, tokenExpire }, 2)
        await userStore.updateCurrentOrgCode(portalCode)

        const orgDomain =
            findSiteData(siteStore?.siteData, 'orgDomain', { findKey: 'baseInfo' }) || ''
        let url = redirectUrl ? redirectUrl : `${orgDomain}/workbench`

        url = decodeURIComponent(url)
        window.location.replace(url)
    }

    useEffect(() => {
        getTokenBySecretKey()
    }, [])

    return <div />
}

export default inject('siteStore', 'userStore')(observer(KeepAlive))
