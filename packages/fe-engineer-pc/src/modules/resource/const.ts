import { enumToLabel } from '@/utils/enumHandle'

/**
 * 资源格式
 */
export enum RESOURCE_FORMAT {
    /**
     * 文档
     */
    word = 'word',
    /**
     * 表格
     */
    excel = 'excel',
    /**
     * 脑图
     */
    mind = 'mind',
    /**
     * 设备
     */
    device = 'device',
    /**
     * 图纸
     */
    drawing = 'drawing',
    /**
     * 附件
     */
    attachment = 'attachment',
    /**
     * 点播课
     */
    demand = 'demand',
}

export const RESOURCE_FORMAT_LABEL = {
    [RESOURCE_FORMAT.device]: '设备',
    [RESOURCE_FORMAT.word]: '文档',
    [RESOURCE_FORMAT.excel]: '表格',
    [RESOURCE_FORMAT.mind]: '脑图',
    [RESOURCE_FORMAT.drawing]: '图纸',
    [RESOURCE_FORMAT.attachment]: '附件',
    [RESOURCE_FORMAT.demand]: '点播课',
} as const

export const RESOURCE_FORMAT_LABEL_ALL = {
    all: '全部格式',
    ...RESOURCE_FORMAT_LABEL,
} as const

export const resourceFormatLabel = enumToLabel(RESOURCE_FORMAT_LABEL)
export const resourceFormatLabelAll = enumToLabel(RESOURCE_FORMAT_LABEL_ALL)

/**
 * 资源类型
 */
export enum RESOURCE_TYPE {
    /**
     * 公共
     */
    common = 1,
    /**
     * 个人
     */
    personal = 2,
    /**
     * 学习活动 - 学习资源
     */
    activityResource = 3,
    /**
     * 学习活动 - 学习成果
     */
    activityOutcome = 4,
    /**
     * 学习活动 - 课后作业
     */
    activityHomework = 5,
}

export const RESOURCE_TYPE_LABEL = {
    [RESOURCE_TYPE.personal]: '个人',
    [RESOURCE_TYPE.common]: '公共',
} as const

export const RESOURCE_TYPE_LABEL_ALL = {
    all: '全部类型',
    ...RESOURCE_TYPE_LABEL,
} as const

export const resourceTypeLabel = enumToLabel(RESOURCE_TYPE_LABEL, {
    order: [RESOURCE_TYPE.personal, RESOURCE_TYPE.common],
})

export const resourceTypeLabelAll = enumToLabel(RESOURCE_TYPE_LABEL_ALL, {
    order: ['all', RESOURCE_TYPE.personal, RESOURCE_TYPE.common],
})
