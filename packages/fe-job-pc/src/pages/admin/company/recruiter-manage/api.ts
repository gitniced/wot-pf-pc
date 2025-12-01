import Http from '@/servers/http'

import type { CreateRecruiterParams, EditRecruiterParams } from './interface'

// 分页查询招聘单位列表
export const getRecruiterListApi = (params: { pageNo: number; pageSize: number }) => {
    return Http('/profession/front/org/enterprise/recruitment/page', 'POST', params)
}

// 新建招聘单位
export const createRecruiterApi = (params: CreateRecruiterParams) => {
    return Http('/profession/front/org/enterprise/recruitment/add', 'POST', params)
}

// 编辑招聘单位
export const editRecruiterApi = (params: EditRecruiterParams) => {
    return Http('/profession/front/org/enterprise/recruitment/edit', 'POST', params)
}

// 获取招聘单位详情
export const getRecruiterDetailApi = (code: string) => {
    return Http(`/profession/front/org/enterprise/recruitment/info/${code}`, 'GET', {})
}

// 删除招聘单位确认
export const deleteCheckApi = (code: string) => {
    return Http('/profession/front/org/enterprise/recruitment/delete/check', 'POST', { code })
}

// 删除招聘单位
export const deleteApi = (code: string) => {
    return Http('/profession/front/org/enterprise/recruitment/delete', 'POST', { code })
}

// 招聘单位枚举
export const getRecruitCompanyTypeApi = () => {
    return Http('/profession/drop_down/recruit_company_type', 'GET', {})
}
