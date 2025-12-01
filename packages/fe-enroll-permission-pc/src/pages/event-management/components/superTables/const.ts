export enum statusEnum {
    draft = 0,
    release = 1,
    end = 2,
}

export const STATUS_RELEASE: Record<string, string> = {
    [statusEnum.draft]: '关闭',
    [statusEnum.release]: '开启',
}

export type statusType = 'success' | 'default' | 'processing'
////是否开启审核：0否，1是   是否开启缴费：0否，1是
export const statusMap: Record<string, statusType> = {
    [statusEnum.draft]: 'default',
    [statusEnum.release]: 'success',
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

export const TYPE_TIME: Record<string, string> = {
    [TYPE_ENUM.EVALUATE]: '认定考试时间',
    [TYPE_ENUM.TRAIN]: '培训时间',
    [TYPE_ENUM.TRAINING_CLASS]: '培训时间',
    [TYPE_ENUM.SKILLS_COMPETITION]: '技能竞赛时间',
    [TYPE_ENUM.COMMON]: '活动时间',
    [TYPE_ENUM.EVENTS]: '活动时间',
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

export const OPTIONS = [
    {
        value: 1,
        label: '未开始',
    },
    {
        value: 2,
        label: '进行中',
    },
    {
        value: 3,
        label: '已结束',
    },
]

/**  发布状态  */
export enum RELEASE_STATUS {
    DRAFT = 0, // 未发布
    RELEASE = 1, // 已发布
}
export const RELEASE_STATUS_ACTIVE: Record<string, statusType> = {
    [RELEASE_STATUS.DRAFT]: 'default',
    [RELEASE_STATUS.RELEASE]: 'success',
}
export const RELEASE_STATUS_MAP: Record<string, string> = {
    [RELEASE_STATUS.DRAFT]: '未发布',
    [RELEASE_STATUS.RELEASE]: '已发布',
}
//发布状态 option
export const RELEASE_OPTIONS = [
    {
        value: '',
        label: '全部',
    },
    {
        value: 0,
        label: '未发布',
    },
    {
        value: 1,
        label: '已发布',
    },
]

//未发布 发布
export enum RELEASE_TYPE {
    CANCEL = 0, // 未发布
    RELEASE = 1, // 发布
}

// 1未开始 2报名中 3已结束

export enum STATUS_TYPE_ENUM {
    /**1 未开始*/
    DRAFT = 1,
    /**2 报名中*/
    RELEASE = 2,
    /**3 已结束*/
    END = 3,
    /**3 已关闭*/
    CLOSE = 4,
}

/** 组件类型枚举*/
export enum TYPE_ITEM_ENUM {
    /** 文本*/
    DEFAULT = 'default',
    /** 图片*/
    IMAGE = 'image',
    /** 时间*/
    TIME = 'time',
    /** 分类*/
    CATE = 'cate',
}

/** 组件类型*/
export const TYPE_ITEM: Record<string, string> = {
    [TYPE_ITEM_ENUM.DEFAULT]: 'default',
    [TYPE_ITEM_ENUM.IMAGE]: 'image',
    [TYPE_ITEM_ENUM.TIME]: 'time',
    [TYPE_ITEM_ENUM.CATE]: 'cate',
}
