/**
 * 响应数据
 *
 * CourseStatisticsDto
 */
export interface CourseStatisticsDto {
    /**
     * 知识点数量
     */
    knowledgePointCount?: number
    /**
     * 学习活动数量
     */
    learningActivityCount?: number
    /**
     * 学习环节数量
     */
    learningStageCount?: number
    /**
     * 学习步骤数量
     */
    learningStepCount?: number
    /**
     * 学习任务数量
     */
    learningTaskCount?: number
    [property: string]: any
}

/**
 * 响应数据
 *
 * StudentCourseDetailDto
 */
export interface StudentCourseDetailDto {
    /**
     * 考核进度
     */
    assessmentProgress?: AssessmentProgressDto
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 课程封面文件id
     */
    coverUrl?: string
    /**
     * 学习进度
     */
    learningProgress?: LearningProgressDto
    /**
     * 所属层级
     */
    level?: string
    /**
     * 所属层级名称
     */
    levelName?: string
    /**
     * 所属专业编号
     */
    majorCode?: string
    /**
     * 所属专业名称
     */
    majorName?: string
    /**
     * 课程学时
     */
    period?: number
    /**
     * 开课学期
     */
    semester?: string
    /**
     * 学制
     */
    trainLevelEdu?: string
    /**
     * 学制名称
     */
    trainLevelEduName?: string
    [property: string]: any
}

/**
 * 考核进度
 *
 * AssessmentProgressDto
 */
export interface AssessmentProgressDto {
    /**
     * 课堂表现已得分数量
     */
    classPerformanceScored?: number
    /**
     * 课堂表现总数量
     */
    classPerformanceTotal?: number
    /**
     * 终结性考核得分
     */
    finalAssessmentScore?: number
    /**
     * 终结性考核状态
     */
    finalAssessmentStatus?: number
    /**
     * 最终得分
     */
    finalScore?: number
    /**
     * 最终得分状态：0-未出分，1-已出分
     */
    finalScoreStatus?: number
    /**
     * 课后作业已得分数量
     */
    homeworkScored?: number
    /**
     * 课后作业总数量
     */
    homeworkTotal?: number
    /**
     * 任务考核已得分数量
     */
    taskAssessmentScored?: number
    /**
     * 任务考核总数量
     */
    taskAssessmentTotal?: number
    /**
     * 未出分数量
     */
    unScoredCount?: number
    [property: string]: any
}

/**
 * 学习进度
 *
 * LearningProgressDto
 */
export interface LearningProgressDto {
    /**
     * 课后作业已完成数量
     */
    completedHomework?: number
    /**
     * 学习成果已完成数量
     */
    completedOutcome?: number
    /**
     * 课堂测验已完成数量
     */
    completedTests?: number
    /**
     * 课后作业总数量
     */
    totalHomework?: number
    /**
     * 学习成果总数量
     */
    totalOutcome?: number
    /**
     * 课堂测验总数量
     */
    totalTests?: number
    [property: string]: any
}

/**
 * 响应数据
 *
 * ClassCourseInfolDto
 */
export interface ClassCourseInfolDto {
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 课程封面文件id
     */
    coverUrl?: string
    /**
     * 所属层级
     */
    level?: string
    /**
     * 所属层级名称
     */
    levelName?: string
    /**
     * 所属专业编号
     */
    majorCode?: string
    /**
     * 所属专业名称
     */
    majorName?: string
    /**
     * 课程学时
     */
    period?: number
    /**
     * 开课学期
     */
    semester?: string
    /**
     * 学制
     */
    trainLevelEdu?: string
    /**
     * 学制名称
     */
    trainLevelEduName?: string
    [property: string]: any
}

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
 * CourseScheduleInfoDto
 */
export interface CourseScheduleInfoDto {
    /**
     * 年度
     */
    academicYear?: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType?: number
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 排课编码
     */
    code?: string
    /**
     * 课程编码
     */
    courseCode?: string
    /**
     * 学期
     */
    semester?: number
    /**
     * 教师编码
     */
    teacherCode?: string
    /**
     * 教师用户编码
     */
    teacherUserCode?: string
    [property: string]: any
}

/**
 * 响应数据
 *
 * ClassProgressInfoDto
 */
export interface ClassProgressInfoDto {
    /**
     * 课堂表现评分完成百分比（仅当权重>0时显示）
     */
    classPerformancePercent?: number
    /**
     * 课堂表现权重
     */
    classPerformanceWeight?: number
    /**
     * 课后作业已批改百分比
     */
    homeworkGradedPercent?: number
    /**
     * 课后作业已提交百分比
     */
    homeworkSubmittedPercent?: number
    /**
     * 学习成果完成百分比
     */
    outcomeProgressPercent?: number
    /**
     * 课堂测验完成百分比
     */
    quizProgressPercent?: number
    /**
     * 学习任务考核已完成百分比
     */
    taskAssessmentCompletedPercent?: number
    [property: string]: any
}

/**
 * 响应数据
 *
 * TeacherAssessmentTodoDto
 */
export interface TeacherAssessmentTodoDto {
    /**
     * 课后作业待批改数量
     */
    homeworkPendingCount?: number
    /**
     * 课堂测验待批改数量
     */
    quizPendingCount?: number
    /**
     * 任务考核待评分数量
     */
    taskAssessmentPendingCount?: number
    [property: string]: any
}

/**
 * 小组学习进度榜项
 *
 * GroupLearningProgressRankItemDto
 */
export interface GroupLearningProgressRankItemDto {
    /**
     * 小组成员最新一次提交时间（用于同分排序）
     */
    latestSubmitTime?: string
    /**
     * 成员数量
     */
    memberCount?: number
    /**
     * 学习进度值：提交总次数/成员数量
     */
    progress?: number
    /**
     * 小组编码
     */
    teamCode?: string
    /**
     * 小组名称
     */
    teamName?: string
    [property: string]: any
}

/**
 * 学生排行榜信息
 *
 * StudentRankingDto
 */
export interface StudentRankingDto {
    /**
     * 最终得分
     */
    finalScore?: number
    /**
     * 排名
     */
    ranking?: number
    /**
     * 学生头像
     */
    studentAvatar?: string
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 学生用户编码
     */
    studentUserCode?: string
    [property: string]: any
}
