import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { organizationType, userDataType } from './interface'
import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import { delCookie, getCookie, getLocalStorage, setCookie } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'
import { message } from 'antd'
import clearLocalData from '@/utils/clearLocalData'

// let example: UserStore

export default class UserStore {
    /** 父应用标识 */
    public tag: string = 'middle'
    /**用户详情 */
    public userData: userDataType = {} as userDataType
    /**机构详情 */
    public organizationData: organizationType = {} as organizationType

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'middleUserStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['tag', 'userData'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**
     * 自行获取userData
     */
    getUserData = async () => {
        let userData: userDataType = (await http(
            globalApi.getUserInfo,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as userDataType
        let { code } = userData || {}
        setCookie('USER_CODE', code)
        this.userData = userData
    }
    /**
     * 自行获取organizationData
     */
    getOrganizationData = async () => {
        let organizationData: organizationType = (await http(
            `${globalApi.getOrganizationData}/${getCookie('SELECT_ORG_CODE')}`,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as organizationType
        this.organizationData = organizationData
    }

    /**
     * 绑定父应用userData
     * @param {userDataType} tempUserData 绑定父应用history
     */
    updateUserData = (tempUserData: userDataType) => {
        this.userData = tempUserData
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
    /**
     * 清除业务线要求的本地存储项
     */
    clearCustomKey = () => {
        clearLocalData(undefined, undefined, undefined, () => {})
    }

    loginOut = (
        options?: { onSuccess?: () => void; onFail?: () => void } | Record<string, never>,
    ) => {
        const { onSuccess, onFail } = options || {}
        http(globalApi.loginOut, 'get', {})
            .then(async () => {
                // @ts-ignore
                this.userData = {}
                delCookie('SELECT_ORG_CODE')
                delCookie('TOKEN')
                this.clearCustomKey()
                onSuccess?.()
                message.success('退出成功')
                const siteStore = getLocalStorage('SITE_STORE')
                const pcDomain = findSiteData(siteStore, 'pcDomain', {
                    findKey: 'baseInfo',
                })
                window.location.href = pcDomain
            })
            .catch(() => {
                onFail?.()
            })
    }
}
