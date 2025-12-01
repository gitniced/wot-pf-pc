// 查询初始化数据
export const initSearchParams = {
    commonJob: '',
    composition: 'authenticate,questiontype,fromfile',
    title: '',
    usedState: '0,1',
}
// 组卷方式
export const composeEnum: Record<string, string> = {
    authenticate: '按鉴定点组卷',
    questiontype: '按题型组卷',
}
// 状态
export const statusEnum: Record<number, string> = {
    0: '未使用',
    1: '已使用',
}
