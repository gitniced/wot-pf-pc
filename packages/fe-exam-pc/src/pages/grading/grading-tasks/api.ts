import Http from "@/servers/http";
import type { TaskListReq } from "./interface";

export const getTaskList = (params: TaskListReq) => {
    return Http('/exam/front/grading/teacher_page', 'POST', params)
}