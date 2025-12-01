export const ALL_STATE = { label: '全部', value: null }

// 引用状态
export enum REFERENCE_STATE_ENUM {
    NOT_REFERENCE, // 未引用
    REFERENCEED, // 已引用
}

export const REFERENCE_STATE_TEXT: Record<number, string> = {
    [REFERENCE_STATE_ENUM.NOT_REFERENCE]: '未引用',
    [REFERENCE_STATE_ENUM.REFERENCEED]: '已引用',
}

export const REFERENCE_STATE_OPTIONS = [
    ALL_STATE,
    {
        label: REFERENCE_STATE_TEXT[REFERENCE_STATE_ENUM.NOT_REFERENCE],
        value: REFERENCE_STATE_ENUM.NOT_REFERENCE,
    },
    {
        label: REFERENCE_STATE_TEXT[REFERENCE_STATE_ENUM.REFERENCEED],
        value: REFERENCE_STATE_ENUM.REFERENCEED,
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
