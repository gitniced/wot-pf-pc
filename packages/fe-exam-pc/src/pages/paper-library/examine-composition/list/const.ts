// 查询初始化数据
export const initSearchParams = {
    composition: 'authenticate,questiontype,fromfile',
    usedState: '0,1',
}
// 组卷方式
export const composeEnum: Record<string, string> = {
    authenticate: '按考评点组卷',
    questiontype: '按题型组卷',
}
// 状态
export const statusEnum: Record<number, string> = {
    0: '未使用',
    1: '已使用',
}
// 评审状态
export const reviewStatusEnums: Record<number, string> = {
    0: '未提交',
    10: '待评审',
    20: '已驳回',
    30: '已通过',
}

export const tenplateTypeEnum: Record<number, string> = {
    10: '评价',
    40: '竞赛',
}
