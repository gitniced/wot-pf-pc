/**
 * PAGE_SIZE 表格分页SIZE
 * SID 站点id
 * SITE_STORE 站点信息
 * USER_STORE 用户信息
 */
enum KEYS {
    PAGE_SIZE = 'pageSize',
    SID = 'sid',
    SITE_STORE = 'engineerPcSiteStore',
    USER_STORE = 'engineerPcUserStore',
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
    localStorage.removeItem(key)
}
