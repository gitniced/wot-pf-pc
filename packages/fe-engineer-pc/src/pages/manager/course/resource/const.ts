/**
 * 资源格式枚举
 */
export enum RESOURCE_FORMAT {
    /** 文档 */
    word = 'word',
    /** 表格 */
    excel = 'excel',
    /** 脑图 */
    mind = 'mind',
    /** 设备 */
    device = 'device',
    /** 图纸 */
    drawing = 'drawing',
    /** 附件 */
    attachment = 'attachment',
    /** 点播课 */
    demand = 'demand',
}

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

/**
 * 资源可见性枚举
 */
export enum RESOURCE_VISIBILITY {
    /** 个人 */
    PERSONAL = 'personal',
    /** 公共 */
    PUBLIC = 'public',
}

/**
 * 资源格式标签映射
 */
export const RESOURCE_FORMAT_LABEL = {
    [RESOURCE_FORMAT.word]: '文档',
    [RESOURCE_FORMAT.excel]: '表格',
    [RESOURCE_FORMAT.mind]: '脑图',
    [RESOURCE_FORMAT.device]: '设备',
    [RESOURCE_FORMAT.drawing]: '图纸',
    [RESOURCE_FORMAT.attachment]: '附件',
    [RESOURCE_FORMAT.demand]: '点播课',
} as const

/**
 * 资源类型标签映射
 */
export const RESOURCE_TYPE_LABEL = {
    [RESOURCE_TYPE.personal]: '个人',
    [RESOURCE_TYPE.common]: '公共',
    [RESOURCE_TYPE.activityResource]: '学习资源',
    [RESOURCE_TYPE.activityOutcome]: '学习成果',
    [RESOURCE_TYPE.activityHomework]: '课后作业',
} as const

/**
 * 资源格式选项
 */
export const RESOURCE_FORMAT_OPTIONS = [
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.word], value: RESOURCE_FORMAT.word },
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.excel], value: RESOURCE_FORMAT.excel },
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.mind], value: RESOURCE_FORMAT.mind },
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.device], value: RESOURCE_FORMAT.device },
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.drawing], value: RESOURCE_FORMAT.drawing },
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.attachment], value: RESOURCE_FORMAT.attachment },
    { label: RESOURCE_FORMAT_LABEL[RESOURCE_FORMAT.demand], value: RESOURCE_FORMAT.demand },
]

/**
 * 资源类型选项
 */
export const RESOURCE_TYPE_OPTIONS = [
    { label: RESOURCE_TYPE_LABEL[RESOURCE_TYPE.personal], value: RESOURCE_TYPE.personal },
    { label: RESOURCE_TYPE_LABEL[RESOURCE_TYPE.common], value: RESOURCE_TYPE.common },
    {
        label: RESOURCE_TYPE_LABEL[RESOURCE_TYPE.activityResource],
        value: RESOURCE_TYPE.activityResource,
    },
    {
        label: RESOURCE_TYPE_LABEL[RESOURCE_TYPE.activityOutcome],
        value: RESOURCE_TYPE.activityOutcome,
    },
    {
        label: RESOURCE_TYPE_LABEL[RESOURCE_TYPE.activityHomework],
        value: RESOURCE_TYPE.activityHomework,
    },
]

/**
 * 资源格式映射
 */
export const RESOURCE_FORMAT_MAP: Record<string, { text: string; color: string }> = {
    [RESOURCE_FORMAT.word]: { text: '文档', color: 'blue' },
    [RESOURCE_FORMAT.excel]: { text: '表格', color: 'green' },
    [RESOURCE_FORMAT.mind]: { text: '脑图', color: 'purple' },
    [RESOURCE_FORMAT.device]: { text: '设备', color: 'orange' },
    [RESOURCE_FORMAT.drawing]: { text: '图纸', color: 'cyan' },
    [RESOURCE_FORMAT.attachment]: { text: '附件', color: 'geekblue' },
    [RESOURCE_FORMAT.demand]: { text: '点播课', color: 'red' },
}

/**
 * 资源类型映射
 */
export const RESOURCE_TYPE_MAP: Record<number, { text: string; color: string }> = {
    [RESOURCE_TYPE.personal]: { text: '个人', color: 'green' },
    [RESOURCE_TYPE.common]: { text: '公共', color: 'purple' },
    [RESOURCE_TYPE.activityResource]: { text: '学习资源', color: 'green' },
    [RESOURCE_TYPE.activityOutcome]: { text: '学习成果', color: 'purple' },
    [RESOURCE_TYPE.activityHomework]: { text: '课后作业', color: 'red' },
}

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '-'

    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`
}
