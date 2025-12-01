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
    /** 按鉴定点组卷 */
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
