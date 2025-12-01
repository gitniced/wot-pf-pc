/**
 * 查询初始化数据
 */
export const initSearchParams = {
    questionType: 0,
    questionLevel: 0,
    referStatus: 0,
    recommendStatus: 0,
    discrimination: 0,
    pageSize: 10,
    pageNo: 1,
    titleLike: undefined,
    warehousingTime: undefined,
}

/**
 * 导入状态
 */
export enum ImportStatus {
    none,
    padding, // 准备开始导入
    resolved, // 全部导入成功
    rejected, // 部分失败或者全部失败
    loading, // 导入中
}

/**
 * 处理鉴定点数据
 * @param data
 * @returns
 */
export const handerAuthenticatePoint = (data: any) => {
    const {
        name = '',
        firstRangeName = '',
        secondRangeName = '',
        thirdRangeName = '',
        pointName = '',
    } = data?.authenticatePoint ?? {}
    return [name, firstRangeName, secondRangeName, thirdRangeName, pointName]
        .filter(item => !!item)
        .join('/')
}

// 试题启用/禁用
export enum STATUS_ENUM {
    disabled,
    unDisabled,
}

export const STATUS_OPTIONS = [
    { label: '全部', value: null },
    { label: '启用', value: STATUS_ENUM.unDisabled },
    { label: '禁用', value: STATUS_ENUM.disabled },
]
