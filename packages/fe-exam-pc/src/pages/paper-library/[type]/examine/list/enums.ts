/**
 * 弹窗类型
 */
export enum ModalType {
    /** @param 下载 */
    DOWNLOAD = 'DOWNLOAD',
    /** @param 预览 */
    PREVIEW = 'PREVIEW',
    /** @param 发布 */
    PUBLISH = 'PUBLISH',
}

/**
 * 弹窗标题
 */
export enum ModalTitle {
    DOWNLOAD = '试卷下载',
    PREVIEW = '预览试卷',
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
 * 组卷方式
 */
export const compositionMap: Record<string, string> = {
    all: '全部',
    authenticate: '按考评点组卷',
    questiontype: '按题型组卷',
    fromfile: '套题组卷',
}
/**
 * 发布状态
 */
export const publishMap: Record<string | number, string> = {
    all: '全部',
    0: '草稿',
    1: '发布',
}
/**
 * 发布状态下拉
 */
export const publishMapList = [
    { label: '全部', value: 'all' },
    { label: '草稿', value: 0 },
    { label: '发布', value: 1 },
]
/**
 * 引用状态
 */
export const referenceStateMap: Record<string | number, string> = {
    all: '全部',
    0: '未引用',
    1: '已引用',
}
/**
 * 引用状态下拉
 */
export const referenceStateMapList = [
    { label: '全部', value: 'all' },
    { label: '未引用', value: 0 },
    { label: '已引用', value: 1 },
]
// 组卷模板
export const templateStateMapList = [
    { label: '全部', value: 0 },
    { label: '已使用', value: 1 },
    { label: '未使用', value: 2 },
]
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
