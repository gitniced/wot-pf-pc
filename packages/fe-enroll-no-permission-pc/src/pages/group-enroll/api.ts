import Http from '@/servers/http'
import type { SubmitFormParams, updateImportRecordRequest } from './interface'
import type { FileUpload } from '@/components/BatchImport/interface'

export const fileUpload = (params: FileUpload) => {
    return Http('/auth/resource/file/upload', 'post', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        delayTime: 60000,
    })
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
    return Http(
        `/apply/front/apply_condition_common_level_relation/list_by_level_relation_id`,
        'get',
        {
            levelRelationId,
        },
    )
}

// 获取报名联系人缓存信息
export const getLastImportInfoApi = (activityCode: string) => {
    return Http(`/apply/front/batch/last_import_info/${activityCode}`, 'GET', {})
}

// 检测电子照片是否由人脸
export const checkFaceApi = (url: string) => {
    if (!url) return
    return Http(`/apply/front/record/face_detect`, 'post', { url })
}

// 获取导入报名临时人员列表
export const listImportRecordByCode = (importCode: string) => {
    return Http(`/apply/front/batch/list_import_record/${importCode}`, 'get', {})
}

// 获取导入报名临时人员列表
export const getImportRecordByCode = (recordCode: string) => {
    return Http(`/apply/front/batch/get_import_record/${recordCode}`, 'get', {})
}

// 获取导入报名临时人员详情
export const updateImportRecord = (params: updateImportRecordRequest) => {
    return Http(`/apply/front/batch/update_import_record`, 'post', params)
}

// 提交导入数据报名
export const importSubmit = (code: string) => {
    return Http(`/apply/front/batch/submit`, 'post', { code })
}
