import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import Api from '../api'

class Store {
    public cityList = []

    getCityList = async () => {
        const data = (await Http(Api.cityList, 'get', { parentCode: 0 })) ?? []
        this.cityList = data?.map(item => ({
            label: item.name,
            key: item.code,
        }))
    }

    constructor() {
        makeAutoObservable(this)
        this.getCityList()
    }
}

export default Store
