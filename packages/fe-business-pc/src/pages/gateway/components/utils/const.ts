//----------------------------------------------------------------

export enum statusEnum {
    draft = 0, //草稿
    release = 1, //发布
}

export const states = [
    { name: '草稿', value: statusEnum.draft },
    { name: '发布', value: statusEnum.release },
]

export const STATUS_RELEASE: Record<number, string> = {
    [statusEnum.draft]: '草稿',
    [statusEnum.release]: '发布',
}

export enum newStatusEnum {
    preservation = '1',
    release = '2',
}
export const NEW_STATUS: Record<string, string> = {
    [newStatusEnum.preservation]: '保存草稿',
    [newStatusEnum.release]: '发布',
}

export type statusType = 'success' | 'default'
export const statusMap: Record<number, statusType> = {
    [statusEnum.draft]: 'default',
    [statusEnum.release]: 'success',
}

export enum readonlyEnum {
    editable = 1, //可编辑
    readOnly = 1, //只读
    delete = 0, //可以删除
}

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
}

// 保存草稿或者发布
export enum SAVE_TYPE {
    DRAFT = 0,
    RELEASE = 1,
}

export const COMPONENT_TYPE_NAME: Record<COMPONENT_TYPE, string> = {
    [COMPONENT_TYPE.IMAGE]: '图片',
    [COMPONENT_TYPE.SWIPER]: '轮播',
    [COMPONENT_TYPE.TAB]: '图文导航',
    [COMPONENT_TYPE.TITLE]: '标题栏',
    [COMPONENT_TYPE.IMAGE_TEXT]: '图文',
    [COMPONENT_TYPE.CONTENT]: '图文',
    [COMPONENT_TYPE.IDENTIFY_RESULT]: '认定结果',
    [COMPONENT_TYPE.PLAN_FORMULA]: '计划公示',

    [COMPONENT_TYPE.COURSE]: '课程',
}

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
]

export const pcPageComponents = [
    {
        id: 1,
        type: 'group',
        active: true,
        title: '基础组件',
        children: [
            {
                id: 0,
                type: 'image',
                active: true,
                title: '图片',
                icon: 'icon_tupian',
            },
            {
                id: 1,
                type: 'swiper',
                active: true,
                title: '轮播',
                icon: 'icon_lunbo',
            },
            {
                id: 'title',
                type: 'title',
                active: true,
                title: '标题栏',
                icon: 'icon_biaotilan',
            },
        ],
    },
    {
        id: 2,
        type: 'group',
        active: true,
        title: '内容组件',
        children: [
            {
                id: 4,
                type: 'image_text',
                active: true,
                title: '图文',
                icon: 'icon_tuwen',
            },
            {
                id: 5,
                type: 'plan_formula',
                active: true,
                title: '计划公示',
                icon: 'icon_saas_jihuagongshi',
            },
            {
                id: 6,
                type: 'identification_result',
                active: true,
                title: '认定结果',
                icon: 'icon_saas_rendingjieguo',
            },
            {
                id: 7,
                type: 'course',
                active: true,
                title: '课程',
                icon: 'icon_saas_kecheg',
            },
        ],
    },
]

export const mobilePageComponents = [
    {
        id: 1,
        type: 'group',
        active: true,
        title: '基础组件',
        children: [
            {
                id: 0,
                type: 'image',
                active: true,
                title: '图片',
                icon: 'icon_tupian',
            },
            {
                id: 1,
                type: 'swiper',
                active: true,
                title: '轮播',
                icon: 'icon_lunbo',
            },
            {
                id: 2,
                type: 'tab',
                active: true,
                title: '图文导航',
                icon: 'icon_tuwendaohang',
            },
            {
                id: 3,
                type: 'title',
                active: true,
                title: '标题栏',
                icon: 'icon_biaotilan',
            },
        ],
    },
    {
        id: 2,
        type: 'group',
        active: true,
        title: '内容组件',
        children: [
            {
                id: 4,
                type: 'image_text',
                active: true,
                title: '图文',
                icon: 'icon_tuwen',
            },
            {
                id: 5,
                type: 'plan_formula',
                active: true,
                title: '计划公示',
                icon: 'icon_saas_jihuagongshi',
            },
            {
                id: 6,
                type: 'identification_result',
                active: true,
                title: '认定结果',
                icon: 'icon_saas_rendingjieguo',
            },
            {
                id: 7,
                type: 'course',
                active: true,
                title: '课程',
                icon: 'icon_saas_kecheg',
            },
        ],
    },
]
