/**
 * 学生状态枚举
 */
export enum STUDENT_STATUS {
    /** 禁用 */
    DISABLED = 0,
    /** 启用 */
    ENABLED = 1,
}

/**
 * 证件类型枚举
 */
export enum CERTIFICATE_TYPE {
    /** 身份证 */
    ID_CARD = 1,
    /** 护照 */
    PASSPORT = 2,
    /** 其他 */
    OTHER = 3,
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
