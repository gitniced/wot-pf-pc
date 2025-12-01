import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import { history } from 'umi'
import { getSourceTypeByType } from '@/utils/urlUtils'

// 获取可入驻的机构列表
export const getJoinOrgList = async (sourceType: string) => {
    let currentType = getSourceTypeByType(sourceType)
    if (!currentType) return
    return http(`${globalApi.canJoinOrg}${currentType}`, 'GET', {})
}

// 资源方/机构 入驻页面跳转
export const joinRegisterHandle = async (sourceType: string) => {
    let joinOrgList = (await getJoinOrgList(sourceType)) as unknown as []
    if (joinOrgList?.length) {
        let currentParams = `?type=register&sourceType=${sourceType}`

        //  前往入驻机构页
        history.replace(`/select/organization${currentParams}`)
    } else {
        let currentParams = `?type=register&register=1&sourceType=${sourceType}`
        // 如果没有可以选的入驻机构 就去创建页面
        history.replace(`/organization/create${currentParams}`)
    }
}
