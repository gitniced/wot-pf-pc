/**
 * 弹窗类型
 */
export enum ModalType {
    /** @param 添加试题 */
    ADD_REQUESTION = 'ADD_REQUESTION',
    /** @param 删除试题 */
    REMOVE_REQUESTION = 'REMOVE_REQUESTION',
    /** @param 注意事项 */
    NOTE = 'NOTE',
    /** @param 查看注意事项 */
    VIEW_NOTE = 'VIEW_NOTE',
    /** @param 题型要求 */
    QUESTION_REQUIRE = 'QUESTION_REQUIRE',
    /** @param 题型分值详情 */
    SCORE_DETAIL = 'SCORE_DETAIL',
    /** @param 批量设置分值 */
    BATCH_SET_SCORE = 'BATCH_SET_SCORE',
    /** @param 发布 */
    PUBLISH = 'PUBLISH',
}

/**
 * 弹窗标题
 */
export enum ModalTitle {
    ADD_REQUESTION = '添加试题',
    REMOVE_REQUESTION = '移除试题',
    NOTE = '编辑注意事项',
    VIEW_NOTE = '查看注意事项',
    QUESTION_REQUIRE = '题型要求',
    SCORE_DETAIL = '题型分值详情',
    BATCH_SET_SCORE = '批量设置分值',
    PUBLISH = '发布失败',
}

/**
 * 弹窗footer 文案
 */
export enum ModalFooterText {
    ADD = '添加',
    CANCEL = '取消',
    SAVE = '保存',
    CONFIRM = '确定',
    REMOVE = '删除',
}

/**
 * 分支设置
 */
export enum scoreTypeEnum {
    questiontype = '按题型设置',
    single = '单题独立设置',
    unification = '统一分值',
}

/**
 * 考卷设置
 */
export const PaperSettingEnum = new Map([
    [1, ['随机考卷', '考试时，考生的考卷将从本试卷题目中随机抽取，不同考生抽取到的题目可能不同']],
    [0, ['固定考卷', '考试时，全部考生的考卷均包含本试卷全部题目']],
])

/**
 * 题型
 */
export const questionTypeEnum = {
    0: '全部',
    10: '判断题',
    20: '单选题',
    30: '多选题',
    40: '填空题',
    50: '简答题',
    60: '组合题',
    70: '计算题',
    80: '论述题',
    90: '案例分析题',
}
export const questionTypeList = Object.keys(questionTypeEnum).map(v => ({
    value: v,
    label: (questionTypeEnum as any)[v],
}))

/**
 * 难易程度
 */
export const questionLevelEnum = {
    0: '全部',
    10: '易',
    20: '较易',
    30: '中等',
    40: '较难',
    50: '难',
}
export const questionLevelList = Object.keys(questionLevelEnum).map(v => ({
    value: v,
    label: (questionLevelEnum as any)[v],
}))

/**
 * 区分度
 */
export const discriminationEnum = {
    0: '全部',
    10: '差',
    20: '较差',
    30: '中等',
    40: '良好',
    50: '优秀',
}
export const discriminationList = Object.keys(discriminationEnum).map(v => ({
    value: v,
    label: (discriminationEnum as any)[v],
}))
