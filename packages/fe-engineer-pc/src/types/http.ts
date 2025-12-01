/**
 * 分页
 */
export interface IPagination<T> {
    /**
     * 总数
     */
    totalCount: number
    /**
     * 当前页码
     */
    currentPage: number
    /**
     * 每页记录数
     */
    pageSize: number
    /**
     * 数据
     */
    data: T[]
    /**
     * 总页数
     */
    pages: number
}
