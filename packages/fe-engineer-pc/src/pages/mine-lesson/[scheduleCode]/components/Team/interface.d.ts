import type UserStore from '@/stores/userStore'

/**
 * 团队组件
 */
export interface TeamProps {
    /**班级编码 */
    // classCode: string
    // /**学生编码 */
    // studentCode: string
    // /**课程编码 */
    // courseCode: string
    userStore?: UserStore
    /**更新我的团队信息 */
    updateTeamInfo?: (teamInfo: Partial<StudentTeamInfoDto>) => void
}

/**
 * 我的团队信息
 * StudentTeamInfoDto
 */
export interface StudentTeamInfoDto {
    /**
     * 班级编号
     */
    classCode?: string
    /**
     * 团队编号
     */
    code?: string
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 团队成员编号
     */
    memberCode?: string
    /**
     * 成员信息列表
     */
    members?: TeamMemberDto[]
    /**
     * 团队名称
     */
    name?: string
    /**
     * 角色
     */
    role?: number
    /**
     * 学生编码
     */
    studentCode?: string
    [property: string]: any
}

/**
 * 团队成员DTO
 * TeamMemberDto
 */
export interface TeamMemberDto {
    /**
     * 成员编号
     */
    code?: string
    /**
     * 加入时间
     */
    createdAt?: string
    /**
     * 角色
     */
    role?: number
    /**
     * 学生编号
     */
    studentCode?: string
    /**
     * 学生姓名
     */
    studentName?: string
    /**
     * 学生头像
     */
    studentAvatar?: string
    /**
     * 团队编号
     */
    teamCode?: string
    [property: string]: any
}

/**
 * 创建团队响应数据
 * TeamDto
 */
export interface TeamDto {
    /**
     * 班级编号
     */
    classCode?: string
    /**
     * 团队编号
     */
    code?: string
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 创建时间
     */
    createdAt?: string
    /**
     * 创建人
     */
    createdBy?: string
    /**
     * 成员数量
     */
    memberCount?: number
    /**
     * 团队名称
     */
    name?: string
    [property: string]: any
}

/**
 * 团队申请DTO
 *
 * TeamApplyDto
 */
export interface TeamApplyDto {
    /**
     * 申请编号
     */
    code?: string
    /**
     * 申请时间
     */
    createdAt?: string
    /**
     * 状态 0申请中 1通过 2拒绝
     */
    status?: number
    /**
     * 学生编号
     */
    studentCode?: string
    /**
     * 学生姓名
     */
    studentName?: string
    [property: string]: any
}

/**
 * 团队列表DTO（包含组长信息）
 *
 * TeamListDto
 */
export interface TeamListDto {
    /**
     * 班级编号
     */
    classCode?: string
    /**
     * 团队编号
     */
    code?: string
    /**
     * 课程编号
     */
    courseCode?: string
    /**
     * 创建时间
     */
    createdAt?: string
    /**
     * 创建人
     */
    createdBy?: string
    /**
     * 是否有未通过审核的申请（true-有，false-无）
     */
    hasPendingApply?: boolean
    /**
     * 组长编号
     */
    leaderCode?: string
    /**
     * 组长姓名
     */
    leaderName?: string
    /**
     * 团队人数
     */
    memberCount?: number
    /**
     * 团队名称
     */
    name?: string
    [property: string]: any
}
