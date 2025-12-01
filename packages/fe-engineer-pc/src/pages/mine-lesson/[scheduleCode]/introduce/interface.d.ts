/**
 * 响应数据
 *
 * CourseIntroductionDto
 */
export interface CourseIntroductionDto {
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 课程目标
     */
    courseObjectives?: string
    /**
     * 课程定位信息
     */
    coursePositioning?: CoursePositioningDto
    /**
     * 学习内容
     */
    learningContent?: string
    /**
     * 教学考核要求
     */
    teachingAssessment?: string
    /**
     * 教学实施建议
     */
    teachingImplementation?: string
    /**
     * 典型工作任务描述
     */
    typicalWorkTasks?: string
    /**
     * 工作内容信息
     */
    workContent?: WorkContentDto
    [property: string]: any
}

/**
 * 课程定位信息
 *
 * CoursePositioningDto
 */
export interface CoursePositioningDto {
    /**
     * 课程来源
     */
    courseSource?: string
    /**
     * 学习价值
     */
    learningValue?: string
    /**
     * 关联课程
     */
    relatedCourses?: string
    /**
     * 前后序课程
     */
    sequentialCourses?: string
    /**
     * 工作范畴
     */
    workScope?: string
    [property: string]: any
}

/**
 * 工作内容信息
 *
 * WorkContentDto
 */
export interface WorkContentDto {
    /**
     * 4.劳动组织形式
     */
    laborOrganization?: string
    /**
     * 2.工具、材料、设备与资料
     */
    toolsMaterialsEquipment?: string
    /**
     * 3.工作方法
     */
    workMethod?: string
    /**
     * 1.工作对象
     */
    workObject?: string
    /**
     * 5.工作要求
     */
    workRequirements?: string
    [property: string]: any
}
