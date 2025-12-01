import { makeAutoObservable } from 'mobx'
import {
    createServiceStaffApi,
    deleteServiceStaffApi,
    getServiceStaffListApi,
    editServiceStaffApi,
    changeServiceStaffStatusApi,
} from './api'
import type { CreateServiceStaffParams, EditServiceStaffParams } from './interface'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    // 获取服务人员列表
    getServiceStaffList = async (params: any) => {
        return await getServiceStaffListApi(params)
    }

    createServiceStaff = (params: CreateServiceStaffParams) => {
        return createServiceStaffApi(params)
    }

    editServiceStaff = (params: EditServiceStaffParams) => {
        return editServiceStaffApi(params)
    }

    // 删除服务记录
    deleteServiceStaff = (code: string, organizationCode: string) => {
        return deleteServiceStaffApi(code, organizationCode)
    }

    changeServiceStaffStatus = (code: string, status: number, organizationCode: string) => {
        return changeServiceStaffStatusApi(code, status, organizationCode)
    }
}

export default new Store()
