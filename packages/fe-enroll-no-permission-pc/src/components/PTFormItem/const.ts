import type { FormItemProps } from 'antd'

/** 单行文本*/
export const INPUT = 'INPUT'
/** 数字输入框*/
export const INPUT_NUMBER = 'INPUT_NUMBER'
/** 多行文本*/
export const TEXTAREA = 'TEXTAREA'
/** 选择器*/
export const SELECT = 'SELECT'
/** 多项选择器*/
export const MULTI_SELECT = 'MULTI_SELECT'
/** 单选选择器*/
export const RADIO_GROUP = 'RADIO_GROUP'
/** 多选选择器*/
export const MULTI_CHOICE = 'MULTI_CHOICE'
/** 日期选择器*/
export const DATEPICKER = 'DATEPICKER'
/** 时间选择器*/
export const TIMEPICKER = 'TIMEPICKER'
/** 省市区联动*/
export const CITY_CASCADER = 'CITY_CASCADER'
/** 身份证正反面上传器*/
export const ID_PHOTO = 'ID_PHOTO'
/** 文件上传*/
export const FILE_UPLOAD = 'FILE_UPLOAD'
/** 单图片上传*/
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD'
/** 链接*/
export const LINK = 'LINK'

/** 默认图片上传限制*/
export const DEFAULT_IMAGE_ACCEPT = 'image/jpg,image/jpeg,image/png,image/JPEG,image/JPG、image/PNG'

/** 表单类型枚举*/
export const FORM_ITEM_TYPE = {
    /** 单行文本*/
    INPUT,
    /** 数字输入框*/
    INPUT_NUMBER,
    /** 多行文本*/
    TEXTAREA,
    /** 选择器*/
    SELECT,
    /** 单选选择器*/
    RADIO_GROUP,
    /** 日期选择器*/
    DATEPICKER,
    /** 时间选择器*/
    TIMEPICKER,
    /** 省市区联动*/
    CITY_CASCADER,
    /** 身份证正反面上传器*/
    ID_PHOTO,
    /** 文件上传*/
    FILE_UPLOAD,
    /** 单图片上传*/
    IMAGE_UPLOAD,
    /** 多项选择器*/
    MULTI_SELECT,
    /** 多选选择器*/
    MULTI_CHOICE,
    /** 链接*/
    LINK,
}

/** 表单dom的基础props*/
export interface FORM_ITEM_PROPS extends FormItemProps {
    renderType: keyof typeof FORM_ITEM_TYPE
    rule?: FORM_ITEM_RULE
    options?: any[]
}

/** 表单dom的rule*/
export type FORM_ITEM_RULE = {
    min?: number
    max?: number
    format?: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH:mm:ss'
    accept?: typeof DEFAULT_IMAGE_ACCEPT | string
    minSize?: number
    maxSize?: number
}
