import { message } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import React, { useEffect } from 'react'
import styles from './index.module.less'
import AuthLoginStore from '@/pages/user/authmiddle/store'
import classNames from 'classnames'
import { AuthTypeEnum } from '@/pages/user/authmiddle/interface.d'
import { getSessionStorage } from '@/storage'

// 添加 AuthTypeImage 映射
const AuthTypeImage = {
    [AuthTypeEnum.WX]: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_wechat%402x_91e38280.png',
    [AuthTypeEnum.DD]: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bd_icon_dingding%402x_a1d259e7.png',
}

const AuthTypeText = {
    [AuthTypeEnum.WX]: '微信',
    [AuthTypeEnum.DD]: '钉钉',
}

const Index = ({
    authType,
    auth_user_type,
}: {
    authType: AuthTypeEnum
    auth_user_type?: string
}) => {
    const store = useLocalObservable(() => new AuthLoginStore())

    // 授权登录的用户类型
    let authUserType: string = getSessionStorage('AUTH_USER_TYPE') || auth_user_type

    const wxLogin = (url: string) => {
        new WxLogin({
            // true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false
            self_redirect: false,
            // 显示二维码的容器id
            id: 'login_container',
            // 应用唯一标识
            appid: store.authAppInfo?.appId,
            // 应用授权作用域
            scope: 'snsapi_login',
            // 重定向地址，需要进行UrlEncode
            redirect_uri: encodeURIComponent(url),
            // 用于保持请求和回调的状态，授权请求后原样带回给第三方
            state: authType,
            style: 'black',
            // 自定义样式链接
            href: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/bindwx_f34d3ef1.css',
        })
        let wxIframe = document.querySelector('iframe')
        wxIframe &&
            wxIframe.setAttribute(
                'sandbox',
                'allow-scripts allow-top-navigation  allow-same-origin',
            )
    }

    const ddLogin = (url: any) => {
        window.DTFrameLogin(
            {
                id: 'login_container',
                width: 280,
                height: 280,
            },
            {
                // 授权通过后返回authCode
                redirect_uri: encodeURIComponent(url),
                // AppKe
                client_id: store.authAppInfo?.appId,
                // 授权范围
                scope: 'openid',
                response_type: 'code',
                // 跟随authCode原样返回
                state: authType,
                prompt: 'consent',
            },
            (loginResult: { redirectUrl: string; authCode: string }) => {
                const { redirectUrl, authCode } = loginResult || {}
                // 这里可以直接进行重定向
                window.location.href = redirectUrl + `&action=bind&authType=${authType}&authUserType=${authUserType}`
                // 也可以在不跳转页面的情况下，使用code进行授权
                console.log(authCode)
            },
            (errorMsg: string) => {
                // 这里一般需要展示登录失败的具体原因
                console.log('获取钉钉授权码失败', errorMsg)

                message.error('获取钉钉授权码失败:' + errorMsg)
            },
        )
    }

    useEffect(() => {
        store.getAuthAppInfo(authType).then(() => {
            // 授权回调地址 取站点配置的地址或当前域名的中转页
            let redirect_uri = store.authAppInfo?.redirectUrl || ''
     
            // 授权回调地址的参数，用于多个域名获取微信登录授权权限，便来来源和数据
            // fromSid 来源站点的sid；authUserType 用户类型；appId 应用唯一标识
            let redirect_state = `?formSid=${store.sid}&authUserType=${authUserType}&appId=${store.authAppInfo?.appId}&action=bind&authType=${authType}`

            if (authType === AuthTypeEnum.DD) {
                ddLogin?.(redirect_uri)
            } else if (authType === AuthTypeEnum.WX) {
                wxLogin?.(redirect_uri + redirect_state)
            }
        })
    }, [])

    return (
        <>
            {(
                <>
                    <div
                        className={classNames(
                            styles.content,
                            authType === AuthTypeEnum.DD ? styles.content_dd : null,
                        )}
                    >
                        <div className={styles.title}>绑定{AuthTypeText?.[authType]}</div>
                        <div className={styles.box}>
                            <svg className={classNames('icon', styles.icon)} aria-hidden="true">
                                <use xlinkHref="#png_erweima" />
                            </svg>
                            <div id="login_container" className={styles.login_container} />
                        </div>

                        <div className={styles.extra}>
                            <img className={styles.type_icon} src={AuthTypeImage?.[authType]} />
                            使用{AuthTypeText?.[authType]}扫一扫
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default observer(Index)
