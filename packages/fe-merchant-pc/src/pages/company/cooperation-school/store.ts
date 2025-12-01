import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { getCookie, getLocalStorage } from '@/storage'
class CooperationSchoolStore {
    public CooperationList = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-24
     * @param {type} params
     */
    getCooperationList = async (params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            api.cooperation_list,
            'post',
            { ...params, organizationCode, type: 1, waitCheck: false },
            { repeatFilter: true },
        )
        this.CooperationList = resp as unknown as {}
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-24
     * @param {type} params
     */
    deleteCooperation = async (codeList: []) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            api.cooperation_cancel,
            'post',
            { codeList, organizationCode, type: 1 },
            { repeatFilter: false },
        )

        return resp

        // this.CooperationList = resp as unknown as []
    }
}

export default CooperationSchoolStore
