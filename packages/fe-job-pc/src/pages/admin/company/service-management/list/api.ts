import Http from '@/servers/http'
import type { CreateServiceStaffParams, EditServiceStaffParams } from './interface'

export const getServiceStaffListApi = (params: any) => {
    return Http(`/job/organization/assistance/service_staff/page`, 'POST', params)
}

export const deleteServiceStaffApi = (code: string, organizationCode: string) => {
    return Http(
        `/job/organization/assistance/service_staff/delete/${code}/${organizationCode}`,
        'POST',
        {},
    )
}

export const editServiceStaffApi = (params: EditServiceStaffParams) => {
    return Http(`/job/organization/assistance/service_staff/update`, 'POST', params)
}

// 新增服务人员
export const createServiceStaffApi = (params: CreateServiceStaffParams) => {
    return Http(`/job/organization/assistance/service_staff/save`, 'POST', params)
}

// 禁用/启用服务人员
export const changeServiceStaffStatusApi = (
    code: string,
    status: number,
    organizationCode: string,
) => {
    return Http(
        `/job/organization/assistance/service_staff/change_status/${code}/${status}/${organizationCode}`,
        'POST',
        {},
    )
}
