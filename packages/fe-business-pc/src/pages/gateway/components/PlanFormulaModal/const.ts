enum PlanTypeEnum {
    LEVEL = 1, // 职业技能等级认定
    MAJOR = 2, // 专项职业能力
}

export const planTypeMap = new Map([
    [
        PlanTypeEnum.LEVEL,
        {
            color: '#1678FF',
            background: '#EDF5FF',
        },
    ],
    [
        PlanTypeEnum.MAJOR,
        {
            color: '#FAAD14',
            background: '#FFFBE6',
        },
    ],
])

// 添加方式
export enum ADD_RULE {
    ALL = 'default', // 全部
    MANUAL = 'custom_rule', // 手动选择
    CATEGORY = 'by_category', // 按分类
}

export const MODE_OPTIONS = [
    {
        label: '全部',
        value: ADD_RULE.ALL,
    },
    {
        label: '手动选择',
        value: ADD_RULE.MANUAL,
    },
    {
        label: '按分类',
        value: ADD_RULE.CATEGORY,
    },
]

// 添加方式对应的文案
export const CONTENT_TEXT: Record<string, string> = {
    [ADD_RULE.ALL]: '默认展示最新的4个已开启计划公示的评价计划',
    [ADD_RULE.MANUAL]: '添加计划公示内容，最多10个',
    [ADD_RULE.CATEGORY]: '默认展示所选分类下最新的4个已开启计划公示的评价计划',
}

// 最多选择10个评价计划
export const MAX_COUNT = 10
