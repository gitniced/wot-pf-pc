import http from '@/servers/http'
import api from './api'
import type {
    ICourse,
    ICourseWayFinishStatusRequest,
    ICourseWayFinishStatusMap,
    ICourseWayTaskFinishStatusRequest,
} from './types'
import type { ICourseConversionKeyInformation } from './types/conversion'
import type { ICourseStylistic1 } from './types/stylistic1'
import type { ICourseStylistic2 } from './types/stylistic2'
import type { ICourseStylistic3 } from './types/stylistic3'
import type { ICourseStylistic4 } from './types/stylistic4'
import type { ICourseStylistic5 } from './types/stylistic5'
import type { ICourseStylistic6 } from './types/stylistic6'
import type { ICourseStylistic7 } from './types/stylistic7'
import type { ICourseStylistic8 } from './types/stylistic8'
import type { ICourseStylistic9 } from './types/stylistic9'
import type { ICourseStylistic10 } from './types/stylistic10'
import type { ICourseStylistic11 } from './types/stylistic11'
import type { ICourseStylistic12 } from './types/stylistic12'
import type { ICourseTeachingPlanInformation } from './types/teaching'
import type { ICourseCheckInformation } from './types/check'
import type {
    IListBaseItem,
    ILearningTask,
    ILearningStage,
    ILearningActivity,
    ILearningResourcePart,
} from './types/learning'
import type { IPagination } from '@/types/http'
import globalApi from '@/servers/globalApi'

/**
 * 查看体例第一步的完成概览
 */
export const getCourseConversionOverview = (courseCode: string) => {
    return http<
        null,
        {
            keyInformation: number
        }
    >(api.getWaysFirstOverview, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 查看课程校本转换
 */
export const getCourseConversionKeyInformation = (courseCode: string) => {
    return http<null, ICourseConversionKeyInformation>(api.getWaysKeyInformation, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 编辑课程校本转换
 */
export const editCourseConversionKeyInformation = (data: ICourseConversionKeyInformation) => {
    return http<ICourseConversionKeyInformation, boolean>(api.editWaysKeyInformation, 'post', data)
}

/**
 * 获取体例一详情
 */
export const getCourseStylistic1 = (courseCode: string) => {
    return http<null, ICourseStylistic1>(api.getWaysWayOne, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 编辑体例一
 */
export const editCourseStylistic1 = (data: ICourseStylistic1) => {
    return http<ICourseStylistic1, boolean>(api.editWaysWayOne, 'post', data, {
        query: { courseCode: data.courseCode },
    })
}

/**
 * 获取体例二详情
 */
export const getCourseStylistic2 = (courseCode: string) => {
    return http<null, ICourseStylistic2>(api.getWaysWayTwo, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 编辑体例二
 */
export const editCourseStylistic2 = (data: ICourseStylistic2) => {
    return http<ICourseStylistic2, boolean>(api.editWaysWayTwo, 'post', data, {
        query: { courseCode: data.courseCode },
    })
}

/**
 * 查询课程基本信息
 */
export const getCourseDetailBaseInfo = (courseCode: string) => {
    return http<null, ICourse>(api.getCourseDetailBaseInfo, 'get', null, {
        query: { code: courseCode },
    })
}
/**
 * 获取教学方案设计
 */
export const getCourseTaskTeachingPlanformation = (courseCode: string) => {
    return http<null, ICourseTeachingPlanInformation>(api.getCourseTaskTeachingPlan, 'get', null, {
        query: { courseCode },
    })
}
/**
 * 保存或修改教学方案
 */
export const editCourseTaskTeachingPlanformation = (data: ICourseTeachingPlanInformation) => {
    return http<ICourseTeachingPlanInformation, boolean>(api.saveOrUpdateTeachingPlan, 'post', data)
}
// ========== 教研端-课程学习任务管理 ==========

/**
 * 获取课程学习任务列表
 */
export const getCourseTaskList = (courseCode: string) => {
    return http<null, IListBaseItem[]>(api.getCourseTaskList, 'post', null, {
        query: {
            courseCode,
        },
    })
}

export const removeCourseTask = (code: string) => {
    return http<null, boolean>(api.removeCourseTask, 'post', null, {
        query: { code },
    })
}

/**
 * 获取课程学习任务-环节列表
 */
export const getCourseTaskStageList = (taskCode: string) => {
    return http<null, (IListBaseItem & { taskSort: number })[]>(
        api.getCourseTaskStageList,
        'post',
        null,
        {
            query: { taskCode },
        },
    )
}

/**
 * 根据学习环节编码查询学习活动基本信息列表
 */
export const getCourseTaskActivityList = (stageCode: string) => {
    return http<
        null,
        (IListBaseItem & {
            taskSort: number
            stageSort: number
        })[]
    >(api.getCourseTaskActivityList, 'post', null, {
        query: { stageCode },
    })
}

/**
 * 获取课程学习任务详情
 */
export const getCourseTaskDetail = (code: string) => {
    return http<null, ILearningTask>(api.getCourseTaskDetail, 'post', null, {
        query: { code },
    })
}

/**
 * 保存或修改课程学习任务
 */
export const saveCourseTask = (
    data: Omit<ILearningTask, 'code'> & { code?: ILearningTask['code'] },
) => {
    return http<typeof data, boolean>(api.saveCourseTask, 'post', data)
}

/**
 * 获取课程学习任务-环节详情
 */
export const getCourseTaskStageDetail = (code: string) => {
    return http<null, ILearningStage>(api.getCourseTaskStageDetail, 'post', null, {
        query: { code },
    })
}

/**
 * 保存或修改学习环节
 */
export const saveCourseTaskStage = (
    data: Omit<ILearningStage, 'code'> & { code?: ILearningStage['code'] },
) => {
    return http<typeof data, boolean>(api.saveCourseTaskStage, 'post', data)
}

/**
 * 获取课程学习任务-活动详情
 */
export const getCourseTaskActivityDetail = (code: string) => {
    return http<null, ILearningActivity>(api.getCourseTaskActivityDetail, 'post', null, {
        query: { code },
    })
}

/**
 * 保存或修改学习活动
 */
export const saveCourseTaskActivity = (
    data: Omit<ILearningActivity, 'code'> & { code?: ILearningActivity['code'] },
) => {
    return http<typeof data, boolean>(api.saveCourseTaskActivity, 'post', data)
}

/**
 * 获取自己有权限的资源列表-本人个人+本校本专业公开
 */
export const getAuthResourcePage = (params: {
    pageNo?: number
    pageSize?: number
    orderBy?: string
    order?: string
    courseCode?: string
    excludeResourceCode?: string[]
}) => {
    return http<typeof params, IPagination<ILearningResourcePart>>(
        api.getAuthResourcePage,
        'post',
        params,
    )
}

/**
 * 上传资源文件
 */
export const uploadResourceFile = (image: File) => {
    return http<
        any,
        {
            ext: string
            hash: string
            name: string
            size: number
            url: string
            urlOriginal: string
        }
    >(
        globalApi.upload,
        'post',
        { file: image, isPrivate: false, type: 28 },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            delayTime: 60000,
            repeatFilter: false,
        },
    )
}

export const createUploadResourceFile = () => {
    const input = document.createElement('input') as HTMLInputElement
    input.type = 'file'
    input.accept = '*'
    const promise = new Promise<Awaited<ReturnType<typeof uploadResourceFile>>>(
        (resolve, reject) => {
            input.onchange = async event => {
                const target = event.target as HTMLInputElement
                if (target.files && target.files[0]) {
                    const file = target.files[0]
                    resolve(uploadResourceFile(file))
                } else {
                    reject(new Error('No file selected'))
                }
            }

            input.oncancel = () => {
                reject(new Error('File upload canceled'))
            }
        },
    )
    input.click()
    return promise
}

/**
 * 获取体例7详情
 */
export const getCourseStylistic7 = (taskCode: string) => {
    return http<null, ICourseStylistic7>(api.getTaskTeachingActivityMastermind, 'get', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例7
 */
export const editCourseStylistic7 = (data: ICourseStylistic7) => {
    return http<ICourseStylistic7, boolean>(
        api.saveOrUpdateTaskTeachingActivityMastermind,
        'post',
        data,
        {
            query: {},
        },
    )
}

/**
 * 获取体例11详情
 */
export const getCourseStylistic11 = (courseCode: string) => {
    return http<null, ICourseStylistic11>(api.getCourseTaskTeachingSchedule, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 编辑体例11
 */
export const editCourseStylistic11 = (data: ICourseStylistic11) => {
    return http<ICourseStylistic11, boolean>(api.saveOrUpdateTeachingSchedule, 'post', data, {
        query: {},
    })
}

/**
 * 获取体例12详情
 */
export const getCourseStylistic12 = (taskCode: string) => {
    return http<null, ICourseStylistic12>(api.getCourseTaskTaskLessonPlan, 'get', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例12
 */
export const editCourseStylistic12 = (data: ICourseStylistic12) => {
    return http<ICourseStylistic12, boolean>(api.saveOrUpdateTaskLessonPlan, 'post', data, {
        query: {},
    })
}

/**
 * 获取第四步-考核方案
 */
export const getCourseCheckInformation = (courseCode: string) => {
    return http<null, ICourseCheckInformation>(api.getCourseTaskAssessmentPlan, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 编辑考核方案
 */
export const editCourseCheckInformation = (data: ICourseCheckInformation) => {
    return http<ICourseCheckInformation, boolean>(api.saveOrUpdateAssessmentPlan, 'post', data, {
        query: {},
    })
}

/**
 * 获取体例4详情
 */
export const getCourseStylistic4 = (courseCode: string) => {
    return http<null, ICourseStylistic4>(api.getCourseTaskCurriculumAssessmentPlan, 'get', null, {
        query: { courseCode },
    })
}

/**
 * 编辑体例4
 */
export const editCourseStylistic4 = (data: ICourseStylistic4) => {
    return http<ICourseStylistic4, boolean>(
        api.saveOrUpdateCurriculumAssessmentPlan,
        'post',
        data,
        {
            query: {},
        },
    )
}

/**
 * 获取体例5详情
 */
export const getCourseStylistic5 = (taskCode: string) => {
    return http<null, ICourseStylistic5>(api.getCourseTaskFinalAssessmentQuestions, 'get', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例5
 */
export const editCourseStylistic5 = (data: ICourseStylistic5) => {
    return http<ICourseStylistic5, boolean>(
        api.saveOrUpdateFinalAssessmentQuestions,
        'post',
        data,
        {
            query: {},
        },
    )
}

/**
 * 获取体例8详情
 */
export const getCourseStylistic8 = (taskCode: string) => {
    return http<null, ICourseStylistic8>(api.getCourseTaskStudyTaskAssessmentPlan, 'get', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例8
 */
export const editCourseStylistic8 = (data: ICourseStylistic8) => {
    return http<ICourseStylistic8, boolean>(api.saveOrUpdateStudyTaskAssessmentPlan, 'post', data, {
        query: {},
    })
}

/**
 * 获取体例3详情
 */
export const getCourseStylistic3 = (courseCode: string) => {
    return http<null, ICourseStylistic3>(api.getCourseTaskWayThree, 'post', null, {
        query: { courseCode },
    })
}

/**
 * 编辑体例3
 */
export const editCourseStylistic3 = (data: ICourseStylistic3) => {
    return http<ICourseStylistic3, boolean>(api.saveOrUpdateWayThree, 'post', data, {
        query: {},
    })
}

/**
 * 获取体例6详情
 */
export const getCourseStylistic6 = (taskCode: string) => {
    return http<null, ICourseStylistic6>(api.getCourseTaskWaySix, 'post', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例6
 */
export const editCourseStylistic6 = (data: ICourseStylistic6) => {
    return http<ICourseStylistic6, boolean>(api.saveOrUpdateWaySix, 'post', data, {
        query: {},
    })
}

/**
 * 获取体例9详情
 */
export const getCourseStylistic9 = (taskCode: string) => {
    return http<null, ICourseStylistic9>(api.getCourseTaskLearningTaskWork, 'get', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例9
 */
export const editCourseStylistic9 = (data: ICourseStylistic9) => {
    return http<ICourseStylistic9, boolean>(api.saveOrUpdateLearningTaskWork, 'post', data, {
        query: {},
    })
}

/**
 * 获取体例10详情
 */
export const getCourseStylistic10 = (taskCode: string) => {
    return http<null, ICourseStylistic10>(api.getCourseTaskLearningTaskInformation, 'get', null, {
        query: { taskCode },
    })
}

/**
 * 编辑体例10
 */
export const editCourseStylistic10 = (data: ICourseStylistic10) => {
    return http<ICourseStylistic10, boolean>(
        api.saveOrUpdateLearningTaskInformation,
        'post',
        data,
        {
            query: {},
        },
    )
}

/**
 * 获取体例状态列表
 */
export const getCourseTaskListWayFinishStatus = (data: ICourseWayFinishStatusRequest) => {
    return http<ICourseWayFinishStatusRequest, ICourseWayFinishStatusMap>(
        api.getCourseTaskListWayFinishStatus,
        'post',
        data,
    )
}

export const getCourseTaskListWayTaskFinishStatus = (data: ICourseWayTaskFinishStatusRequest) => {
    return http<ICourseWayTaskFinishStatusRequest, Record<string, number>>(
        api.getCourseTaskListWayTaskFinishStatus,
        'post',
        data,
    )
}

export const downloadWay = (query: { courseCode: string; type: number }) => {
    return http<any, string>(api.downloadWay, 'post', {}, { query: query })
}
