import { makeAutoObservable } from 'mobx'
import { getJobExpectListApi } from './api'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    getJobExpectList = async (params: any) => {
        const res = await getJobExpectListApi(params)
        return res
    }
}

export default new Store()
