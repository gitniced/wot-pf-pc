import { observer } from 'mobx-react'
import { useEffect } from 'react'
import OAuthLogin from '@/components/Global/OAuthLogin'
import { history } from 'umi'
import { setSessionStorage } from '@/storage/sessionStorage'
import type { AuthTypeEnum } from '@/pages/user/authmiddle/interface'

const Login = () => {
    const { type, auth_user_type } = history.location.query || {}

    useEffect(() => {
        document.title = `扫码`
        setSessionStorage('AUTH_USER_TYPE', 4)
    }, [])

    return <OAuthLogin authType={type as AuthTypeEnum} auth_user_type={auth_user_type as string} />
}

const ObserverLogin = observer(Login)
export default ObserverLogin
