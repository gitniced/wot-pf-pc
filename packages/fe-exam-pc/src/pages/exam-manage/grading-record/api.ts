
import Http from "@/servers/http";
import type { RecordListReq } from "./interface";

// 获取阅卷记录列表
export const getGradingRecordList = (params: RecordListReq) => {
    return Http('/exam/front/grading/paper_page', 'POST', params)
}