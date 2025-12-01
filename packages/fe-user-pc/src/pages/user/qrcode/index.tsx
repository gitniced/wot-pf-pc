import React, { useEffect } from 'react'
import { inject, Observer } from 'mobx-react'
import { useLocation } from 'umi'
import { QRCODE } from './const'
import OAuthLogin from '../../../components/Global/OAuthLogin'

const Qrcode = (props: any) => {
    console.log('Qrcode props:', props)
    // const { userStore } = props || {}

    const { query } = useLocation() || {}
    const { type } = query || {}

    useEffect(() => {
        document.title = `${QRCODE[type]}登录`
    }, [])

    return (
        <Observer>
            {() => {
                return <OAuthLogin authType={type} />
            }}
        </Observer>
    )
}

export default inject('siteStore', 'userStore')(Qrcode)
