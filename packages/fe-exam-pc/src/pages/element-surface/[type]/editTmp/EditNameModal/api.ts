// 修改要素细目表的名称

import Http from '@/servers/http'
import { kpHttp } from '@/servers/http/kpHttp'

export const editAuthenticateNameApi = (data: any) => {
    return Http('/question/front/authenticate/edit_authenticates_name', 'POST', data)
}


export const getExamProgramApi = (params: any) => {
    return kpHttp('/exam-programs', 'get', params)
}
