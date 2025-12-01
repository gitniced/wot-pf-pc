import type { ILearningHomework } from '../../types/learning'

/**
 * 生成组件的唯一 state 前缀
 * @param uniqueId 唯一标识（如 activityCode）
 * @returns state 前缀
 */
export const generateComponentStatePrefix = (uniqueId?: string): string => {
    if (uniqueId) {
        return `homework-${uniqueId}`
    }
    // 使用页面路径作为标识，确保不同页面不冲突
    const pathname = window.location.pathname.split('/').join('-')
    return `homework${pathname}-${Date.now()}`
}

/**
 * 为作业项生成稳定的唯一标识
 * @param homeworkIndex 作业项在数组中的索引
 * @param homework 作业项数据
 * @returns 唯一标识
 */
export const getHomeworkId = (homeworkIndex: number, homework: ILearningHomework): string => {
    // 优先使用作业项的 code（已保存的作业项）
    if (homework.code) {
        return homework.code
    }

    // 对于新建的作业项，基于其内容生成稳定的标识
    // 使用索引 + 名称 + 模板信息的组合来确保唯一性和稳定性
    const contentHash = `${homeworkIndex}-${homework.name || 'empty'}-${
        homework.templateInfo || 'none'
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
 * 生成作业项的完整 state
 * @param componentStatePrefix 组件 state 前缀
 * @param homeworkIndex 作业项索引
 * @param homework 作业项数据
 * @returns 完整的 state 字符串
 */
export const generateHomeworkState = (
    componentStatePrefix: string,
    homeworkIndex: number,
    homework: ILearningHomework,
): string => {
    const homeworkId = getHomeworkId(homeworkIndex, homework)
    return `${componentStatePrefix}-${homeworkId}`
}

/**
 * 从 state 中提取 homeworkId
 * @param state 完整的 state 字符串
 * @param componentStatePrefix 组件 state 前缀
 * @returns homeworkId 或 null
 */
export const extractHomeworkIdFromState = (
    state: string,
    componentStatePrefix: string,
): string | null => {
    if (!state || !state.startsWith(componentStatePrefix)) {
        return null
    }

    const homeworkId = state.substring(componentStatePrefix.length + 1)
    return homeworkId || null
}

/**
 * 在作业项列表中查找匹配指定 homeworkId 的索引
 * @param homeworks 作业项列表
 * @param homeworkId 要查找的 homeworkId
 * @returns 匹配的索引，未找到返回 -1
 */
export const findHomeworkIndexById = (
    homeworks: ILearningHomework[],
    homeworkId: string,
): number => {
    return homeworks.findIndex((homework, idx) => {
        const id = getHomeworkId(idx, homework)
        return id === homeworkId
    })
}
