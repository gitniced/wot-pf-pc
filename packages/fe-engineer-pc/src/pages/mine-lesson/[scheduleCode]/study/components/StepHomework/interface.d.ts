/**
 * 学生课后作业DTO
 *
 * StudentHomeworkDto
 */
export interface StudentHomeworkDto {
    /**
     * 作业内容内容编码
     */
    contentCode?: string
    /**
     * 学生提交内容信息
     */
    contentInfo?: string
    /**
     * 编辑格式(1-在线，2-文件)
     */
    editFormat?: number
    /**
     * 文件格式(word-文档，excel-表格，mind-脑图)
     */
    fileFormat?: string
    /**
     * 作业编号
     */
    homeworkCode?: string
    /**
     * 作业名称
     */
    homeworkName?: string
    /**
     * 学习目标
     */
    objectives?: string
    /**
     * 课程要求
     */
    requirements?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 学生提交状态（0-未编辑，1-未提交，2-已提交，3-已评分）
     */
    submissionStatus?: number
    /**
     * 模版信息
     */
    templateInfo?: string
    /**
     * 更新时间
     */
    updatedAt?: string
    [property: string]: any
}
