import Http from '@/servers/http'
import type { CreateRecruiterParams } from '../../recruiter-manage/interface'

// 新建招聘单位
export const createRecruiterApi = (params: CreateRecruiterParams) => {
    return Http('/profession/front/org/enterprise/recruitment/add', 'POST', params)
}

export default {
    // 获取招聘单位
    recruitment_page: '/profession/front/org/enterprise/recruitment/page',
    // 获取一级岗位树
    list_by_pid: '/common_data/capacity/list_by_pid/',
    /** 根据一级id获取二三级岗位树 */
    list_tree: '/common_data/capacity/list_tree/',
    // 岗位列表
    capacity_list: '/common_data/capacity/capacity_list',
    // 学历枚举下拉
    education: '/profession/drop_down/education',
    // 经验枚举下拉
    experience: '/profession/drop_down/experience',
    // 薪资类型枚举下拉
    salary_type: '/profession/drop_down/salary_type',
    // 结算方式枚举下拉
    settlement_type: '/profession/drop_down/settlement_type',
    // 企业新增职位
    job_add: '/profession/front/org/enterprise/add',
    // 企业编辑职位
    add_edit: '/profession/front/org/enterprise/edit',
    // 更改职位状态发布/下架
    update_status: '/profession/front/org/enterprise/update_status',
    // 根据职业类型Id获取tag信息
    tag_profess_type: '/profession/front/tag/list/profess_type',
    // 根据组织code获取地址列表
    organization_address: '/organization/organization/info/address',
    // 增加公司地址
    add_work_address: '/organization/organization/info/address/add_work_address',
    // 地址信息列表By Codes
    address_by_code: '/organization/organization/info/address/list',
    // 获取职位详情
    enterprise_info: '/profession/front/enterprise/info',
    // 根据职位类型tag信息 最多返回500条
    tag_name: '/profession/front/tag/list/tag_name',
    // 自定义添加tag
    tag_add: '/profession/front/tag/add',
    // 获取商圈enum
    category: '/common_data/category/category',
    // 获取ai sessioncode
    get_sessionCode: '/ai/front/session/page',
    // 发送消息
    ai_send: '/ai/front/send',
}
