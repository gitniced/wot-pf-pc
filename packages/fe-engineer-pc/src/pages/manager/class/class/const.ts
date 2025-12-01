/**
 * 班级状态枚举
 */
export enum CLASS_STATUS {
    /** 未开学 */
    NOT_STARTED = 0,
    /** 进行中 */
    IN_PROGRESS = 1,
    /** 已毕业 */
    GRADUATED = 2,
}

/**
 * 培养层级枚举
 */
export enum TRAIN_LEVEL {
    /** 中级技能 */
    INTERMEDIATE = 10,
    /** 高级技能层 */
    ADVANCED = 20,
    /** 预备技师 */
    TECHNICIAN = 30,
}

/**
 * 学制起点枚举
 */
export enum START_POINT {
    /** 初中起点 */
    JUNIOR_HIGH = 10,
    /** 高中起点 */
    SENIOR_HIGH = 20,
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
 * 班级状态映射
 */
export const CLASS_STATUS_MAP: Record<number, { text: string; color: string }> = {
    [CLASS_STATUS.NOT_STARTED]: { text: '未开学', color: 'default' },
    [CLASS_STATUS.IN_PROGRESS]: { text: '进行中', color: 'processing' },
    [CLASS_STATUS.GRADUATED]: { text: '已毕业', color: 'success' },
}

/**
 * 培养层级映射
 */
export const TRAIN_LEVEL_MAP: Record<number, string> = {
    [TRAIN_LEVEL.INTERMEDIATE]: '中级',
    [TRAIN_LEVEL.ADVANCED]: '高级',
    [TRAIN_LEVEL.TECHNICIAN]: '预备技师',
}

/**
 * 学制起点映射
 */
export const START_POINT_MAP: Record<number, string> = {
    [START_POINT.JUNIOR_HIGH]: '初中起点',
    [START_POINT.SENIOR_HIGH]: '高中起点',
}
