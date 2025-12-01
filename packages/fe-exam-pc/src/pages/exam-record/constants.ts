export const ALL_STATE = { label: '全部', value: null }
// 考试状态
export enum EXAM_STATE_ENUM {
    ALL = 0,
    NOT_START = 10, // 未开始
    ONGOING = 20, // 进行中
    FINISHED = 30, // 已结束
}

export const EXAM_STATE_TEXT: Record<string, string> = {
    [EXAM_STATE_ENUM.NOT_START]: '未开始',
    [EXAM_STATE_ENUM.ONGOING]: '进行中',
    [EXAM_STATE_ENUM.FINISHED]: '已结束',
}

// 考生考试状态
export enum STU_STATE_ENUM {
    ALL = '',
    NO_START = 10, // 未开考
    DOING = 20, // 答题中
    SUBMIT = 30, // 已交卷
}
export const STU_STATE_OPTIONS: { label: string; value: any; style?: any }[] = [
    {
        label: '全部',
        value: ALL_STATE.value,
    },
    {
        label: '未开考',
        value: STU_STATE_ENUM.NO_START,
        style: {
            background: '#D9D9D9',
        },
    },
    {
        label: '答题中',
        value: STU_STATE_ENUM.DOING,
        style: {
            background: 'var(--primary-color)',
            border: '2px solid rgba(0,103,255,0.2)',
        },
    },
    {
        label: '已交卷',
        value: STU_STATE_ENUM.SUBMIT,
        style: {
            background: '#52C41A',
        },
    },
]

//签到枚举
export enum SIGN_STATE_ENUM {
    ALL = '',
    NOT_SIGN = 0, // 未签到
    COMPETITION = 1, // 已签到
}
export const SIGN_STATE_OPTIONS = [
    {
        label: '全部',
        value: ALL_STATE.value,
    },
    {
        label: '未签到',
        value: SIGN_STATE_ENUM.NOT_SIGN,
        style: {
            background: '#FAAD14',
        },
    },
    {
        label: '已签到',
        value: SIGN_STATE_ENUM.COMPETITION,
        style: {
            background: '#52C41A',
        },
    },
]

//签到方式枚举
export enum SIGN_TYPE_STATE_ENUM {
    NEED_SIGN = 1, // 集中签到
    NO_SIGN = 0, // 无需签到
}
export const SIGN_TYPE_TEXT: Record<string, string> = {
    [SIGN_TYPE_STATE_ENUM.NO_SIGN]: '无需签到',
    [SIGN_TYPE_STATE_ENUM.NEED_SIGN]: '集中签到',
}

// 是否延迟
export enum DELAY_STATE_ENUM {
    NOT_DELAY,
    DELAYED,
}
export const DELAY_STATE_OPTIONS = [
    {
        label: '全部',
        value: ALL_STATE.value,
    },
    {
        label: '是',
        value: DELAY_STATE_ENUM.DELAYED,
    },
    {
        label: '否',
        value: DELAY_STATE_ENUM.NOT_DELAY,
    },
]

// 是否标记
export enum MARK_STATE_ENUM {
    NOT_MARKED,
    MAEKED,
}
export const MARK_STATE_OPTIONS = [
    {
        label: '全部',
        value: ALL_STATE.value,
    },
    {
        label: '是',
        value: MARK_STATE_ENUM.MAEKED,
    },
    {
        label: '否',
        value: MARK_STATE_ENUM.NOT_MARKED,
    },
]
