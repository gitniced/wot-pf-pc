import { useEffect, useState } from 'react'
import type { PaginationProps } from 'antd'
import type { FormParamsType, TableDataType } from '../interface'
import { getLocalStorage } from '@/storage'
import http from '@/servers/http'
import API from '@/servers/apis'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'

interface PaginationType {
    total?: number
    pageSize?: number
    current?: number
}

export interface UseTableSearchType {
    tableData: TableDataType[]
    pagination: PaginationType
    searchForm: (values?: FormParamsType) => void
    paginationChangeHandler: PaginationProps['onChange']
    getTableData: () => Promise<any>
}

const useTableSearch = (): UseTableSearchType => {
    const userStore = useUserStore()
    const commonParam = useCommonParams()

    const [params, setParams] = useState<Partial<FormParamsType>>({ customContent: {} }) // 表单参数
    const [tableData] = useState<TableDataType[]>([]) // 获取表格数据
    const [pagination, setPagination] = useState<PaginationType>({
        // 分页
        total: 0,
        pageSize: 10,
        current: 1,
    }) // 分页

    /**
     * 表单 查询 重置 回调函数
     * @param values
     */
    const searchForm = (values: any) => {
        setParams(values)
        setPagination({ ...pagination, current: 1 })
    }

    // 获取列表数据
    const getTableData = async (paramsData?: any) => {
        const { code: userCode } = userStore?.userData || {}
        const newParams = {
            sid: getLocalStorage('SID'),
            organizationCode: userStore?.selectedOrganization,
            userCode,
            ...paramsData,
            ...commonParam,
        }

        return await http(API.examineList, 'post', newParams)
    }

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
