import http from '@/servers/http'
import type { InvigilationDetailParams } from './interface'

// 获取学生详情分页
export const getStuList = (params?: InvigilationDetailParams) => {
    return http(`/exam/front/invigilation/stu_page`, 'post', params)
}

//获取考试详情
export const getExamDetail = (code: string) => {
    return http(`/exam/front/exam/detail/${code}`, 'get', {})
}

// 导出考试记录
export const getExportRecordApi = (parmas: Partial<InvigilationDetailParams>) => {
    return http('/exam/front/invigilation/export_stu_page', 'POST', parmas)
}
