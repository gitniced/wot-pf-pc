/**
 * 学习路径数据传输对象
 * 包含完整的任务-环节-步骤三层树状结构
 *
 * LearningNodeDto
 */
export interface LearningNodeDto {
    /**
     * 学习节点集合
     */
    children?: LearningNodeDto[]
    /**
     * 节点编码
     */
    code?: string
    /**
     * 节点名称
     */
    name?: string
    /**
     * 节点顺序
     */
    sort?: number
    /**
     * 节点类型（1-任务，2-环节，3-步骤）
     */
    type?: number
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
