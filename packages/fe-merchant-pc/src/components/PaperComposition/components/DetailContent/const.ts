import type { QuestionItem } from './interface'

// 组卷模板
export const templateTypeName: Record<string, string> = {
    self: '自有模板',
    sid: '站点模板',
}
// 组卷方式
export const compositionType: Record<string, { value: string; describe: string }> = {
    authenticate: {
        value: '按鉴定点组卷',
        describe: '按照要素细目表设置的鉴定比重进行抽题组卷，所抽试题均为绑定了鉴定点的试题',
    },
    questiontype: {
        value: '按题型组卷',
        describe: '按照各题型所需题量进行抽题组卷',
    },
}
// 分值设置
export const scoreSetType: Record<string, string> = {
    questiontype: '按题型设置',
    single: '单题独立设置',
    unification: '统一分值',
}
// 题型结构抽取方式
export const questionStructureType: Record<string, string> = {
    questiontype: '指定题型题数',
    rules: '按规则随机抽取',
}
// 生成试卷方式
export const isRandomPaperType: Record<number, string> = {
    0: '固定生成考卷',
    1: '随机生成考卷',
}
// 允许编辑
export const isEditStateType: Record<number, string> = {
    0: '不允许',
    1: '允许',
}
// 题型
export const questionType: Record<number, string> = {
    10: '判断题',
    20: '单选题',
    30: '多选题',
    40: '填空题',
    50: '简答题',
    60: '组合题',
    70: '计算题',
    80: '论述题',
    90: '案例分析题',
}
/**
 * 计算哪几种题型是不够的
 * @param data 题型结构列表数据
 * @returns
 */
export const lackQuestionType = (data: QuestionItem[] = []) => {
    const typeArr: any = []
    data.forEach(item => {
        const { needNumber, count, questionType: type } = item || {}
        if (needNumber > count) {
            typeArr.push(questionType[type])
        }
    })
    return typeArr
}
