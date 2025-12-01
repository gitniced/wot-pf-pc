/**
 * 体例二
 */
export interface ICourseStylistic2 {
    /**
     * 课程编号
     */
    courseCode: string
    /**
     * 课程目标
     */
    courseObjectives?: string
    /**
     * 劳动组织形式
     */
    laborOrganization?: string
    /**
     * 学习内容
     */
    learningContent?: string
    /**
     * 学习任务
     */
    tasks: ICourseStylistic2Task[]
    /**
     * 教学考核要求
     */
    teachingAssessmentRequirements?: string
    /**
     * 教学实施建议
     */
    teachingImplementationSuggestions?: string
    /**
     * 工具 材料设备与资料
     */
    toolsMaterialsEquipment?: string
    /**
     * 典型工作描述
     */
    typicalWorkDescription?: string
    /**
     * 工作方法
     */
    workMethod?: string
    /**
     * 工作对象
     */
    workObject?: string
    /**
     * 工作要求
     */
    workRequirements?: string
}

/**
 * 体例二 - 学习任务
 */
export interface ICourseStylistic2Task {
    /**
     * 描述
     */
    description: string
    /**
     * 学时
     */
    hours: number
    /**
     * 名称
     */
    name: string
}
