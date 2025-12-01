// 题目
export const QUESTION_COUNT_LIST: { label: string, key: string}[] = [
    { label: '单选：', key: 'singleCount' },
    { label: '多选：', key: 'multipleCount' },
    { label: '判断：', key: 'judgeCount' },
    { label: '组合：', key: 'fixedCount' },
]

// 参互用户状态
export enum JOIN_USER_ENUM {
    NOT_LIMIT, // 不限制
    PART // 指定部分用户
}

export const JOIN_USER_TEXT: Record<number, string> = {
    [JOIN_USER_ENUM.NOT_LIMIT]: '不限',
    [JOIN_USER_ENUM.PART]: '指定用户'
}

export enum STEP_ENUM {
    FIRST,
    SECOND,
    THIRD,
}

// 抽题方式
export enum QUESTION_SELECT_TYPE {
    WORK, // 按职业抽题,
    KNOWLEDGE, // 按知识点分类抽题
}

export const QUESTION_SELECT_TYPE_TEXT: Record<number, string> = {
    [QUESTION_SELECT_TYPE.WORK]: '按职业目录抽题',
    [QUESTION_SELECT_TYPE.KNOWLEDGE]: '按知识点分类抽题'
}