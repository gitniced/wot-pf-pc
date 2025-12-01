import { enumToItem } from '@/utils/enumHandle'

/**
 * 协作类型
 */
export enum LEARNING_COLLABORATION_TYPE {
    /**
     * 个人
     */
    personal = 1,
    /**
     * 团队
     */
    team = 2,
}

export const LEARNING_COLLABORATION_TYPE_LABEL = {
    [LEARNING_COLLABORATION_TYPE.personal]: '个人',
    [LEARNING_COLLABORATION_TYPE.team]: '团队',
} as const

export const learningCollaborationTypeOptions = enumToItem(LEARNING_COLLABORATION_TYPE_LABEL)

/**
 * 编辑格式
 */
export enum LEARNING_EDIT_FORMAT {
    /**
     * 在线
     */
    online = 1,
    /**
     * 文件
     */
    file = 2,
}

export const LEARNING_EDIT_FORMAT_LABEL = {
    [LEARNING_EDIT_FORMAT.online]: '在线',
    [LEARNING_EDIT_FORMAT.file]: '文件',
} as const

export const learningEditFormatOptions = enumToItem(LEARNING_EDIT_FORMAT_LABEL)

/**
 * 文件格式
 */
export enum LEARNING_FILE_FORMAT {
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
}

export const LEARNING_FILE_FORMAT_LABEL = {
    [LEARNING_FILE_FORMAT.word]: '文档',
    [LEARNING_FILE_FORMAT.excel]: '表格',
    [LEARNING_FILE_FORMAT.mind]: '脑图',
} as const

export const learningFileFormatOptions = enumToItem(LEARNING_FILE_FORMAT_LABEL)
