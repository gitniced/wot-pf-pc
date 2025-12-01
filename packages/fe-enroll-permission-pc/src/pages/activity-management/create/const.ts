/**  步骤条  */
export enum ACTIVITY_STEP_ENUM {
    FIRST = 0,
    SECOND = 1,
    THIRD = 2,
    FOUR = 3,
}

/**  活动形式 1线上 2线上 3线上+线下  */
export enum ACTIVITY_TYPE_ENUM {
    /** 1 线上  */
    ONLINE = 0,
    /** 2  线下  */
    OFFLINE = 1,
    /**  3 线上+线下  */
    ONLINE_OFFLINE = 2,
}

export const ACTIVITY_STEP_ENUM_MAP: Record<string, string> = {
    [ACTIVITY_STEP_ENUM.FIRST]: 'baseInfo',
    [ACTIVITY_STEP_ENUM.SECOND]: 'introduce',
    [ACTIVITY_STEP_ENUM.THIRD]: 'config',
}
