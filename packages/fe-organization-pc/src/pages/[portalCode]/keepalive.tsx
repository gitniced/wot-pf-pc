import api from '@/servers/globalApi'
import http from '@/servers/http'
import { setCookie } from '@/storage'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'
const KeepAlive = (props: any) => {
    console.log(props)
    const { location } = props || {}
    const { query } = location
    const { randomCode = '', userCode = '', identity = '', redirectUrl = '' } = query || {}

    const getTokenBySecretKey = async () => {
        const currentToken = (await http(api.getTokenBySecretKey, 'get', { randomCode })) || {}
        const { token, tokenExpire = 0 } = (currentToken || {}) as any
        setCookie('TOKEN', token, Number(tokenExpire))
        setCookie('USER_CODE', userCode)
        // setCookie('SELECT_USER_TYPE', 'user')
        setCookie('SELECT_IDENTITY_CODE', identity)
        const currentAlias = location.pathname.split('/')?.[1] || ''
        let url = redirectUrl ? redirectUrl : `/${currentAlias}/home`
        url = decodeURIComponent(url)
        window.location.replace(url)
    }

    useEffect(() => {
        getTokenBySecretKey()
    }, [])

    return <div />
}

export default inject('siteStore')(observer(KeepAlive))
