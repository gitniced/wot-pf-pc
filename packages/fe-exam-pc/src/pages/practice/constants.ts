export const ALL_STATE = { label: '全部', value: '' }

// 刷题状态
export enum PRACTICE_STATE_ENUM {
    NOT_START, // 未开始
    FINISHED, // 已结束
    ON_GOING, // 练习中
}

export const PRACTICE_STATE_TEXT: Record<number, string> = {
    [PRACTICE_STATE_ENUM.NOT_START]: '未开始',
    [PRACTICE_STATE_ENUM.ON_GOING]: '练习中',
    [PRACTICE_STATE_ENUM.FINISHED]: '已结束',
}

export const PRACTICE_STATE_OPTIONS = [
    ALL_STATE,
    {
        label: PRACTICE_STATE_TEXT[PRACTICE_STATE_ENUM.NOT_START],
        value: PRACTICE_STATE_ENUM.NOT_START,
    },
    {
        label: PRACTICE_STATE_TEXT[PRACTICE_STATE_ENUM.ON_GOING],
        value: PRACTICE_STATE_ENUM.ON_GOING,
    },
    {
        label: PRACTICE_STATE_TEXT[PRACTICE_STATE_ENUM.FINISHED],
        value: PRACTICE_STATE_ENUM.FINISHED,
    },
]

// 发布状态
export enum PUBLISH_STATE_ENUM {
    DRAFT, // 草稿
    PUBLISHED, // 发布
}

export const PUBLISH_STATE_TEXT: Record<number, string> = {
    [PUBLISH_STATE_ENUM.DRAFT]: '草稿',
    [PUBLISH_STATE_ENUM.PUBLISHED]: '发布',
}

export const PUBLISH_STATE_OPTIONS = [
    ALL_STATE,
    {
        label: PUBLISH_STATE_TEXT[PUBLISH_STATE_ENUM.DRAFT],
        value: PUBLISH_STATE_ENUM.DRAFT,
    },
    {
        label: PUBLISH_STATE_TEXT[PUBLISH_STATE_ENUM.PUBLISHED],
        value: PUBLISH_STATE_ENUM.PUBLISHED,
    },
]

// 上下架状态
export enum SHELVES_STATE_ENUM {
    DOWN,
    UP,
}

// 练习来源

export enum PRACTICE_SOURCE {
    SELF_BUILT, // 自建
    MERCHANT_PUSH, // 资源方推送
}

export const PRACTICE_SOURCE_TEXT: Record<number, string> = {
    [PRACTICE_SOURCE.SELF_BUILT]: '自建',
    [PRACTICE_SOURCE.MERCHANT_PUSH]: '推送',
}

export const PRACTICE_SOURCE_OPTIONS = [
    ALL_STATE,
    {
        label: PRACTICE_SOURCE_TEXT[PRACTICE_SOURCE.SELF_BUILT],
        value: PRACTICE_SOURCE.SELF_BUILT,
    },
    {
        label: PRACTICE_SOURCE_TEXT[PRACTICE_SOURCE.MERCHANT_PUSH],
        value: PRACTICE_SOURCE.MERCHANT_PUSH,
    },
]
