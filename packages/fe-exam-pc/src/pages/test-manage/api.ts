import http from '@/servers/http'
import type { CandidateReq } from './interface'
import type {
    ConfirmInfoUsingPOSTRequest,
    ConfirmInfoUsingPOSTResponse,
    DetailUsingGETResponse,
} from '@/@types/exam'

// 获取考生考试信息
export const getCandidateInformation = (params: CandidateReq) => {
    return http('/exam/front/exam/person_detail', 'post', params)
}

// 确认考生信息
export const confirmCandidateInformation = (params: ConfirmInfoUsingPOSTRequest) => {
    return http<ConfirmInfoUsingPOSTRequest, ConfirmInfoUsingPOSTResponse>(
        '/exam/front/exam/confirm_info',
        'post',
        params,
    )
}

// 获取考试配置信息
export const getExamData = (code: string) => {
    return http<Record<string, string>, DetailUsingGETResponse>(
        `/exam/front/exam/detail/${code}`,
        'get',
        {},
    )
}

// 确认考前须知
export const confirmPrecautions = (params: CandidateReq) => {
    return http('/exam/front/exam/confirm_precautions', 'post', params)
}

// 查看分数
export const getScoreApi = (code: string) => {
    return http(`/exam/front/exam/get_score/${code}`, 'get', {})
}

//获取消息列表
export const getMsgList = (examCode: string) => {
    return http(`/exam/front/invigilation/list_message/${examCode}`, 'get', {})
}
