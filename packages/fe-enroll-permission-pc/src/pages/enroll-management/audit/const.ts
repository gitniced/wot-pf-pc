export enum statusEnum {
    ON = 1,
    OFF = 0,
}

export const STATUS_AUDIT: Record<string, string> = {
    [statusEnum.ON]: '开启',
    [statusEnum.OFF]: '关闭',
}
export type statusType = 'success' | 'default' | 'processing'

//审核状态：1通过，2拒绝
export enum AUDIT_STATUS {
    PASS = 1,
    REFUSE = 2,
}

export const statusMap: Record<string, statusType> = {
    [AUDIT_STATUS.PASS]: 'success',
    [AUDIT_STATUS.REFUSE]: 'default',
}

export const STATUS_AUDIT_TEXT: Record<string, string> = {
    [AUDIT_STATUS.PASS]: '通过',
    [AUDIT_STATUS.REFUSE]: '未通过',
}

// 1男  2女
export enum sexEnum {
    MAN = 1,
    WOMAN = 2,
}

export const SEX_TEXT: Record<string, string> = {
    [sexEnum.MAN]: '男',
    [sexEnum.WOMAN]: '女',
}

/**  审核状态 报名状态：1待审核、2未缴费、3过期未缴费、4报名成功、5报名失败、6已退费  7 已取消

 */
export enum AUDIT_STATUS_ENUM {
    WAIT = 1,
    UNPAID = 2,
    EXPIRED = 3,
    SUCCESS = 4,
    FAIL = 5,
    REFUND = 6,
    CANCEL = 7,
}

/**用户基本信息字段别名 */
export enum INFO_ENUM {
    /**姓名: */
    NAME = 'NAME',
    /**性别: */
    GENDER = 'GENDER',
    /**证件类型: */
    TYPE_OF_CERTIFICATE = 'TYPE_OF_CERTIFICATE',
    /**身份证号: */
    ID_NUMBER = 'ID_NUMBER',
    /**手机号: */
    PHONE_NUMBER = 'PHONE_NUMBER',
    /**出生年月: */
    DATE_OF_BIRTH = 'DATE_OF_BIRTH',
}

export enum ENROLL_TABLE_LIST_ENUM {
    /**报名信息: */
    ENROLL = 1,
    /**基本信息: */
    BASE,
    /**工作信息: */
    WORK,
    /**原证书信息: */
    BOOK,
    /**电子照片: */
    PHOTO,
    /**附件材料: */
    ATTACHMENT_DOC,
    /** 现职称: */
    PROFESSIONAL,
}
export const ENROLL_TABLE_LIST_ENUM_NAME = {
    /**基本信息: */
    [ENROLL_TABLE_LIST_ENUM.BASE]: '基本信息',
    /**报名信息: */
    [ENROLL_TABLE_LIST_ENUM.ENROLL]: '报名信息',
    /**工作信息: */
    [ENROLL_TABLE_LIST_ENUM.WORK]: '工作信息',
    /**原证书信息: */
    [ENROLL_TABLE_LIST_ENUM.BOOK]: '原证书信息',
    /**电子照片: */
    [ENROLL_TABLE_LIST_ENUM.PHOTO]: '电子照片',
    /**附件材料: */
    [ENROLL_TABLE_LIST_ENUM.ATTACHMENT_DOC]: '附件材料',
    /**现职称: */
    [ENROLL_TABLE_LIST_ENUM.PROFESSIONAL]: '职称证书信息',
}

/**报名表展示项 */
export const ENROLL_TABLE_LIST = [
    ENROLL_TABLE_LIST_ENUM.ENROLL,
    ENROLL_TABLE_LIST_ENUM.BASE,
    ENROLL_TABLE_LIST_ENUM.WORK,
    ENROLL_TABLE_LIST_ENUM.BOOK,
    ENROLL_TABLE_LIST_ENUM.PHOTO,
    ENROLL_TABLE_LIST_ENUM.ATTACHMENT_DOC,
    ENROLL_TABLE_LIST_ENUM.PROFESSIONAL,
]

//	活动状态，1未开始、2报名中、3已结束、4已关闭
export enum StatusTypeNum {
    /**1未开始 */
    draft = 1,
    /**2报名中 */
    release = 2,
    /**3已结束 */
    end = 3,
    /**4已关闭 */
    close = 4,
}
export const statusActive: Record<string, statusType> = {
    [StatusTypeNum.draft]: 'default',
    [StatusTypeNum.release]: 'processing',
    [StatusTypeNum.end]: 'default',
    [StatusTypeNum.close]: 'default',
}
export const STATUS_ACTIVE: Record<string, string> = {
    [StatusTypeNum.draft]: '未开始',
    [StatusTypeNum.release]: '报名中',
    [StatusTypeNum.end]: '已结束',
    [StatusTypeNum.close]: '已关闭',
}
