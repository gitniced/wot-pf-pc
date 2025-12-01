import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { getCookie } from '@/storage'
class CooperationSchoolStore {
    // 合作企业列表
    public CooperationList = {}

    // tabs标签
    public items = [] as any[]

    // 组织详情
    public selectedOrganizationDetail = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取组织详情
     * @param {string} organizationCode
     */
    getSelectedOrganizationDetail(organizationCode: string) {
        return Http(`${api.getOrganizationDetail}${organizationCode}`, 'get', {}).then(
            (res: any) => {
                this.selectedOrganizationDetail = res || {}
            },
        )
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-24
     * @param {type} params
     */
    getCooperationList = async (params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const resp: any = await Http(
            api.cooperation_list,
            'post',
            { ...params, organizationCode, type: 2 },
            { repeatFilter: false },
        )
        this.CooperationList = resp as unknown as {}

        this.items = [
            { label: `合作企业(${resp?.cooperCount || 0})`, key: '1' }, // 务必填写 key
            { label: `待审核申请(${resp?.waitInviteCount || 0})`, key: '2' },
        ]
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-10-09
     * @param {type} params
     */
    getInvite = async ({ applyName, redirection }: { applyName: string; redirection: string }) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            api.invite,
            'post',
            { organizationCode, applyName, redirection },
            { repeatFilter: false },
        )

        return resp
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-24
     * @param {type} params
     */
    saveOperate = async (params: object) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            api.operate,
            'post',
            { ...params, organizationCode },
            { repeatFilter: false },
        )

        return resp
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
            { codeList, organizationCode, type: 2 },
            { repeatFilter: false },
        )

        return resp

        // this.CooperationList = resp as unknown as []
    }
}

export default CooperationSchoolStore
