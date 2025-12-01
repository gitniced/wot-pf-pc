import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import { getCookie } from '@/storage'

class Store {
    /** 当前选择的求职意向 */
    public jobExpectCurrent: any = {}

    /** 切换当前选择的求职意向 */
    public setJobExpectCurrent = (val: any, search = true) => {
        this.jobExpectCurrent = val
        search && this.getCardItems()
    }

    /** 求职意向 */
    public jobExpectList: any = []

    /** 获取求职意向 */
    getJobExpectList = async () => {
        const isLogin = getCookie('TOKEN')
        if (!isLogin) return

        const data: any =
            (await Http(Api.JobExpectList, 'post', {
                bizCode: '',
                openKey: '',
            })) ?? []
        this.jobExpectList = data
        this.jobExpectCurrent = data[0] ?? {}
    }

    /** tab栏请求地址 */
    public apiURL = Api.choicesList

    /** 修改tab栏请求地址 */
    public setApiURL = (e: any, search = true) => {
        this.apiURL = e
        search && this.getCardItems()
    }

    /** 卡片数据 */
    public cardItems: any = []

    /** 获取卡片数据 */
    getCardItems = async () => {
        const { code, capacityId } = this.jobExpectCurrent ?? {}
        const data =
            (await Http(this.apiURL, 'post', {
                expectCode: code,
                expectProfessionTypeId: capacityId,
            })) ?? []
        this.cardItems = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
