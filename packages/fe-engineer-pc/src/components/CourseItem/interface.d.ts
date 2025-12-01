/**
 * 学生课程详情数据
 *
 * SemesterCourseDetailDto
 */
export interface SemesterCourseDetailDto {
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
    coverId?: string
    /**
     * 最终得分
     */
    finalScore?: number
    /**
     * 课程学时
     */
    period?: number
    [property: string]: any
}
