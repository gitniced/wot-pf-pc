import Offline from '@/components/Offline'
import * as Storage from '@/storage'
import { toJS } from 'mobx'
import type SiteStore from '@/stores/siteStore'

const offlineDom = Offline()

export default function Hooks() {
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

    /**刷新时同步本地user数据到store */
    const localUserToStore = (userStore: any) => {
        const { userData, updateUser, getUserData } = toJS(userStore)
        // 判断userStore.userData是否有值
        // 无值时从localStorage或者接口获取userData
        if (Object.keys(userData || {}).length === 0) {
            // 无值时
            const localUserStore = Storage.getLocalStorage('USER_STORE')
            if (Object.prototype.toString.call(localUserStore) === '[object Object]') {
                if (Object.keys(localUserStore.userData).length === 0) {
                    // localStorage中userStore.userData无值 从接口重新获取
                    getUserData()
                } else {
                    // localStorage中userStore.userData有值 直接同步到userStore
                    updateUser(localUserStore.userData)
                }
            }
        }
    }
    /**刷新时同步本地site数据到store */
    const localSiteToStore = async (siteStore: SiteStore) => {
        // @ts-ignore
        const { getSiteConfigByDebounce } = toJS(siteStore)
        await getSiteConfigByDebounce()
    }
    return {
        addOnlineListen,
        removeOnlineListen,
        localUserToStore,
        localSiteToStore,
    }
}
