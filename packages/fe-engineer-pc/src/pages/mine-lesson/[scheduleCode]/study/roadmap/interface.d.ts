/**
 * 响应数据
 *
 * LearningPathTreeDto
 *
 * 知识点树形结构DTO
 */
export interface LearningPathTreeDto {
    /**
     * 子节点编号列表
     */
    children?: LearningPathTreeDto[]
    /**
     * 节点编号
     */
    code?: string
    /**
     * 节点状态：0-未点亮, n-点亮数量
     */
    lightUp?: number
    /**
     * 节点名称
     */
    name?: string
    /**
     * 排序字段
     */
    sort?: number
    /**
     * 节点类型：1-课程, 2-任务, 3-知识点
     */
    type?: number
    [property: string]: any
}
