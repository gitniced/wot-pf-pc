import { makeAutoObservable } from 'mobx'
import { getSignListPageApi } from './api'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    // 获取活动签到列表
    getSignListPage = async (params: any) => {
        const res = await getSignListPageApi({
            ...params,
            taskCode: params?.taskCode?.value !== '全部' ? params?.taskCode?.value : undefined,
        })
        return res
    }
}

export default new Store()
