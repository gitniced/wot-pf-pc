// 选择评价计划
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'
import type { ModalProps, Item } from './interface'
import { getPlanDataList, getPlanTypeCategoryList } from './api'
import { getCookie } from '@/storage'
// import 'antd/dist/antd.variable.css';
import { toJS } from 'mobx'

// import styles from './index.module.less'
// import { getPlanListApi, getPlanTypeCategory } from '../api'
// import type { OptionProps } from 'antd/lib/select'
// import { getCookie } from '@/storage'
// import { MAX_COUNT, PLAN_CATEGORY_TEXT } from '../constant'

const PlanPublicModal = ({
    visible,
    onCancel,
    onConfirmSel,
    title,
    tableOptions = {},
    selectType,
    selectedRowKeys,
    _selectedRows,
}: ModalProps) => {
    console.log(
        visible,
        onCancel,
        onConfirmSel,
        title,
        tableOptions,
        selectType,
        selectedRowKeys,
        _selectedRows,
        'props',
    )
    const [selectedRowKeysInner, setSelectedRowKeysInner] = useState<React.Key[]>(selectedRowKeys)
    const [selectedRow, setSelectedRow] = useState<any[]>(_selectedRows)
    const [planTypeList, setPlanTypeList] = useState<any[]>([])

    // const onSelectChange = (newSelectedRowKeys: React.Key[],selectedRows: any[]) => {

    //     setSelectedRowKeysInner(newSelectedRowKeys);
    //     setSelectedRow(selectedRows)
    // };

    const onSelect = (record: any, selected: boolean) => {
        const key = tableOptions?.rowKey || 'id'
        if (selected) {
            setSelectedRow(selectType === 'radio' ? [record] : [...selectedRow, record])
            setSelectedRowKeysInner(
                selectType === 'radio' ? [record[key]] : [...selectedRowKeysInner, record[key]],
            )
        }
        if (!selected) {
            let productListSelected = selectedRow
            let delIndex = null
            for (let i = 0; i < productListSelected.length; i++) {
                if (productListSelected[i][key] === record[key]) {
                    delIndex = i
                    break
                }
            }
            if (delIndex !== null) {
                productListSelected.splice(delIndex, 1)
                setSelectedRow(productListSelected)
            }
            setSelectedRowKeysInner(selectedRowKeysInner.filter(code => code !== record[key]))
        }
    }

    const onSelectAll = (selected: boolean, selectedRows: any, changeRows: any) => {
        const key = tableOptions?.rowKey || 'id'
        if (selected) {
            setSelectedRow([...selectedRow, ...changeRows])
            setSelectedRowKeysInner([...selectedRowKeysInner, ...changeRows.map(row => row[key])])
        }
        if (!selected) {
            let productListSelected = toJS(selectedRow)
            let delIndex: number[] = []
            const map = changeRows.reduce((total, cur) => {
                total[String(cur[key])] = 1
                return total
            }, {})
            productListSelected.forEach((item, index) => {
                if (map[String(item[key])]) {
                    delIndex.push(index)
                }
            })
            for (let k = delIndex.length - 1; k >= 0; k--) {
                productListSelected.splice(delIndex[k], 1)
            }

            let pureProductListSelected = productListSelected.filter((item: any) => {
                return item !== undefined
            })
            setSelectedRow(pureProductListSelected)
            setSelectedRowKeysInner(
                selectedRowKeysInner.filter(code => !changeRows.some(row => row[key] === code)),
            )
        }
    }

    const getPlanTypeCategory = async () => {
        const res: any = (await getPlanTypeCategoryList()) || {}
        setPlanTypeList(res)
    }

    useEffect(() => {
        setSelectedRowKeysInner(selectedRowKeys)
        setSelectedRow(_selectedRows)
        console.log('selectedRowKeys', selectedRowKeys)
    }, [selectedRowKeys])

    useEffect(() => {
        if (visible) {
            getPlanTypeCategory()
            setSelectedRowKeysInner(selectedRowKeys)
            setSelectedRow(_selectedRows)
        }
    }, [visible])

    const getRequest = async (pageSize: number, pageNo: number, params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const res: any =
            (await getPlanDataList({
                orgCode: organizationCode,
                pageSize,
                currentPage: pageNo,
                type: 'plan_formula',
                ...params,
                planType: Number(params.planType) || 0,
            })) || {}
        let { records = [], total, success } = res
        return {
            data: records,
            totalCount: total,
            success,
        }
    }

    const defaultColumns: ColumnsType<Item> = [
        {
            title: '计划名称',
            dataIndex: 'planName',
            ellipsis: true,
            search: true,
            formItemProps: {
                labelCol: { span: 6 },
            },
            render: (_, record) => {
                return record?.appraise?.name
            },
        },
        {
            title: '分类',
            dataIndex: 'planType',
            ellipsis: true,
            valueType: 'select',
            search: true,
            render: (_, record) => {
                return record?.planTypeCategory?.name
            },
            valueEnum: Object.fromEntries(
                planTypeList.map(item => [item.key, { text: item.name }]) || [],
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: text => {
                return dayjs(text).format('YYYY-MM-DD hh:mm:ss')
            },
        },
    ]

    return (
        <Modal
            forceRender
            title={title}
            open={visible}
            centered
            onCancel={() => {
                onCancel()
            }}
            width={1000}
            destroyOnClose
            maskClosable={false}
            onOk={() => {
                onConfirmSel(selectedRow, selectedRowKeysInner)
            }}
        >
            {visible && (
                <SuperTable
                    columns={tableOptions?.columns || defaultColumns}
                    search={tableOptions.hasOwnProperty('search') ? tableOptions.search : true}
                    isAutoBackPage
                    rowSelection={{
                        onSelect,
                        onSelectAll,
                        type: selectType,
                        selectedRowKeys: selectedRowKeysInner,

                        preserveSelectedRowKeys: true,
                        // onChange: onSelectChange,
                        getCheckboxProps: record => ({
                            disabled: record.planCount === 0,
                        }),
                    }}
                    rowKey={tableOptions?.rowKey || 'id'}
                    toolBar={false}
                    pagination={{ defaultPageSize: 5 }}
                    request={({ pageSize = 5, pageNo = 1, ...params }) => {
                        return tableOptions?.getRequest
                            ? tableOptions?.getRequest(pageSize, pageNo, params)
                            : getRequest(pageSize, pageNo, params)
                    }}
                />
            )}
        </Modal>
    )
}

export default PlanPublicModal
