
import Http from "@/servers/http";
import type { RecordListReq } from "./interface";

// 获取阅卷记录的阅卷详情
export const getRecordDetail = (params: RecordListReq) => {
    return Http('/exam/front/grading/teacher_submit_page', 'POST', params)
}
