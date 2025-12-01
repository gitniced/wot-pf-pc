export enum TYPE_ENUM {
    ORG = 1, // 机构   为机构的时候没有时间
    EVALUATE = 2, // 评价计划
    TRAIN = 3, //培训计划
    TRAINING_CLASS = 4, //培训班级
    CAREER = 5, // 职业
    SKILLS_COMPETITION = 6, // 技能竞赛
    COMMON = 8, //通用 8
    EVENTS = 7, //活动 7
}

//	报名项目类型，1计划、2机构
export enum TYPE_ENUM_CODE {
    PLAN = 1, // 评价计划 培训计划
    ORG = 2, // 机构
}

/** 自定义链接
 * @description url内容
 * @params type 链接类型
 * @params code 内链对应code，外链对应url
 * @params label url对应的文本
 */
export enum LINK_ENUM_CENTER {
    // 微页面
    MiCRO = 1,
    // 图文详情
    IMAGE_TEXT = 2,
    // 自定义链接
    CUSTOM_LINK = 3,
    // 图文列表
    IMAGE_LIST = 4,
    // 考试评价 证书查询
    CERTIFICATE = 5,
    // 考试评价 成绩查询
    ACHIEVEMENT = 6,
    // 考试评价 认定考试
    COGN_EXAM = 7,
    // 评价计划列表
    EVALUATION_PLAN = 8,
    //考试意向报名
    INTENTION = 9,
    // 在线报名
    ONLINE_REGISTRATION = 10,
    // 我的报名
    MY_ENROLLMENT = 11,
    /**  图文分类  */
    IMAGE_CATEGORY = 19,
    // 认定结果列表
    IDENTIFICATION_RESULT_LIST = 12,
    // 认定结果详情
    IDENTIFICATION_RESULT_DETAIL = 13,
    //计划公示列表
    PLAN_FORMULA_LIST = 14,
    //计划公示详情
    PLAN_FORMULA_DETAIL = 15,
    // 课程中心
    COURSE_CENTER = 16,
    // 课程详情
    COURSE_DETAIL = 17,
    // 我的班级
    MY_CLASS = 18,
}

export const ENROLL_CHANNEL_TEXT: Record<string, number> = {
    site: 1,
    organization: 2,
    link: 3,
    qrcode: 4,
    poster: 5,
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
}
