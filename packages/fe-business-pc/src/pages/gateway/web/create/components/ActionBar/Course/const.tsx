// 展示样式单选框的枚举
export enum MOBILE_LAYOUT_ENUM {
    // 列表
    LIST = 'default',
    // 大图
    BIG_IMAGE = 'big_image',
    // 一行2个
    ONE_ROW_TWO = 'one_row_two',
    // 横向滑动
    INFINITY = 'infinity',
    // 展示栏
    VIEW = 'view',
}

export const MOBILE_LAYOUT_ENUM_TO_VIEW = {
    // 列表
    [MOBILE_LAYOUT_ENUM.LIST]: 1,
    // 大图
    [MOBILE_LAYOUT_ENUM.BIG_IMAGE]: 1,
    // 展示栏
    [MOBILE_LAYOUT_ENUM.VIEW]: 1,
    // 一行2个
    [MOBILE_LAYOUT_ENUM.ONE_ROW_TWO]: 2,
    // 横向滑动
    [MOBILE_LAYOUT_ENUM.INFINITY]: 'infinity',
}

// 展示样式单选框的option
export const LAYOUT_OPTIONS = [
    { label: '列表', value: MOBILE_LAYOUT_ENUM.LIST, icon: 'icon_saas_liebiao' },
    { label: '大图', value: MOBILE_LAYOUT_ENUM.BIG_IMAGE, icon: 'icon_saas_datu' },
    { label: '一行2个', value: MOBILE_LAYOUT_ENUM.ONE_ROW_TWO, icon: 'icon_saas_yihangerge' },
    { label: '横向滑动', value: MOBILE_LAYOUT_ENUM.INFINITY, icon: 'icon_saas_hengxianggundong' },
]

// 添加方式的单选框的枚举
export enum ADD_TYPE_ENUM {
    // 默认规则
    DEFAULT = 'default',
    // 按职业/工种/等级
    BY_JOB_CATEGORY = 'by_category',
    // 按课程
    BY_LESSON = 'custom',
}
// 展示内容的单选框的枚举
export enum SHOW_TYPE_ENUM {
    // 单独
    SINGLE = 'single',
    // 分组
    GROUP = 'group',
}

// 添加方式的option
export const ADD_TYPE_OPTIONS = [
    { label: '默认规则', value: ADD_TYPE_ENUM.DEFAULT },
    { label: '按职业/工种/等级', value: ADD_TYPE_ENUM.BY_JOB_CATEGORY },
    { label: '按课程', value: ADD_TYPE_ENUM.BY_LESSON },
]
// 展示内容的option
export const SHOW_TYPE_OPTIONS = [
    { label: '课程', value: SHOW_TYPE_ENUM.SINGLE },
    { label: '课程分组', value: SHOW_TYPE_ENUM.GROUP },
]

// 展示样式单选框的枚举
export enum PC_LAYOUT_ENUM {
    // 竖向一行5个
    VERTICAL_FIVE = 'vertical_5',
    // 竖向一行4个
    VERTICAL_FOUR = 'vertical_4',
    // 横向一行2个
    HORIZONTAL_TWO = 'horizontal_2',
    // 横向一行3个
    HORIZONTAL_THREE = 'horizontal_3',
}

// 展示样式单选框的option
export const PC_LAYOUT_OPTIONS = [
    {
        label: '竖向一行5个',
        value: PC_LAYOUT_ENUM.VERTICAL_FIVE,
        icon: 'icon_saas_shuxiangyihangwuge',
    },
    {
        label: '竖向一行4个',
        value: PC_LAYOUT_ENUM.VERTICAL_FOUR,
        icon: 'icon_saas_shuxiagnyihangsige',
    },
    {
        label: '横向一行2个',
        value: PC_LAYOUT_ENUM.HORIZONTAL_TWO,
        icon: 'icon_hengxiangyihangerge',
    },
    {
        label: '横向一行3个',
        value: PC_LAYOUT_ENUM.HORIZONTAL_THREE,
        icon: 'icon_saas_hengxiangyihangsange',
    },
]

export interface ICheckedRows {
    id: number
    name: string
    workName: string
    levelName: string
    courseNum: number
}

export enum LAYOUT_ENUM {
    INFINITY = 'infinity',
}
