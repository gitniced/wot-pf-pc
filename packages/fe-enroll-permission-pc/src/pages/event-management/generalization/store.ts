import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import API from './api'
import { TYPE_ENUM } from '@/types'
class GeneralizationStore {
    /** 推广详情*/
    public generalizationDetail: any = {}
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取推广详情
     * @param code
     * @param type TYPE_ENUM
     */
    getGeneralizationDetail = async (code: any, type: number) => {
        let api = Number(type) === Number(TYPE_ENUM.ORG) ? API.adv_organization : API.adv_activity
        this.generalizationDetail = await Http(api, 'get', { code }, {})
    }
}

export default GeneralizationStore
