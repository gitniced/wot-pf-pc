import Http from "@/servers/http";

// 获取阅卷记录详情
export const getRecordDetail = (stuExamCode: string) => {
    return Http(`/exam/front/grading/list_question/${stuExamCode}`, 'GET', {})
}

export const getAnswerOrbit = (params: any) => {
    return Http(`/exam/front/grading/list_question`, 'GET', params)
}
