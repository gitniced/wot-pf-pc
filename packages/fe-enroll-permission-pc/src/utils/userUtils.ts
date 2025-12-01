import { getCookie, getLocalStorage } from '@/storage'

/**
 * 获取当前用户的登录类型 用户类型 1个人 2机构 3资源方
 * @returns '1'|'2'|'3'
 */

const getSelectCookie = (name: string) => {
    const cookies = document.cookie.split('; ')

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=')

        // debugger
        if (cookieName === name) {
            return decodeURIComponent(cookieValue)
        }
    }

    return null
}

export const getNowType = () => {
    const sid = getLocalStorage('SID')
    const userType = getCookie('SELECT_USER_TYPE') || getSelectCookie(`selectUserType${sid}`)

    const typeSiteKeyMap: Record<string, string> = {
        user: '1',
        org: '2',
        merchant: '3',
    }
    return typeSiteKeyMap[userType]
}

/**
 * 获取当前用户的机构code
 * @returns string
 */
export const getNowCode = () => {
    // 用户中心改版 取消机构选择后 去除该方法
    const orgCode = getCookie('SELECT_ORG_CODE')
    return orgCode
}
