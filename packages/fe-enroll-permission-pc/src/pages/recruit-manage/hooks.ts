import Http from '@/servers/http'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import api from './api'

export default class PortalDetailHooks {
    public PortalInfoDetail: Partial<any> = {} //门户信息
    public enrollmentStatusLoading: boolean = false //招生状态loading

    constructor() {
        makeAutoObservable(this)
    }

    // 获取机构招生设置详情
    getPortalInfo = async () => {
        const res: any = (await Http(`${api.getPortalInfo}`, 'get', {})) || {}
        this.PortalInfoDetail = res
    }

    // 修改机构招生设置详情
    editPortalInfo = async (data: any) => {
        const res =
            (await Http(`${api.editPortal}`, 'post', { ...data }, { repeatFilter: false })) || {}
        return res
    }

    // 保存机构招生设置
    setEnrollmentStatus = async (data: any) => {
        try {
            this.enrollmentStatusLoading = true
            ;(await Http(`${api.setEnrollmentStatus}`, 'post', { ...data })) || {}
            this.enrollmentStatusLoading = false
            message.success('操作成功')
            this.getPortalInfo()
        } catch (error) {
            this.enrollmentStatusLoading = false
        }
    }
}
