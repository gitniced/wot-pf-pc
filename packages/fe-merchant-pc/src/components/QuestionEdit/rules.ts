import { QUESTION_TYPE_ENUM } from '@/constants'
import { message } from 'antd'

const isFlag = (flag: boolean, text: string) => {
    if (!flag) {
        message.error(text)

        throw new Error('')
    }
}

//判断题的校验
const judgeRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    if (optiosn.optionList.some((i: { isAnswer?: string }) => i.isAnswer)) {
        // return
    } else {
        message.error('请选择答案选项')
        throw new Error('')
    }
}

// 单选的校验
const onceRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    isFlag(optiosn.optionList.length, '至少需要有一个选项')

    if (
        optiosn.optionList.some((i: { isAnswer: string }) => i.isAnswer) &&
        optiosn.optionList.every((i: { answer: { content: string } }) => i.answer?.content)
    ) {
        // return
    } else {
        message.error('请填写完整的选项')
        throw new Error('')
    }
}

// 多选的校验
const manyRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    isFlag(optiosn.optionList.length, '至少需要有2个选项')
    isFlag(
        optiosn.optionList?.filter((i: { isAnswer: string }) => i.isAnswer)?.length >= 2,
        '多选题至少需要有两个及以上的答案',
    )
    if (optiosn.optionList.every((i: { answer: { content: string } }) => i.answer?.content)) {
        // return
    } else {
        message.error('请填写完整的选项')
        throw new Error('')
    }
}

// 简答题题目的校验
const simpleRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    isFlag(optiosn.optionList.length, '至少需要有一个选项')

    isFlag(optiosn.optionList?.[0]?.answer?.content, '简答题的答案是必填的')
}

// 填空题的校验
const writeRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    isFlag(optiosn.optionList.length, '至少需要有一个选项')
    if (optiosn.optionList.every((i: { answer: { content: string } }) => i?.answer?.content)) {
        //
    } else {
        message.error('填空题每一个选项都是必填的')
        throw new Error('')
    }
}
// 计算题校验
const calculateRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    isFlag(optiosn.optionList.length, '至少需要有一个选项')
    isFlag(optiosn.optionList?.[0]?.answer?.content, '计算题的答案是必填的')
}
// 论述题校验
const discussionRules = (optiosn: any) => {
    isFlag(optiosn.title.content, '题干是必填的')
    isFlag(optiosn.optionList.length, '至少需要有一个选项')
    isFlag(optiosn.optionList?.[0]?.answer?.content, '论述题的答案是必填的')
}
// 分析题校验
const analysisRules = (optiosn: any) => {}
// 校验的map对象
const rulesMap: Record<string, any> = {
    [QUESTION_TYPE_ENUM.JUDGEMENT]: judgeRules,
    [QUESTION_TYPE_ENUM.SINGLE]: onceRules,
    [QUESTION_TYPE_ENUM.MULTIPLE]: manyRules,
    [QUESTION_TYPE_ENUM.BLANK]: writeRules,
    [QUESTION_TYPE_ENUM.SHORT]: simpleRules,
    [QUESTION_TYPE_ENUM.CALCULATE]: calculateRules,
    [QUESTION_TYPE_ENUM.DISCOURSE]: discussionRules,
    [QUESTION_TYPE_ENUM.ANALYSIS]: analysisRules,
}

const toRules = (i: { type: number }) => {
    if (rulesMap[i.type]) {
        rulesMap[i.type](i)
    } else {
        message.error('没找到对应的校验器')
        throw new Error('')
    }
}

const stepLoad = (source: any) => {
    if (Array.isArray(source)) {
        source.forEach(i => {
            toRules(i)
        })
    } else {
        toRules(source)
    }
}

const rules = (options: any) => {
    try {
        if (options.status === 1) {
            stepLoad(options)
            return true
        } else {
            isFlag(options.title.content, '题干是必填的')
            if (!options.childList.length) {
                message.error('至少添加一条组合题')
                return false
            }
            stepLoad(options.childList)
        }
        return true
    } catch (err) {
        return false
    }
}

export { rules }
