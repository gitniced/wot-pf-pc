import { useEffect, useState } from 'react'
import type { PaginationProps } from 'antd'
import type { FormParamsType, TableDataType } from '../interface'
import { getCookie, getLocalStorage } from '@/storage'
import http from '@/servers/http'
import API from '@/servers/apis'
import useUserStore from '@/hooks/useUserStore'
import type { CommonParams } from '@/hooks/useCommonParams';
import useCommonParams from '@/hooks/useCommonParams'

interface PaginationType {
    total?: number
    pageSize?: number
    current?: number
}

export interface UseTableSearchType {
    tableData: TableDataType[]
    pagination: PaginationType
    searchForm: (values?: FormParamsType & CommonParams) => void
    paginationChangeHandler: PaginationProps['onChange']
    getTableData: () => void
}

const useTableSearch = (): UseTableSearchType => {
    const userStore = useUserStore()
    const commonParams = useCommonParams()

    const [params, setParams] = useState<Partial<FormParamsType>>({ customContent: {} }) // 表单参数
    const [tableData, setTableData] = useState<TableDataType[]>([]) // 获取表格数据
    const [pagination, setPagination] = useState<PaginationType>({
        // 分页
        total: 0,
        pageSize: 10,
        current: 1,
    }) // 分页

    let isIgnore: boolean = false // 解决多次点击分页引起的 多次发出请求 bug

    /**
     * 表单 查询 重置 回调函数
     * @param values
     */
    const searchForm = (values: any) => {
        setParams({ ...values })
        setPagination({ ...pagination, current: 1 })
    }

    // 获取列表数据
    const getTableData = async () => {
        const { code: userCode } = userStore?.userData || {}
        let newParams = {
            pageSize: pagination.pageSize,
            pageNo: pagination.current,
            sid: getLocalStorage('SID'),
            organizationCode: getCookie('SELECT_ORG_CODE'),
            userCode,
            ...params,
            ...commonParams,
        }

        // 参数 params
        const res: any = await http(API.examineList, 'post', newParams)
        if (!isIgnore) {
            setTableData(res.data)
            setPagination({
                total: res.totalCount,
                pageSize: res.pageSize,
                current: res.currentPage,
            })
        }
    }

    useEffect(() => {
        getTableData()
        return () => {
            isIgnore = true
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
        pagination,
        getTableData,
        searchForm,
        paginationChangeHandler,
    }
}

export default useTableSearch
