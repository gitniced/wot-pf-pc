import { getCookie } from '@/storage'

/**
 *  微页面的type  转换后端的type
 * @param type
 * @returns
 */
export const parseType = (type: 'pc' | 'mobile') => {
    const map = {
        pc: 2,
        mobile: 1,
    }
    return map[type]
}

/**
 *  获取当前选中的组织
 * @returns
 */
export const getNowSelectOrgCode = () => {
    return getCookie('SELECT_ORG_CODE') || ''
}

/**
 * 兼容图文老数据
 */
export const renderData = (data: any, callBack: () => void) => {
    // debugger
    const arr = data?.codes?.filter(Boolean)?.length
        ? data?.codes.filter(Boolean)
        : (data?.content || []).filter(Boolean)
    /**
     * 新数据  数组里 如果有字符串类型得数据 说明this.imgaeText得length 为0  清空数据
     * 老数据 data?.content 数组里直接是对象
     */
    if (arr?.some(i => typeof i === 'string')) {
        // stores.fixPreviewList({
        //     ...data,
        //     codes: [],
        // })

        callBack()
        return []
    }

    return arr
}
