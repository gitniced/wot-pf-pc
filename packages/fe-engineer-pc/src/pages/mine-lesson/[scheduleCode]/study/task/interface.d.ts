import type { STAGE, STEP, TASK } from './const'

/**
 * 任务详情
 * LearningTaskDto
 */
export interface LearningTaskDto {
    /**
     * 任务编号
     */
    code?: string
    /**
     * 知识点列表
     */
    knowledgePoints?: KnowledgePointDto[]
    /**
     * 任务资料
     */
    materials?: string
    /**
     * 任务名称
     */
    name?: string
    /**
     * 任务学时
     */
    period?: number
    /**
     * 任务要求
     */
    requirements?: string
    /**
     * 任务情景
     */
    scenario?: string
    /**
     * 任务顺序
     */
    sort?: number
    /**
     * 教学实施建议(教师用)
     */
    suggestion?: string
    [property: string]: any
}

/**
 * 环节详情
 * LearningStageDto
 */
export interface LearningStageDto {
    /**
     * 环节编号
     */
    code?: string
    /**
     * 知识点列表
     */
    knowledgePoints?: KnowledgePointDto[]
    /**
     * 环节描述
     */
    learningGoal?: string
    /**
     * 环节名称
     */
    name?: string
    /**
     * 环节学时
     */
    period?: number
    /**
     * 环节顺序
     */
    sort?: number
    [property: string]: any
}

/**
 * 步骤详情
 * LearningStepDto
 */
export interface LearningStepDto {
    /**
     * 步骤编号
     */
    code?: string
    /**
     * 步骤名称
     */
    name?: string
    /**
     * 步骤学时
     */
    period?: number
    [property: string]: any
}

/**
 * 知识点数据传输对象
 *
 * KnowledgePointDto
 */
export interface KnowledgePointDto {
    /**
     * 知识点编号
     */
    knowledgePointCode?: string
    /**
     * 知识点描述
     */
    knowledgePointDescription?: string
    /**
     * 知识点名称
     */
    knowledgePointName?: string
    [property: string]: any
}

export type ComponentType = typeof TASK | typeof STAGE | typeof STEP
