export const initSearchParams = {
    pageNo: 1,
    pageSize: 10,
}

export enum TYPE_ENUM {
    ORG = 1, // 机构   为机构的时候没有时间
    EVALUATE = 2, // 评价计划
    TRAIN = 3, //班级报名
}

export const TYPE_TIME: Record<string, string> = {
    [TYPE_ENUM.EVALUATE]: '认定时间',
    [TYPE_ENUM.TRAIN]: '培训时间',
}

export const TYPE_TAG: Record<string, string> = {
    [TYPE_ENUM.ORG]: '机构',
    [TYPE_ENUM.EVALUATE]: '评价计划',
    [TYPE_ENUM.TRAIN]: '班级报名',
}

export enum STATUSENUM_MY_ENROLLMENT {
    /**
     * 所有
     */
    ALL_STATUS = '0',
    /**
     * 待审核
     */
    PENDING_REVIEW = '1',
    /**
     * 未缴费(2)
     */
    UNPAID_FEES = '2',
    /**
     *  报名成功
     */
    SUCCESS = '4',
    /**
     *  报名失败
     */
    FAIL = '5',
    /**
     *  过期未缴费
     */
    OVERDUE_UNPAID_FEES = '3',
    /**
     *  已退费
     */
    REFUNDED = '6',
    /**
     *  已取消
     */
    CANCEL = '7',
}

export type STATUS_TYPE = 'success' | 'default' | 'processing' | 'error' | 'warning'
export const REGISTRATION_STATUS: Record<string, STATUS_TYPE> = {
    [STATUSENUM_MY_ENROLLMENT.ALL_STATUS]: 'default',
    [STATUSENUM_MY_ENROLLMENT.PENDING_REVIEW]: 'warning',
    [STATUSENUM_MY_ENROLLMENT.UNPAID_FEES]: 'default',
    [STATUSENUM_MY_ENROLLMENT.SUCCESS]: 'success',
    [STATUSENUM_MY_ENROLLMENT.FAIL]: 'error',
    [STATUSENUM_MY_ENROLLMENT.OVERDUE_UNPAID_FEES]: 'default',
    [STATUSENUM_MY_ENROLLMENT.REFUNDED]: 'default',
    [STATUSENUM_MY_ENROLLMENT.CANCEL]: 'default',
}
export const REGISTRATION_STATUS_TEXT: Record<string, string> = {
    [STATUSENUM_MY_ENROLLMENT.ALL_STATUS]: '所有',
    [STATUSENUM_MY_ENROLLMENT.PENDING_REVIEW]: '待审核',
    [STATUSENUM_MY_ENROLLMENT.UNPAID_FEES]: '未缴费',
    [STATUSENUM_MY_ENROLLMENT.SUCCESS]: '报名成功',
    [STATUSENUM_MY_ENROLLMENT.FAIL]: '报名失败',
    [STATUSENUM_MY_ENROLLMENT.OVERDUE_UNPAID_FEES]: '过期未缴费',
    [STATUSENUM_MY_ENROLLMENT.REFUNDED]: '已退费',
    [STATUSENUM_MY_ENROLLMENT.CANCEL]: '已取消',
}
