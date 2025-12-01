// export enum COMPONENT_TYPE {
//     IMAGE = 'image',
//     SWIPER = 'swiper',
//     TAB = 'tab',
//     TITLE = 'title',
//     CONTENT = 'content',
// }

export enum LinkEnum {
    // 微页面
    MiCRO = 1,
    // 图文详情
    IMAGE_TEXT = 2,
    // 自定义链接
    CUSTOM_LINK = 3,
    // 图文列表
    IMAGE_LIST = 4,
}

import type {
    ADD_TYPE_ENUM,
    MOBILE_LAYOUT_ENUM,
} from '../../web/create/components/ActionBar/Course/const'
import type { COMPONENT_TYPE } from '../const'

export type ComponentsItem = {
    id: number
    type: 'group' | COMPONENT_TYPE[keyof COMPONENT_TYPE]
    title: string
    active?: boolean
    children?: ComponentsItem[]
    icon?: string
}

/** 标题使用
 * @description url内容
 * @params type 链接类型
 * @params label url对应的文本
 * @params code 内链对应code，外链对应url
 */
export type UrlItem = {
    type?: LinkEnum
    label?: string
    code?: string
}

/**  图文侧使用
 * @params image 链接地址
 * @params label type为导航时的导航标题
 * @params url url对象
 */
export type ImageItem = {
    image: string
    label: string
    url: UrlItem
    sort: number
    id: number
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
    categoryNames: string[]
    categoryNameList: string[]
    code: string
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

/**
 * @enum ITEM_MODE
 * @DEFAULT 默认大小
 * @LARGER_IMAGE 大图模式
 */
export enum ITEM_MODE {
    DEFAULT = 'default',
    LARGER_IMAGE = 'large_image',
}

/**
 * @enum ADD_RULE
 * @DEFAULT 全部图文
 * @CUSTOM 手动选择
 * @BY_CATEGORY 按分类
 * @BY_JOB_CATEGORY 按职业工种等级
 * @BY_LESSON 按课程
 */
export enum ADD_RULE {
    DEFAULT = 'default',
    CUSTOM = 'custom',
    BY_CATEGORY = 'by_category',
    BY_JOB_CATEGORY = 'by_job_category',
    BY_LESSON = 'by_lesson',
}

// 组件背景设置
export enum BACKGROUND_TYPE_ENUM {
    // 无背景
    NONE = 'none',
    // 纯色
    COLOR = 'color',
    // 图片背景
    IMAGE = 'image',
}

/**
 * @param type 组件类型
 * @param direction 图片类型排布方向
 * @param rule 图文类型添加规则
 * @param list 图片、轮播、导航数据列表
 * @param label 标题栏文本
 * @param url url对象列表
 * @param content 内容数据列表
 * @param active 选中状态
 * @param sort 排序
 * @param hasLink 标题是否带入口
 * @param {string[]} codes 图文唯一标识
 * @param {number} selectMode 添加方式（与rule重复，检查使用范围，尽量使用rule）
 * @param {LAYOUT_STYLE} layoutStyle 展示样式
 * @param {string[]} selectCategory 选择的职业工种等级（课程组件、计划公示组件和认定结果组件公用）
 * @param {number} showLine 展示几行
 * @param {ITEM_MODE} itemMode 列表项展示模式（目前支持：默认、大图）
 * @param {Direction} contentDirection 图片与文字排布方向
 * @param {number} paddingTop 组件的上间距
 * @param {number} paddingBottom 组件的下间距
 * @param {number} imageMargin 图片组件：图片与图片之间的间距
 * @param {BACKGROUND_TYPE_ENUM} backgroundType 组件背景设置
 * @param {string} backgroundImage 组件背景图片
 * @param {string} backgroundColor 组件背景色
 *
 */
export type PreviewItem = {
    id?: number
    name?: string // 组件标题
    type: COMPONENT_TYPE
    direction?: 'horizontal' | 'vertical'
    fillMethod?: 'cover' | 'space'
    rule?: ADD_RULE | ADD_TYPE_ENUM
    courseList?: any[]
    list?: ImageItem[]
    label?: string
    url?: UrlItem
    content?: any[]
    active?: boolean
    sort?: number
    hasLink?: boolean
    codes?: string[]
    selectMode?: number // 1默认选择 2手动选择
    layoutStyle?: LAYOUT_STYLE | MOBILE_LAYOUT_ENUM
    selectCategory?: string[] | { id: number; name: string }[]
    showLine?: number
    itemMode?: ITEM_MODE
    contentDirection?: Direction
    // 组件的间距
    paddingTop?: number
    paddingBottom?: number
    imageMargin?: number
    // 组件背景
    backgroundType?: BACKGROUND_TYPE_ENUM
    backgroundColor?: string
    backgroundImage?: string
    /** 客服展示是否固定 兼容拖拽定位问题 */
    fixed?: boolean
}

export interface Data {
    code: string
    organizationCode: string
    name: string
    status: number
    publishTime: number
    isEdit: number
    preDefineMicropageCode: string
    readonly: number
    customContent: string
    isTabBar: number
}

export interface paramsType {
    name: string
    status: string | number
}

// --------------
export interface ItemType {
    code: string
    customContent: string
    isPreDefine: number
    name: string
    organizationCode: string
    preDefineMicropageCode: string
    publishTime: number
    readonly: number
    status: number
    isEdit: number
}

/**
 * @enum Direction
 * @HORIZONTAL 横排
 * @VERTICAL 竖排
 * @description 排布方向
 */
export enum Direction {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

/**
 * @interface PTLessonItem
 * @param {'pc' | 'mobile'} type 使用的终端
 * @param {number} numWithOneLine 一行展示的个数
 * @param {'default' | 'large'} mode 普通模式还是大图模式
 * @param {number} contentDirection 图片与文字排布方向
 * @param {string} image 图片链接
 * @param {string} title 标题
 * @param {string | number} price 价格
 * @param {string | number} lessonTime 课时
 * @param {string} url 跳转地址
 * @param {any} data 完整课程数据
 * @description 列表课程组件
 */
export interface PTLessonItem {
    type: 'pc' | 'mobile'
    numWithOneLine?: LAYOUT_STYLE
    mode: 'default' | 'large'
    contentDirection: Direction
    image: string
    title: string
    price: string | number
    lessonTime: string | number
    url?: string
    data?: any
}
