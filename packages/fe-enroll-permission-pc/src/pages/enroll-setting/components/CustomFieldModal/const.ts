export enum FIELD_TYPE {
    SINGLE_TEXT = 'INPUT', // 单行文本
    MULTI_TEXT = 'TEXTAREA', // 多行文本
    SINGLE_CHOICE = 'RADIO_GROUP', // 单选框
    MULTI_CHOICE = 'MULTI_CHOICE', // 多选框
    SINGLE_SELECT = 'SELECT', // 单项选择器
    MULTI_SELECT = 'MULTI_SELECT', // 多项选择器
    IMAGE = 'IMAGE_UPLOAD', // 图片
    ATTACHMENT = 'FILE_UPLOAD', // 附件
    LINK = 'LINK', // 链接
}

// 字段类型对应的中文名称
export const FIELD_TYPE_NAME = {
    [FIELD_TYPE.SINGLE_TEXT]: '单行文本',
    [FIELD_TYPE.MULTI_TEXT]: '多行文本',
    [FIELD_TYPE.SINGLE_CHOICE]: '单选框',
    [FIELD_TYPE.MULTI_CHOICE]: '多选框',
    [FIELD_TYPE.SINGLE_SELECT]: '单项选择器',
    [FIELD_TYPE.MULTI_SELECT]: '多项选择器',
    [FIELD_TYPE.IMAGE]: '图片',
    [FIELD_TYPE.ATTACHMENT]: '附件',
    [FIELD_TYPE.LINK]: '链接',
}
