// import Offline from '@/components/Global/Offline'
import * as Storage from '@/storage'
import { getLocalStorage, setCookie, setLocalStorage } from '@/storage'
import { message } from 'antd'
// import type { Stores } from '@/types'
import { history } from 'umi'
import type { History } from 'umi'

// const offlineDom = Offline()

export default function Hooks() {
    /**不校验token的路由列表*/
    const noVerifyRoute = ['/404', '/500', '/user/']
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
                    masterHistory?.replace?.('/user/login')
                }
            }
        } else {
            if (history.location.pathname === '/') {
                history.replace('/order')
            }
        }
    }
    /**当token存在 userdata为空时 获取userData数据
     * 当从某站点跳转到用户中心时 存在token 但是userData会为空
     * 此时触发该方法 获取用户信息
     */
    const autoGetUserData = (callback: () => void) => {
        const userToken = Storage.getCookie('TOKEN')
        if (userToken) {
            callback()
        }
    }

    const update_page_size = (size: number) => {
        //判断 页码是否为整数
        if (window && Number.isInteger(size)) {
            window.page_size = size
            setLocalStorage('PAGE_SIZE', size)
        }
    }

    const initPageSize = () => {
        if (window) {
            let page_size = getLocalStorage('PAGE_SIZE')
            if (page_size && Number.isInteger(page_size)) {
                window.page_size = page_size
            }
            window.update_page_size = update_page_size
        }
    }

    return {
        addOnlineListen,
        autoGetUserData,
        removeOnlineListen,
        redirectLogin,
        initPageSize,
    }
}
