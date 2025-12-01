/**
 * 课程考核构成项
 *
 * CourseEvaluationDto
 */
export interface CourseEvaluationDto {
    /**
     * 考核项编号
     */
    code?: string
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 考核细则
     */
    evaluatedRubric?: string
    /**
     * 考核项名称
     */
    name?: string
    /**
     * 是否完成评分
     */
    scored?: boolean
    /**
     * 任务编号（任务考核用）
     */
    taskCode?: string
    /**
     * 类型：1课堂表现 2课后作业 3任务考核 4终结性考核
     */
    type?: number
    /**
     * 配分权重
     */
    weight?: number
    [property: string]: any
}
