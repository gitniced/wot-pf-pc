/**
 * 课程状态枚举
 */
export enum COURSE_STATUS {
    /** 设计中 */
    DESIGNING = 1,
    /** 使用中 */
    IN_USE = 2,
}

/**
 * 排序规则枚举
 */
export enum ORDER_RULE {
    /** 升序 */
    ASC = 'ASC',
    /** 降序 */
    DESC = 'DESC',
}

/**
 * 培养层级映射
 */
export const TRAIN_LEVEL_MAP: Record<number, string> = {
    10: '中级',
    20: '高级',
    30: '预备技师',
}

/**
 * 课程状态映射
 */
export const COURSE_STATUS_MAP: Record<number, { text: string; color: string }> = {
    [COURSE_STATUS.DESIGNING]: { text: '设计中', color: 'blue' },
    [COURSE_STATUS.IN_USE]: { text: '使用中', color: 'green' },
}
