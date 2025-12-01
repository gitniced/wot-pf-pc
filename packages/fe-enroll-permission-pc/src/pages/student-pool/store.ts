import { makeAutoObservable } from 'mobx'
import { saveFollow, getListPageApi } from './api'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    public siteSignCount: number = 0
    public organizeSignCount: number = 0

    // 获取列表
    getListPageApi = async (params: any) => {
        return await getListPageApi(params)
    }

    saveFollow = (data: any) => {
        return saveFollow(data)
    }
}

export default new Store()
