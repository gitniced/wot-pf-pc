import Http from "@/servers/http";
import type { CorrectiveGradesReq, GradingDetailReq } from "./interface";

// 阅卷老师的阅卷任务详情
export const getGradingDetail = (params: GradingDetailReq) => {
    return Http('/exam/front/grading/teacher_task_detail', 'POST', params)
}

// 阅卷老师批改成绩
export const correctiveGrades = (params: CorrectiveGradesReq) => {
    return Http('/exam/front/grading/teacher_correction', 'POST', params)
}