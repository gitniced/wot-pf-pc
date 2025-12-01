// 根据卷库类型获取页面title
import type { CommonParams } from '@/hooks/useCommonParams'
import { SKILL_TYPE_ENUM, SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'

/**
 *
 * @param subject 是否是真题/模拟题
 * @param skill 是否是理论/技能
 */
export const getTitleByType = ({ subject, skill }: CommonParams) => {
    // 目前只有这两种，后续扩展了卷库类型再加上去，应该有模拟卷库的
    if (subject === SUBJECT_TYPE_ENUM.REAL && skill === SKILL_TYPE_ENUM.THEORY) {
        return '理论知识真题卷库'
    }
    if (subject === SUBJECT_TYPE_ENUM.REAL && skill === SKILL_TYPE_ENUM.SKILL) {
        return '技能知识真题卷库'
    }
    if (subject === SUBJECT_TYPE_ENUM.COMPETITION && skill === SKILL_TYPE_ENUM.THEORY) {
        return '理论知识竞赛卷库'
    }
    if (subject === SUBJECT_TYPE_ENUM.COMPETITION && skill === SKILL_TYPE_ENUM.SKILL) {
        return '技能知识竞赛卷库'
    }
    if (subject === SUBJECT_TYPE_ENUM.TRAIN && skill === SKILL_TYPE_ENUM.THEORY) {
        return '试卷管理'
    }
    return '模拟卷库'
}

// 获取地址栏数据
export const mapJobName = (params: any) => {
    const { customContent } = params

    const options = []
    let jobName, jobNameCode, jobType, jobTypeCode, jobLevel, jobLevelCode

    if (customContent) {
        const decodeCustomContent = decodeURIComponent(customContent)
        const parseCustomContent = JSON.parse(decodeCustomContent)
        const { commonJob = {} } = parseCustomContent

        jobName = commonJob.jobName
        jobNameCode = commonJob.jobNameCode
        jobType = commonJob.jobType
        jobTypeCode = commonJob.jobTypeCode
        jobLevel = commonJob.jobLevel
        jobLevelCode = commonJob.jobLevelCode
    } else {
        jobName = params.jobName
        jobNameCode = params.jobNameCode
        jobType = params.jobType
        jobTypeCode = params.jobTypeCode
        jobLevel = params.jobLevel
        jobLevelCode = params.jobLevelCode
    }

    if (jobNameCode) {
        options.push({
            // 是否有工种
            hasWorkType: Boolean(jobName) && Boolean(jobNameCode),
            label: jobName,
            value: Number(jobNameCode),
        })
    }

    if (jobTypeCode) {
        options.push({
            label: jobType,
            value: Number(jobTypeCode),
        })
    }

    if (jobLevelCode) {
        options.push({
            label: jobLevel,
            value: Number(jobLevelCode),
        })
    }
    return options
}
