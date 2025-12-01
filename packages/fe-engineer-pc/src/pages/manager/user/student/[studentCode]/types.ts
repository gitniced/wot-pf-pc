/**
 * 响应数据
 *
 * StudentStatisticsRespDto
 */
export interface StudentStatisticsRespDto {
    /**
     * 头像
     */
    avatar?: string
    /**
     * 学生姓名
     */
    userName?: string
    /**
     * 班级名称
     */
    className?: string
    /**
     * 课程信息集合
     */
    courselist?: SemesterCourseDto[]
    /**
     * 学制长度
     */
    eduLen?: number
    /**
     * 专业名称
     */
    majorName?: string
    /**
     * 学制起点：10-初中起点 20-高中起点
     */
    startPoint?: number
    /**
     * 总课程数量
     */
    totalCourseCount?: number
    /**
     * 总学时
     */
    totalPeriod?: number
    /**
     * 培养层级：10-中级技能 20-高级技能层 30-预备技师
     */
    trainLevel?: number
}

/**
 * 学生课程数据
 *
 * SemesterCourseDto
 */
export interface SemesterCourseDto {
    /**
     * 学年
     */
    academicYear?: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType?: number
    /**
     * 课程列表
     */
    courses?: SemesterCourseDetailDto[]
    /**
     * 开课学期
     */
    semester?: number
    /**
     * 学期全称
     */
    semesterText?: string
}

/**
 * 学生课程数据
 *
 * SemesterCourseDetailDto
 */
export interface SemesterCourseDetailDto {
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
     * 最终得分
     */
    finalScore?: number
    /**
     * 学习进度
     */
    learningProgress?: LearningProgressDto
    /**
     * 课程学时
     */
    period?: number
    /**
     * 排课编号
     */
    scheduleCode?: string
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
}
