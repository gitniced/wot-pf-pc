/**
 * 学习成果DTO
 *
 * OutcomeItemDto
 */
export interface OutcomeItemDto {
    /**
     * 成果编号
     */
    code?: string
    /**
     * 编辑/上传内容链接
     */
    contentUrl?: string
    /**
     * 编辑人编码
     */
    editCode?: string
    /**
     * 编辑格式(1-在线，2-文件)
     */
    editFormat?: number
    /**
     * 编辑人姓名
     */
    editName?: string
    /**
     * 编辑或上传状态(1-已，2-未)
     */
    editStatus?: number
    /**
     * 编辑时间
     */
    editTime?: string
    /**
     * 文件格式(word-文档，excel-表格，mind-脑图)
     */
    fileFormat?: string
    /**
     * 关联小组编码（仅团队成果）
     */
    groupCode?: string
    /**
     * 成果名称
     */
    name?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 模版信息(url或文件id)
     */
    templateInfo?: string
    /**
     * 协作类型（1-个人，2-团队）
     */
    type?: number
    [property: string]: any
}

/**
 * 响应数据
 *
 * ActivitySubmittedStudentsResDto
 */
export interface ActivitySubmittedStudentsResDto {
    /**
     * 待提交人数
     */
    pendingCount?: number
    /**
     * 已提交人数
     */
    submittedCount?: number
    /**
     * 已提人列表
     */
    submitteds?: ActivitySubmissionDto[]
    /**
     * 协作类型
     */
    type?: number
    [property: string]: any
}

/**
 * 活动提交实体
 *
 * ActivitySubmissionDto
 */
export interface ActivitySubmissionDto {
    /**
     * 提交人编码（团队协作时为团队编码）
     */
    submitterCode?: string
    /**
     * 提交人编码
     */
    submitterName?: string
    [property: string]: any
}
