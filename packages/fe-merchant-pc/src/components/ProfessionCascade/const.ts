import { getLocalStorage } from '@/storage'
import type { JobParams, AuthenticateParams } from './interface'
export const initJobParams: JobParams = {
    pageNo: 1,
    pageSize: 30,
    // sid: getLocalStorage('SID'),
}

export const initAuthenticateParams: AuthenticateParams = {
    order: 'ASC',
    orderBy: 'createdAt',
    pageNo: 1,
    pageSize: 8888,
}

/** 职业工种等级chldren字段 */
export const jobChildrenName: string[] = ['workList', 'levelList']

/** 鉴定点chldren字段 */
export const authenticateChildrenName: string[] = ['range', 'children', 'children', 'point']
/**
 * 处理树结构数据为级联选择器数据
 * @param data 需要处理的数据
 * @param index 当前为第几层,从0开始
 * @param chilrenArray 子数据字段
 * @param key
 * @returns 处理后的数据
 */
export const handlerData = (
    data: any[],
    index: number,
    chilrenArray: string[],
    key: 'code' | 'id',
): any[] => {
    return data.map(item => {
        const children = item[chilrenArray?.[index]]
        return {
            label: item.name,
            value: item?.[key],
            children:
                children?.length > 0 ? handlerData(children, index + 1, chilrenArray, key) : [],
        }
    })
}
