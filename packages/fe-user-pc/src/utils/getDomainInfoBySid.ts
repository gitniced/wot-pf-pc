import type { BackendSiteDetailResponseDto } from '@/@types/auth'
import http from '@/servers/http'

export const getDomainInfoBySid = async (sid: string) => {
    let domainInfo = (await http(
        '/auth/backend/site/v2/detail_by_domain',
        'post',
        {
            sid: Number(sid),
            configTypeList: ['domainInfo'],
            // 有sid时，domain不校验，只需要传内容跳过必填校验就行
            domain: 'false',
        },
        { repeatFilter: true },
    )) as unknown as BackendSiteDetailResponseDto
    console.log(domainInfo)

    return domainInfo
}
