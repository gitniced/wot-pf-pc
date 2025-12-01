import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'

class RosterStore {
    constructor() {
        makeAutoObservable(this)
    }
    organizationCode: string = ''
    departmentCode: string = ''
    inviteCode: any = {}
    organizationDetail: any = {}

    // 获取机构 code
    getOrganizationCode = (code: any) => {
        this.organizationCode = code
    }

    // 成员邀请码
    getInviteCode = async (departmentCode: string, inviteExpire: number) => {
        this.departmentCode = departmentCode

        const res: any = await http(
            api.inviteCode,
            'post',
            {
                organizationCode: this.organizationCode,
                departmentCode,
                inviteExpire,
            },
            { repeatFilter: false, form: true },
        )
        const { data, success } = res || {}
        if (success) {
            this.inviteCode = data || ''
        } else {
            message.error(res.message)
        }
    }

    // 机构详情
    getOrganizationDetail = async () => {
        const res: any = await http(
            `${api.organizationDetail}${this.organizationCode}`,
            'get',
            {},
            { form: true },
        )
        const { data, success } = res || {}

        if (success) {
            this.organizationDetail = data || {}
        } else {
            message.error(res.message)
        }
    }
}

export default RosterStore
