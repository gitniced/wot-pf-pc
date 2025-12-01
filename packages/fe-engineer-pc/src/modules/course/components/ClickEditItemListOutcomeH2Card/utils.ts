import type { ILearningOutcome } from '../../types/learning'

/**
 * 生成组件的唯一 state 前缀
 * @param uniqueId 唯一标识（如 activityCode）
 * @returns state 前缀
 */
export const generateComponentStatePrefix = (uniqueId?: string): string => {
    if (uniqueId) {
        return `outcome-${uniqueId}`
    }
    // 使用页面路径作为标识，确保不同页面不冲突
    const pathname = window.location.pathname.split('/').join('-')
    return `outcome${pathname}-${Date.now()}`
}

/**
 * 为成果项生成稳定的唯一标识
 * @param outcomeIndex 成果项在数组中的索引
 * @param outcome 成果项数据
 * @returns 唯一标识
 */
export const getOutcomeId = (outcomeIndex: number, outcome: ILearningOutcome): string => {
    // 优先使用成果项的 code（已保存的成果项）
    if (outcome.code) {
        return outcome.code
    }

    // 对于新建的成果项，基于其内容生成稳定的标识
    // 使用索引 + 名称 + 模板信息的组合来确保唯一性和稳定性
    const contentHash = `${outcomeIndex}-${outcome.name || 'empty'}-${
        outcome.templateInfo || 'none'
    }`

    // 简单的字符串 hash，确保刷新后相同内容生成相同 ID
    let hash = 0
    for (let i = 0; i < contentHash.length; i++) {
        hash = (hash << 5) - hash + contentHash.charCodeAt(i)
        hash = hash & hash // Convert to 32bit integer
    }
    return `temp-${Math.abs(hash).toString(36)}`
}

/**
 * 生成成果项的完整 state
 * @param componentStatePrefix 组件 state 前缀
 * @param outcomeIndex 成果项索引
 * @param outcome 成果项数据
 * @returns 完整的 state 字符串
 */
export const generateOutcomeState = (
    componentStatePrefix: string,
    outcomeIndex: number,
    outcome: ILearningOutcome,
): string => {
    const outcomeId = getOutcomeId(outcomeIndex, outcome)
    return `${componentStatePrefix}-${outcomeId}`
}

/**
 * 从 state 中提取 outcomeId
 * @param state 完整的 state 字符串
 * @param componentStatePrefix 组件 state 前缀
 * @returns outcomeId 或 null
 */
export const extractOutcomeIdFromState = (
    state: string,
    componentStatePrefix: string,
): string | null => {
    if (!state || !state.startsWith(componentStatePrefix)) {
        return null
    }

    const outcomeId = state.substring(componentStatePrefix.length + 1)
    return outcomeId || null
}

/**
 * 在成果项列表中查找匹配指定 outcomeId 的索引
 * @param outcomes 成果项列表
 * @param outcomeId 要查找的 outcomeId
 * @returns 匹配的索引，未找到返回 -1
 */
export const findOutcomeIndexById = (outcomes: ILearningOutcome[], outcomeId: string): number => {
    return outcomes.findIndex((outcome, idx) => {
        const id = getOutcomeId(idx, outcome)
        return id === outcomeId
    })
}
