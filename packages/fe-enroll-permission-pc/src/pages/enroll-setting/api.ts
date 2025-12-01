import { BUSINESS_KIND } from '@/types'

export default {
    // 关闭报名活动（计划类型）
    closeActivity: '/apply/front/activity/close',

    //机构端-根据唯一编码或业务线唯一编码查询活动详情
    EnrollSet: '/apply/front/activity/detail',

    // 机构端-新建报名活动(计划类型)
    save: '/apply/front/activity/save',

    //机构端-更新报名活动
    release: '/apply/front/activity/edit',

    //站点详情
    siteDetail: '/auth/site_front/v2/detail',
    /** 获取报名表单设置的列表 */
    getEnrollFormSetttingList: '/apply/front/field/list',
    /** 获取字段信息类型 */
    getFieldType: '/apply/front/field/getFieldType',
    // 机构招生设置详情
    getPortalInfo: '/apply/front/organization_enrollment_setting',
}

/**
 * 业务线活动详情接口x
 */
export const ApiMap: Record<string, string> = {
    [BUSINESS_KIND.EXAM]: '/exam_main/plan/activityDetail/',
    /**  https://api.cloud.wozp.cn/doc.html#/%E8%81%8C%E5%9F%B9%E6%9C%8D%E5%8A%A1/%E7%8F%AD%E7%BA%A7/activeDetailUsingGET  */
    [BUSINESS_KIND.CAREER]: '/career_main/class/active_detail/', //职培
}
