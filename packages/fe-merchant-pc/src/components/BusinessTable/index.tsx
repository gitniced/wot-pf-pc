import { SuperTable, usePageListConfig } from '@wotu/wotu-components'
import useUserStore from '@/hooks/useUserStore'
import type { SuperTypeProps } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { useState } from 'react'
import useUserColumns from '@/hooks/useUserColumns'
import type { ColumnsSetting } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import useUserPageConfig from '@/hooks/useUserPageConfig'

export default function BusinessTable(props: SuperTypeProps & { extraInitParams?: any }) {
    const { search = {}, request, extraInitParams, ...rest } = props
    const userStore = useUserStore()

    const { pageSize, setUserPageSize } = useUserPageConfig(userStore)
    const { getPageListConfig, setPageListConfig } = usePageListConfig()
    const { columnsSettings, setUserColumns } = useUserColumns(userStore)

    const pageParams = getPageListConfig('save_params')

    const expand = getPageListConfig('save_expand')
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    // 获取刷题列表
    const getList = async (params: any) => {
        setLoading(true)
        const res: any = await request?.(params!)
        const { data = [], totalCount } = res

        setLoading(false)
        setTotal(totalCount)

        return { data, totalCount, success: true }
    }

    const getTableInitParams = () => {
        return {
            ...pageParams,
            ...extraInitParams,
        }
    }

    return (
        <SuperTable
            toolBar={true}
            loading={loading}
            scroll={{ x: 0 }}
            pagination={{
                pageSize,
                current: pageParams?.pageNo || 1,
                total,
                showSizeChanger: true,
                showTotal: (t: number) => `共 ${t} 条`,
                onShowSizeChange: (_: number, size: number) => {
                    setUserPageSize(size, userStore)
                },
            }}
            inTableParamsChange={(params: any) => {
                setPageListConfig(params, 'save_params')
            }}
            tableInitParams={getTableInitParams}
            search={{
                defaultExpand: expand,
                onExpandChange: (currExpand: boolean) => {
                    setPageListConfig(!currExpand, 'save_expand')
                },
                ...search,
            }}
            request={getList}
            // @ts-ignore
            columnsSettings={columnsSettings}
            onChangeColumns={(columnsSettings: ColumnsSetting[]) => {
                setUserColumns(userStore, columnsSettings)
            }}
            {...rest}
        />
    )
}
