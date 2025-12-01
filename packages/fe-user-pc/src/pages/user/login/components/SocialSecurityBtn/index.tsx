import React from 'react'
import styles from './index.module.less'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import type SiteStore from '@/stores/siteStore'
import { MASTER_HOST, TEST_HOST } from './const'
import http from '@/servers/http'
import api from '../../api'
import { findSiteData } from '@wotu/wotu-components'
import { setSessionStorage } from '@/storage'

const SocialSecurityBtn = (props: { userType: number; siteStore?: SiteStore, hooks: any }) => {
    const { userType, siteStore, hooks } = props || {}
    const { siteData } = siteStore || {}
    const host = BUILD_ENV === 'test' ? TEST_HOST : MASTER_HOST
    
    setSessionStorage('AUTH_USER_TYPE', hooks.tabIndex)

    /** 请求接口 跳转到社保卡扫码页面 */
    const clickHandler = () => {
        /**
         * 电子社保卡登录地址
         * ${host}/pc/code/index.html?dataToken=${dataToken} */
        console.log(userType, siteData, host)
        const tempSid = findSiteData(siteData!, 'sid', { findKey: 'baseInfo' })
        http(api.getAuthAppInfo, 'get', { authType: 'ess', sid: tempSid }).then((res: any) => {
            const { dataToken, appId } = res
            setSessionStorage('AUTH_APP_ID', appId)
            window.location.href = (`${host}/pc/code/index.html?dataToken=${dataToken}`)
        })
    }

    return (
        <div className={styles.btn} onClick={clickHandler}>
            <img
                className={classNames('icon', styles.svg_icon)}
                src="https://static.zpimg.cn/public/fe_user_pc/images/icon_shebao%402x.png"
            />
        </div>
    )
}
export default inject('userStore', 'siteStore')(observer(SocialSecurityBtn))
