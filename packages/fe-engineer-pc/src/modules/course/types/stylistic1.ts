/**
 * 体例一
 */
export interface ICourseStylistic1 {
    /**
     * 标准校本转化建议
     */
    conversionSuggestions: ICourseStylistic1ConversionSuggestions[]
    /**
     * 课程编号
     */
    courseCode: string
    /**
     * 课程目标和学习内容分析
     */
    courseObjectivesAndContentAnalysis?: string
    /**
     * 课程来源
     */
    courseSource?: string
    /**
     * 学习价值
     */
    learningValue?: string
    /**
     * 地区产业特征分析
     */
    regionalIndustryCharacteristicsAnalysis?: string
    /**
     * 关联课程
     */
    relatedCourses?: string
    /**
     * 学校特色分析
     */
    schoolCharacteristicsAnalysis?: string
    /**
     * 学校软硬件条件分析
     */
    schoolSoftwareHardwareAnalysis?: string
    /**
     * 前后序课程
     */
    sequentialCourses?: string
    /**
     * 学生基础分析
     */
    studentBasisAnalysis?: string
    /**
     * 参考性学习任务分析
     */
    taskAnalysis: ICourseStylistic1TaskAnalysis[]
    /**
     * 教学实施建议及考核要求分析
     */
    teachingImplementationAndAssessmentAnalysis?: string
    /**
     * 工作范畴
     */
    workScope?: string
}

/**
 * 体例一 - 校本转化建议
 */
export interface ICourseStylistic1ConversionSuggestions {
    /**
     * 转化说明
     */
    conversionIllustrate: string
    /**
     * 转化项目
     */
    conversionName: string
    /**
     * 国标内容
     */
    countryContent: string
    /**
     * 校本内容
     */
    schoolContent: string
    /**
     * 序号
     */
    serialnumber?: number
}

/**
 * 体例一 - 参考性学习任务分析
 */
export interface ICourseStylistic1TaskAnalysis {
    /**
     * 国标参考性学习任务-任务描述
     */
    countryTaskDescription: string
    /**
     * 国标参考性学习任务-学时
     */
    countryTaskHours: string
    /**
     * 国标参考性学习任务-任务名称
     */
    countryTaskName: string
    /**
     * 校本学习任务-任务描述
     */
    schoolTaskDescription: string
    /**
     * 校本学习任务-学时
     */
    schoolTaskHours: string
    /**
     * 校本学习任务-任务名称
     */
    schoolTaskName: string
    /**
     * 序号
     */
    serialnumber?: number
}
