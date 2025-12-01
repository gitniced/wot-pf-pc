import type { IQuestion } from '@/modules/question/types'
import type { ILearningHomework, ILearningOutcome } from './learning'

/**
 * 体例九 - 学习任务作业页
 */
export interface ICourseStylistic9 {
    /**
     * 任务编码
     */
    taskCode: string
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
     * 学习环节
     */
    stageMastermindList?: ICourseStylistic9StageMastermind[]
    /**
     * 学习路径
     */
    stageTeachingScheduleList?: ICourseStylistic9StageTeachingSchedule[]
    /**
     * 学习步骤列表
     */
    stageLearningStepList?: ICourseStylistic9StageLearningStep[]
    /**
     * 学习任务考核成绩组成
     */
    studyTaskAssessmentPlanGradeComposeList?: ICourseStylistic9StudyTaskAssessmentPlanGradeCompose[]
}

/**
 * 体例九 - 学习环节
 */
export interface ICourseStylistic9StageMastermind {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 学时
     */
    period: number
    /**
     * 学习目标
     */
    learningGoal: string
}

/**
 * 体例九 - 学习步骤
 */
export interface ICourseStylistic9LearningStep {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 学时
     */
    period?: number
    /**
     * 教学过程
     */
    teachingProcess?: string
    /**
     * 学习内容
     */
    learningContent?: string
    /**
     * 学生活动
     */
    studentActivity?: string
    /**
     * 教师活动
     */
    teacherActivity?: string
    /**
     * 教学手段
     */
    teachingMeans?: string
    /**
     * 教学方法
     */
    teachingMethods?: string
    /**
     * 学习结果
     */
    learningResult?: string
    /**
     * 学习资源
     */
    learningResource?: string
}

/**
 * 体例九 - 学习路径
 */
export interface ICourseStylistic9StageTeachingSchedule {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 学习步骤
     */
    stageLearningStepActivityList: ICourseStylistic9LearningStep[]
}

/**
 * 体例九 - 要求项目
 */
export interface ICourseStylistic9RequestItem {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name?: string
    /**
     * 课时
     */
    period?: number
    /**
     * 学习内容
     */
    learningContent?: string
    /**
     * 备注
     */
    remark?: string
}

/**
 * 体例九 - 学习环节详情
 */
export interface ICourseStylistic9StageLearningStep {
    /**
     * 环节编码
     */
    code: string
    /**
     * 环节名称
     */
    name?: string
    /**
     * 学时
     */
    period?: number
    /**
     * 学习目标
     */
    learningGoal?: string
    /**
     * 学习要求
     */
    requestList?: ICourseStylistic9RequestItem[]
    /**
     * 学习环节详情学习步骤
     */
    stageLearningStepActivityList?: ICourseStylistic9StageLearningStepActivity[]
}

/**
 * 体例九 - 学习步骤活动
 */
export interface ICourseStylistic9LearningStepActivity {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
     */
    name?: string
    /**
     * 内容
     */
    content: string
    /**
     * 学习材料
     */
    materials?: string
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
 * 体例九 - 学习环节详情学习步骤
 */
export interface ICourseStylistic9StageLearningStepActivity {
    /**
     * 编码
     */
    code: string
    /**
     * 名称
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
    learningStepActivityList?: ICourseStylistic9LearningStepActivity[]
}

/**
 * 体例九 - 学习任务考核方案成绩构成
 */
export interface ICourseStylistic9StudyTaskAssessmentPlanGradeCompose {
    /**
     * 考核编码
     */
    code: string
    /**
     * 考核名称
     */
    name?: string
    /**
     * 互评权重
     */
    peerWeight?: number
    /**
     * 自评权重
     */
    selfWeight?: number
    /**
     * 师评权重
     */
    teacherWeight?: number
    /**
     * 权重
     */
    weight?: number
}
