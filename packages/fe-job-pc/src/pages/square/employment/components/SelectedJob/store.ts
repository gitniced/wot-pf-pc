import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import { getLocalStorage } from '@/storage'

class Store {
    /** tab栏请求地址 */
    public apiURL = Api.hotList

    /** 修改tab栏请求地址 */
    public setApiURL = (e, search = true) => {
        this.apiURL = e
        search && this.getCardItems()
    }

    /** 卡片数据 */
    public cardItems = []

    /** 获取卡片数据 */
    getCardItems = async () => {     
        const data =
            (await Http(this.apiURL, 'post', {
                sid: getLocalStorage('SID'),
            })) ?? []
        this.cardItems = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
