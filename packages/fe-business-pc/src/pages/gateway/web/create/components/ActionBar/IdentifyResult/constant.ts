/**
 * @enum ADD_RULE
 * @DEFAULT 默认图文
 * @CUSTOM 手动选择
 * @BY_CATEGORY 按分类
 * @BY_JOB_CATEGORY 按职业工种等级
 * @BY_LESSON 按课程
 */
export enum ADD_RULE {
    DEFAULT = 'default',
    CUSTOM = 'custom',
    BY_CATEGORY = 'by_category',
}

export const MODE_OPTIONS = [
    {
        label: '默认规则',
        value: ADD_RULE.DEFAULT,
    },
    {
        label: '手动选择',
        value: ADD_RULE.CUSTOM,
    },
    {
        label: '按分类',
        value: ADD_RULE.BY_CATEGORY,
    },
]

// 添加方式对应的文案
export const CONTENT_TEXT: Record<string, string> = {
    [ADD_RULE.DEFAULT]: '默认展示最新的4个已开启认定结果的评价计划',
    [ADD_RULE.CUSTOM]: '添加认定结果公示内容，最多10个',
    [ADD_RULE.BY_CATEGORY]: '默认展示所选分类下最新的4个已开启认定结果公示的评价计划',
}

// 最多选择10个评价计划
export const MAX_COUNT = 10
