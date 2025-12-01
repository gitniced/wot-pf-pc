export enum LinkEnum {
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
    // 考试评价 我的考试
    COGN_EXAM = 7,
    // 评价计划列表
    EVALUATION_PLAN = 8,
    // 认定结果列表
    IDENTIFICATION_RESULT_LIST = 12,
    // 认定结果详情
    IDENTIFICATION_RESULT_DETAIL = 13,
    // 我的成绩
    MY_SCORE = 28,
    // 我的证书
    MY_CERTIFICATE = 29,
    //计划公示列表
    PLAN_FORMULA_LIST = 14,
    //计划公示详情
    PLAN_FORMULA_DETAIL = 15,
    //考试意向报名
    INTENTION = 9,
    // 在线报名
    ONLINE_REGISTRATION = 10,
    // 我的报名
    MY_ENROLLMENT = 11,
    // 全部报名列表
    ALL_ENROLL_LIST = 20,
    // 课程中心
    COURSE_CENTER = 16,
    // 课程详情
    COURSE_DETAIL = 17,
    // 我的班级
    MY_CLASS = 18,
    /**  图文分类  */
    IMAGE_CATEGORY = 19,
    /**  练习列表  */
    PRACTICE_LIST = 23,
    /**  练习详情  */
    PRACTICE_DETAILS = 21,
    /**  我的练习  */
    MY_PRACTICE = 22,
    /**  合格证书  */
    CERTIFICATE_OF_QUALITY = 24,
    /**  培训 证书查询  */
    CERTIFICATE_QUERY = 25,
    /**  报名详情  */
    REGISTRATION_DETAILS_PAGE = 26,
    /**  报名项目列表  */
    REGISTRATION_PROJECT_LIST = 27,
    /**  学习平台  */
    STUDY_PLATFORM_MY_CERTIFICATE = 28,
    // 招生主页
    ADMISSIONS = 30,
}

export type urlItem = {
    type?: LinkEnum
    label?: string
    code?: string
}
export type LinkProps = {
    value?: urlItem
    onChange?: (value: urlItem) => void
    stylesName?: string //样式是 center 还是flex-start
    noLink?: boolean //需不需要显示选择链接选项
    onlyWeiLink?: boolean //只显示微页面
    type?: 'pc' | 'mobile'
    list: any //选择跳转的数据
    powerId?: number | string //权限id  通过 powerId 是否存在于permissionIdList
}

export interface RESTYPE {
    alias?: string
    children?: []
    key: string
    operate?: boolean
    route: string
    title?: string
}

export interface MenuItem {
    key: string
    label: JSX.Element
    url: string
    children?: MenuItem[]
}

export type MenuItemVoid = (
    clickLink: (e: any) => void,
    menuData: {
        evaluateMenuList: RESTYPE[]
        trainingMenuList: RESTYPE[]
        practiceMenuList: RESTYPE[]
        enrollMenuList: RESTYPE[]
        studyMenuList: RESTYPE[]
    },
) => MenuItem[]

//报名渠道  1站点门户 2机构门户 3报名链接 4推广二维码 5推广海报
export enum ENROLL_CHANNEL {
    SITE = 1,
    ORGANIZATION = 2,
    LINK = 3,
    QRCODE = 4,
    POSTER = 5,
}

export const ENROLL_CHANNEL_ENUM = {
    [ENROLL_CHANNEL.SITE]: 'site',
    [ENROLL_CHANNEL.ORGANIZATION]: 'organization',
    [ENROLL_CHANNEL.LINK]: 'link',
    [ENROLL_CHANNEL.QRCODE]: 'qrcode',
    [ENROLL_CHANNEL.POSTER]: 'poster',
}
