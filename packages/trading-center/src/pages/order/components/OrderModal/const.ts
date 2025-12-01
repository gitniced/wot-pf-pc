
/**订单状态 */
export const ORDER_STATUS_LIST = [
    { value: 1, label: '未支付' },
    { value: 2, label: '支付待确认' },
    { value: 3, label: '已支付' },
    { value: 4, label: '已完成' },
    { value: 5, label: '已关闭' },
]

/** 业务标签  1创培，2职培，3院校，4线下，5考评*/
export const BUSSINESS_TAGES_MAP = new Map([
    [1, '创培'],
    [2, '职培'],
    [3, '院校'],
    [4, '线下'],
    [5, '考评'],
])