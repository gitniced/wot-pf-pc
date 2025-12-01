// 组卷方式下拉
export const composeOptions = [
    {
        value: 'authenticate,questiontype,fromfile',
        label: '全部',
    },
    {
        value: 'authenticate',
        label: '按鉴定点组卷',
    },
    {
        value: 'questiontype',
        label: '按题型组卷',
    },
]
// 状态下拉
export const statusOptions = [
    {
        value: '0,1',
        label: '全部',
    },
    {
        value: '1',
        label: '已使用',
    },
    {
        value: '0',
        label: '未使用',
    },
]
