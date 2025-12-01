import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { PortalData, userDataType } from './interface'
import { history } from 'umi'
import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import { setCookie } from '@/storage'

let example: UserStore

export class UserStore {
    /** 父应用标识 */
    public tag: string = ''
    /** 父应用history */
    public masterHistory: History = history as unknown as History
    /**用户详情 */
    public userData: userDataType = {} as userDataType
    /**门户详情 */
    public portalData: PortalData = {} as PortalData

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'enrollUserStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['tag', 'masterHistory', 'userData', 'portalData'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**
     * 更新当前父应用标识
     * @param {string} tag 需要清除字段的存储类型
     */
    updateTag = (tag: string) => {
        this.tag = tag
    }

    /**
     * 绑定父应用history
     * @param {History} tempHistory 绑定父应用history
     */
    updateHistory = (tempHistory: History) => {
        this.masterHistory = tempHistory
    }
    /**
     * 绑定父应用userData
     * @param {userDataType} tempUserData 绑定父应用history
     */
    updateUserData = (tempUserData: userDataType) => {
        this.userData = tempUserData
    }
    /**
     * 绑定父应用门户信息
     * @param {PortalData} tempPortalData 绑定父应用history
     */
    updatePortalData = (tempPortalData: PortalData) => {
        this.portalData = tempPortalData
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

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}

export default new Proxy(UserStore, {
    construct(target) {
        if (example) {
            return example
        } else {
            example = new target()
            return example
        }
    },
})
