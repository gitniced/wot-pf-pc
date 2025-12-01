import Http from '@/servers/http'
import type { FileUpload } from './components/interface'
import type { SubmitFormParams } from './interface'

export const fileUpload = (params: FileUpload) => {
    return Http('/auth/resource/file/upload', 'post', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        delayTime: 60000,
    })
}

/** 获取机构信息*/
export const getOrganizationInfo = (organizationCode: string) => {
    // return Http(`/organization/organization/organization_detail/${organizationCode}`, 'GET', {})
    return Http(`/organization/organization/organization_info/${organizationCode}`, 'GET', {})
}

/** 获取报名活动配置*/
export const getEnrollActivityConfig = (code: string, userCode: string) => {
    return Http('/apply/front/activity/detail_user', 'post', { code, userCode })
}

/** 获取签名或者人脸唯一code*/
export const getVerifyCode = () => {
    return Http('/ocr/face_auth/v1.0/build_record_auth', 'GET', {})
}
/** 获取报名活动表单*/
export const getEnrollForm = (entryCodeInteger: number) => {
    return Http('/apply/front/field/list', 'GET', { entryCodeInteger })
}
/** 获取职位详情*/
export const getCareerInfo = (careerCode?: string) => {
    return Http('/admin/front/site_profession/detail', 'GET', { id: careerCode })
}
/** 获取报名记录详情*/
export const getRecordInfo = (code: string) => {
    return Http('/apply/front/record/detail', 'GET', {
        code,
        convertEnum: false,
    })
}

/** 获取字段枚举*/
export const getFieldEnum = (field: string) => {
    return Http('/common_data/category/category', 'GET', { alias: field })
}

/** 获取学员分类*/
export const getCollegeTypeList = (sid: number) => {
    console.log(sid)
    return Http('/apply/front/field/list_college_type', 'GET', { sid })
}

/** 提交报名*/
export const submitEnroll = (params: SubmitFormParams) => {
    return Http('/apply/front/record/submit_record', 'POST', params)
}

/** 根据上级code获取省市区*/
export const getCityListByParentCode = (parentCode: number) => {
    return Http('/common_data/city/city', 'GET', { parentCode })
}
/** 获取用户认证信息*/
export const getUserVerify = (certificateType: number) => {
    return Http(`/auth/user/v1/certificate_info/${certificateType}`, 'get', {})
}
/** 获取申报条件*/
export const getApplicationConditions = (levelRelationId: string) => {
    if (!levelRelationId) return
    return Http(
        `/apply/front/apply_condition_common_level_relation/list_by_level_relation_id`,
        'get',
        {
            levelRelationId,
        },
    )
}

/** 获取学员分类*/
export const getlistCourseType = (params: any) => {
    return Http('/apply/front/list_course_type', 'post', params)
}
