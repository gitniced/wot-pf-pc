import * as Storage from '@/storage'
import { getCookie, getLocalStorage, setCookie, setLocalStorage } from '@/storage'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { PERSON_TEACHER_IDENTITY_MAP_STRING } from '@/types'
import doToLogin from '@/utils/doToLogin'
import { assertCurrentOrigin } from '@/utils/urlUtils'
import { findSiteData } from '@wotu/wotu-components'
import { message } from 'antd'
import { history } from 'umi'

export default function Hooks() {
    /**不校验token的路由列表*/
    const noVerifyRoute = [
        '404',
        '500',
        'user',
        'seller',
        'quick-login',
        'teacher',
        'egzlogin',
        'sclogin',
        'keepalive',
        'engineer',
    ]
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
    const redirectLogin = async (sid: string, siteStore: SiteStore, userStore: UserStore) => {
        // eslint-disable-next-line no-param-reassign
        sid = (sid || '').toString()
        const userToken = Storage.getCookie('TOKEN')
        const purePath = history.location.pathname.replace(/\/$/g, '')
        const pathArr = purePath.split('/')
        const kp_org_login_theme = findSiteData(siteStore.siteData, 'kp_org_login_theme')?.value

        let fromUrl = ''
        await userStore.getUserOrganization()
        if (!userToken) {
            // 判断当前是否是门户子应用
            if (userStore?.tag === 'portal') {
                // 当前是门户子应用,记录完整url
                fromUrl = location.href
            } else {
                // 当前不是门户子应用
                fromUrl = location.pathname + location.search
            }

            if (!noVerifyRoute.includes(pathArr?.[1])) {
                if (RUN_ENV === 'local') {
                    // 本地环境 指定资源方身份  跳转到讲师登录
                    // 如果当前的origin  和站点配置的 资源中心用户中心的地址是否一样
                    if (!isNaN(SPECIAL_USER) && Number(SPECIAL_USER) === 1) {
                        const sourceType = getLocalStorage('SOURCE_TYPE')
                        let orderIdentity = getCookie('SELECT_IDENTITY_CODE')
                        if (sourceType) {
                            if (sourceType === 'person_teacher') {
                                if (isNaN(orderIdentity)) {
                                    message.error('缺少身份信息')
                                } else {
                                    const orderIdentityMapString =
                                        //@ts-ignore
                                        PERSON_TEACHER_IDENTITY_MAP_STRING[Number(orderIdentity)]
                                    if (orderIdentityMapString) {
                                        setCookie('FROM_URL', fromUrl)
                                        history.replace(`/teacher/${orderIdentityMapString}/login`)
                                    } else {
                                        message.error('缺少身份信息')
                                    }
                                }
                            } else {
                                setCookie('FROM_URL', fromUrl)
                                history.replace(
                                    `/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`,
                                )
                            }
                        } else {
                            message.error('缺少身份信息')
                            history.replace(`/404`)
                        }
                    } else {
                        setCookie('FROM_URL', fromUrl)
                        if (kp_org_login_theme === '/egzlogin') {
                            history.push('/egzlogin')
                        } else if (kp_org_login_theme === '/sclogin') {
                            history.push('/sclogin')
                        } else {
                            // history.push('/user/login')
                            doToLogin(getCookie('SELECT_IDENTITY_CODE') || undefined, undefined)
                        }
                    }
                } else {
                    // 如果当前的origin  和站点配置的 资源中心用户中心的地址是否一样
                    if (
                        assertCurrentOrigin(
                            findSiteData(siteStore?.siteData || {}, 'merchantUserDomain', {
                                findKey: 'baseInfo',
                            }),
                        )
                    ) {
                        setCookie('FROM_URL', fromUrl)
                        const sourceType = getLocalStorage('SOURCE_TYPE')
                        let orderIdentity = getCookie('SELECT_IDENTITY_CODE')
                        if (sourceType) {
                            if (sourceType === 'person_teacher') {
                                if (isNaN(orderIdentity)) {
                                    message.error('缺少身份信息')
                                } else {
                                    const orderIdentityMapString =
                                        //@ts-ignore
                                        PERSON_TEACHER_IDENTITY_MAP_STRING[Number(orderIdentity)]
                                    if (orderIdentityMapString) {
                                        setCookie('FROM_URL', fromUrl)
                                        history.replace(`/teacher/${orderIdentityMapString}/login`)
                                    } else {
                                        message.error('缺少身份信息')
                                    }
                                }
                            } else {
                                setCookie('FROM_URL', fromUrl)
                                history.replace(
                                    `/seller/login?sourceType=${getLocalStorage('SOURCE_TYPE')}`,
                                )
                            }
                        } else {
                            message.error('缺少身份信息')
                            history.replace(`/404`)
                        }
                    } else {
                        setCookie('FROM_URL', fromUrl)
                        if (kp_org_login_theme === '/egzlogin') {
                            history.push('/egzlogin')
                        } else if (kp_org_login_theme === '/sclogin') {
                            history.push('/sclogin')
                        } else {
                            // history.push('/user/login')
                            doToLogin(getCookie('SELECT_IDENTITY_CODE') || undefined, undefined)
                        }
                    }
                }
            }
        } else {
            // 非个人登录 且 没有机构 跳转到锁定页
            console.log(
                '非个人登录 且 没有机构 跳转到锁定页',
                userStore.userType,
                !userStore?.userOrg?.length,
            )
            if (
                userStore.userType &&
                userStore.userType !== 'user' &&
                userStore.userType !== 'person_teacher' &&
                !userStore?.userOrg?.length
            ) {
                // 不需要鉴定是否需要前往账号锁定页的一级路由
                const unNeedLockPath = ['lock', 'organization', 'seller', 'select', 'reset-pwd']
                const notUnNeedLockPath = unNeedLockPath.some(item => {
                    // 根据当前路径的第一级判断是否需要锁定
                    const firstPathName = history.location.pathname.split('/')?.[1] || ''
                    return firstPathName === item
                })
                console.log('notUnNeedLockPath', notUnNeedLockPath)
                if (!notUnNeedLockPath) {
                    history.replace('/lock/person')
                }
            } else {
                if (history.location.pathname === '/') {
                    history.replace('/account')
                }
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
