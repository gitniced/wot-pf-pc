import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import { getLocalStorage } from '@/storage'

class Store {
    /** 卡片数据 */
    public cardItems: any = []

    /** 获取卡片数据 */
    getCardItems = async () => {
        const data =
            (await Http(Api.practice, 'post', {
                sid: getLocalStorage('SID'),
            })) ?? []
        this.cardItems = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
