import { Modal } from 'antd'
import styles from './index.module.less'
import { Table, Tooltip } from 'antd'
import { useAntdTable } from 'ahooks'
import { useEffect, useState } from 'react'
import http from '@/servers/http'

interface Props {
    isModalOpen: boolean
    handleOk: (data: Record<string, any>[]) => void
    handleCancel: () => void
    taskCode: string
}

interface Result {
    total: number
    list: any[]
}

const Index = (props: Props) => {
    const { isModalOpen, handleOk, handleCancel, taskCode } = props
    const [dataList, setDataList] = useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRow, setSelectedRow] = useState<Record<string, any>[]>([])

    const getTableData = ({
        current,
        pageSize,
    }: {
        current: number
        pageSize: number
    }): Promise<Result> => {
        return http('/wil/research/course_task/page_outcome', 'post', {
            pageNo: current,
            pageSize,
            taskCode,
        }).then((res: any) => {
            const arr = res.data?.map((item: any) => ({
                ...item,
            }))

            return {
                total: res?.totalCount || 0,
                list: arr?.map((item: any) => ({ ...item, key: item?.code })) || [],
            }
        })
    }

    const { tableProps } = useAntdTable(getTableData, {
        defaultParams: [{ current: 1, pageSize: 10 }],
    })
    const { dataSource } = tableProps

    useEffect(() => {
        setDataList(dataSource)
    }, [dataSource])

    useEffect(() => {}, [])

    const columns = [
        {
            title: '成果名称',
            dataIndex: ['name'],
            ellipsis: true,
            render: (text: string) => {
                return (
                    <Tooltip placement="topLeft" title={text}>
                        {text}
                    </Tooltip>
                )
            },
        },
        {
            title: '所在学习活动',
            dataIndex: ['activityName'],
            ellipsis: true,
            render: (text: string) => {
                return (
                    <Tooltip placement="topLeft" title={text}>
                        {text}
                    </Tooltip>
                )
            },
        },
    ]

    const onSelectChange = (
        newSelectedRowKeys: React.Key[],
        newSelectedRow: Record<string, any>[],
    ) => {
        setSelectedRowKeys(newSelectedRowKeys)
        setSelectedRow(newSelectedRow)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <Modal
            title="关联学习成果"
            open={isModalOpen}
            onOk={() => {
                handleOk(selectedRow?.map(ele => ({ name: ele.name, code: ele.code })))
            }}
            onCancel={handleCancel}
        >
            <div className={styles.content}>
                <Table
                    columns={columns}
                    {...tableProps}
                    dataSource={dataList}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                />
            </div>
        </Modal>
    )
}

export default Index
