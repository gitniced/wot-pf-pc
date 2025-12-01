/**
 * 响应数据
 *
 * EvaluationStatisticsDto
 */
export interface EvaluationStatisticsDto {
    /**
     * 组间互评记录数量
     */
    interGroupPeerCount?: number
    /**
     * 组内互评记录数量
     */
    intraGroupPeerCount?: number
    /**
     * 自评记录数量
     */
    selfEvaluationCount?: number
    [property: string]: any
}

/**
 * 响应数据
 *
 * StudentScoreTableDto
 */
export interface StudentScoreTableDto {
    /**
     * 最终合计分数
     */
    finalScore?: ScoreCell
    /**
     * 考核构成数据
     */
    items?: CourseEvaluationDto[]
    [property: string]: any
}

/**
 * 最终合计分数
 *
 * ScoreCell
 */
export interface ScoreCell {
    score?: number
    status?: number
    [property: string]: any
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
    [property: string]: any
}

/**
 * 响应数据
 *
 * StudentTeamInfoDto
 */
export interface StudentTeamInfoDto {
    /**
     * 团队申请个数（仅组长可见）
     */
    applyCount?: number
    /**
     * 团队编号
     */
    code?: string
    /**
     * 团队成员编号
     */
    memberCode?: string
    /**
     * 成员信息列表
     */
    members?: TeamMemberDto[]
    /**
     * 团队名称
     */
    name?: string
    /**
     * 角色（0-组员，1-组长）
     */
    role?: number
    /**
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 用户编号
     */
    userCode?: string
    [property: string]: any
}

/**
 * 团队成员DTO
 *
 * TeamMemberDto
 */
export interface TeamMemberDto {
    /**
     * 成员编号
     */
    code?: string
    /**
     * 加入时间
     */
    createdAt?: string
    /**
     * 角色（0-组员，1-组长）
     */
    role?: number
    /**
     * 学生头像
     */
    studentAvatar?: string
    /**
     * 学生编号
     */
    studentCode?: string
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 团队编号
     */
    teamCode?: string
    /**
     * 用户编码
     */
    userCode?: string
    [property: string]: any
}
