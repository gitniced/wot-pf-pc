import type { SearchConfig } from '@ant-design/pro-table/lib/components/Form/FormRender'
import type { TableRowSelection } from '@ant-design/pro-table/lib/typing'

/** doRequest入参类型 */
export type ProTableRequest = {
    current?: number
    pageSize?: number
    [key: string]: unknown
}

// TODO 跟后端约定分页接口返回的数据结构进行修改
/** doRequest返回类型 */
export type ProTableResponse = {
    data: Record<string, any>[]
    current: number
    pageSize: number
    totalCount: number
}

/** tabitem数据类型 */
export type ProTableTabItem = {
    key: number
    label: string
    value: string | number
    count?: number
}

/** 批量操作配置类型 */
export type ProTableRowSelection = false | (TableRowSelection & { alwaysShowAlert: boolean })

/** 筛选项配置类型 */
export type ProTableSearch = false | SearchConfig
