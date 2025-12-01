/**
 * 响应数据
 *
 * AssessmentProjectDesDto
 */
export interface AssessmentProjectDesDto {
    /**
     * 项目编号
     */
    assessmentOrg?: string
    /**
     * 评价标准列表
     */
    criteriaList?: EvaluationCriteriaItemDto[]
    /**
     * 组间互评权重
     */
    interGroupPeerWeight?: number
    /**
     * 组内互评权重
     */
    intraGroupPeerWeight?: number
    /**
     * 成果形式
     */
    outcomeForm?: string
    /**
     * 项目编号
     */
    projectCode?: string
    /**
     * 项目名称
     */
    projectName?: string
    /**
     * 自评权重
     */
    selfWeight?: number
    /**
     * 师评权重
     */
    teacherWeight?: number
    [property: string]: any
}

/**
 * 评价标准项
 *
 * EvaluationCriteriaItemDto
 */
export interface EvaluationCriteriaItemDto {
    /**
     * 指标编号
     */
    code?: string
    /**
     * 评价细则
     */
    evaluatedRubric?: string
    /**
     * 评价标准
     */
    evaluatorCriteria?: string
    /**
     * 配分
     */
    weight?: number
    [property: string]: any
}
