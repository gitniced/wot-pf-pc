import { observer } from 'mobx-react'
import { useEffect } from 'react'
import OAuthLogin from '@/components/Global/OAuthLogin'
import { history } from 'umi'
import { setSessionStorage } from '@/storage/sessionStorage'

const Login = () => {
    const { type, sourceType } = history.location.query || {}

    useEffect(() => {
        document.title = `扫码`
        setSessionStorage('CREATE_SOURCE', sourceType)
        setSessionStorage('AUTH_USER_TYPE', 3)
    }, [])

    return <OAuthLogin authType={type as string} />
}

const ObserverLogin = observer(Login)

ObserverLogin.title = '登录-贵州题库系统'

export default ObserverLogin
