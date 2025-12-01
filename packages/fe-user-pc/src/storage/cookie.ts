import type { KEYS_PC } from '@wotu/wotu-components'
import {
    getCookie as pcGetCookie,
    setCookie as pcSetCookie,
    delCookie as pcDelCookie,
    delNormalCookie as pcDelNormalCookie,
    clearCookie as pcClearCookie,
} from '@wotu/wotu-components'

/**
 * 获取 cookie
 * @param key
 * @returns
 */
export const getCookie = (key: keyof typeof KEYS_PC) => {
    return pcGetCookie(key, 'pc')
}

/**
 * 写入 cookie
 * @param key
 * @param data
 * @param expires
 */
export const setCookie = (key: keyof typeof KEYS_PC, data: any, expires: number = 7) => {
    const isIgnoreFromUrlPath = (path: string) => {
        const ignoreFromUrlPath = [
            '/login',
            '/register',
            '/forget',
            '/egzlogin',
            '/sclogin',
            '/quick-login',
        ]
        const tempPath = path.split('?')?.[0] || ''
        return ignoreFromUrlPath.some(i => tempPath.includes(i))
    }
    if (key === 'FROM_URL') {
        if (isIgnoreFromUrlPath(data)) {
            return null
        } else {
            return pcSetCookie(key, data, expires, 'pc')
        }
    } else {
        return pcSetCookie(key, data, expires, 'pc')
    }
}

/**
 * 删除
 * @param key
 */
export const delCookie = (key: keyof typeof KEYS_PC) => {
    return pcDelCookie(key, 'pc')
}

/**
 * 普通删除
 * @param key
 */
export const delNormalCookie = (key: string) => {
    return pcDelNormalCookie(key)
}

/**
 * 删除所有cookie
 */
export const clearCookie = () => {
    return pcClearCookie()
}
