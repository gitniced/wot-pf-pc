/**
 * 排课相关类型定义
 */

import type { ORDER_RULE } from '../../class/const'

/**
 * 课程排课查询参数
 */
export interface ICourseScheduleQuery {
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: ORDER_RULE
    /**
     * 班级编码
     */
    classCode?: string
    /**
     * 课程名字
     */
    name?: string
    /**
     * 专业唯一编码
     */
    majorCode?: string
    /**
     * 技能等级
     */
    level?: number
    /**
     * 课程状态 1设计中 2使用中
     */
    status?: number
    /**
     * 需要排除的课程编码列表
     */
    excludeCodes?: string[]
}

/**
 * 课程排课响应数据
 */
export interface ICourseScheduleRes {
    /**
     * 排课编码
     */
    code: string
    /**
     * 班级编码
     */
    classCode: string
    /**
     * 课程编码
     */
    courseCode: string
    /**
     * 教师用户编码
     */
    teacherUserCode?: string
    /**
     * 教师编码
     */
    teacherCode?: string
    /**
     * 学期
     */
    semester?: number
    /**
     * 年度
     */
    academicYear?: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType?: number
    /**
     * 课程封面
     */
    coverUrl?: string
    /**
     * 课程名称
     */
    name: string
    /**
     * 学时
     */
    totalHours: number
    /**
     * 专业编码
     */
    majorCode: string
    /**
     * 专业名
     */
    majorName: string
    /**
     * 专业代码
     */
    majorNum: string
    /**
     * 培养层级编码
     */
    trainLevelCode: string
    /**
     * 培养层级：10-中级技能 20-高级技能层 30-预备技师
     */
    trainLevel: number
    /**
     * 培养层级代码
     */
    trainLevelNum: string
}

/**
 * 学期信息
 */
export interface ISemesterInfo {
    /**
     * 学期
     */
    semester: number
    /**
     * 年度
     */
    academicYear: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType: number
}

/**
 * 课程排课提交数据
 */
export interface ICourseScheduleDto {
    /**
     * 主键ID（更新时使用）
     */
    code?: string
    /**
     * 班级编码
     */
    classCode: string
    /**
     * 课程编码
     */
    courseCode: string
    /**
     * 教师用户编码
     */
    teacherUserCode: string
    /**
     * 教师编码
     */
    teacherCode: string
    /**
     * 学期
     */
    semester: number
    /**
     * 年度
     */
    academicYear: number
    /**
     * 年度类型：1-上半年 2-下半年
     */
    academicYearType: number
}

/**
 * 教师排课查询参数
 */
export interface ITeacherScheduleQuery {
    /**
     * 页码，从1开始数，默认是1
     */
    pageNo?: number
    /**
     * 单页显示数量，默认是10
     */
    pageSize?: number
    /**
     * 排序字段
     */
    orderBy?: string
    /**
     * 升降序规则,ASC或DESC
     */
    order?: ORDER_RULE
    /**
     * 课程名称
     */
    courseName?: string
    /**
     * 班级编号
     */
    classCode?: string
    /**
     * 专业编号
     */
    majorCode?: string
    /**
     * 入学年份
     */
    enrollYear?: number
    /**
     * 教师编码
     */
    teacherCode?: string
}

/**
 * 教师排课响应数据
 */
export interface ITeacherScheduleRes {
    /**
     * 课程编号
     */
    courseCode: string
    /**
     * 课程名称
     */
    courseName: string
    /**
     * 班级编号
     */
    classCode: string
    /**
     * 班级名称
     */
    className: string
    /**
     * 专业编码
     */
    majorCode: string
    /**
     * 专业名称
     */
    majorName: string
    /**
     * 专业代码
     */
    majorNum: string
    /**
     * 培养层级编码
     */
    trainLevelCode: string
    /**
     * 培养层级
     */
    trainLevel: number
    /**
     * 培养层级代码
     */
    trainLevelNum: string
    /**
     * 专业培养层级学制唯一编码
     */
    trainLevelEduCode: string
    /**
     * 学制起点：10-初中起点 20-高中起点
     */
    startPoint: number
    /**
     * 学制长度
     */
    eduLen: number
    /**
     * 入学年份
     */
    enrollYear: number
    /**
     * 学生数量
     */
    studentNum: number
    /**
     * 课程学期
     */
    semester: number
    /**
     * 课程年份
     */
    academicYear: number
    /**
     * 课程年份类型
     */
    academicYearType: number
}

/**
 * 教师信息（简化版）
 */
export interface ITeacherInfo {
    /**
     * 教师编码
     */
    code: string
    /**
     * 教师用户编码
     */
    userCode: string
    /**
     * 教师姓名
     */
    name: string
    /**
     * 工号
     */
    workNo?: string
}

/**
 * 排序规则枚举
 */
export { ORDER_RULE } from '../../class/const'
