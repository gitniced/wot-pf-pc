// 练习状态
export enum PRACTICE_STATE_ENUM {
    /**  // 未开始  */
    NOT_START,
    /**  // 已结束  */
    FINISHED,
    /**  // 练习中  */
    ON_GOING,
}

export const PRACTICE_STATE_TEXT: Record<number, string> = {
    [PRACTICE_STATE_ENUM.NOT_START]: '未开始',
    [PRACTICE_STATE_ENUM.ON_GOING]: '练习中',
    [PRACTICE_STATE_ENUM.FINISHED]: '已结束',
}
