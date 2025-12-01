/**
 * 体例三 - 学习任务设计
 */
export interface ICourseStylistic3 {
    /**
     * 课程编号
     */
    courseCode: string
    /**
     * 学习任务设计列表
     */
    learningTaskDesignDtos: ICourseStylistic3LearningTaskDesign[]
}

/**
 * 体例三 - 学习任务设计
 */
export interface ICourseStylistic3LearningTaskDesign {
    /**
     * 任务描述
     */
    scenario: string
    /**
     * 基准学时
     */
    period: number
    /**
     * 学习目标
     */
    objectives: string
    /**
     * 学习内容
     */
    content: string
    /**
     * 教学实施建议
     */
    teachSuggestion: string
    /**
     * 教学考核要求
     */
    teachRequirements: string
    /**
     * 任务名称
     */
    name: string
    /**
     * 排序 (可选)
     */
    sort?: number
}
