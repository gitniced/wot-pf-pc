import { SuperTable, usePageListConfig } from '@wotu/wotu-components'
import type {
    ColumnsSetting,
    SuperTypeProps,
} from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { useEffect, useState } from 'react'
// @ts-ignore
import { useModel } from 'umi'
import useUserColumns from '@/hooks/useUserColumns'
import useUserPageConfig from '@/hooks/useUserPageConfig'

function BusinessTable(props: SuperTypeProps & { extraInitParams?: any, activeKey?: any }) {
    const { request, extraInitParams, search = {}, columns: propsCol = [], activeKey, ...rest } = props

    const masterModel = useModel('@@qiankunStateFromMaster') || {}
    const { masterStore } = masterModel || {}
    const { userStore } = masterStore || {}

    const { pageSize, setUserPageSize } = useUserPageConfig(userStore)
    const { getPageListConfig, setPageListConfig } = usePageListConfig()
    const { columnsSettings, setUserColumns } = useUserColumns(userStore, activeKey)

    const pageParams = getPageListConfig('save_params')
    const expand = getPageListConfig('save_expand')
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    /** 处理 columns */
    const columnsInStore = (colItem: any) => {
        const column = columnsSettings.find(
            (item: ColumnsSetting) => item.key === (colItem.dataIndex as string),
        )
        return {
            ...column,
            hide: column?.hide || colItem.hide,
            order: column?.order,
        }
    }

    const [columns, setColumns] = useState(() =>
        propsCol.map((item: any) => ({
            ...item,
            ...columnsInStore(item),
        })),
    )

    useEffect(() => {
        setColumns(() => propsCol.map(item => ({ ...item, ...columnsInStore(item) })))
    }, [propsCol])

    // 获取刷题列表
    const getList = async (params: any) => {
        setLoading(true)
        const res: any = await request?.(params!)
        const { data = [], totalCount } = res ?? {}

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
            search={search ? {
                defaultExpand: expand,
                onExpandChange: (currExpand: boolean) => {
                    setPageListConfig(!currExpand, 'save_expand')
                },
                ...search,
            } : false}
            request={getList}
            columnsSettings={columnsSettings}
            onChangeColumns={(tempColumnsSettings: ColumnsSetting[]) => {
                setUserColumns(userStore, tempColumnsSettings)
            }}
            {...rest}
            columns={columns}
        />
    )
}

export default BusinessTable
