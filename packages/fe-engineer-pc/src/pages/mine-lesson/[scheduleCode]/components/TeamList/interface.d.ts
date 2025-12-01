/**
 * 响应数据
 *
 * TeamListResponseDto
 */
export interface TeamListResponseDto {
    /**
     * 班级名称
     */
    className?: string
    /**
     * 学制长度
     */
    eduLen?: number
    /**
     * 学制起点：10-初中起点 20-高中起点
     */
    startPoint?: number
    /**
     * 学生人数
     */
    studentCount?: number
    /**
     * 团队数量
     */
    teamCount?: number
    /**
     * 团队列表
     */
    teams?: TeamDetailDto[]
    /**
     * 培养层级
     */
    trainLevel?: number
    [property: string]: any
}

/**
 * 团队详情
 *
 * TeamDetailDto
 */
export interface TeamDetailDto {
    /**
     * 组长姓名
     */
    leaderName?: string
    /**
     * 成员数量
     */
    memberCount?: number
    /**
     * 成员姓名列表
     */
    memberNames?: string[]
    /**
     * 团队编号
     */
    teamCode?: string
    /**
     * 团队名称
     */
    teamName?: string
    [property: string]: any
}
