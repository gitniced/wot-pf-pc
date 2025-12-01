/**
 * 教师授课情况查询参数
 */
export interface ITeacherScheduleQuery {
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 班级编号
     */
    classCode?: string
    /**
     * 专业编号
     */
    majorCode?: string
    /**
     * 入学年份
     */
    enrollYear?: number
    /**
     * 教师编码
     */
    teacherCode?: string
}

/**
 * 教师授课情况数据
 */
export interface ITeacherSchedule {
    /**
     * 课程编号
     */
    courseCode: string
    /**
     * 课程名称
     */
    courseName: string
    /**
     * 班级编号
     */
    classCode: string
    /**
     * 班级名称
     */
    className: string
    /**
     * 专业编码
     */
    majorCode: string
    /**
     * 专业名称
     */
    majorName: string
    /**
     * 专业代码
     */
    majorNum: string
    /**
     * 培养层级编码
     */
    trainLevelCode: string
    /**
     * 培养层级
     */
    trainLevel: number
    /**
     * 培养层级代码
     */
    trainLevelNum: string
    /**
     * 专业培养层级学制唯一编码
     */
    trainLevelEduCode: string
    /**
     * 学制起点：10-初中起点 20-高中起点
     */
    startPoint: number
    /**
     * 学制长度
     */
    eduLen: number
    /**
     * 入学年份
     */
    enrollYear: number
    /**
     * 学生数量
     */
    studentNum: number
    /**
     * 课程学期
     */
    semester: number
    /**
     * 课程年份
     */
    academicYear: number
    /**
     * 课程年份类型
     */
    academicYearType: number
}
