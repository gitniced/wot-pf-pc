import { useContext, useEffect, useState } from 'react'
import type {
    FormParamsType,
    PaginationType,
    TableDataType,
    UseTableSearchType,
} from '../interface'
import type { PaginationProps } from 'antd'
import type { Key } from 'react'
import type { TableRowSelection } from 'antd/lib/table/interface'
import http from '@/servers/http'
import useCommonParams from '@/hooks/useCommonParams'
import { ExamineEditValueContext } from '../context'

const useTableSearch = (initialData?: any): UseTableSearchType => {
    const { examDetail } = useContext(ExamineEditValueContext)

    const commonParams = useCommonParams()
    const { searchUrl, initParams } = initialData || {}
    // keys
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<TableDataType[]>([])

    const changeSelectedKeys = (keys: Key[], rows: TableDataType[]) => {
        setSelectedKeys(keys)
        setSelectedRowKeys(rows)
    }

    // 多行选择
    const rowSelection: TableRowSelection<TableDataType> = {
        selectedRowKeys: selectedKeys,
        onChange: changeSelectedKeys,
        getCheckboxProps: record => ({
            disabled: !examDetail?.questionConfigList
                .map(item => item.questionType)
                .includes(record.type),
        }),
    }

    // 获取列表数据
    const getTableData = async (params: any) => {
        let newParams = {
            ...initParams,
            ...params,
            ...commonParams,
        }
        // 参数 params
        const res: any = await http(searchUrl, 'post', newParams)
        setSelectedKeys([])
        return res
    }

    return {
        selectedKeys,
        rowSelection,
        selectedRowKeys,
        getTableData,
    }
}

export default useTableSearch
