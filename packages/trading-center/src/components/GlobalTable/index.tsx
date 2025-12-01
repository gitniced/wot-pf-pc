/**
 * @ File: 公共表格
 * @ Author: feeling
 * @ Create Time: 2022-12-14 20:46:33
 * @ Modified by: cmm
 * @ Modified time: 2023-01-04 14:17:09
 * @ Modified time: 2023-02-21 13:59:36
 */

// lib
import React, { useContext, useEffect } from 'react'
import type { ListToolBarProps, ProColumns } from '@ant-design/pro-table'
import { ProTable, ProConfigProvider } from '@ant-design/pro-components'

// type
import type {
    ProTableSearch,
    ProTableRequest,
    ProTableTabItem,
    ProTableResponse,
} from './interface'
import type { ProTableRowSelection } from './interface'

// style
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Badge, Button, ConfigProvider, Space } from 'antd'
import styles from './index.module.less'
// import type { AlertRenderType } from '@ant-design/pro-table/lib/components/Alert'

import Empty from '../Empty'
// import { useModel } from 'umi'

/**
 * table入参
 * @params pageNumKey 页码key
 * @params pageSizeKey 分页条目key
 * @params noPageNo 是否拥有分页
 * @params noPageNo 是否拥有分页
 * @params search 是否展示筛选表单
 * @params tableRequest 表格请求数据触发
 * @params tableColumns 表格columns
 * tab
 * @params tabList tab数据
 * @params tabServerKey tabKey对应的后端搜索字段
 * @params onTabChange tabKey变化后回调
 * 批量操作
 * @params showLimitBtn 是否展示批量操作相关功能
 * @params hasSelection 是否展示批量操作相关功能
 * @params hideSelectAll 是否展示全选按钮
 * @params tableRowKey 批量操作使用的rowkey
 * @params onTableRowChange 当表格选中项变化时触发
 * @params limitBtnText 批量操作按钮文案
 * @params onLimitClick 批量操作点击事件
 * @params onGetCheckboxProps rowSelection当前行根据数据修改checkbox拓展属性
 * @return ReactNode 表格
 */
type GlobelTableProps = {
    pageNumKey?: string
    pageSizeKey?: string
    noPageNo: boolean
    search: ProTableSearch
    tableRequest: (params: ProTableRequest) => Promise<unknown>
    tableColumns: ProColumns[]
    onTableSourceChange: (params: any) => void

    tabList?: ProTableTabItem[]
    tabServerKey?: string
    onTabChange?: (key: number) => void

    showLimitBtn?: boolean
    hasSelection?: boolean
    hideSelectAll?: boolean
    tableRowKey?: string
    onTableRowChange?: (keys: any[]) => void
    limitBtnText?: string
    onLimitClick?: (keys: React.Key[]) => void
    onGetCheckboxProps?: (item: any) => any
    defaultSelectRowKeys?: string[]
}

const GlobalTable = forwardRef<HTMLElement, GlobelTableProps>(
    (selfProps: GlobelTableProps, ref: React.Ref<unknown>) => {
        // const masterStore = useModel('@@qiankunStateFromMaster')
        const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
        const prefixCls = getPrefixCls()

        const {
            pageNumKey = 'current',
            pageSizeKey = 'pageSize',
            noPageNo,
            search,
            tableRequest,
            tableColumns,
            onTableSourceChange,

            tabList = [],
            tabServerKey = '',
            onTabChange,

            showLimitBtn = false,
            hasSelection = false,
            hideSelectAll = false,
            tableRowKey = 'id',
            limitBtnText = '批量操作',
            onTableRowChange,
            onGetCheckboxProps,
            defaultSelectRowKeys,
        } = selfProps

        const tableRef = useRef(null)
        const formRef = useRef()

        // 当前选中的tabKey
        const [currentTabKey, setCurrentTabKey] = useState<number>(-1)
        // 当前的页码
        const [currentPage, setCurrentPage] = useState<number>(1)
        // 当前的分页size
        const [currentPageSize, setCurrentPageSize] = useState<number>(10)
        // 当前的分页size
        const [tableDataSource, setTableDataSource] = useState<Record<string, any>[]>([])
        // 批量操作选中的key
        const [tableSelectedRowKeys, setTableSelectedRowKeys] = useState<React.Key[]>([])

        useEffect(() => {
            setTableSelectedRowKeys(defaultSelectRowKeys)
        }, [])

        // 批量操作选中项变化时更新keys 并触发选中数据回调
        const onSelectRowKeysChange = (keys: React.Key[]) => {
            setTableSelectedRowKeys(keys)

            const newTableDataSource = JSON.parse(JSON.stringify(tableDataSource))
            const rowSelections = newTableDataSource.filter((item: Record<string, any>) =>
                keys.includes(item[tableRowKey]),
            )
            onTableRowChange?.(rowSelections)
        }

        // 根据批量操作选中项 渲染操作按钮
        const getSelectBtn: any = selectProps => {
            if (!showLimitBtn) return showLimitBtn
            const { selectedRowKeys, onCleanSelected } = selectProps
            const selectAll = () => {
                const tempKeys = tableDataSource.map(item => item[tableRowKey])
                setTableSelectedRowKeys(tempKeys)
            }
            return (
                <Space size={24}>
                    {selectedRowKeys.length === 0 ? (
                        <span>
                            <Button type={'primary'} onClick={selectAll}>
                                全选
                            </Button>
                        </span>
                    ) : (
                        <>
                            <span>
                                <Button type={'primary'} onClick={onCleanSelected}>
                                    取消选择
                                </Button>
                            </span>
                            <span>已选{tableSelectedRowKeys.length}项</span>
                            <span>
                                <Button
                                    type={'primary'}
                                    onClick={() => {
                                        //批量操作回调
                                    }}
                                >
                                    {limitBtnText}
                                </Button>
                            </span>
                        </>
                    )}
                </Space>
            )
        }

        // 响应table变化 数据请求处理
        const doRequest = async (params: ProTableRequest) => {
            if (currentTabKey === -1 && tabList.length > 0) {
                setCurrentTabKey(tabList[0]?.key)
                if (tabServerKey) {
                    params[tabServerKey] = tabList[0]?.key
                }
            }

            params[pageNumKey] = params.current
            params[pageSizeKey] = params.pageSize

            if (noPageNo) {
                delete params.pageNumKey
                delete params.pageSizeKey
            }

            if (pageNumKey && pageNumKey !== 'current') {
                delete params.current
            }

            if (pageSizeKey && pageSizeKey !== 'pageSize') {
                delete params.pageSize
            }

            delete params.size

            Object.keys(params).map(item => {
                params[item] = params?.[item]?.toString?.()?.trim?.()
                if (params[item] === '' || params[item] === undefined) {
                    delete params[item]
                }
            })

            const listData: ProTableResponse =
                ((await tableRequest(params)) as ProTableResponse) || {}
            // TODO 跟后端约定分页接口返回的数据结构进行修改
            if (noPageNo) {
                setTableDataSource(listData as unknown as Record<string, any>[])
                onTableSourceChange(listData as unknown as Record<string, any>[])
                return {}
            } else {
                const { data, current, pageSize, totalCount } = listData
                setTableDataSource(data)
                setCurrentPage(current)
                setCurrentPageSize(pageSize)
                return { current, total: totalCount }
            }
        }

        const getToolBarParams = (): ListToolBarProps | undefined => {
            if (tabList.length === 0) {
                return undefined
            } else {
                const getBadge = (count: number, active = false) => {
                    return (
                        <Badge
                            count={count}
                            style={{
                                marginBlockStart: -2,
                                marginInlineStart: 4,
                                color: active ? '#1890ff' : '#999',
                                backgroundColor: active ? '#E6f7ff' : '#eee',
                            }}
                        />
                    )
                }
                const getTabs = () => {
                    return tabList.map(item => {
                        return {
                            key: item.key.toString(),
                            label: (
                                <span key={item.key.toString()}>
                                    {item.label}
                                    {getBadge(
                                        item.count ?? 0,
                                        currentTabKey.toString() === item.key.toString(),
                                    )}
                                </span>
                            ),
                        }
                    })
                }
                return {
                    menu: {
                        type: 'tab',
                        activeKey: currentTabKey.toString(),
                        items: getTabs(),
                        onChange: key => {
                            setCurrentTabKey(key as number)
                            onTabChange?.(key as number)
                        },
                    },
                }
            }
        }

        const getRowSelectParmas = (): ProTableRowSelection => {
            if (hasSelection) {
                return {
                    alwaysShowAlert: true,
                    hideSelectAll,
                    selectedRowKeys: tableSelectedRowKeys,
                    onChange: onSelectRowKeysChange,
                    getCheckboxProps: onGetCheckboxProps,
                }
            } else {
                return false
            }
        }

        const getSearchParams = (): ProTableSearch => {
            if (search) {
                search.labelWidth = 110
                search.optionRender = (searchConfig, formProps, dom) => {
                    const [resetBtn, submitBtn] = dom
                    // resetBtn.props.style = { ...resetBtn.props.style }
                    return [
                        resetBtn,
                        <Button key={submitBtn.key} {...submitBtn.props} loading={false}>
                            {submitBtn.props.children}
                        </Button>,
                    ]
                }
                return search
            } else {
                return false
            }
        }

        const doRefresh = () => {
            const refreshParams: ProTableRequest = {
                current: currentPage,
                pageSize: currentPageSize,
            }
            if (tabServerKey) {
                refreshParams[tabServerKey] = currentTabKey
            }

            if (formRef.current) {
                formRef.current.resetFields()
            }

            doRequest(refreshParams)
        }

        const getRowSelection = () => {
            const newTableDataSource = JSON.parse(JSON.stringify(tableDataSource))
            const rowSelections = newTableDataSource.filter((item: Record<string, any>) =>
                tableSelectedRowKeys.includes(item[tableRowKey]),
            )
            return rowSelections
        }

        const initRowSelection = () => {
            setTableSelectedRowKeys([])
            onSelectRowKeysChange([])
        }

        useImperativeHandle(ref, () => {
            return {
                doRefresh,
                initRowSelection,
                getRowSelection,
            }
        })

        const getPagination = (): any => {
            if (noPageNo) {
                return false
            } else {
                return {
                    locale: {
                        // Options.jsx
                        items_per_page: '条/页',
                        jump_to: '跳至',
                        // jump_to_confirm: '',
                        page: '页',
                        // // Pagination.jsx
                        // prev_page: '',
                        // next_page: '',
                        // prev_5: '',
                        // next_5: '',
                        // prev_3: '',
                        // next_3: '',
                    },
                    showTotal: () => null,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    size: 'default',
                    defaultPageSize: 10,
                }
            }
        }

        return (
            <div ref={tableRef} className={styles.table}>
                <ProConfigProvider
                    prefixCls={prefixCls}
                    token={{ colorParams: '#000', fontSize: '16px' }}
                >
                    <ProTable
                        locale={{ emptyText: <Empty /> }}
                        columns={tableColumns}
                        params={
                            tabServerKey
                                ? { [tabServerKey]: currentTabKey, size: currentPageSize }
                                : { size: currentPageSize }
                        }
                        request={doRequest}
                        rowSelection={getRowSelectParmas()}
                        tableAlertRender={getSelectBtn}
                        tableAlertOptionRender={undefined}
                        dataSource={tableDataSource}
                        scroll={{ x: 1152 }}
                        options={false}
                        pagination={getPagination()}
                        rowKey={tableRowKey}
                        toolbar={getToolBarParams()}
                        search={getSearchParams()}
                        onSubmit={() => {
                            onSelectRowKeysChange([])
                        }}
                        onReset={() => {
                            onSelectRowKeysChange([])
                        }}
                        formRef={formRef}
                        {...selfProps}
                    />
                </ProConfigProvider>
            </div>
        )
    },
)

export default GlobalTable
