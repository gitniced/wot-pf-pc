import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { getCookie } from '@/storage'

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

    // 获取组织信息
    public orgInfo = {
        code: '',
        logo: '',
        name: '',
    }

    constructor() {
        makeAutoObservable(this)
        this.getOrgInfo()
    }

    getOrgInfo = async () => {
        const code = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            `${api.organization_base_info}/${code}`,
            'get',
            {},
            { repeatFilter: false },
        )
        // @ts-ignore
        this.orgInfo = resp as unknown as {}
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
                organizationCode: this.orgInfo.code,
                ...params,
            },
            { repeatFilter: false },
        )
        return resp
    }
}

export default ApplyStore
