import { makeAutoObservable } from 'mobx'
import { getRecruiterListApi } from './api'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    getRecruiterList = async (params: any) => {
        const res = await getRecruiterListApi(params)
        return res
    }
}

export default new Store()
