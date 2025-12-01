import Http from '@/servers/http'

export const getAssistanceListApi = (params: any) => {
    return Http('/job/organization/assistance/page', 'POST', params)
}

export const getServiceStatusCountApi = (data: any) => {
    return Http(`/job/organization/assistance/record_status_num`, 'POST', data)
}

export const getListRecordUserApi = (organizationCode: string) => {
    return Http(`/job/organization/assistance/list_record_user/${organizationCode}`, 'GET', {})
}
