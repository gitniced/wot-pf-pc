import { Table } from 'antd'
import type { FC } from 'react'
import type { TableDataType, UseTableSearchType } from '../../interface'
import type { ColumnsType } from 'antd/es/table'
import { questionLevelEnum, questionTypeEnum } from '../../enums'
import styles from './index.module.less'

interface QuestionTableType {
    hooks: UseTableSearchType
}

const renderFunc = (text: string) => text || '-'

const columns: ColumnsType<TableDataType> = [
    {
        title: '题目/题干',
        dataIndex: 'title',
        ellipsis: true,
        width: 292,
        render: (title: string) => (
            // 富文本图片转文字
            <div
                className={styles.editor_text}
                dangerouslySetInnerHTML={{
                    // @ts-ignore
                    __html: title.replaceAll(/<img.*?(?:>|\/>)/gi, '（图）'),
                }}
            />
        ),
    },
    {
        title: '题型',
        dataIndex: 'type',
        key: 'type',
        ellipsis: true,
        width: 110,
        render: t => (t ? (questionTypeEnum as any)[t] : '-'),
    },
    {
        title: '难易程度',
        dataIndex: 'level',
        width: 100,
        render: t => (t ? (questionLevelEnum as any)[t] : '-'),
    },
    {
        title: '区分度',
        dataIndex: 'distinction',
        key: 'distinction',
        ellipsis: false,
        width: 100,
        render: renderFunc,
    },
    {
        title: '鉴定点',
        dataIndex: 'authPoint',
        ellipsis: true,
        width: 170,
        render: renderFunc,
    },
]

const QuestionTable: FC<QuestionTableType> = props => {
    const { hooks } = props

    return (
        <Table
            rowKey={(record: TableDataType) => record.code}
            columns={columns}
            className={styles.question_table}
            dataSource={hooks.tableData}
            rowSelection={hooks.rowSelection}
            pagination={{
                ...hooks.pagination,
                showQuickJumper: true,
                showTotal: total => (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span className="mRight16">
                            已选
                            {hooks.selectedKeys.length}项
                        </span>
                        <span>共 {total} 项</span>
                    </div>
                ),
                showSizeChanger: true,
                onChange: hooks.paginationChangeHandler,
            }}
        />
    )
}

export default QuestionTable
