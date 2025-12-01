import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { getLocalStorage } from '@/storage'

interface IApplyInfo {
    applyUserName: string
    code: string
    name: string
}

class ApplyStore {
    public applyInfo = {
        applyUserName: '',
        code: '',
        name: '',
    }

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-10-09
     * @param {number} code
     */
    getInfo = async (code: number) => {
        const resp = await Http(`${api.apply}${code}`, 'get', {}, { repeatFilter: false })
        this.applyInfo = resp as unknown as IApplyInfo
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-10-09
     * @param {number} code
     */
    saveConfirm = async (params: object) => {
        const resp = await Http(
            api.confirm,
            'post',
            {
                code: this.applyInfo.code,
                sid: getLocalStorage('SID'),
                ...params,
            },
            { repeatFilter: false },
        )
        return resp
    }
}

export default ApplyStore
