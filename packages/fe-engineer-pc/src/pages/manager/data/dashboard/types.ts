export interface StatisticsDashboard {
    /**
     * 专业、班级、学生、教师数量
     */
    classAndStudentAndTeacherNum?: ClassAndStudentAndTeacherNum
    /**
     * 课程贡献榜
     */
    courseContributionRank?: CourseContributionRank[]
    /**
     * 课程设计进度
     */
    courseDesignProgress?: CourseDesignProgress[]
    /**
     * 课程学习人数榜
     */
    courseLearningNumRank?: CourseLearningNumRank[]
    /**
     * 课程层级分布
     */
    courseLevelDistribution?: CourseLevelDistribution[]
    /**
     * 课程专业分布
     */
    courseMajorDistribution?: CourseMajorDistribution[]
    /**
     * 课程数量
     */
    courseNum?: CourseNum
    /**
     * 专业合格率
     */
    majorQualificationRate?: MajorQualificationRate[]
    /**
     * 专业规模
     */
    majorScale?: MajorScale[]
}

/**
 * 专业、班级、学生、教师数量
 *
 * ClassAndStudentAndTeacherNum
 */
export interface ClassAndStudentAndTeacherNum {
    /**
     * 班级数量
     */
    classNum?: number
    /**
     * 专业数量
     */
    majorNum?: number
    /**
     * 学生数量
     */
    studentNum?: number
    /**
     * 教师数量
     */
    teacherNum?: number
}

/**
 * CourseContributionRank
 */
export interface CourseContributionRank {
    /**
     * 头像
     */
    avatar?: string
    /**
     * 创建课程数
     */
    createCourseNum?: number
    /**
     * 参与课程数
     */
    joinCourseNum?: number
    /**
     * 姓名
     */
    name?: string
}

/**
 * CourseDesignProgress
 */
export interface CourseDesignProgress {
    /**
     * 课程数量
     */
    courseNum?: number
    /**
     * 课程进度 1~10代表进度10%~100%
     */
    progress?: number
}

/**
 * CourseLearningNumRank
 */
export interface CourseLearningNumRank {
    /**
     * 课程封面
     */
    courseCover?: string
    /**
     * 课程名
     */
    courseName?: string
    /**
     * 学习人数
     */
    learningNum?: number
    /**
     * 专业
     */
    majorName?: string
    /**
     * 技能等级
     */
    trainLevel?: number
}

/**
 * CourseLevelDistribution
 */
export interface CourseLevelDistribution {
    /**
     * 数量
     */
    courseNum?: number
    /**
     * 培养层级：10-中级技能 20-高级技能层 30-预备技师
     */
    trainLevel?: number
}

/**
 * CourseMajorDistribution
 */
export interface CourseMajorDistribution {
    /**
     * 课程数量
     */
    courseNum?: number
    /**
     * 专业代码
     */
    majorCode?: string
    /**
     * 专业名
     */
    majorName?: string
}

/**
 * 课程数量
 *
 * CourseNum
 */
export interface CourseNum {
    /**
     * 课程总数
     */
    courseNum?: number
    /**
     * 设计中数量
     */
    designCourseNum?: number
    /**
     * 使用中数量
     */
    useCourseNum?: number
}

/**
 * MajorQualificationRate
 */
export interface MajorQualificationRate {
    /**
     * 高级技能合格率
     */
    highLevelQualificationRate?: string
    /**
     * 专业名称
     */
    majorName?: string
    /**
     * 中级技能合格率
     */
    middleLevelQualificationRate?: string
    /**
     * 预备技师合格率
     */
    preLevelQualificationRate?: string
}

/**
 * MajorScale
 */
export interface MajorScale {
    /**
     * 高级技能数量
     */
    highLevelNum?: number
    /**
     * 专业代码
     */
    majorCode?: string
    /**
     * 专业名称
     */
    majorName?: string
    /**
     * 中级技能数量
     */
    middleLevelNum?: number
    /**
     * 预备技师数量
     */
    preLevelNum?: number
}
