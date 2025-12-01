import { makeAutoObservable } from 'mobx'
import { getSignCountApi, getSignListPageApi } from './api'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    public siteSignCount: number = 0
    public organizeSignCount: number = 0

    // 获取活动签到列表
    getSignListPage = async (params: any) => {
        const res = await getSignListPageApi(params)
        return res
    }

    getSingCount = () => {
        getSignCountApi().then((res: any) => {
            const { siteSignCount, organizationSignCount } = res
            this.siteSignCount = siteSignCount
            this.organizeSignCount = organizationSignCount
        })
    }
}

export default new Store()
