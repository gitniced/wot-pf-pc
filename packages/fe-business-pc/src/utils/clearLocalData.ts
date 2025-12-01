import { delLocalStorage, delNormalCookie, getLocalStorage } from '@/storage'

/**
 * 清除业务线要求的本地存储项
 */
const clearLocalData = (
    newUserCode?: string,
    newOrganization?: string,
    newIdentity?: string,
    callback?: () => void,
) => {
    const localCleanData = getLocalStorage('LOCAL_CLEAN_DATA')
    let {
        userCode,
        organization,
        identity,
        local = [],
        session = [],
        cookie = [],
    } = localCleanData || {}
    if (
        newUserCode === userCode &&
        newOrganization === organization &&
        Number(newIdentity || 0) === Number(identity || 0)
    ) {
        callback?.()
    } else {
        local.map(key => {
            localStorage.removeItem(key)
        })
        session.map(key => {
            sessionStorage.removeItem(key)
        })
        cookie.map(key => {
            delNormalCookie(key)
        })
        delLocalStorage('LOCAL_CLEAN_DATA')
        callback?.()
    }
}
export default clearLocalData
