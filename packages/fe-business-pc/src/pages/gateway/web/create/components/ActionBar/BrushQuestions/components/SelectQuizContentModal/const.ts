/** 枚举 练习状态  【未开始】【练习中】【已结束】  */
export enum BRUSH_QUESTION_STATUS {
    NOT_STARTED = 0,
    IN_PROGRESS = 2,
    FINISHED = 1,
}

export const BRUSH_QUESTION_STATUS_MAP: Record<number, string> = {
    [BRUSH_QUESTION_STATUS.NOT_STARTED]: '未开始',
    [BRUSH_QUESTION_STATUS.IN_PROGRESS]: '练习中',
    [BRUSH_QUESTION_STATUS.FINISHED]: '已结束',
}

/**  options select  */
export const BRUSH_QUESTION_STATUS_OPTIONS = [
    {
        label: '未开始',
        value: BRUSH_QUESTION_STATUS.NOT_STARTED,
    },
    {
        label: '练习中',
        value: BRUSH_QUESTION_STATUS.IN_PROGRESS,
    },
    {
        label: '已结束',
        value: BRUSH_QUESTION_STATUS.FINISHED,
    },
]

type BADGE_ENUM = 'default' | 'processing'

export const BADGE_STATUS: Record<number, BADGE_ENUM> = {
    [BRUSH_QUESTION_STATUS.NOT_STARTED]: 'default',
    [BRUSH_QUESTION_STATUS.IN_PROGRESS]: 'processing',
    [BRUSH_QUESTION_STATUS.FINISHED]: 'default',
}
