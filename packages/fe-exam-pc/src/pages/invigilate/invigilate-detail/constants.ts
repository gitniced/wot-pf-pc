export const ALL_STATE = { label: '全部', value: '' }
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
export const EXAM_STATE_OPTIONS = [
    {
        label: '未开始',
        value: EXAM_STATE_ENUM.NOT_START,
    },
    {
        label: '进行中',
        value: EXAM_STATE_ENUM.ONGOING,
    },
    {
        label: '已结束',
        value: EXAM_STATE_ENUM.FINISHED,
    },
]

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

//签到枚举
export enum IP_STATE_ENUM {
    ALL = '',
    NORMAL = 0, // 正常
    ERROR = 1, // 异常
}
export const IP_STATE_OPTIONS = [
    {
        label: '全部',
        value: IP_STATE_ENUM.ALL,
    },
    {
        label: '异常',
        value: IP_STATE_ENUM.ERROR,
    },
    {
        label: '正常',
        value: IP_STATE_ENUM.NORMAL,
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
export const SIGN_TYPE_STATE_OPTIONS = [
    {
        label: '集中签到',
        value: SIGN_TYPE_STATE_ENUM.NEED_SIGN,
    },
    {
        label: '无需签到',
        value: SIGN_TYPE_STATE_ENUM.NO_SIGN,
    },
]

//操作按钮枚举
export enum BUTTON_ENUM {
    TIPS = 'TIPS', // 提示
    DELAY = 'DELAY', // 延迟
    REMARK = 'REMARK', // 标记
    WINDING = 'WINDING', // 收卷
}
export const BUTTON_TEXT: Record<string, string> = {
    [BUTTON_ENUM.TIPS]: '提醒',
    [BUTTON_ENUM.DELAY]: '延迟',
    [BUTTON_ENUM.REMARK]: '标记',
    [BUTTON_ENUM.WINDING]: '收卷',
}
