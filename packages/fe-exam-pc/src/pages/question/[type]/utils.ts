import { message } from 'antd'
import {
    DEFAULT_OPTIONS_COUNT,
    QUESTION_TYPE_ENUM,
    QUESTION_TYPE_TEXT,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from './constants'
import type { KnowledgeItem, KnowledgeOption, OptionItem, RouteQuery } from './interface'
import type { EditQuestionItem } from './edit/interface'
import { nanoid } from 'nanoid'
import type { CommonParams } from '@/hooks/useCommonParams'

export const generateCommonJobList = (commonJobList: any) => {
    if (!commonJobList) return []
    return commonJobList.map((commonJob: any) => ({
        label: commonJob.name,
        value: commonJob.levelRelationId || commonJob.id,
        hasWorkType: commonJob.hasWorkType, // 是否有工种
        children: generateCommonJobList(
            commonJob.workTypeList?.length ? commonJob.workTypeList : commonJob.levelInfoList,
        ),
    }))
}

export const generateKnowledgeList = (
    knowledgeList: KnowledgeItem[],
): KnowledgeOption[] | undefined => {
    if (!knowledgeList || !knowledgeList.length) return undefined

    return knowledgeList.map((knowledge: KnowledgeItem) => ({
        label: knowledge.title,
        value: knowledge.code,
        levelCode: knowledge.levelCode,
        children: generateKnowledgeList(knowledge.childList),
    }))
}

// 判断是否是非主观题(单选、多选、判断、填空)
export const isSubjective = (questionType: number) => {
    if (
        [
            QUESTION_TYPE_ENUM.SINGLE,
            QUESTION_TYPE_ENUM.MULTIPLE,
            QUESTION_TYPE_ENUM.JUDGEMENT,
            QUESTION_TYPE_ENUM.BLANK,
        ].includes(questionType)
    ) {
        return false
    }

    return true
}

// 职业/工种/等级校验
export const validateCommonJob = (commonJob?: number[]) => {
    if (!commonJob || !commonJob.length) {
        message.error('职业/工种/等级不能为空')
        return false
    }

    return true
}

// 题目/题干校验
export const validateTitle = (questionType: number, title?: string, childIndex?: number) => {
    if (!title) {
        const messageContent = childIndex
            ? `${QUESTION_TYPE_TEXT[questionType]}的第${childIndex}个子题的题目/题干不能为空`
            : `${QUESTION_TYPE_TEXT[questionType]}的题目/题干不能为空`

        message.error(messageContent)
        return false
    }

    return true
}

// 选项校验
export const validateOptions = (
    questionType: number,
    optionList: OptionItem[],
    childIndex?: number,
) => {
    // 判断选项是否有空数据
    const hasEmpty = optionList.some(item => !item.answer)

    if (hasEmpty) {
        const messageContent = childIndex
            ? `${QUESTION_TYPE_TEXT[questionType]}的第${childIndex}个子题的每一个选项都是必填的`
            : `${QUESTION_TYPE_TEXT[questionType]}的每一个选项都是必填的`
        message.error(messageContent)
        return false
    }

    return true
}

// 答案校验
export const validateAnswer = (
    questionType: number,
    optionList: OptionItem[],
    childIndex?: number,
) => {
    const hasAnswer = optionList.some((item: any) => item.isAnswer)
    if (!hasAnswer) {
        const messageContent = childIndex
            ? `${QUESTION_TYPE_TEXT[questionType]}的第${childIndex}个子题的答案不能为空`
            : `${QUESTION_TYPE_TEXT[questionType]}的答案不能为空`
        message.error(messageContent)

        return false
    }

    if (questionType === QUESTION_TYPE_ENUM.MULTIPLE) {
        if (optionList.filter(item => item.isAnswer).length < 2) {
            const messageContent = childIndex
                ? `${QUESTION_TYPE_TEXT[questionType]}的第${childIndex}个多选题至少需要有两个及以上的答案`
                : `多选题至少需要有两个及以上的答案`
            message.error(messageContent)
            return false
        }
    }
    return true
}

// 组合题校验
export const validateChildList = (questionType: number, childList: EditQuestionItem[]) => {
    for (let i = 0; i < childList.length; i++) {
        const { title, optionList = [], type } = childList[i]

        if (!validateTitle(questionType, title, i + 1)) {
            return false
        }

        if (!isSubjective(type)) {
            if (!validateOptions(questionType, optionList, i + 1)) {
                return false
            }
        }

        if (!validateAnswer(questionType, optionList, i + 1)) {
            return false
        }
    }

    return true
}

// 非组合题校验
export const validateParentQuestion = (questionItem: EditQuestionItem) => {
    const { type, title, optionList = [] } = questionItem
    // 题干校验
    if (!validateTitle(type, title)) {
        return false
    }

    // 选项校验
    if (!isSubjective(type)) {
        if (!validateOptions(type, optionList)) {
            return false
        }
    }

    // 答案校验
    if (!validateAnswer(type, optionList)) {
        return false
    }

    return true
}

export const generaDefaultOptionList = (type: number) => {
    const optionListCount = DEFAULT_OPTIONS_COUNT[type]
    const optionList = []

    for (let i = 0; i < optionListCount; i++) {
        const item: OptionItem = { isAnswer: false, code: nanoid() }

        if (type === QUESTION_TYPE_ENUM.JUDGEMENT) {
            item.answer = i === 0 ? '正确' : '错误'
        }

        optionList.push(item)
    }

    return optionList
}

/**
 * 处理考评点数据
 * @param data
 * @returns
 */
export const handlerAuthenticatePoint = (data: any) => {
    const {
        name = '',
        firstRangeName = '',
        secondRangeName = '',
        thirdRangeName = '',
        pointName = '',
    } = data?.authenticatePoint ?? {}
    return [name, firstRangeName, secondRangeName, thirdRangeName, pointName]
        .filter(item => !!item)
        .join('/')
}

/**
 *
 * @param subject 是否是真题/模拟题
 * @param skill 是否是理论/技能
 */
export const getTitleByType = ({ subject, skill }: CommonParams) => {
    // 目前只有这两种，后续扩展了卷库类型再加上去，应该有模拟卷库的
    if (subject === SUBJECT_TYPE_ENUM.REAL && skill === SKILL_TYPE_ENUM.THEORY) {
        return '理论知识真题题库'
    }
    if (subject === SUBJECT_TYPE_ENUM.REAL && skill === SKILL_TYPE_ENUM.SKILL) {
        return '技能知识真题题库'
    }
    if (subject === SUBJECT_TYPE_ENUM.COMPETITION && skill === SKILL_TYPE_ENUM.THEORY) {
        return '理论知识竞赛题库'
    }
    if (subject === SUBJECT_TYPE_ENUM.COMPETITION && skill === SKILL_TYPE_ENUM.SKILL) {
        return '技能知识竞赛题库'
    }
    if (subject === SUBJECT_TYPE_ENUM.TRAIN && skill === SKILL_TYPE_ENUM.THEORY) {
        return '试题管理'
    }
    return '模拟题题库'
}

// 获取地址栏数据
export const mapJobName = (params: RouteQuery) => {
    const { workName, workNameCode, workType, workTypeCode, workLevel, workLevelCode } = params

    const options = []
    if (workNameCode) {
        options.push({
            // 是否有工种
            hasWorkType: Boolean(workName) && Boolean(workNameCode),
            label: workName,
            value: Number(workNameCode),
        })
    }

    if (workTypeCode) {
        options.push({
            label: workType,
            value: Number(workTypeCode),
        })
    }

    if (workLevelCode) {
        options.push({
            label: workLevel,
            value: Number(workLevelCode),
        })
    }
    return options
}
