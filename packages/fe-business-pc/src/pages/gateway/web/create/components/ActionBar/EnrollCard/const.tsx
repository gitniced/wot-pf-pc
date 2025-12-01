import { LAYOUT_STYLE } from '@/pages/gateway/components/utils/interface.d'

// 添加方式的单选框的枚举
export enum ADD_TYPE_ENUM {
    // 默认规则
    DEFAULT = 'default',
    // 按报名项目
    BY_CATEGORY = 'by_category',
    // 按报名
    BY_ENROLL = 'custom',
}

// 根据添加方式展示提示语
export const ADD_TYPE_ENUM_TO_TIPS: Record<string, string> = {
    [ADD_TYPE_ENUM.DEFAULT]: '默认展示最新创建的报名活动',
    [ADD_TYPE_ENUM.BY_CATEGORY]: '',
    [ADD_TYPE_ENUM.BY_ENROLL]: '添加报名活动，最多50个',
}
// 添加方式的option
export const ADD_TYPE_OPTIONS = [
    { label: '默认规则', value: ADD_TYPE_ENUM.DEFAULT },
    { label: '按报名', value: ADD_TYPE_ENUM.BY_ENROLL },
    { label: '按报名项目', value: ADD_TYPE_ENUM.BY_CATEGORY },
]

// 展示样式单选框的option
export const PC_LAYOUT_OPTIONS = [
    { label: '一行1个', value: LAYOUT_STYLE.DEFAULT, icon: 'icon_jihua1' },
    { label: '一行2个', value: LAYOUT_STYLE.TWO_IN_ROW, icon: 'icon_jihua2' },
]

export interface ICheckedRows {
    id: number
    name: string
    workName: string
    levelName: string
    courseNum: number
}
