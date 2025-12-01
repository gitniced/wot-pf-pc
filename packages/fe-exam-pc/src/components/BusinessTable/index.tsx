import { SuperTable, usePageListConfig } from '@wotu/wotu-components'
import useUserStore from '@/hooks/useUserStore'
import type { SuperTypeProps } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { useState } from 'react'
import useUserColumns from '@/hooks/useUserColumns'
// @ts-ignore
import type { ColumnsSetting } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import useUserPageConfig from '@/hooks/useUserPageConfig'
import { useUpdateEffect } from 'ahooks'
import { history } from 'umi'

export const clearUrlParams = (i?: string, key?: string) => {
    let currentUrl = new URL(window.location.href)
    currentUrl.search = ''

    if (i && key) {
        currentUrl.searchParams.append(key, i)
    }
    window.history.replaceState({}, '', currentUrl)
}

const defaultFormProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

export default function BusinessTable(props: SuperTypeProps & { extraInitParams?: any }) {
    const {
        search = {},
        request,
        extraInitParams,
        formProps = defaultFormProps,
        columns: propsCol = [],
        ...rest
    } = props
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
        const { data = [], totalCount = 0 } = res ?? {}

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

    useUpdateEffect(() => {
        const newColumnsSettings = propsCol
            .filter((item: any) => !item.hide)
            .map((item: any, index: number) => ({
                order: item.order || index, // 顺序
                key: item.dataIndex, // 唯一标志
                hide: false, // 是否隐藏
            }))

        setUserColumns(userStore, newColumnsSettings)

        const isHide = (colItem: any) => {
            const column = columnsSettings.find(
                (item: ColumnsSetting) => item.key === (colItem.dataIndex as string),
            )

            return colItem.hide || column?.hide
        }

        setColumns(() => propsCol.map(item => ({ ...item, hide: isHide(item) })))
    }, [propsCol])

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
            formProps={formProps}
            inTableParamsChange={(params: any) => {
                setPageListConfig(params, 'save_params')
            }}
            tableInitParams={getTableInitParams}
            search={
                search
                    ? {
                          defaultExpand: expand,
                          onExpandChange: (currExpand: boolean) => {
                              setPageListConfig(!currExpand, 'save_expand')
                          },
                          ...search,
                      }
                    : search
            }
            request={getList}
            // @ts-ignore
            columnsSettings={columnsSettings}
            onChangeColumns={(setting: ColumnsSetting[]) => {
                setUserColumns(userStore, setting)
            }}
            {...rest}
            columns={columns}
            onReset={e => {
                clearUrlParams()
                rest?.onReset?.(e)
            }}
        />
    )
}
