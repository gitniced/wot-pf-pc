import { Modal } from 'antd'
import type { CategoryItem, CategoryModalProps, PlanTypeListItem } from './interface'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { useEffect, useState } from 'react'
import { getPlanTypeListApi } from './api'
import { getCookie } from '@/storage'

import styles from './index.module.less'

const CategoryModal = ({ open, onCancel, onOk, selectedCategory }: CategoryModalProps) => {
    // 已经选择的分类
    const [selectedCategories, setSelectedCategories] = useState<PlanTypeListItem[]>([])

    // 已经选择的分类Key
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    useEffect(() => {
        if (selectedCategory) {
            setSelectedRowKeys([selectedCategory?.key])
        }
    }, [selectedCategory])

    const columns: ColumnsTypeItem<CategoryItem>[] = [
        {
            title: '分类名称',
            dataIndex: 'planTypeCategory',
            render: val => val?.name,
        },
        {
            title: '计划数量',
            dataIndex: 'planCount',
        },
    ]

    const getCategoryList = async (params: any) => {
        const { pageNo } = params
        const res: any = await getPlanTypeListApi({
            currentPage: pageNo,
            pageSize: 5,
            orgCode: getCookie('SELECT_ORG_CODE'),
            type: 'identification_result',
        })

        const { records = [], total } = res

        if (selectedCategory) {
            const _selectedCategories = records.filter(
                (item: PlanTypeListItem) => item.planTypeCategory.key === selectedCategory?.key,
            )
            setSelectedCategories(_selectedCategories)
        }

        return {
            data: records,
            totalCount: total,
            success: true,
        }
    }

    return (
        <Modal
            title="选择分类"
            open={open}
            width={1000}
            onCancel={() => {
                setSelectedCategories([])
                onCancel()
            }}
            onOk={() => {
                onOk(selectedCategories[0])
            }}
            className={styles.category_modal}
        >
            <SuperTable
                // @ts-ignore
                rowKey={record => record.planTypeCategory.key}
                request={getCategoryList}
                columns={columns}
                search={false}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: selectedRowKeys,
                    onChange: (
                        _selectedRowKeys: React.Key[],
                        allSelectedRows: PlanTypeListItem[],
                    ) => {
                        setSelectedCategories(allSelectedRows)
                        setSelectedRowKeys(_selectedRowKeys)
                    },
                    getCheckboxProps: (record: PlanTypeListItem) => ({
                        disabled: !record.planIds || record.planIds.length === 0,
                    }),
                }}
                pagination={{
                    defaultPageSize: 5,
                    showQuickJumper: false,
                    showTotal: () => null,
                }}
            />
        </Modal>
    )
}

export default CategoryModal
