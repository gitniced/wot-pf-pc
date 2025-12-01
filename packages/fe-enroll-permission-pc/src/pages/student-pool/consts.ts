export enum CERTIFICATE_TYPE {
    ID_CARD = 1,
    PASSPORT,
    OTHER,
}
export const CERTIFICATE_TYPE_TEXT: Record<number, string> = {
    [CERTIFICATE_TYPE.ID_CARD]: '居民身份证',
    [CERTIFICATE_TYPE.PASSPORT]: '护照',
    [CERTIFICATE_TYPE.OTHER]: '其他',
}

// 证件类型
export enum CARD_NUMBER_TYPE {}

export enum TYPE_ENUM {
    ORG = 1, // 机构   为机构的时候没有时间
    EVALUATE = 2, // 评价计划
    TRAIN = 3, //班级报名
    TRAINING_CLASS = 4, //培训班级
    CAREER = 5, // 职业
    SKILLS_COMPETITION = 6, // 技能竞赛
    COMMON = 8, //通用 8
    EVENTS = 7, //活动 7
    COURSE_APPLY = 9, //课程报名 9
}

export const TYPE_TAG: Record<string, string> = {
    [TYPE_ENUM.ORG]: '机构',
    [TYPE_ENUM.EVALUATE]: '评价计划',
    [TYPE_ENUM.TRAIN]: '班级报名',
    [TYPE_ENUM.TRAINING_CLASS]: '培训班级',
    [TYPE_ENUM.CAREER]: '职业',
    [TYPE_ENUM.SKILLS_COMPETITION]: '技能竞赛',
    [TYPE_ENUM.COMMON]: '通用',
    [TYPE_ENUM.EVENTS]: '活动',
    [TYPE_ENUM.COURSE_APPLY]: '课程报名',
}

/** 后端返回的是字符串 转换成数字   */
export const TYPE_TAG_TRANSFORMED: Record<string, number> = {
    ORGANIZATION: TYPE_ENUM.ORG,
    REVIEWS_PLAN: TYPE_ENUM.EVALUATE,
    TRAINING_PLAN: TYPE_ENUM.TRAIN,
    TRAINING_CLASS: TYPE_ENUM.TRAINING_CLASS,
    CAREER: TYPE_ENUM.CAREER,
    SKILLS_COMPETITION: TYPE_ENUM.SKILLS_COMPETITION,
    COMMON: TYPE_ENUM.COMMON,
    EVENTS: TYPE_ENUM.EVENTS,
    COURSE_APPLY: TYPE_ENUM.COURSE_APPLY,
}

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
export const STATUS_ACTIVE: Record<string, string> = {
    [StatusTypeNum.draft]: '未开始',
    [StatusTypeNum.release]: '报名中',
    [StatusTypeNum.end]: '已结束',
    [StatusTypeNum.close]: '已关闭',
}

// 1:初步报名 2:确认不参训 3:暂不参训 4:确认参训 5:已参训
export enum SignStatusEnum {
    /** 1 初步报名 */
    preliminary = 1,
    /** 2 确认不参训 */
    notAttend = 2,
    /** 3 暂不参训 */
    notNow = 3,
    /** 4 确认参训 */
    confirmAttend = 4,
    /** 5 已参训 */
    attended = 5,
}

export const SIGN_STATUS_TEXT: Record<number, string> = {
    [SignStatusEnum.preliminary]: '初步报名',
    [SignStatusEnum.notAttend]: '确认不参训',
    [SignStatusEnum.notNow]: '暂不参训',
    [SignStatusEnum.confirmAttend]: '确认参训',
    [SignStatusEnum.attended]: '已参训',
}

export const SIGN_STATUS_OPTIONS = [
    { value: '', label: '全部' },
    { value: SignStatusEnum.preliminary, label: SIGN_STATUS_TEXT[SignStatusEnum.preliminary] },
    { value: SignStatusEnum.notAttend, label: SIGN_STATUS_TEXT[SignStatusEnum.notAttend] },
    { value: SignStatusEnum.notNow, label: SIGN_STATUS_TEXT[SignStatusEnum.notNow] },
    { value: SignStatusEnum.confirmAttend, label: SIGN_STATUS_TEXT[SignStatusEnum.confirmAttend] },
    { value: SignStatusEnum.attended, label: SIGN_STATUS_TEXT[SignStatusEnum.attended] },
]

// 修正 SOURCE_TYPE_ENUM 和 TYPE_TAG 定义

export enum TYPE_TAG_ENUM {
    APPLY_CENTER = 1, // 报名活动
    ORGANIZATION = 2, // 机构报名
    PROFESSION = 3, // 职业报名
    TRAINING_CLASS = 4, // 培训班级
    EVALUATION_PLAN = 5, // 评价计划
    SKILLS_COMPETITION = 6, // 技能竞赛
    COURSE_STUDENTS = 7, // 班级学员
}

export const SOURCE_TYPE_TAG: Record<number, string> = {
    [TYPE_TAG_ENUM.APPLY_CENTER]: '报名活动',
    [TYPE_TAG_ENUM.ORGANIZATION]: '机构报名',
    [TYPE_TAG_ENUM.PROFESSION]: '职业报名',
    [TYPE_TAG_ENUM.TRAINING_CLASS]: '培训班级',
    [TYPE_TAG_ENUM.EVALUATION_PLAN]: '评价计划',
    [TYPE_TAG_ENUM.SKILLS_COMPETITION]: '技能竞赛',
    [TYPE_TAG_ENUM.COURSE_STUDENTS]: '班级学员',
}
