import Offline from '@/components/Offline'
import * as Storage from '@/storage'
import { setCookie } from '@/storage'
import type { History } from 'umi'
import { history } from 'umi'

const offlineDom = Offline()

export default function Hooks() {
    /**不校验token的路由列表*/
    const noVerifyRoute = ['404', '500']
    /**联网回调 */
    const onlineHandler = () => {
        offlineDom.close()
    }

    /**断网回调 */
    const offlineHandler = () => {
        offlineDom.show('')
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
    const redirectLogin = (masterHistory: History) => {
        const userToken = Storage.getCookie('TOKEN')
        const purePath = history.location.pathname.replace(/\/$/g, '')
        if (!userToken) {
            const sid = (Storage.getLocalStorage('SID') || '').toString()
            if (!noVerifyRoute.includes(purePath)) {
                if (sid === '1') {
                    masterHistory?.replace?.(`/seller/login`)
                } else {
                    setCookie('FROM_URL', location.pathname + location.search)
                }
            }
        }
    }

    return {
        addOnlineListen,
        redirectLogin,
        removeOnlineListen,
    }
}
