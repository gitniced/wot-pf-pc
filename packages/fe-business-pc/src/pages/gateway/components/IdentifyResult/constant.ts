// 最多选择10个评价计划
export const MAX_COUNT = 10

// 计划分类枚举
export enum PLAN_CATEGORY {
    SKILL_LEVEL = 1, // 职业技能等级认定
    SPECIAL_ABILITY = 2, // 专项职业能力
}

export const PLAN_CATEGORY_TEXT: Record<number, string> = {
    [PLAN_CATEGORY.SKILL_LEVEL]: '职业技能等级认定',
    [PLAN_CATEGORY.SPECIAL_ABILITY]: '专项职业能力',
}
