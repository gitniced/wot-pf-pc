export const initSearchParams = {
    applyTimeEnd: undefined,
    applyTimeStart: undefined,
    order: 'ASC',
    orderBy: 'createdAt',
    pageNo: 1,
    pageSize: 10,
    userCode: '',
    userIdentify: '',
    userMobile: '',
    userName: '',
    applyTime: [],
}
export enum TYPE_ENUM {
    ORG = 1, // 机构   为机构的时候没有时间
    EVALUATE = 2, // 评价计划
    TRAIN = 3, //班级报名
    TRAINING_CLASS = 4, //培训班级
    CAREER = 5, // 职业
    COMPETITION = 6, // 技能竞赛
    EVENTS = 7,
    COMMON = 8, // 通用
    COURSE_APPLY = 9, // 课程
}

export const TYPE_TIME: Record<string, string> = {
    [TYPE_ENUM.EVALUATE]: '认定考试时间',
    [TYPE_ENUM.TRAIN]: '培训时间',
    [TYPE_ENUM.TRAINING_CLASS]: '培训时间',
    [TYPE_ENUM.COMPETITION]: '技能竞赛时间',
    [TYPE_ENUM.EVENTS]: '活动时间',
    [TYPE_ENUM.COMMON]: '活动时间',
    [TYPE_ENUM.COURSE_APPLY]: '活动时间',
}

export const TYPE_TAG: Record<string, string> = {
    [TYPE_ENUM.ORG]: '机构名称',
    [TYPE_ENUM.EVALUATE]: '评价计划',
    [TYPE_ENUM.TRAIN]: '班级报名',
    [TYPE_ENUM.TRAINING_CLASS]: '培训班级',
    [TYPE_ENUM.CAREER]: '职业',
    [TYPE_ENUM.COMPETITION]: '技能竞赛',
    [TYPE_ENUM.EVENTS]: '活动',
    [TYPE_ENUM.COMMON]: '通用',
    [TYPE_ENUM.COURSE_APPLY]: '课程报名',
}

export enum STATUSENUM {
    /**
     * 所有
     */
    ALL_STATUS = '',
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
     *  已取消
     */
    REFUNDED = '7',
}

export const ENROLL_STATE_OPTIONS = [
    {
        label: '待审核',
        value: STATUSENUM.PENDING_REVIEW,
    },
    {
        label: '未缴费',
        value: STATUSENUM.UNPAID_FEES,
    },
    {
        label: '报名成功',
        value: STATUSENUM.SUCCESS,
    },
    {
        label: '报名失败',
        value: STATUSENUM.FAIL,
    },
    {
        label: '过期未缴费',
        value: STATUSENUM.OVERDUE_UNPAID_FEES,
    },
    {
        label: '已取消',
        value: STATUSENUM.REFUNDED,
    },
]

export type statusType = 'success' | 'default' | 'processing' | 'error' | 'warning'
export const REGISTRATION_STATUS: Record<string, statusType> = {
    [STATUSENUM.ALL_STATUS]: 'default',
    [STATUSENUM.PENDING_REVIEW]: 'warning',
    [STATUSENUM.UNPAID_FEES]: 'default',
    [STATUSENUM.SUCCESS]: 'success',
    [STATUSENUM.FAIL]: 'error',
    [STATUSENUM.OVERDUE_UNPAID_FEES]: 'default',
    [STATUSENUM.REFUNDED]: 'default',
}

export const REGISTRATION_STATUS_TEXT: Record<string, string> = {
    [STATUSENUM.ALL_STATUS]: '所有',
    [STATUSENUM.PENDING_REVIEW]: '待审核',
    [STATUSENUM.UNPAID_FEES]: '未缴费',
    [STATUSENUM.SUCCESS]: '报名成功',
    [STATUSENUM.FAIL]: '报名失败',
    [STATUSENUM.OVERDUE_UNPAID_FEES]: '过期未缴费',
    [STATUSENUM.REFUNDED]: '已取消',
}

export const ENROLL_CHANNEL_OPTIONS = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '站点门户',
        value: 1,
    },
    {
        label: '机构门户',
        value: 2,
    },
    {
        label: '报名链接',
        value: 3,
    },
    {
        label: '推广二维码',
        value: 4,
    },
    {
        label: '推广海报',
        value: 5,
    },
]

export enum REGISTRATION_LOCATION {
    SITE_PORTAL = 1,
    ORGANIZATION_PORTAL = 2,
    REGISTRATION_LINK = 3,
    REGISTRATION_QR_CODE = 4,
    REGISTRATION_POSTER = 5,
}

export const ENROLL_CHANNEL: Record<string, string> = {
    [REGISTRATION_LOCATION.SITE_PORTAL]: '站点门户',
    [REGISTRATION_LOCATION.ORGANIZATION_PORTAL]: '机构门户',
    [REGISTRATION_LOCATION.REGISTRATION_LINK]: '报名链接',
    [REGISTRATION_LOCATION.REGISTRATION_QR_CODE]: '报名二维码',
    [REGISTRATION_LOCATION.REGISTRATION_POSTER]: '报名海报',
}

export const DEFAULT_IMG =
    'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/4.%E6%95%B0%E6%8D%AE%E5%B1%95%E7%A4%BA%EF%BC%8F7.Avatar%E5%A4%B4%E5%83%8F%EF%BC%8F%E4%BA%AE%E8%89%B2%EF%BC%8F%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F%402x.png'

// ApplyChannel
export enum APPLY_CHANNEL_ENUM {
    SITE = 1,
}

export const APPLY_CHANNEL_TEXT: Record<string, number> = {
    site: APPLY_CHANNEL_ENUM.SITE,
}

export enum ENROLL_STATUS_ENUM {
    /**全部 */
    ALL = 'all',
    /**待审核 */
    WAIT_AUDIT = 'wait_audit',
    /**待支付 */
    WAIT_PAY = 'wait_pay',
    /**报名成功 */
    SUCCESS = 'success',
    /**报名失败 */
    FAIL = 'fail',
    /**报名未缴费 */
    UN_PAY = 'un_pay',
    /**已取消 */
    BACK_PAY = 'back_pay',
}

export const ENROLL_STATUS: Record<string, string> = {
    [ENROLL_STATUS_ENUM.ALL]: STATUSENUM.ALL_STATUS,
    [ENROLL_STATUS_ENUM.WAIT_AUDIT]: STATUSENUM.PENDING_REVIEW,
    [ENROLL_STATUS_ENUM.WAIT_PAY]: STATUSENUM.UNPAID_FEES,
    [ENROLL_STATUS_ENUM.SUCCESS]: STATUSENUM.SUCCESS,
    [ENROLL_STATUS_ENUM.FAIL]: STATUSENUM.FAIL,
    [ENROLL_STATUS_ENUM.UN_PAY]: STATUSENUM.OVERDUE_UNPAID_FEES,
    [ENROLL_STATUS_ENUM.BACK_PAY]: STATUSENUM.REFUNDED,
}

/**活动类型 */
export enum EVENT_KIND_ENUM {
    /**机构 */
    ORGANIZATION = 1,
    /**评价计划 */
    REVIEWS_PLAN = 2,
    /**班级报名 */
    TRAIN_PLAN = 3,
    /**班级 */
    TRAIN_CLASS = 4,
    /**职业 */
    CAREER = 5,
}

/**  报名方式  */
export const REGISTRATION_METHOD_OPTIONS = [
    {
        label: '全部',
        value: '',
    },
    {
        label: '个人报名',
        value: 1,
    },
    {
        label: '批量报名',
        value: 2,
    },
]

export enum REGISTRATION_METHOD_ENUM {
    /**个人报名 */
    PERSONAL = 1,
    /**批量报名 */
    BATCH = 2,
}

export const REGISTRATION_METHOD_MAP: Record<string, string> = {
    [REGISTRATION_METHOD_ENUM.PERSONAL]: '个人报名',
    [REGISTRATION_METHOD_ENUM.BATCH]: '批量报名',
}
