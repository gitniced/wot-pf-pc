/** 创建卷库类型 */
export enum CREATE_VOLUME_LIBRARY_TYPE {
    /** 组卷 */
    COMPOSITION = 'template',
    /** 试卷 */
    TEST_PAPER = 'examine_create',
}
/** 组卷模板 */
export enum TEMPLATE_TYPE {
    /** 自有模板 */
    SELF = 'self',
    /** 站点模板 */
    SID = 'sid',
    /** 不使用模板 */
    NONE = 'none',
}
/** 组卷方式 */
export enum COMPOSITION_WAY {
    /** 按考评点组卷 */
    AUTHENTICATE = 'authenticate',
    /** 按题型组卷 */
    QUESTION_TYPE = 'questiontype',
    /** 套题组卷 */
    FROM_FILE = 'fromfile',
}
/** 分值设置 */
export enum SCORE_SETTING_TYPE {
    /** 按题型设置 */
    QUESTION_TYPE = 'questiontype',
    /** 单题独立设置 */
    SINGLE = 'single',
    /** 统一分值 */
    UNIFICATION = 'unification',
}
/** 试卷命题类型 */
export enum KP_PAPER_QUESTION {
    /** 指定题型题数 */
    COUNTRY = 1,
    /** 按规则随机抽取 */
    ORG = 2,
}

/** 题型结构 */
export enum QUESTION_STRUCTURE_TYPE {
    /** 指定题型题数 */
    QUESTION_TYPE = 'questiontype',
    /** 按规则随机抽取 */
    RULES = 'rules',
}
/** 是否随机生成试卷 */
export enum RANDOM_TEST_PAPER {
    /** 固定 */
    REGULAR = 0,
    /** 随机 */
    RANDOM = 1,
}

/** 组卷模版类型 */
export enum TEMPLATE_TYPE {
    /** 评价 */
    EVALUATE = 10,
    /** 竞赛 */
    COMPETITION = 40,
}
/** 易 */
export const EASY = 10
/** 较易 */
export const LITTLE_EASY = 20
/** 中等 */
export const MEDIUM = 30
/** 较难 */
export const LITTLE_HARD = 40
/** 难 */
export const HARD = 50

/** 难度等级映射 */
export const DIFFICULTY_LEVEL: Record<number, string> = {
    [EASY]: '易',
    [LITTLE_EASY]: '较易',
    [MEDIUM]: '中等',
    [LITTLE_HARD]: '较难',
    [HARD]: '难',
}
/** 随机考卷出题方式 */
export enum RANDOM_TEST_TYPE {
    /** 题型抽取题目 */
    FORM_TYPE = 0,
    /** 题目随机提醒 */
    FORM_QUESTION = 1,
}
