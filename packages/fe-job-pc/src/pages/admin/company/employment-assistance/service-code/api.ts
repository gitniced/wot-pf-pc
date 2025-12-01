import HTTP from '@/servers/http'

export const getShareCodeByUserApi = async (organizationCode: string) => {
    return await HTTP(
        `/job/organization/assistance/get_share_code_param_by_org/${organizationCode}}`,
        'GET',
        {},
    )
}
