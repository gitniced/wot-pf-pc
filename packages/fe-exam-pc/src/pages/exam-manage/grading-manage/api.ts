import Http from '@/servers/http'
import type { GradingReq } from './interface'

// 获取阅卷配置任务列表
export const getGradingList = (data?: GradingReq) => {
    return Http('/exam/front/grading/page', 'post', data!)
}
