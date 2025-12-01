import { QUESTION_TYPE_ENUM } from '@/constants'
import { nanoid } from 'nanoid'

const generAtorList = (n: number = 1) => {
    const arr = []
    for (let i = 0; i < n; ++i) {
        arr.push({
            answer: {
                content: '',
                error: false,
                errorMsg: '',
            },
            isAnswer: false,
            sort: i,
            code: nanoid(),
        })
    }
    return arr
}

export interface CONTENT_TYPE {
    content: string
    error: boolean
    errorMsg: string
}

/**
 * 题目
 * @param type 题目类型
 * @param title 题目题干
 * @param optionList 题目选项
 * @param analysis 题目解析
 * @param childList 组卷类型题目会有children和type字段 没有其他字段
 */
export interface OPTIONS_ITEM_TYPE {
    answer: CONTENT_TYPE
    isAnswer: boolean
    sort: number
    code: string
}

/**
 * 题目
 * @param type 题目类型
 * @param title 题目题干
 * @param optionList 题目选项
 * @param analysis 题目解析
 * @param childList 组卷类型题目会有children和type字段 没有其他字段
 * @param status 题目种类是一个新的维度 1 标识单一类型 2 表示复杂类型
 */
export interface DEFAULT_QUESTION_ITEM_TYPE {
    noSign?: boolean
    code?: string
    type?: QUESTION_TYPE_ENUM
    title?: CONTENT_TYPE
    optionList?: OPTIONS_ITEM_TYPE[]
    analysis?: CONTENT_TYPE
    childList?: DEFAULT_QUESTION_ITEM_TYPE[]
    active?: boolean
    status?: 1 | 2
    answer?: Record<string, any>
}

// 单个选项默认数据
export const DEFAULT_OPTION_ITEM = () => generAtorList(1)

// 正常选项默认 适配 单选和多选
const DEFAULT_OPTION_LIST = () => [...generAtorList(4)]

// 判断题的默认数据
const JUDGE_OPTION_LIST = () => [
    {
        answer: {
            content: '正确',
            error: false,
            errorMsg: '',
        },
        isAnswer: false,
        sort: 0,
        code: nanoid(),
    },
    {
        answer: {
            content: '错误',
            error: false,
            errorMsg: '',
        },
        isAnswer: false,
        sort: 1,
        code: nanoid(),
    },
]

// 简答题的 默认数据
const ANSWER_OPTION_LIST = () => [...generAtorList()]

// 填空题选项默认
const DEFAULT_BlANK_OPTION_LIST = () => [...generAtorList()]

/**
 * 各类型题目的雷同数据参数
 */
const SAME_OPTIONS: DEFAULT_QUESTION_ITEM_TYPE = {
    title: {
        content: '',
        error: false,
        errorMsg: '',
    },
    analysis: {
        content: '',
        error: false,
        errorMsg: '',
    },
}

/**
 * 根据类型获取初始题目数据
 */
export const getDefaultQuestionItem = (type: QUESTION_TYPE_ENUM): DEFAULT_QUESTION_ITEM_TYPE => {
    let code = nanoid()
    switch (type) {
        case QUESTION_TYPE_ENUM.SINGLE:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.SINGLE,
                optionList: DEFAULT_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.MULTIPLE:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.MULTIPLE,
                optionList: DEFAULT_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.BLANK:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.BLANK,
                optionList: DEFAULT_BlANK_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.SHORT:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.SHORT,
                optionList: ANSWER_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.JUDGEMENT:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.JUDGEMENT,
                optionList: JUDGE_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.COMPOSE:
            return {
                title: {
                    content: '',
                    error: false,
                    errorMsg: '',
                },
                type: QUESTION_TYPE_ENUM.COMPOSE,
                childList: [],
                active: true,
                code,
                status: 2,
            }
        case QUESTION_TYPE_ENUM.CALCULATE:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.CALCULATE,
                optionList: ANSWER_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.DISCOURSE:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.DISCOURSE,
                optionList: ANSWER_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
        case QUESTION_TYPE_ENUM.ANALYSIS:
            return {
                title: {
                    content: '',
                    error: false,
                    errorMsg: '',
                },
                type: QUESTION_TYPE_ENUM.ANALYSIS,
                childList: [],
                active: true,
                code,
                status: 2,
            }
        default:
            return {
                ...SAME_OPTIONS,
                type: QUESTION_TYPE_ENUM.SINGLE,
                optionList: DEFAULT_OPTION_LIST(),
                active: true,
                code,
                status: 1,
            }
    }
}
