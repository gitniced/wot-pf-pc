/**
 * 数据项
 */
export interface ContentInfoItemProps {
    /**  当前数量 */
    count?: number | string
    /**  总数量 */
    total?: number | string
    /**  得分 */
    score?: number | string
    /**  标题 */
    title: string
    [property: string]: any
}
/**
 * 我的课程
 */
export interface MineCourseItemProps {
    /**  当前数量 */
    count: number | string
    /**  总数量 */
    total: number | string
    /**  得分 */
    score: number | string
    /**  标题 */
    title: string
    [property: string]: any
}
