// 内容弹窗

import React, { useEffect, useState } from 'react'
import type { CategoryTypeItem, PlanListModalProps, PlanListItem } from './interface'
import { Modal, Select, message } from 'antd'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'

import styles from './index.module.less'
import { getPlanListApi, getPlanTypeCategory } from './api'
import type { OptionProps } from 'antd/lib/select'
import { getCookie } from '@/storage'
import { MAX_COUNT, PLAN_CATEGORY_TEXT } from './constant'

const PlanListModal = ({
    open,
    onCancel,
    onOk,
    selectedPlans: prevSelectedPlans,
    type = 'checkbox',
}: PlanListModalProps) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
    const [selectedPlans, setSelectedPlans] = useState<PlanListItem[]>([])

    const [categoryOptions, setCategoryOptions] = useState<OptionProps[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (open) {
            // 获取计划分类列表枚举
            setLoading(true)
            getPlanTypeCategory()
                .then((data: any) => {
                    setCategoryOptions(
                        data?.map((item: CategoryTypeItem) => ({
                            label: item.name,
                            value: item.key,
                        })),
                    )
                })
                .finally(() => {
                    setLoading(false)
                })

            if (prevSelectedPlans) {
                setSelectedPlans(prevSelectedPlans!)
                setSelectedRowKeys(prevSelectedPlans.map(item => item.id))
            }
        }
    }, [open])

    const getPlanList = async (params: any) => {
        const { pageSize, pageNo, planName, planType } = params
        const res: any = await getPlanListApi({
            planName,
            planType,
            pageSize,
            currentPage: pageNo,
            type: 'identification_result',
            orgCode: getCookie('SELECT_ORG_CODE'),
        })

        return {
            data: res.records,
            totalCount: res.total,
            success: true,
        }
    }

    const columns: ColumnsTypeItem<PlanListItem>[] = [
        {
            title: '计划名称',
            dataIndex: 'planName',
            search: true,
            formItemProps: {
                labelCol: { span: 6 },
            },
            render: (_, { appraise }) => appraise?.name,
        },
        {
            title: '分类',
            dataIndex: 'planType',
            search: true,
            renderFormItem: () => <Select placeholder="请选择" options={categoryOptions} />,
            render: val => PLAN_CATEGORY_TEXT[val],
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: val => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
        },
    ]

    // 添加计划
    const handleAddPlan = () => {
        const currentSelectedCount = selectedPlans.length

        if (currentSelectedCount > MAX_COUNT) {
            message.error(`最多可添加${MAX_COUNT}个评价计划`)
            return
        }
        onOk(selectedPlans)
    }

    return (
        <Modal
            open={open}
            title="添加内容"
            width={1000}
            onCancel={() => {
                setSelectedPlans([])
                onCancel()
            }}
            onOk={handleAddPlan}
            className={styles.plan_list_modal}
        >
            <SuperTable
                // @ts-ignore
                rowKey="id"
                loading={loading}
                request={getPlanList}
                search={{ expand: true }}
                columns={columns}
                rowSelection={{
                    type,
                    selectedRowKeys: selectedRowKeys,
                    onChange: (_selectedRowKeys: React.Key[], allSelectedRows: PlanListItem[]) => {
                        setSelectedRowKeys(_selectedRowKeys as number[])
                        setSelectedPlans(allSelectedRows)
                    },
                    preserveSelectedRowKeys: true,
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

export default PlanListModal
