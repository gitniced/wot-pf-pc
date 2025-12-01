import type {
    LEARNING_COLLABORATION_TYPE,
    LEARNING_EDIT_FORMAT,
    LEARNING_FILE_FORMAT,
} from '@/modules/course/constants/learning'
import type { IQuestion } from '@/modules/question/types'
import type { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'

/**
 * 列表基础项
 */
export interface IListBaseItem {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 排序
     */
    sort: number
    /**
     * 完成状态
     */
    finishStatus?: 0 | 1

    /**
     * 子项数量
     */
    childrenNum?: number
}

/**
 * 知识点
 */
export interface IKnowledgePoint {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 序号
     */
    serialNumber: number
}

/**
 * 学习成果
 */
export interface ILearningOutcome {
    /**
     * 成果编码
     */
    code: string
    /**
     * 成果名称
     */
    name: string
    /**
     * 协作类型
     */
    type: LEARNING_COLLABORATION_TYPE
    /**
     * 编辑格式
     */
    editFormat: LEARNING_EDIT_FORMAT
    /**
     * 文件格式
     */
    fileFormat?: LEARNING_FILE_FORMAT
    /**
     * 模版信息
     */
    templateInfo?: string
    /**
     * 模版名称
     */
    templateName?: string
    /**
     * 序号
     */
    sort: number
}

/**
 * 课后作业
 */
export interface ILearningHomework {
    /**
     * 作业编码
     */
    code: string
    /**
     * 作业名称
     */
    name: string
    /**
     * 学习目标
     */
    objectives?: string
    /**
     * 课程要求
     */
    requirements?: string
    /**
     * 编辑格式
     */
    editFormat: LEARNING_EDIT_FORMAT
    /**
     * 文件格式
     */
    fileFormat?: LEARNING_FILE_FORMAT
    /**
     * 模版信息
     */
    templateInfo?: string
    /**
     * 模版名称
     */
    templateName?: string
    /**
     * 序号
     */
    sort: number
}

/**
 * 学习资源
 */
export interface ILearningResource {
    /**
     * 资源编码
     */
    code: string
    /**
     * 序号
     */
    serialNumber: number
    /**
     * 资源库编码
     */
    resourceLibraryCode?: string
    /**
     * 资源名称
     */
    name: string
    /**
     * 资源格式
     */
    fileFormat: RESOURCE_FORMAT
    /**
     * 资源内容
     */
    content: string
    /**
     * 资源类型
     */
    type?: RESOURCE_TYPE
}

/**
 * 学习资源部分
 */
export type ILearningResourcePart = Pick<ILearningResource, 'code' | 'name' | 'type'> & {
    format: ILearningResource['fileFormat']
}

/**
 * 学习活动
 */
export interface ILearningActivity {
    /**
     * 活动编码
     */
    code: string
    /**
     * 步骤编码
     */
    stepCode: string
    /**
     * 活动名称
     */
    name: string
    /**
     * 序号
     */
    sort: number
    /**
     * 学习内容
     */
    content?: string
    /**
     * 协作类型
     */
    type?: LEARNING_COLLABORATION_TYPE
    /**
     * 知识点列表
     */
    knowledgePoints?: IKnowledgePoint[]
    /**
     * 题目列表
     */
    questions?: IQuestion[]
    /**
     * 学习资源列表
     */
    learningResources?: ILearningResource[]
    /**
     * 学习成果列表
     */
    learningOutcomes?: ILearningOutcome[]
    /**
     * 课后作业列表
     */
    homeworks?: ILearningHomework[]
}

/**
 * 学习步骤
 */
export interface ILearningStep {
    /**
     * 步骤编号
     */
    code: string
    /**
     * 步骤名称
     */
    name: string
    /**
     * 学时（小时数）
     */
    period?: number
    /**
     * 理论知识
     */
    theoreticalKnowledge?: string
    /**
     * 实践知识
     */
    practicalKnowledge?: string
    /**
     * 职业素养
     */
    professionalism?: string
    /**
     * 学习活动列表
     */
    learningActivities?: IListBaseItem[]
    /**
     * 排序
     */
    sort: number
}

/**
 * 学习环节
 */
export interface ILearningStage {
    /**
     * 环节编号
     */
    code: string
    /**
     * 任务编号
     */
    taskCode: string
    /**
     * 环节名称
     */
    name: string
    /**
     * 环节学时
     */
    period?: number
    /**
     * 学习目标
     */
    learningGoal?: string
    /**
     * 环节顺序
     */
    sort: number
    /**
     * 学习步骤列表
     */
    learningSteps: IListBaseItem[]
}

/**
 * 学习任务
 */
export interface ILearningTask {
    /**
     * 任务编码
     */
    code: string
    /**
     * 课程编码
     */
    courseCode: string
    /**
     * 任务名称
     */
    name: string
    /**
     * 任务情景
     */
    scenario?: string
    /**
     * 任务资料
     */
    materials?: string
    /**
     * 任务要求
     */
    requirements?: string
    /**
     * 排序
     */
    sort: number
    /**
     * 学习环节列表
     */
    learningStages: IListBaseItem[]
}
