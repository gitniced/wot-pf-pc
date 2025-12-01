import type { QUESTION_TYPE } from './const'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'

/**
 * 题目
 */
export interface IQuestion {
    /**
     * 题目编码
     */
    code?: string
    /**
     * 父题目编码
     */
    parentCode?: string
    /**
     * 排序
     */
    serialNumber: number
    /**
     * 题目类型
     */
    type: QUESTION_TYPE
    /**
     * 题目格式
     */
    belongType: number
    /**
     * 题目/题干
     */
    title: string
    /**
     * 题目解析
     */
    analysis?: string
    /**
     * 子题目列表
     */
    subQuestions?: IQuestion[]
    /**
     * 选项列表
     */
    options?: IQuestionOption[]
}

/**
 * 题目选项
 */
export interface IQuestionOption {
    /**
     * 选项编码
     */
    code?: string
    /**
     * 是否正确答案
     */
    isAnswer?: boolean
    /**
     * 选项内容
     */
    answer?: string
    /**
     * 选项排序
     */
    sort: string
}

/**
 * 问题组件通用Props
 */
export interface QuestionComponentProps<T = any> extends IUseComponentValueProps<T> {
    questionType?: QUESTION_TYPE
    form?: any
    /**
     * 表单字段命名空间，用于区分父问题和子问题的表单字段
     * 例如：['subQuestions', 0] 表示第一个子问题
     */
    formNamespace?: (string | number)[]
}

export interface FillQuesCompProps {
    value?: any
    onChange?: (value: any) => void
    data: IQuestion
    showType?: boolean
    fieldsName?: any[]
}
