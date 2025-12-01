import { enumToLabel } from '@/utils/enumHandle'

/**
 * 题目类型
 */
export enum QUESTION_TYPE {
    /**
     * 单选题
     */
    single = 20,
    /**
     * 多选题
     */
    multiple = 30,
    /**
     * 判断题
     */
    judgment = 10,
    /**
     * 填空题
     */
    fill = 40,
    /**
     * 简答题
     */
    essay = 50,
    /**
     * 组合题
     */
    combination = 60,
    /**
     * 计算题
     */
    calculation = 70,
    /**
     * 论述题
     */
    discussion = 80,
    /**
     * 案例分析题
     */
    case = 90,
}

export const QUESTION_TYPE_LABEL: Record<QUESTION_TYPE, string> = {
    [QUESTION_TYPE.single]: '单选题',
    [QUESTION_TYPE.multiple]: '多选题',
    [QUESTION_TYPE.judgment]: '判断题',
    [QUESTION_TYPE.fill]: '填空题',
    [QUESTION_TYPE.essay]: '简答题',
    [QUESTION_TYPE.calculation]: '计算题',
    [QUESTION_TYPE.discussion]: '论述题',
    [QUESTION_TYPE.case]: '案例分析题',
    [QUESTION_TYPE.combination]: '组合题',
}

export const QUESTION_TYPE_SIMPLE_LABEL = {
    [QUESTION_TYPE.single]: '单选',
    [QUESTION_TYPE.multiple]: '多选',
    [QUESTION_TYPE.judgment]: '判断',
    [QUESTION_TYPE.fill]: '填空',
    [QUESTION_TYPE.essay]: '简答',
    [QUESTION_TYPE.calculation]: '计算',
    [QUESTION_TYPE.discussion]: '论述',
    [QUESTION_TYPE.case]: '案例',
    [QUESTION_TYPE.combination]: '组合',
}

export const QUESTION_TYPE_ORDER = [
    QUESTION_TYPE.single,
    QUESTION_TYPE.multiple,
    QUESTION_TYPE.judgment,
    QUESTION_TYPE.fill,
    QUESTION_TYPE.essay,
    QUESTION_TYPE.calculation,
    QUESTION_TYPE.discussion,
    QUESTION_TYPE.case,
    QUESTION_TYPE.combination,
]

export const questionTypeOptions = enumToLabel(QUESTION_TYPE_LABEL, {
    number: true,
    order: QUESTION_TYPE_ORDER,
    exclude: [QUESTION_TYPE.discussion, QUESTION_TYPE.case, QUESTION_TYPE.combination],
})
