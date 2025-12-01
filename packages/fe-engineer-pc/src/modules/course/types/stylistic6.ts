/**
 * 体例六 - 学习任务分析表
 */
export interface ICourseStylistic6 {
    /**
     * 基本信息
     */
    basicInfoDto: ICourseStylistic6BasicInfo
    /**
     * 学习任务设计
     */
    learningTaskDesignDto: ICourseStylistic6LearningTaskDesign
    /**
     * 典型特征
     */
    representativeFeatures?: string
    /**
     * 任务编码
     */
    taskCode: string
    /**
     * 工作与学习分析项目列表
     */
    workAndLearningAnalysisItems: ICourseStylistic6WorkAndLearningAnalysisItem[]
}

/**
 * 体例六 - 基本信息
 */
export interface ICourseStylistic6BasicInfo {
    /**
     * 企业名称
     */
    enterpriseName: string
    /**
     * 工作时长
     */
    workDuration: number
}

/**
 * 体例六 - 学习任务设计
 */
export interface ICourseStylistic6LearningTaskDesign {
    /**
     * 任务情景
     */
    scenario: string
    /**
     * 任务资料
     */
    materials: string
    /**
     * 任务要求
     */
    requirements: string
}

/**
 * 体例六 - 工作与学习分析项目
 */
export interface ICourseStylistic6WorkAndLearningAnalysisItem {
    /**
     * 劳动组织
     */
    laborOrganization?: string
    /**
     * 实践知识
     */
    practicalKnowledge?: string
    /**
     * 职业素养
     */
    professionalism?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 理论知识
     */
    theoreticalKnowledge?: string
    /**
     * 工具设备
     */
    tools?: string
    /**
     * 工作内容
     */
    workContent?: string
    /**
     * 工作方法
     */
    workMethod?: string
    /**
     * 工作成果
     */
    workOutcome?: string
    /**
     * 工作要求
     */
    workRequirement?: string
    /**
     * 工作步骤
     */
    name?: string
}
