import http from '@/servers/http'
import type {
    InvigilationDetailParams,
    TipsParams,
    DelayParams,
    RemarkParams,
    SendForcedSms,
    WindingParams,
    AddLoginTimesParams,
} from './interface'

// 获取学生详情分页
export const getStuList = (params: Partial<InvigilationDetailParams>) => {
    return http(`/exam/front/invigilation/stu_page`, 'post', params)
}

//获取考试详情
export const getExamDetail = (code: string) => {
    return http(`/exam/front/exam/detail/${code}`, 'get', {})
}

export const sendTips = (params: TipsParams) => {
    return http(`/exam/front/invigilation/reminder`, 'post', params)
}

export const sendDelay = (params: DelayParams) => {
    return http(`/exam/front/invigilation/delay`, 'post', params)
}

export const sendRemark = (params: RemarkParams) => {
    return http(`/exam/front/invigilation/remark`, 'post', params)
}

// 强制收卷发送验证码
export const sendForcedSmsApi = (params: SendForcedSms) => {
    return http('/exam/front/invigilation/send_forced_sms', 'POST', params)
}

// 强制收卷
export const forcedWindingApi = (prams: WindingParams) => {
    return http('/exam/front/invigilation/forced_winding', 'POST', prams)
}


// 强制收卷
export const addLoginTimes = (prams: AddLoginTimesParams) => {
    return http('/exam/front/invigilation/add_login_times', 'POST', prams)
}
