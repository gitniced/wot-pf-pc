import { getCookie } from '@/storage'
import { Typography } from 'antd'
import type { ReactNode } from 'react'

// 题库归属
export enum BELONG_TYPE_ENUM {
    NATIONAL = 10, // 国家题库
    PROVINCIAL = 20, // 省级题库
    MERCHANT = 30, // 资源方题库
    ORGANIZE = 40, // 机构题库
}

// 题库题目分类
export enum SKILL_TYPE_ENUM {
    SKILL = 10, // 技能
    THEORY = 20, // 理论
}

// 真题/模拟题
export enum SUBJECT_TYPE_ENUM {
    REAL = 10, // 真题
    SIMULATION = 20, // 模拟题
    TRAIN = 30, // 职培
    COMPETITION = 40, // 竞赛
}

// 题型
export enum QUESTION_TYPE_ENUM {
    SINGLE = 20, // 单选题
    MULTIPLE = 30, // 多选题
    JUDGEMENT = 10, // 判断题
    BLANK = 40, // 填空题
    SHORT = 50, // 简答题
    COMPOSE = 60, // 组合题
    CALCULATE = 70, // 计算题
    DISCOURSE = 80, // 论述题
    ANALYSIS = 90, // 案例分析题
}

export const QUESTION_TYPE_TEXT: Record<number, string> = {
    [QUESTION_TYPE_ENUM.SINGLE]: '单选题',
    [QUESTION_TYPE_ENUM.MULTIPLE]: '多选题',
    [QUESTION_TYPE_ENUM.JUDGEMENT]: '判断题',
    [QUESTION_TYPE_ENUM.BLANK]: '填空题',
    [QUESTION_TYPE_ENUM.SHORT]: '简答题',
    [QUESTION_TYPE_ENUM.CALCULATE]: '计算题',
    [QUESTION_TYPE_ENUM.DISCOURSE]: '论述题',
    [QUESTION_TYPE_ENUM.ANALYSIS]: '案例分析题',
    [QUESTION_TYPE_ENUM.COMPOSE]: '组合题',
}

// 题型对象
export const QUESTION_TYPE_OPTIONS = [
    { label: '单选题', value: QUESTION_TYPE_ENUM.SINGLE },
    { label: '多选题', value: QUESTION_TYPE_ENUM.MULTIPLE },
    { label: '判断题', value: QUESTION_TYPE_ENUM.JUDGEMENT },
    { label: '填空题', value: QUESTION_TYPE_ENUM.BLANK },
    { label: '简答题', value: QUESTION_TYPE_ENUM.SHORT },
    { label: '计算题', value: QUESTION_TYPE_ENUM.CALCULATE },
    { label: '论述题', value: QUESTION_TYPE_ENUM.DISCOURSE },
    { label: '组合题', value: QUESTION_TYPE_ENUM.COMPOSE },
    { label: '案例分析题', value: QUESTION_TYPE_ENUM.ANALYSIS },
]

// 难易程度
export enum QUESTION_LEVEL_ENUM {
    EASY = 10, // 容易
    EASIER = 20, // 较容易
    MEDIUM = 30, // 中等
    MORE_DIFFICULT = 40, // 较难
    DIFFICULT = 50, // 难
}
export const QUESTION_LEVEL_TEXT: Record<number, string> = {
    [QUESTION_LEVEL_ENUM.EASY]: '容易',
    [QUESTION_LEVEL_ENUM.EASIER]: '较易',
    [QUESTION_LEVEL_ENUM.MEDIUM]: '中等',
    [QUESTION_LEVEL_ENUM.MORE_DIFFICULT]: '较难',
    [QUESTION_LEVEL_ENUM.DIFFICULT]: '难',
}
export const QUESTION_LEVEL_OPTIONS = [
    {
        label: '全部',
        value: null,
    },
    {
        label: QUESTION_LEVEL_TEXT[QUESTION_LEVEL_ENUM.EASY],
        value: QUESTION_LEVEL_ENUM.EASY,
    },
    {
        label: QUESTION_LEVEL_TEXT[QUESTION_LEVEL_ENUM.EASIER],
        value: QUESTION_LEVEL_ENUM.EASIER,
    },
    {
        label: QUESTION_LEVEL_TEXT[QUESTION_LEVEL_ENUM.MEDIUM],
        value: QUESTION_LEVEL_ENUM.MEDIUM,
    },
    {
        label: QUESTION_LEVEL_TEXT[QUESTION_LEVEL_ENUM.MORE_DIFFICULT],
        value: QUESTION_LEVEL_ENUM.MORE_DIFFICULT,
    },
    {
        label: QUESTION_LEVEL_TEXT[QUESTION_LEVEL_ENUM.DIFFICULT],
        value: QUESTION_LEVEL_ENUM.DIFFICULT,
    },
]

export const DEFAULT_OPTIONS_COUNT: Record<number, number> = {
    // 单选题
    [QUESTION_TYPE_ENUM.SINGLE]: 4,
    // 多选题
    [QUESTION_TYPE_ENUM.MULTIPLE]: 4,
    // 判断题
    [QUESTION_TYPE_ENUM.JUDGEMENT]: 2,
    // 填空题
    [QUESTION_TYPE_ENUM.BLANK]: 1,
}

export const BLANK_TEXT = ['第一空', '第二空', '第三空', '第四空', '第五空']

export const MIN_OPTION_COUNT = 2
export const MAX_OPTION_COUNT = 20 // 单选/多选
export const MAX_OPTION_COUNT_BLANK = 5 // 填空题

export const SUBJECT_TYPE_MAP: Record<string, number> = {
    real: SUBJECT_TYPE_ENUM.REAL,
    simulation: SUBJECT_TYPE_ENUM.SIMULATION,
    train: SUBJECT_TYPE_ENUM.TRAIN,
    competition: SUBJECT_TYPE_ENUM.COMPETITION,
}

export const SKILL_TYPE_MAP: Record<string, number> = {
    theory: SKILL_TYPE_ENUM.THEORY,
    skill: SKILL_TYPE_ENUM.SKILL,
}

export const DISCRIMINATION_OPTIONS = [
    { value: null, label: '全部' },
    { value: 10, label: '差' },
    { value: 20, label: '较差' },
    { value: 30, label: '中等' },
    { value: 40, label: '良好' },
    { value: 50, label: '优秀' },
]

// 导入模板说明
export const TEMPLATE_DESCRIPTION: Record<string, ReactNode> = {
    default: (
        <>
            <Typography>
                Excel导入试题功能（系统标准模板）支持“单选题、多选题、判断题、填空题、简答题、组合题、计算题、论述题、案例分析题”九类题型的导入
            </Typography>
            <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
            <Typography>
                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
            </Typography>
        </>
    ),
    authenticates: (
        <>
            <Typography>
                Excel导入试题功能（鉴定中心指定模板）支持“单选题、多选题、判断题”三类题型的导入
            </Typography>
            <Typography>1.请按照模板文件内的相关说明，进行内容填写；</Typography>
            <Typography>
                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
            </Typography>
        </>
    ),
}

export const TEMPLATE_TITLE: Record<string, string> = {
    default: '批量导入（系统标准模板）',
    authenticates: '批量导入（鉴定中心指定模板）',
}

export const IMPORT_TEMPLATE: Record<string, string> = {
    default:
        'https://static.zpimg.cn/public/fe-exam-pc/import_template/%E8%AF%95%E9%A2%98%E5%AF%BC%E5%85%A5%EF%BC%88%E7%B3%BB%E7%BB%9F%E6%A0%87%E5%87%86%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx',
    authenticates: getCookie('ALIAS') === 'esh' ? 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-exam-pc/import_template/sh/%E8%AF%95%E9%A2%98%E5%AF%BC%E5%85%A5%EF%BC%88%E9%89%B4%E5%AE%9A%E4%B8%AD%E5%BF%83%E6%8C%87%E5%AE%9A%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx' :
        'https://static.zpimg.cn/public/fe-exam-pc/import_template/%E8%AF%95%E9%A2%98%E5%AF%BC%E5%85%A5%EF%BC%88%E9%89%B4%E5%AE%9A%E4%B8%AD%E5%BF%83%E6%8C%87%E5%AE%9A%E6%A8%A1%E6%9D%BF%EF%BC%89.xlsx',
}

// 试题启用/禁用
export enum STATUS_ENUM {
    disabled,
    unDisabled,
}

export const STATUS_OPTIONS = [
    { label: '全部', value: null },
    { label: '启用', value: STATUS_ENUM.unDisabled },
    { label: '禁用', value: STATUS_ENUM.disabled },
]
