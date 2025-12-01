/**
 * 学习成果DTO
 * OutcomeItemDto
 */
export interface OutcomeItemDto {
    /**
     * 成果编号
     */
    code?: string
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
     * 提交格式(1-在线，2-文件)
     */
    fileFormat?: number
    /**
     * 成果名称
     */
    name?: string
    /**
     * 排序
     */
    sort?: number
    /**
     * 模版链接
     */
    templateUrl?: string
    [property: string]: any
}
