import { makeAutoObservable } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import { getCookie } from '@/storage'

export default class PracticePushStore {
    constructor() {
        makeAutoObservable(this)
    }

    /**  列表请求  */
    practicePushTableRequest = async (params: any) => {
        params.sid = params?.sid?.value

        let res = await Http(API.getList, 'post', { ...params }, { repeatFilter: false })
        return res
    }

    /**  下架推送  */
    practicePushDown = async (code: any) => {
        await Http(`/question/front/practice/publish_other_down/${code}`, 'post', {})
    }
}
