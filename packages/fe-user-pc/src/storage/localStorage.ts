/**
 * PAGE_SIZE 表格分页SIZE
 * SID 站点id
 * SITE_STORE 站点信息
 * USER_STORE 用户信息
 * SELLER_SID
 * SOURCE_TYPE
 * FROM_SID 资源方来源站点的ID
 */
enum KEYS {
    ALIAS = 'alias',
    PAGE_SIZE = 'pageSize',
    SID = 'sid',
    SITE_STORE = 'siteStore',
    USER_STORE = 'userStore',
    SELLER_SID = 'sellerSid',
    SOURCE_TYPE = 'source_type',
    FROM_SID = 'from_sid',
}

/**
 * 获取 localStorage
 * @param key
 * @returns
 */
export const getLocalStorage = (key: keyof typeof KEYS) => {
    if (typeof window === 'undefined') return
    const res = localStorage.getItem(KEYS[key]) as any

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
    localStorage.setItem(KEYS[key], typeof val === 'object' ? JSON.stringify(val) : val)
}

/**
 * 删除
 * @param key
 */
export const delLocalStorage = (key: keyof typeof KEYS) => {
    if (!window) return
    localStorage.removeItem(KEYS[key])
}
