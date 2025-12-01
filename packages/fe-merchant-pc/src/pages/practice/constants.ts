export const ALL_STATE = { label: '全部', value: ''}

// 刷题状态
export enum PRACTICE_STATE_ENUM {
    NOT_START, // 未开始
    FINISHED, // 已结束
    ON_GOING, // 练习中
}

export const PRACTICE_STATE_TEXT: Record<number, string> = {
    [PRACTICE_STATE_ENUM.NOT_START]: '未开始',
    [PRACTICE_STATE_ENUM.ON_GOING]: '练习中',
    [PRACTICE_STATE_ENUM.FINISHED]: '已结束'
}

export const PRACTICE_STATE_OPTIONS = [
    ALL_STATE,
    {
        label: PRACTICE_STATE_TEXT[PRACTICE_STATE_ENUM.NOT_START],
        value: PRACTICE_STATE_ENUM.NOT_START
    },
    {
        label: PRACTICE_STATE_TEXT[PRACTICE_STATE_ENUM.ON_GOING],
        value: PRACTICE_STATE_ENUM.ON_GOING
    },
    {
        label: PRACTICE_STATE_TEXT[PRACTICE_STATE_ENUM.FINISHED],
        value: PRACTICE_STATE_ENUM.FINISHED
    }
]

// 发布状态
export enum PUBLISH_STATE_ENUM {
    DRAFT, // 草稿
    PUBLISHED // 发布
}

export const PUBLISH_STATE_TEXT: Record<number, string> = {
    [PUBLISH_STATE_ENUM.DRAFT]: '草稿',
    [PUBLISH_STATE_ENUM.PUBLISHED]: '发布'
}

export const PUBLISH_STATE_OPTIONS = [
    ALL_STATE,
    {
        label: PUBLISH_STATE_TEXT[PUBLISH_STATE_ENUM.DRAFT],
        value: PUBLISH_STATE_ENUM.DRAFT
    },
    {
        label: PUBLISH_STATE_TEXT[PUBLISH_STATE_ENUM.PUBLISHED],
        value: PUBLISH_STATE_ENUM.PUBLISHED
    }
]

export enum PUSH_STATE_ENUM {
    NOT_PUSHED,
    PUSHED,
}

export const PUSH_STATE_TEXT: Record<number, string> = {
    [PUSH_STATE_ENUM.NOT_PUSHED]: '未推送',
    [PUSH_STATE_ENUM.PUSHED]: '已推送',
}

export const PUSH_STATE_OPTIONS = [
    ALL_STATE,
    {
        label: PUSH_STATE_TEXT[PUSH_STATE_ENUM.NOT_PUSHED],
        value: PUSH_STATE_ENUM.NOT_PUSHED
    },
    {
        label: PUSH_STATE_TEXT[PUSH_STATE_ENUM.PUSHED],
        value: PUSH_STATE_ENUM.PUSHED
    },
]