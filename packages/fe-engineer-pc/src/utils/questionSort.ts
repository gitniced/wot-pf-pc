import { QUESTION_TYPE, QUESTION_TYPE_LABEL } from '@/modules/question/const'
import type { IQuestion } from '@/modules/question/types'

export const sortBy = [
    QUESTION_TYPE.single,
    QUESTION_TYPE.multiple,
    QUESTION_TYPE.judgment,
    QUESTION_TYPE.fill,
    QUESTION_TYPE.essay,
    QUESTION_TYPE.discussion,
    QUESTION_TYPE.calculation,
    QUESTION_TYPE.combination,
    QUESTION_TYPE.case,
]

/**
 * 根据 sortBy 顺序对题目数组进行排序
 * @param {Array<{type: number}>} data
 * @returns {Array<{type: number}>}
 */
export function sortQuestionsByType(data: { type: number }[]) {
    return data.slice().sort((a, b) => {
        const indexA = sortBy.indexOf(a.type)
        const indexB = sortBy.indexOf(b.type)
        // 未找到的类型排在最后
        const safeIndexA = indexA === -1 ? sortBy.length : indexA
        const safeIndexB = indexB === -1 ? sortBy.length : indexB
        return safeIndexA - safeIndexB
    })
}

export type TGroupQuesResult = { type: QUESTION_TYPE; questionList: IQuestion[]; title: string }

/**
 * 根据 sortBy 顺序，将题目数组分组，生成 [{ type, questionList }] 的新数组
 * @param {Array<{type: number}>} data
 * @returns {Array<TGroupQuesResult>}
 */
export function groupQuestionsByType(data: { type: QUESTION_TYPE }[]) {
    // 先按 type 分组
    const typeMap: Record<number, { type: number; questionList: any[]; title: string }> = {}
    data.forEach(item => {
        if (!typeMap[item.type]) {
            typeMap[item.type] = {
                type: item.type,
                questionList: [],
                title: QUESTION_TYPE_LABEL[item.type],
            }
        }
        typeMap[item.type].questionList.push(item)
    })

    // 按 sortBy 顺序输出
    const result: TGroupQuesResult[] = []
    sortBy.forEach(type => {
        if (typeMap[type]) {
            result.push(typeMap[type])
        }
    })
    // 把未在 sortBy 中出现的 type 也加到最后
    Object.keys(typeMap).forEach(typeStr => {
        const type = Number(typeStr)
        if (!sortBy.includes(type)) {
            result.push(typeMap[type])
        }
    })
    return result
}
