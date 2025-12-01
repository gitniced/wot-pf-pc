/**
 * 教师课程按专业分组信息
 *
 * TeacherCourseGroupDto
 */
export interface TeacherCourseGroupDto {
    /**
     * 课程列表
     */
    courses?: TeacherCourseDto[]
    /**
     * 专业编码
     */
    majorCode?: string
    /**
     * 专业名称
     */
    majorName?: string
    /**
     * 专业编号
     */
    majorNum?: string
}

/**
 * 教师课程信息
 *
 * TeacherCourseDto
 */
export interface TeacherCourseDto {
    /**
     * 年度
     */
    academicYear?: number
    /**
     * 年度类型：1-上学期 2-下学期
     */
    academicYearType?: number
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 课程编码
     */
    courseCode?: string
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 学期
     */
    semester?: number
    /**
     * 总学时
     */
    totalHours?: number
    /**
     * 排课编号
     */
    scheduleCode?: string
    /**
     * 课程封面
     */
    coverUrl?: string
}

/**
 * 根据教师编码、学期和课程查询班级信息
 *
 * ClassInfoByTeacherDto
 */
export interface ClassInfoByTeacherDto {
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 班级名称
     */
    className?: string
    /**
     * 入学年份
     */
    enrollYear?: number
    /**
     * 毕业年份
     */
    graduateYear?: number
    /**
     * 培养层次
     */
    trainLevel?: string
    /**
     * 学制
     */
    trainLevelEdu?: string
    [property: string]: any
}

/**
 * 教师学期信息
 *
 * TeacherSemesterDto
 */
export interface TeacherSemesterDto {
    /**
     * 年度
     */
    academicYear?: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType?: number
    /**
     * id
     */
    id?: string
    /**
     * 学期名称
     */
    semesterName?: string
    /**
     * 是否当前学期
     */
    curSemester?: boolean
}
