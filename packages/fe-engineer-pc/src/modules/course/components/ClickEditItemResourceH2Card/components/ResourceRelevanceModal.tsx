import { getAuthResourcePage } from '@/modules/course/service'
import { usePagination } from 'ahooks'
import { Modal, Table, message } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import type { TableColumnsType } from 'antd'
import type { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import { RESOURCE_FORMAT_LABEL, RESOURCE_TYPE_LABEL } from '@/modules/resource/const'
import type { ILearningResourcePart } from '@/modules/course/types/learning'

interface IResourceRelevanceModalProps {
    open: boolean
    onCancel: () => void
    onOk: (selectedResources: ILearningResourcePart[]) => void
    courseCode: string
    excludeResourceCode: string[]
}

const ResourceRelevanceModal = (props: IResourceRelevanceModalProps) => {
    const { open, onCancel, onOk, courseCode, excludeResourceCode } = props
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRows, setSelectedRows] = useState<ILearningResourcePart[]>([])

    const getList = useCallback(
        async (params: Parameters<Parameters<typeof usePagination>[0]>[0]) => {
            const res = await getAuthResourcePage({
                pageNo: params.current,
                pageSize: params.pageSize,
                courseCode: courseCode,
                excludeResourceCode: excludeResourceCode,
            })
            return {
                total: res.totalCount,
                list: res.data,
            }
        },
        [courseCode, excludeResourceCode],
    )

    const { data, pagination, loading } = usePagination(getList, {
        refreshDeps: [],
        debounceWait: 300,
        ready: open,
    })

    const tablePagination = useMemo(
        () => ({
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number) => `共${total}个项目`,
        }),
        [pagination],
    )

    const columns: TableColumnsType<ILearningResourcePart> = [
        {
            title: '名称',
            dataIndex: 'name',
            width: '50%',
            ellipsis: true,
        },
        {
            title: '格式',
            dataIndex: 'format',
            width: '25%',
            render: (value: RESOURCE_FORMAT) => RESOURCE_FORMAT_LABEL[value],
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: '25%',
            render: (value: RESOURCE_TYPE) =>
                RESOURCE_TYPE_LABEL[value as keyof typeof RESOURCE_TYPE_LABEL],
        },
    ]

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: ILearningResourcePart[]) => {
            setSelectedRowKeys(keys)
            setSelectedRows(rows)
        },
    }

    const handleOk = () => {
        if (selectedRows.length === 0) {
            message.warning('请选择要关联的资源')
            return
        }
        onOk(selectedRows)
        setSelectedRowKeys([])
        setSelectedRows([])
    }

    const handleCancel = () => {
        onCancel()
        setSelectedRowKeys([])
        setSelectedRows([])
    }

    return (
        <Modal
            title="从资源库关联"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            width={800}
            okText="确定"
            cancelText="取消"
            centered
        >
            <Table
                dataSource={data?.list || []}
                columns={columns}
                pagination={tablePagination}
                loading={loading}
                rowKey="code"
                rowSelection={rowSelection}
                size="small"
            />
        </Modal>
    )
}

export default ResourceRelevanceModal
