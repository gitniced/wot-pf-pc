import type { IQuestion } from '@/modules/question/types'
import type { ILearningOutcome, ILearningHomework } from './learning'

/**
 * 体例十 - 学习任务信息页
 */
export interface ICourseStylistic10 {
    /**
     * 学习环节详情
     */
    stageLearningStepList?: ICourseStylistic10StageLearningStep[]
    /**
     * 学习路径
     */
    stageTeachingScheduleList?: ICourseStylistic10StageTeachingSchedule[]
    /**
     * 任务编码
     */
    taskCode: string
}

/**
 * 体例十 - 环节教学进度
 */
export interface ICourseStylistic10StageTeachingSchedule {
    /**
     * 环节编码
     */
    code: string
    /**
     * 学习步骤列表
     */
    learningStepList: ICourseStylistic10LearningStep[]
    /**
     * 环节名称
     */
    name: string
}

/**
 * 体例十 - 学习步骤
 */
export interface ICourseStylistic10LearningStep {
    /**
     * 步骤编码
     */
    code: string
    /**
     * 步骤名称
     */
    name: string
    /**
     * 政治思想教育
     */
    politicalEducation?: string
    /**
     * 职业素养
     */
    professionalism?: string
    /**
     * 学习步骤活动
     */
    learningStepActivityList?: ICourseStylistic10StudentActivity[]
}

/**
 * 体例十 - 学生活动
 */
export interface ICourseStylistic10StudentActivity {
    /**
     * 活动编码
     */
    code: string
    /**
     * 材料
     */
    materials?: string
    /**
     * 活动名称
     */
    name?: string
    /**
     * 题目列表
     */
    questions?: IQuestion[]
    /**
     * 学习成果
     */
    learningOutcomes?: ILearningOutcome[]
    /**
     * 作业列表
     */
    homeworks?: ILearningHomework[]
}

/**
 * 体例十 - 要求项目
 */
export interface ICourseStylistic10RequestItem {
    /**
     * 编码
     */
    code: string
    /**
     * 学习内容
     */
    learningContent?: string
    /**
     * 名称
     */
    name?: string
    /**
     * 课时
     */
    period?: number
    /**
     * 备注
     */
    remark?: string
}

/**
 * 体例十 - 环节学习步骤
 */
export interface ICourseStylistic10StageLearningStep {
    /**
     * 环节编码
     */
    code: string
    /**
     * 环节名称
     */
    name?: string
    /**
     * 课时
     */
    period?: number
    /**
     * 学习目标
     */
    learningGoal?: string
    /**
     * 要求列表
     */
    requestList?: ICourseStylistic10RequestItem[]
    /**
     * 学习步骤列表
     */
    learningStepList?: ICourseStylistic10LearningStep[]
}
