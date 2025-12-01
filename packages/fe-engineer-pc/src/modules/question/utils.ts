import { QUESTION_TYPE } from './const'
import type { IQuestion, IQuestionOption } from './types'

export const getQuestionDefaultValue = (
    type: ((map: typeof QUESTION_TYPE) => QUESTION_TYPE) | QUESTION_TYPE,
    parentCode?: string,
) => {
    const questionType = typeof type === 'function' ? type(QUESTION_TYPE) : type

    const value: IQuestion = {
        code: undefined,
        parentCode: parentCode,
        serialNumber: 0,
        type: questionType,
        belongType: 10,
        title: '',
        analysis: '',
        subQuestions: [],
        options: [],
    }

    // 根据题型设置不同的默认选项
    switch (questionType) {
        case QUESTION_TYPE.judgment:
            // 判断题提供默认的正确/错误选项
            value.options = [
                {
                    sort: 'A',
                    answer: '正确',
                    isAnswer: true,
                },
                {
                    sort: 'B',
                    answer: '错误',
                    isAnswer: false,
                },
            ]
            break

        default:
            // 默认情况，保持空的选项数组
            break
    }

    return value
}

/**
 * 更新问题选项的通用方法
 * @param options 当前选项数组
 * @param optionIndex 要更新的选项索引
 * @param field 要更新的字段名
 * @param value 新的字段值
 * @returns 更新后的选项数组
 */
export const updateQuestionOption = (
    options: IQuestionOption[] = [],
    optionIndex: number,
    field: keyof IQuestionOption | string,
    value: any,
): IQuestionOption[] => {
    const newOptions = [...options]

    // 确保选项存在
    if (!newOptions[optionIndex]) {
        newOptions[optionIndex] = {
            code: `option_${optionIndex}`,
            sort: String(optionIndex),
            isAnswer: false,
            answer: '',
        }
    }

    newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        [field]: value,
    }

    return newOptions
}

/**
 * 更新问题字段的通用方法
 * @param question 当前问题对象
 * @param field 要更新的字段路径，如 'title' 或 'options[0].answer'
 * @param value 新的字段值
 * @returns 更新后的问题对象
 */
export const updateQuestionField = (question: IQuestion, field: string, value: any): IQuestion => {
    // 处理嵌套的 options 字段
    const optionMatch = field.match(/^options\[(\d+)\]\.(.+)$/)
    if (optionMatch) {
        const optionIndex = parseInt(optionMatch[1], 10)
        const optionField = optionMatch[2] as keyof IQuestionOption

        return {
            ...question,
            options: updateQuestionOption(question.options, optionIndex, optionField, value),
        }
    }

    // 处理普通字段
    return {
        ...question,
        [field]: value,
    }
}
