// import { getLocalStorage, setCookie } from '@/storage'
// import type { SiteData } from '@/types'
// import { assertCurrentOrigin } from '@/utils/urlUtils'
// import { findSiteData } from '@wotu/wotu-components'
import { message } from 'antd'

export default function Hooks() {
    /**不校验token的路由列表*/
    // const noVerifyRoute = ['404', '500', 'user', 'seller']
    /**联网回调 */
    const onlineHandler = () => {
        // offlineDom.close()
        message.destroy()
    }

    /**断网回调 */
    const offlineHandler = () => {
        // offlineDom.show('')
        message.error('网络异常，请稍后再试～', 2)
    }

    /**设置断网和联网监听 */
    const addOnlineListen = () => {
        if (window) {
            window.addEventListener('online', onlineHandler)
            window.addEventListener('offline', offlineHandler)
        }
    }
    /**移除断网和联网监听 */
    const removeOnlineListen = () => {
        if (window) {
            window.removeEventListener('online', onlineHandler)
            window.removeEventListener('offline', offlineHandler)
        }
    }

    /**根据token判断登录情况 跳到登录页 */
    const redirectLogin = () => {
        // eslint-disable-next-line no-param-reassign
        // sid = (sid || '').toString()
        // const userToken = Storage.getCookie('TOKEN')
        // const purePath = history.location.pathname.replace(/\/$/g, '')
        // const pathArr = purePath.split('/')
        // if (!userToken) {
        //     if (!noVerifyRoute.includes(pathArr?.[1])) {
        //         // 如果当前的origin  和站点配置的 资源中心用户中心的地址是否一样
        //         if (
        //             assertCurrentOrigin(
        //                 findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }),
        //             )
        //         ) {
        //             setCookie('FROM_URL', location.pathname + location.search)
        //             history.replace(`/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`)
        //         } else {
        //             setCookie('FROM_URL', location.pathname + location.search)
        //             history.replace('/user/login')
        //         }
        //     }
        // } else {
        //     if (history.location.pathname === '/') {
        //         history.replace('/account')
        //     }
        // }
    }

    return {
        addOnlineListen,
        removeOnlineListen,
        redirectLogin,
    }
}
