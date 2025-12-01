/** 自定义链接
 * @description url内容
 * @params type 链接类型
 * @params code 内链对应code，外链对应url
 * @params label url对应的文本
 */
export enum LinkEnum {
    /**微页面*/
    MiCRO = 1,
    /**图文详情*/
    IMAGE_TEXT = 2,
    /**自定义链接*/
    CUSTOM_LINK = 3,
    /**图文列表*/
    IMAGE_LIST = 4,
    /**考试评价 证书查询*/
    CERTIFICATE = 5,
    /**考试评价 成绩查询*/
    ACHIEVEMENT = 6,
    /**考试评价 认定考试*/
    COGN_EXAM = 7,
    /**评价计划列表*/
    EVALUATION_PLAN = 8,
    /**考试意向报名*/
    INTENTION = 9,
    /**在线报名*/
    ONLINE_REGISTRATION = 10,
    /**我的报名*/
    MY_ENROLLMENT = 11,
    /**认定结果列表*/
    IDENTIFICATION_RESULT_LIST = 12,
    /**认定结果详情*/
    IDENTIFICATION_RESULT_DETAIL = 13,
    /**计划公示列表*/
    PLAN_FORMULA_LIST = 14,
    /**计划公示详情*/
    PLAN_FORMULA_DETAIL = 15,
    /**课程中心*/
    COURSE_CENTER = 16,
    /**课程详情*/
    COURSE_DETAIL = 17,
    /**我的班级*/
    MY_CLASS = 18,
    /**  图文分类  */
    IMAGE_CATEGORY = 19,
    /**  练习列表  */
    PRACTICE_LIST = 23,
    /**  练习详情  */
    PRACTICE_DETAILS = 21,
    /**  我的练习  */
    MY_PRACTICE = 22,
    /**  报名详情  */
    REGISTRATION_DETAILS_PAGE = 26,
    /**  报名项目列表  */
    REGISTRATION_PROJECT_LIST = 27,
}
