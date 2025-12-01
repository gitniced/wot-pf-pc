import { SuperTable, usePageListConfig } from '@wotu/wotu-components'
import type { SuperTypeProps } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { useState } from 'react'
import useUserColumns from '@/hooks/useUserColumns'
// @ts-ignore
import type { ColumnsSetting } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import useUserPageConfig, { getUserPageSize } from '@/hooks/useUserPageConfig'
import { useUpdateEffect } from 'ahooks'
import { useModel } from 'umi'
import qs from 'qs'

export const clearUrlParams = (params: any) => {
    let currentUrl = new URL(window.location.href)
    const currentUrlParams = qs.parse(currentUrl.search, { ignoreQueryPrefix: true })
    Object.keys(params).forEach(key => {
        if (currentUrlParams[key]) {
            delete currentUrlParams[key]
        }
    })
    delete currentUrlParams.pageNo
    delete currentUrlParams.pageSize
    const newSearch = '?' + qs.stringify(currentUrlParams)
    window.history.replaceState({}, '', currentUrl.pathname + newSearch)
}

const defaultFormProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

export default function BusinessTable(
    props: SuperTypeProps & { extraInitParams?: any; ignoreUrlParams?: string[] },
) {
    const {
        search = {},
        request,
        extraInitParams,
        ignoreUrlParams = [],
        formProps = {
            ...defaultFormProps,
        },
        columns: propsCol = [],
        pagination = {},
        renderOptionBar,
        ...rest
    } = props

    const masterModel = useModel('@@qiankunStateFromMaster')
    const { masterStore = {} } = masterModel || {}
    const { userStore = {} } = masterStore || {}

    const { setUserPageSize } = useUserPageConfig(userStore)
    const pageSize = getUserPageSize(userStore)
    const { getPageListConfig, setPageListConfig } = usePageListConfig()
    // const { columnsSettings, setUserColumns } = useUserColumns(userStore)
    const { columnsSettings } = useUserColumns(userStore)

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
        // const newColumnsSettings = propsCol
        //     .filter((item: any) => !item.hide)
        //     .map((item: any, index: number) => ({
        //         order: item.order || index, // 顺序
        //         key: item.dataIndex, // 唯一标志
        //         hide: false, // 是否隐藏
        //     }))
        // setUserColumns(userStore, newColumnsSettings)

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
            renderOptionBar={renderOptionBar}
            loading={loading}
            scroll={{ x: 0 }}
            pagination={
                typeof pagination === 'boolean' && pagination === false
                    ? false
                    : {
                          pageSize,
                          current: pageParams?.pageNo || 1,
                          total,
                          showSizeChanger: true,
                          showTotal: (t: number) => `共 ${t} 个项目`,
                          onShowSizeChange: (_: number, size: number) => {
                              setUserPageSize(size, userStore)
                          },
                          ...pagination,
                      }
            }
            formProps={formProps}
            inTableParamsChange={(params: any) => {
                ignoreUrlParams.forEach(key => {
                    delete params[key]
                })
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
            // onChangeColumns={(setting: ColumnsSetting[]) => {
            //     setUserColumns(userStore, setting)
            // }}
            {...rest}
            columns={columns}
            onReset={e => {
                clearUrlParams(e)
                rest?.onReset?.(e)
            }}
        />
    )
}
