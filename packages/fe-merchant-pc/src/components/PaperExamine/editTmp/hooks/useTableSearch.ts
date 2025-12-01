import { useEffect, useState } from 'react'
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

const useTableSearch = (initialData?: any): UseTableSearchType => {
    const commonParams = useCommonParams()

    const { searchUrl, initParams } = initialData || {}
    const [params, setParams] = useState<FormParamsType>() // 表单参数
    const [tableData, setTableData] = useState<TableDataType[]>([]) // 获取表格数据
    const [pagination, setPagination] = useState<PaginationType>({
        // 分页
        total: 0,
        pageSize: 10,
        current: 1,
    }) // 分页
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
    }

    // 获取列表数据
    const getTableData = async () => {
        let newParams = {
            pageSize: pagination.pageSize,
            pageNo: pagination.current,
            ...initParams,
            ...params,
            ...commonParams,
        }
        // 参数 params
        const res: any = await http(searchUrl, 'post', newParams)
        const { data } = res || {}
        if (res.data) {
            setTableData(data)
            setSelectedKeys([])
            setPagination({
                total: Number(res.totalCount),
                pageSize: Number(res.pageSize),
                current: Number(res.currentPage),
            })
        }
    }

    /**
     * 表单 查询 重置 回调函数
     * @param values
     */
    const formCallBack = (values?: FormParamsType) => {
        if (values) {
            setParams(values)
        } else {
            getTableData()
        }
    }

    useEffect(() => {
        getTableData()
        return () => {
            // isIgnore = true
        }
    }, [params, pagination.current, pagination.pageSize])

    /**
     * 分页 组件点击事件
     * @param pageNumber
     * @param pageSize
     */
    const paginationChangeHandler: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        if (pageSize && pageNumber) {
            setPagination({
                ...pagination,
                pageSize,
                current: pageNumber,
            })
        }
    }

    return {
        tableData,
        selectedKeys,
        pagination,
        rowSelection,
        selectedRowKeys,

        formCallBack,
        paginationChangeHandler,
    }
}

export default useTableSearch
