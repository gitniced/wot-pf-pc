// 业务类型
export enum BUSINESS_TYPE_MAP {
    EXAMINATION = 'exam',
}

// 针对业务类型需要使用的request key
export const BUSINESS_KEY_BY_TYPE_MAP: Record<string, string> = {
    [BUSINESS_TYPE_MAP.EXAMINATION]: '',
}

// 针对业务类型需要请求的api
export const BUSINESS_API_BY_TYPE_MAP: Record<string, string> = {
    [BUSINESS_TYPE_MAP.EXAMINATION]: '/exam/front/exam/exam_login_detail/',
}
// 针对业务类型登录需要请求的api
export const BUSINESS_LOGIN_API_BY_TYPE_MAP: Record<string, string> = {
    [BUSINESS_TYPE_MAP.EXAMINATION]: '/exam/front/exam/exam_login',
}
