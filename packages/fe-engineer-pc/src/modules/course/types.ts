import type { COURSE_DESIGN_STYLISTIC } from './const'

/**
 * 课程
 */
export interface ICourse {
    /**
     * 课程code
     */
    code: string
    /**
     * 课程封面地址
     */
    coverUrl: string
    /**
     * 是否使用自定义封面 1是 0否
     */
    customCoverStatus: number
    /**
     * 课程技能所属层级
     */
    levelCode: string
    /**
     * 课程技能所属层级名称
     */
    levelName?: string
    /**
     * 专业code
     */
    majorCode: string
    /**
     * 课程名称
     */
    name: string
}

export interface ICourseDesignStylistic {
    key: COURSE_DESIGN_STYLISTIC
    name: string
    component: React.FC
}

export interface ICourseDataItem<T = string> {
    key: string
    name: string
    value: T | undefined
    description?: string
}

/**
 * 课程设计概览
 */
export interface ICourseDesignOverview {
    /**
     * 课程校本转换 - 概览
     */
    conversionOverview?: number
    /**
     * 学习任务设计 - 概览
     */
    learningOverview?: number
    /**
     * 教学方案设计 - 概览
     */
    teachingOverview?: number
    /**
     * 考核方案设计 - 概览
     */
    checkOverview?: number
    /**
     * 课程校本转换 - 关键信息
     */
    conversionKeyInformation?: number
    /**
     * 学习任务设计 - 关键信息
     */
    learningKeyInformation?: number
    /**
     * 教学方案设计 - 关键信息
     */
    teachingKeyInformation?: number
    /**
     * 考核方案设计 - 关键信息
     */
    checkKeyInformation?: number
    /**
     * 完成数
     */
    total?: number
    /**
     * 体例一
     */
    waysOne?: number
    /**
     * 体例二
     */
    waysTwo?: number
    /**
     * 体例三
     */
    waysThree?: number
    /**
     * 体例四
     */
    waysFour?: number
    /**
     * 体例五
     */
    waysFive?: number
    /**
     * 体例六
     */
    waysSix?: number
    /**
     * 体例七
     */
    waysSeven?: number
    /**
     * 体例八
     */
    waysEight?: number
    /**
     * 体例九
     */
    waysNine?: number
    /**
     * 体例十
     */
    waysTen?: number
    /**
     * 体例十一
     */
    waysEleven?: number
    /**
     * 体例十二
     */
    waysTwelve?: number
}

/**
 * 获取体例状态列表请求参数
 */
export interface ICourseWayFinishStatusRequest {
    /**
     * 课程编码（根据业务逻辑，虽然API schema未标记required，但实际应该必传）
     */
    courseCode: string
    /**
     * 任务编码（可选）
     */
    taskCode?: string
    /**
     * 体例编号列表（可选）
     */
    waysCodeList?: number[]
}

/**
 * 体例状态映射 - 体例编号到状态的映射
 */
export type ICourseWayFinishStatusMap = Record<string, number>

/**
 * 体例任务状态列表请求参数
 */
export interface ICourseWayTaskFinishStatusRequest {
    /**
     * 课程编码
     */
    courseCode: string
    /**
     * 任务编码
     */
    way: number
}
