/**
 * 教师状态枚举
 */
export enum TEACHER_STATUS {
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
 * 排序规则枚举
 */
export enum ORDER_RULE {
    /** 升序 */
    ASC = 'ASC',
    /** 降序 */
    DESC = 'DESC',
}
