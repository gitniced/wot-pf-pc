/**
 * 响应数据
 *
 * ProjectScoreMatrixDto
 */
export interface ProjectScoreMatrixDto {
    /**
     * 组间互评总分（按指标权重加权后的结果）
     */
    interGroupTotal?: ScoreCell
    /**
     * 组间互评权重（%）
     */
    interGroupWeight?: number
    /**
     * 组内互评总分（按指标权重加权后的结果）
     */
    intraGroupTotal?: ScoreCell
    /**
     * 组内互评权重（%）
     */
    intraGroupWeight?: number
    /**
     * 指标明细矩阵（每行对应一个评价指标）
     */
    items?: ProjectScoreMatrixItemDto[]
    /**
     * 考核项目编码
     */
    projectCode?: string
    /**
     * 考核项目名称
     */
    projectName?: string
    /**
     * 自评总分（按指标权重加权后的结果）
     */
    selfTotal?: ScoreCell
    /**
     * 自评权重（%）
     */
    selfWeight?: number
    /**
     * 学生头像
     */
    studentAvatar?: string
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 学习任务编码
     */
    taskCode?: string
    /**
     * 学习任务名称
     */
    taskName?: string
    /**
     * 师评总分（按指标权重加权后的结果）
     */
    teacherTotal?: ScoreCell
    /**
     * 师评权重（%）
     */
    teacherWeight?: number
    /**
     * 最终总分（按类型权重：自评20%、组内20%、组间20%、师评40% 进行加权）
     */
    total?: ScoreCell
    /**
     * 评价标准权重（%）
     */
    totalWeight?: number
    /**
     * 用户编码
     */
    userCode?: string
    [property: string]: any
}

/**
 * 组间互评总分（按指标权重加权后的结果）
 *
 * ScoreCell
 *
 * 组内互评总分（按指标权重加权后的结果）
 *
 * 最后一列：该指标的加权平均分（按类型权重）
 *
 * 组间互评分数单元格（含分数与状态）
 *
 * 组内互评分数单元格（含分数与状态）
 *
 * 自评分数单元格（含分数与状态）
 *
 * 师评分数单元格（含分数与状态）
 *
 * 自评总分（按指标权重加权后的结果）
 *
 * 师评总分（按指标权重加权后的结果）
 *
 * 最终总分（按类型权重：自评20%、组内20%、组间20%、师评40% 进行加权）
 */
export interface ScoreCell {
    score?: number
    status?: number
    [property: string]: any
}

/**
 * com.wotu.wilservice.eval.interfaces.dto.ProjectScoreMatrixItemDto
 *
 * ProjectScoreMatrixItemDto
 */
export interface ProjectScoreMatrixItemDto {
    /**
     * 评价指标编码
     */
    criterionCode?: string
    /**
     * 评价细则（学生可读的说明）
     */
    evaluatedRubric?: string
    /**
     * 评价标准（评分人参考标准）
     */
    evaluatorCriteria?: string
    /**
     * 最后一列：该指标的加权平均分（按类型权重）
     */
    finalScore?: ScoreCell
    /**
     * 组间互评分数单元格（含分数与状态）
     */
    interGroupScore?: ScoreCell
    /**
     * 组内互评分数单元格（含分数与状态）
     */
    intraGroupScore?: ScoreCell
    /**
     * 自评分数单元格（含分数与状态）
     */
    selfScore?: ScoreCell
    /**
     * 师评分数单元格（含分数与状态）
     */
    teacherScore?: ScoreCell
    /**
     * 指标配分（权重，%）
     */
    weight?: number
    [property: string]: any
}
