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
