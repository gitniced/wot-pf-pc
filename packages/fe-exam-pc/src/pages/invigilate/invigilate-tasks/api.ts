import http from '@/servers/http'
import type { InvigilationTasksParams  } from './interface'

// 获取监考任务
export const getInvigilationTaskList = (params: Partial<InvigilationTasksParams>) => {
    return http(`/exam/front/invigilation/page`, 'post', params)
}

