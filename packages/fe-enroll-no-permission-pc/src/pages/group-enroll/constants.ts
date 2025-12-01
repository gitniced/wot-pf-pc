export const BASIC_STEP = '批量导入报名信息'
export const CONFIRM_STEP = '确认报名信息'
export const RULE_STEP = '确认提交报名'

export enum FIELD_TYPE {
    ENROLL_INFO = 1, // 报名信息
    BASIC_INFO, // 基本信息
    WORK_INFO, // 工作信息
    CERTIFICATE_INFO, // 证书信息
    DIGITAL_PHOTO, // 电子照片
    OTHER, // 其他
    PROFESSIONAL, // "职称证书信息"
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

// 导入状态
export enum IMPORT_STATUS_ENUM {
    NONE = 0, // 初始化
    BEFORE = 1, // 导入前
    LOADING = 5, // 导入中
    RESOLVED = 20, // 导入成功
    REJECTED = 10, // 导入失败
}

// 上传文件限制
export const ACCEPT =
    'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

// 上传大小限制
export const MAX_SIZE = 5 * 1024 * 1024
