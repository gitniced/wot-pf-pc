export const TIME_OF_USE_OPTIONS = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '未开始',
        value: '1',
    },
    {
        label: '使用中',
        value: '2',
    },
    {
        label: '已结束',
        value: '3',
    },
]

export const PUSH_STATUS_OPTIONS = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '上架',
        value: '1',
    },
    {
        label: '下架',
        value: '0',
    },
]

/**  推送状态 0:下架 1:上架  */
export enum PUSH_TYPE_STATUS {
    DOWN = 0,
    UP = 1,
}
export const PUSH_TYPE_STATUS_MAP: Record<string, string> = {
    [PUSH_TYPE_STATUS.DOWN]: '下架',
    [PUSH_TYPE_STATUS.UP]: '上架',
}

/**
 * 是否使用
 * 0:否 1:是
 */
export enum IS_USE {
    NO = 0,
    YES = 1,
}
export const IS_USE_MAP: Record<string, string> = {
    [IS_USE.NO]: '否',
    [IS_USE.YES]: '是',
}
