/**
 * 响应数据
 *
 * ClassScoreTableDto
 */
export interface ClassScoreTableDto {
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 年度
     */
    academicYear?: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType?: number
    /**
     * 表头信息
     */
    headers?: CourseEvaluationDto[]
    /**
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 学期
     */
    semester?: number
    /**
     * 学生分数行数据
     */
    studentRows?: StudentScoreRowDto[]
    /**
     * 老师名称
     */
    teacherName?: string
}

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
     * 得分
     */
    score?: ScoreCell
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
}

/**
 * 得分
 *
 * ScoreCell
 */
export interface ScoreCell {
    score?: number
    status?: number
}

/**
 * 学生分数行数据
 *
 * StudentScoreRowDto
 */
export interface StudentScoreRowDto {
    /**
     * 最终得分
     */
    finalScore?: ScoreCellDto
    /**
     * 各列分数数据
     */
    scores?: ScoreCellDto[]
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 学生用户编码
     */
    studentUserCode?: string
}

/**
 * 最终得分
 *
 * ScoreCellDto
 *
 * 分数单元格数据
 */
export interface ScoreCellDto {
    /**
     * 列编码
     */
    columnCode?: string
    /**
     * 分数值
     */
    score?: number
    /**
     * 状态：0-未出分，1-已出分
     */
    status?: number
}
