import type { PreviewItem } from './utils/interface'
import { LAYOUT_STYLE } from './utils/interface.d'
/**
 * 组件类型的枚举
 */
export enum COMPONENT_TYPE {
    IMAGE = 'image',
    SWIPER = 'swiper',
    TAB = 'tab',
    TITLE = 'title',
    IMAGE_TEXT = 'image_text',
    CONTENT = 'content',
    IDENTIFY_RESULT = 'identification_result',
    PLAN_FORMULA = 'plan_formula',
    COURSE = 'course',
    PRACTICE = 'practice',
    // 报名
    ENROLL_CARD = 'enroll_card',
    /**  班级  */
    CLASS = 'class',
    /**  客服  */
    CUSTOMER = 'contact_customer_service',
}

// 保存草稿或者发布
export enum SAVE_TYPE {
    DRAFT = 0,
    RELEASE = 1,
}

/**
 *  组件名称
 */
export const COMPONENT_TYPE_NAME: Record<COMPONENT_TYPE, string> = {
    [COMPONENT_TYPE.IMAGE]: '图片',
    [COMPONENT_TYPE.SWIPER]: '轮播',
    [COMPONENT_TYPE.TAB]: '图文导航',
    [COMPONENT_TYPE.TITLE]: '标题栏',
    [COMPONENT_TYPE.IMAGE_TEXT]: '图文',
    [COMPONENT_TYPE.CONTENT]: '图文',
    [COMPONENT_TYPE.COURSE]: '课程',
    [COMPONENT_TYPE.IDENTIFY_RESULT]: '认定结果',
    [COMPONENT_TYPE.PLAN_FORMULA]: '计划公示',
    [COMPONENT_TYPE.PRACTICE]: '练习',
    [COMPONENT_TYPE.ENROLL_CARD]: '报名',
    [COMPONENT_TYPE.CLASS]: '班级',
    [COMPONENT_TYPE.CUSTOMER]: '联系客服',
}

/**
 * 生成组件的时候提供的基础值
 */
export const COMPONENT_TYPE_DEFAULT: Record<COMPONENT_TYPE, PreviewItem> = {
    [COMPONENT_TYPE.IMAGE]: {
        type: COMPONENT_TYPE.IMAGE,
        direction: 'horizontal',
        list: [],
    },
    [COMPONENT_TYPE.SWIPER]: {
        type: COMPONENT_TYPE.SWIPER,
        list: [],
    },
    [COMPONENT_TYPE.TAB]: {
        type: COMPONENT_TYPE.TAB,
        list: [],
    },
    [COMPONENT_TYPE.TITLE]: {
        type: COMPONENT_TYPE.TITLE,
        label: '标题栏',
        url: undefined,
        hasLink: false,
    },
    [COMPONENT_TYPE.IMAGE_TEXT]: {
        type: COMPONENT_TYPE.IMAGE_TEXT,
        rule: 'default',
        codes: [],
        layoutStyle: 1,
        showLine: 2,
    },
    [COMPONENT_TYPE.CONTENT]: {
        type: COMPONENT_TYPE.CONTENT,
        rule: 'default',
        content: [],
    },
    [COMPONENT_TYPE.IDENTIFY_RESULT]: {
        type: COMPONENT_TYPE.IDENTIFY_RESULT,
        rule: 'default',
        name: '认定结果',
        content: [],
    },
    [COMPONENT_TYPE.PLAN_FORMULA]: {
        type: COMPONENT_TYPE.PLAN_FORMULA,
        rule: 'default',
        content: [],
    },
    [COMPONENT_TYPE.COURSE]: {
        type: COMPONENT_TYPE.COURSE,
        showLine: 2,
        rule: 'default',
    },
    [COMPONENT_TYPE.PRACTICE]: {
        type: COMPONENT_TYPE.PRACTICE,
        rule: 'default',
        codes: [],
        layoutStyle: 2,
    },

    [COMPONENT_TYPE.ENROLL_CARD]: {
        type: COMPONENT_TYPE.ENROLL_CARD,
        rule: 'default',
        content: [],
        showLine: 2,
        layoutStyle: 1,
    },
    [COMPONENT_TYPE.CLASS]: {
        type: COMPONENT_TYPE.CLASS,
    },
    [COMPONENT_TYPE.CUSTOMER]: {
        type: COMPONENT_TYPE.CUSTOMER,
        nameType: false,
        iconType: false,
        interactionType: false,
        enableContactNumber: false,
        enableWechatScanCode: false,
    },
}

/**
 *  h5 提供的额外的 默认值
 */
export const MOBILE_COMPONENT_TYPE_DEFAULT: Record<string, Partial<PreviewItem>> = {
    [COMPONENT_TYPE.COURSE]: {
        showLine: 2,
        layoutStyle: 'default',
    },
}

/**
 * pc 提供的额外的 默认值
 */
export const PC_COMPONENT_TYPE_DEFAULT: Record<string, Partial<PreviewItem>> = {
    [COMPONENT_TYPE.IMAGE]: {
        fillMethod: 'cover',
    },
    [COMPONENT_TYPE.SWIPER]: {
        fillMethod: 'cover',
    },
    [COMPONENT_TYPE.PRACTICE]: {
        showLine: 1,
    },
    [COMPONENT_TYPE.ENROLL_CARD]: {
        layoutStyle: LAYOUT_STYLE.DEFAULT,
    },
}

/**
 * 组件类型的枚举
 */
export const component_type = [
    'image',
    'swiper',
    'tab',
    'title',
    'image_text',
    'content',
    'plan_formula',
    'identification_result',
    'course',
    'practice',
    'enroll_card',
    'class',
]
