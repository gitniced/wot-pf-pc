export interface CommonJobParams {
    sid?: number // 站点ID
    pageNo: number
    pageSize?: number
    idList?: number[] // 职业编码
    name?: string // 职业名称
}
