import Http from "@/servers/http";
import type { SubmitListReq,submitReq } from "./interface";

// 获取阅卷老师的提交成绩列表
export const getSubmitList = (params: SubmitListReq) => {
    return Http('/exam/front/grading/teacher_submit_page', 'POST', params)
}

// 提交成绩
export const submitGrading = (params: submitReq) => {
    return Http('/exam/front/grading/teacher_submit', 'POST', params)
}