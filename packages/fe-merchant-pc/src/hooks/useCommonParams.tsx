// 获取卷库标签(subject, skill, belongType)

import { BELONG_TYPE_ENUM, SKILL_TYPE_ENUM, SKILL_TYPE_MAP, SUBJECT_TYPE_MAP } from '@/constants'
import { history, useParams } from 'umi'

export interface CommonParams {
    belongType?: number // 机构/资源方/省级/国家
    skill?: number // 理论/技能
    subject?: number // 模拟/真题
}

// 真题理论 ｜ 模拟理论 ｜ 真题技能 ｜ 模拟技能
export type QuestionRouteType =
    | 'real-theory'
    | 'simulation-theory'
    | 'real-skill'
    | 'simulation-skill'

const getSubjectAndSkill = (type: QuestionRouteType) => {
    const [subject, skill] = type.split('-')

    return {
        subject: SUBJECT_TYPE_MAP[subject],
        skill: SKILL_TYPE_MAP[skill],
    }
}

const useCommonParams = () => {
    const { type } = useParams() as { type: 'real-theory' | 'simulation-theory' }

    const { subject, skill } = getSubjectAndSkill(type)
    return {
        skill,
        subject,
        belongType: BELONG_TYPE_ENUM.MERCHANT, // 机构
    }
}

export default useCommonParams
