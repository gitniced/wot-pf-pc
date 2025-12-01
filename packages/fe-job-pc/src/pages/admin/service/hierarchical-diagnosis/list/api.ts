import Http from '@/servers/http'

export const getAssistanceListApi = (params: any) => {
    return Http('/job/front/assistance/record_page', 'POST', params)
}

export const getServiceStatusCountApi = (data: any) => {
    return Http('/job/front/assistance/record_status_num', 'POST', data)
}

// 获取用户指定的区域信息
export const getUserRegionApi = () => {
    return Http('/job/front/assistance/get_user_region', 'GET', {})
}

export const getListRecordOrganizationApi = () => {
    return Http('/job/front/assistance/list_record_organization', 'GET', {})
}

export const getStatus = (recordCode: string) => {
    return Http('/job/server/assistance/check_staff_operation_permission', 'GET', { recordCode })
}
