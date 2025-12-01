export type ComponentsItem = {
    id: number
    type: 'group' | PC_COMPONENT_TYPE[keyof PC_COMPONENT_TYPE]
    title: string
    active?: boolean
    children?: ComponentsItem[]
    icon?: string
}

/** 自定义链接
 * @description url内容
 * @params type 链接类型
 * @params code 内链对应code，外链对应url
 * @params label url对应的文本
 */
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
    MY_EXAM = 7,
    // 评价计划列表
    EVALUATION_PLAN = 8,
    //考试意向报名
    INTENTION = 9,
    // 在线报名
    ONLINE_REGISTRATION = 10,
    // 我的报名
    MY_ENROLLMENT = 11,
    // 认定结果列表
    IDENTIFICATION_RESULT_LIST = 12,
    // 认定结果详情
    IDENTIFICATION_RESULT_DETAIL = 13,
    //计划公示列表
    PLAN_FORMULA_LIST = 14,
    //计划公示详情
    PLAN_FORMULA_DETAIL = 15,
    /**课程详情*/
    COURSE_DETAIL = 17,
    /**  练习列表  */
    PRACTICE_LIST = 23,
    /**  练习详情  */
    PRACTICE_DETAILS = 21,
    /**  我的练习  */
    MY_PRACTICE = 22,
    /**我的班级*/
    MY_CLASS = 18,
    /**  图文分类  */
    IMAGE_CATEGORY = 19,
    /**  报名详情  */
    REGISTRATION_DETAILS_PAGE = 26,
    /**  报名项目列表  */
    REGISTRATION_PROJECT_LIST = 27,
}

/** 标题使用
 * @description url内容
 * @params type 链接类型
 * @params code 内链对应code，外链对应url
 * @params label url对应的文本
 */
export type UrlItem = {
    type: LinkEnum
    label: string
    code?: string
}

/**  图文侧使用
 * @params image 链接地址
 * @params label type为导航时的导航标题
 * @params url url对象
 */
export type ImageItem = {
    image: string
    label?: string
    url?: UrlItem
    sort?: number
    id?: number
}

/**
 * @params key 分类key
 * @params label 分类名称
 */
export type TagItem = {
    key: string
    label: string
}

/** 图文内容
 * @params id
 * @params image 图片地址
 * @params label 标题
 * @params content 内容
 * @params time 时间
 * @params url url对象
 * @params tags 分类列表
 */
export type ContentItem = {
    // image: string
    // label: string
    // time: number
    // url: UrlItem
    // tags: TagItem[]
    // image: string
    // label: string
    // categoryCodeList: TagItem[]
    id: number
    content: string
    key: number
    title: string
    publishTime: number
    cover: string
    categoryCodeList: string[]
}

/**
 * @params type 组件类型
 * @params direction 图片类型排布方向
 * @params rule 图文类型添加规则
 * @params list 图片、轮播、导航数据列表
 * @params label 标题栏文本
 * @params url url对象列表
 * @params content 内容数据列表
 * @params active 选中状态
 * @params sort 排序
 */
export type PreviewItem = {
    id?: number
    type: PC_COMPONENT_TYPE
    direction?: 'horizontal' | 'vertical'
    rule?: 'default' | 'custom'
    list?: ImageItem[]
    label?: string
    url?: UrlItem
    // content?: ContentItem[]
    content?: any[]
    active?: boolean
    sort?: number
    codes: string[]
}

export enum IMAGE_TEXT_STATUS {
    // 草稿
    draft = 0,
    // 发布
    show = 1,
}

export type ImageTextItemType = {
    categoryCodeList?: number[]
    categoryNameList?: string[]
    imageTextCategoryNameList?: string[]
    code?: string
    content?: string
    cover?: string
    organizationCode?: string
    publishTime?: number
    sort?: number
    status?: IMAGE_TEXT_STATUS
    title?: string
    isTabBar?: boolean
}

export enum PC_COMPONENT_TYPE {
    IMAGE = 'image',
    SWIPER = 'swiper',
    TAB = 'tab',
    TITLE = 'title',
    // 新的图文另外类型
    IMAGE_TEXTS = 'image_text',
    // 旧的图文类型(兼容老数据)
    CONTENT = 'content',
    IDENTIFY_RESULT = 'identification_result',
    PLAN_FORMULA = 'plan_formula',
    // 课程组件
    COURSE = 'course',
    /**  练习组件  */
    PRACTICE = 'practice',
    ENROLL_CARD = 'enroll_card',
    /**  班级  */
    CLASS = 'class',
}

// 展示样式单选框的枚举
export enum PC_LAYOUT_ENUM {
    // 竖向一行5个
    VERTICAL_FIVE = 'vertical_5',
    // 竖向一行4个
    VERTICAL_FOUR = 'vertical_4',
    // 横向一行2个
    HORIZONTAL_TWO = 'horizontal_2',
    // 横向一行3个
    HORIZONTAL_THREE = 'horizontal_3',
}


/**
 * @enum LayoutStyle
 * @DEFAULT 列表 一行1个
 * @TWO_IN_ROW 一行2个
 * @THREE_IN_ROW 一行3个
 * @FOUR_IN_ROW 一行4个
 * @FIVE_IN_ROW 一行5个
 * @IMAGE_LEFT_TITLE_RIGHT 左图右标题
 * @INFINITY 横向滑动
 */
export enum LAYOUT_STYLE {
    DEFAULT = 1,
    TWO_IN_ROW,
    THREE_IN_ROW,
    FOUR_IN_ROW,
    FIVE_IN_ROW,
    IMAGE_LEFT_TITLE_RIGHT = 'image_title',
    INFINITY = 'infinity',
}