/**
 * PAGE_SIZE 表格分页SIZE
 * SID 站点id
 * SITE_STORE 站点信息
 * USER_STORE 用户信息
 */
enum KEYS {
    PAGE_SIZE = 'pageSize',
    SID = 'sid',
    SITE_STORE = 'middleSiteStore',
    USER_STORE = 'middleUserStore',
    SOURCE_TYPE = 'source_type',
    LOCAL_CLEAN_DATA = 'localCleanData',
}

const getMatchKey = (key: keyof typeof KEYS) => {
    let finalKey: string = ''
    if (key === 'SITE_STORE') {
        finalKey = 'middleSiteStore'
    } else {
        finalKey = 'middleUserStore'
    }
    return finalKey
}

/**
 * 获取 localStorage
 * @param key
 * @returns
 */
export const getLocalStorage = (key: keyof typeof KEYS) => {
    if (typeof window === 'undefined') return
    let res: any = null
    let finalKey = ''
    if (key === 'SITE_STORE' || key === 'USER_STORE') {
        finalKey = getMatchKey(key)
        res = localStorage.getItem(finalKey) as any
    } else {
        finalKey = KEYS[key]
        res = localStorage.getItem(finalKey) as any
    }
    try {
        return JSON.parse(res)
    } catch (e) {
        return res
    }
}

/**
 * 通用写入 localStorage
 * @param key
 * @param val
 */
export const setLocalStorage = (key: keyof typeof KEYS, val: any) => {
    if (typeof window === 'undefined') return
    let finalKey = ''
    if (key === 'SITE_STORE' || key === 'USER_STORE') {
        finalKey = getMatchKey(key)
        localStorage.setItem(finalKey, typeof val === 'object' ? JSON.stringify(val) : val)
    } else {
        finalKey = KEYS[key]
        localStorage.setItem(finalKey, typeof val === 'object' ? JSON.stringify(val) : val)
    }
}

/**
 * 删除
 * @param key
 */
export const delLocalStorage = (key: keyof typeof KEYS) => {
    if (!window) return
    let finalKey = ''
    if (key === 'SITE_STORE' || key === 'USER_STORE') {
        //@ts-ignore
        finalKey = getMatchKey(key)
        localStorage.removeItem(finalKey)
    } else {
        finalKey = KEYS[key]
        localStorage.removeItem(finalKey)
    }
}
