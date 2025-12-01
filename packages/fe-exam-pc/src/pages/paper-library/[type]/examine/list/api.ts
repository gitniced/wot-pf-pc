import http from '@/servers/http'

// 获取题型分布详情
export const getQuestionDetailByCode = (code: string, params: Record<string, any>) => {
    return http(`/exam/front/get_question_detail/${code}`, 'GET', params)
}

// 下载试卷
export const paperDownload = ({ file_format, code, ...params }: any) => {
    return http(`/exam/front/download/${file_format}/${code}`, 'GET', params)
}
// 下载pdf
export const pdfDownload = ({ code, type }: any) => {
    return http(`/exam/front/download/word_to_pdf/${code}`, 'GET', { type })
}

// 命题信息
export const getPropositionInformation = (code: string) => {
    return http(`/exam/front/paper/proposition_information/${code}`, 'GET', {})
}
