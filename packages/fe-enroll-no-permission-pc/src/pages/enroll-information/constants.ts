export enum STEP_ENUM {
    FIRST,
    SECOND,
    THIRD,
}

export const BASIC_DESC = '填写报名信息'
export const DIGITAL_PHOTO_DESC = '上传电子照片'
export const RULE_DESC = '确认提交报名'

export enum STEP_TYPE_ENUM {
    FIRST,
    SECOND,
    THIRD,
}

export enum FIELD_TYPE {
    ENROLL_INFO = 1, // 报名信息
    BASIC_INFO, // 基本信息
    WORK_INFO, // 工作信息
    CERTIFICATE_INFO, // 证书信息
    DIGITAL_PHOTO, // 电子照片
    OTHER, // 其他
    PROFESSIONAL, // 现证书
}

export const GENDER_OPTIONS = [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
]

// 审核状态
export enum APPROVE_STATUS_TYPE {
    /**待审核*/
    WAIT = 0,
    /**审核通过*/
    PASS = 1,
    /**审核不通过*/
    FAIL = 2,
}
