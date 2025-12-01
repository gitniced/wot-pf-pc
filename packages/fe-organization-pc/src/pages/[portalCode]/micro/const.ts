import { PC_LAYOUT_ENUM } from './interface.d'
export const PC_LAYOUT_ENUM_TRANSFORM = {
    [PC_LAYOUT_ENUM.VERTICAL_FIVE]: 5,
    [PC_LAYOUT_ENUM.VERTICAL_FOUR]: 4,
    [PC_LAYOUT_ENUM.HORIZONTAL_TWO]: 2,
    [PC_LAYOUT_ENUM.HORIZONTAL_THREE]: 3,
}
export const enhanceData = (codes: [], courseList: any[]) => {
    const currentCourse = codes
        ?.map((c: any) => courseList?.find((_item: any) => Number(_item?.id) === Number(c)))
        .filter(Boolean)
    return currentCourse
}

export const omitObject = (obj: object) => {
    if (Reflect.has(obj, 'id')) {
        const keys = Object.keys(obj)
        return keys
            .filter(item => item !== 'id')
            .reduce((acc, cur) => ({ ...acc, [cur]: obj[cur] }), {})
    }
    return obj
}

// 展示内容的单选框的枚举
export enum SHOW_TYPE_ENUM {
    // 单独
    SINGLE = 'single',
    // 分组
    GROUP = 'group',
}
