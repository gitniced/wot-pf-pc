/**
 * SID 站点id
 * TEST_SEARCH_PARAMS 考试用户信息（userCode & examCode）
 * HIDE_GRADING_ALERT 隐藏Alert提示条
 */
enum KEYS {
    SID = 'sid',
    WORK_SITE_STORE = 'workSiteStore',
    WORK_USER_STORE = 'workUserStore',
    FROM_URL = 'fromUrl',
    TEST_SEARCH_PARAMS = 'testSearchParams',
    HIDE_GRADING_ALERT = 'hideGradingAlert',
    CUT_COUNT = 'cutCount',
    GRADING_DETAIL_FIRST_RELOAD = 'grading_detail_first_reload',
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
