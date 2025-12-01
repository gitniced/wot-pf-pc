import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import { getLocalStorage } from '@/storage'

class Store {
    /** tab栏请求地址 */
    public selectTab = ''

    /** 修改tab栏请求地址 */
    public setSelectTab = (e: any) => {
        this.selectTab = e
        this.getCardItems()
    }

    /** 卡片数据 */
    public cardItems: any = []

    /** 获取卡片数据 */
    getCardItems = async () => {
        const data =
            (await Http(Api.activitypage, 'post', {
                pageSize: 3,
                pageNo: 1,
                catalogCode: this.selectTab,
                sid: getLocalStorage('SID'),
            })) ?? []
        this.cardItems = data?.data
    }

    public Tabs: any = []

    getTabs = async () => {
        const data: any =
            (await Http(Api.activity, 'post', {
                sid: getLocalStorage('SID'),
            })) ?? []
        this.Tabs = data
        this.selectTab = data?.[0]?.code
        this.getCardItems()
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
