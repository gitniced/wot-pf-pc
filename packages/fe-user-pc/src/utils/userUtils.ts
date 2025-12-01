import { getLocalStorage } from '@/storage'
import { getCookie } from '@wotu/wotu-components'

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
        person_teacher: '4',
    }
    return typeSiteKeyMap[userType]
}
