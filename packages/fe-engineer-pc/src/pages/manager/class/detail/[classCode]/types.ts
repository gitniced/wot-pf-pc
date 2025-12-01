/**
 * 查询参数
 *
 * StudentQueryDto
 */
export interface IStudentQueryDto {
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 学院编码
     */
    collegeCode?: string
    /**
     * 入学年份
     */
    enrollYear?: number
    /**
     * 毕业年份
     */
    graduateYear?: number
    /**
     * 证件号码
     */
    idCard?: string
    /**
     * 专业编码
     */
    majorCode?: string
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 姓名
     */
    name?: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: string
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 站点ID
     */
    sid?: number
}

export interface IClassStudentRes {
    /**
     * 证件类型，1身份证，2护照，3其他
     */
    certificateType?: number
    /**
     * 学生编码
     */
    code?: string
    /**
     * 课程进度
     */
    courseProgress?: number
    /**
     * 证件号码
     */
    idCard?: string
    /**
     * 手机号
     */
    mobile?: string
    /**
     * 姓名
     */
    name?: string
    /**
     * 用户编码
     */
    userCode?: string
}
