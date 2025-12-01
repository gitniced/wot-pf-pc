import { makeAutoObservable } from 'mobx'
// import API from './api'
import Http from '@/servers/http'
import { getCookie } from '@/storage'

export default class PracticePushEditStore {
    public initFormData: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    getInitFormData = (str: string) => {
        this.initFormData = str
    }

    /**  推送详情  */
    getPushDetail = async (code: any) => {
        const res = await Http(`/question/front/practice/publish_other_detail/${code}`, 'get', {})
        return res
    }

    /**  新建推送  */
    CreatePush = async (params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE') || undefined
        let res = await Http(
            '/question/front/practice/create_publish_other',
            'post',
            { ...params, time: undefined, organizationCode },
            { repeatFilter: false },
        )
        return res
    }

    //**  重新推送  */
    EditPush = async (params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE') || undefined
        let res = await Http(
            '/question/front/practice/republish_other',
            'post',
            { ...params, time: undefined, organizationCode },
            { repeatFilter: false },
        )
        return res
    }
}
