import { Space, Switch, Table, Tooltip, Typography } from 'antd'
import getColumns from '../../columns'
import type { TableDataType } from '../../interface'
import type { UseTableSearchType } from '../../hooks/useTableSearch'
import { InfoCircleOutlined } from '@ant-design/icons'
import { history, useParams } from 'umi'
import type { QuestionRouteType } from '@/hooks/useCommonParams'

export interface TableListType {
    hooks: UseTableSearchType
    handlePublish: (checked: boolean, data: TableDataType) => void
    handleDownload: (data: TableDataType) => void
    handlePreview: (data: TableDataType) => void
    handleDelete: (data: TableDataType) => void
}

const TableList = (props: TableListType) => {
    const { type } = useParams() as { type: QuestionRouteType }
    const { hooks, handlePublish, handleDownload, handlePreview, handleDelete } = props
    const colums = getColumns().concat([
        {
            title: (
                <div>
                    发布状态
                    <Tooltip title="草稿状态下不可被引用">
                        <InfoCircleOutlined style={{ marginLeft: '5px' }} />
                    </Tooltip>
                </div>
            ),
            key: 'publishState',
            dataIndex: 'publishState',
            ellipsis: true,
            width: 100,
            fixed: 'right',
            render: (t, r) => {
                return (
                    <Switch
                        checkedChildren="发布"
                        unCheckedChildren="草稿"
                        onChange={v => handlePublish(v, r)}
                        checked={t === '1'}
                    />
                )
            },
        },
        {
            title: '操作',
            dataIndex: 'options',
            key: 'option',
            width: 200,
            fixed: 'right',
            render: (t, r) => {
                const { publishState } = r || {}
                return (
                    <Space>
                        <Typography.Link key="download" onClick={() => handleDownload(r)}>
                            下载
                        </Typography.Link>
                        <Typography.Link key="preview" onClick={() => handlePreview(r)}>
                            预览
                        </Typography.Link>
                        {/* 草稿状态下支持删除、重新生成、编辑操作 */}
                        {publishState === '0' ? (
                            <>
                                <Typography.Link key="delete" onClick={() => handleDelete(r)}>
                                    删除
                                </Typography.Link>
                                <Typography.Link
                                    onClick={() =>
                                        history.push(
                                            `/paper-library/${type}/examine/create?code=${r.code}`,
                                        )
                                    }
                                    key="edit"
                                >
                                    重新生成
                                </Typography.Link>
                                <Typography.Link
                                    onClick={() =>
                                        history.push(
                                            `/paper-library/${type}/examine/edit?code=${r.code}`,
                                        )
                                    }
                                    key="editable"
                                >
                                    编辑
                                </Typography.Link>
                            </>
                        ) : (
                            <Typography.Link
                                onClick={() =>
                                    history.push(
                                        `/paper-library/${type}/examine/detail?code=${r.code}`,
                                    )
                                }
                                key="view"
                            >
                                查看试卷结构
                            </Typography.Link>
                        )}
                    </Space>
                )
            },
        },
    ])

    return (
        <Table
            rowKey={(record: TableDataType) => record.code}
            columns={colums}
            dataSource={hooks.tableData}
            bordered={false}
            scroll={{ x: 1300 }}
            pagination={{
                ...hooks.pagination,
                showQuickJumper: true,
                showTotal: total => `共 ${total} 项`,
                showSizeChanger: true,
                onChange: hooks.paginationChangeHandler,
            }}
        />
    )
}

export default TableList
