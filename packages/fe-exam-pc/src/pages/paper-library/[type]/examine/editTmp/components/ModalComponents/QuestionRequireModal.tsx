/**
 * 题型要求
 */
import { Table } from 'antd'
import type { FC } from 'react'
import { useContext } from 'react'
import type { ExamineDetailType } from '../../interface'
import type { ColumnsType } from 'antd/es/table'
import { ModalValueContext } from '@/components/ModalProvider'
import { questionTypeEnum } from '../../enums'
import TitleBlock from '@/components/TitleBlock'

interface QuestionRequireModalType {
    visible: boolean
    handleClose: () => void
}
const renderFunc = (text: string) => text || '--'

const levelColumns: ColumnsType<{ level: number; needNumber: number }> = [
    {
        title: '难易程度',
        dataIndex: 'levelName',
        width: 323.5,
    },
    {
        title: '要求题目数量',
        dataIndex: 'needNumber',
        key: 'needNumber',
    },
]

const InnerTable: FC<{ data: ExamineDetailType }> = props => {
    const { data } = props

    const columns: ColumnsType<{ questionType: string; needNumber: number }> = [
        {
            title: '题型',
            dataIndex: 'questionType',
            render: t => (t ? (questionTypeEnum as any)[t] : '--'),
            ellipsis: true,
        },
        {
            title: '要求题目数量',
            dataIndex: 'needNumber',
            key: 'needNumber',
            ellipsis: true,
            render: renderFunc,
        },
    ]

    return (
        <>
            <TitleBlock title="题型要求" size="small" marginBottom={16} />
            <Table
                rowKey={record => record.questionType}
                columns={columns}
                // @ts-ignore
                dataSource={data?.questionConfigList || []}
                pagination={false}
                summary={pageData => {
                    const sum = pageData.reduce((pre, next) => pre + Number(next.needNumber), 0)

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>{sum}题</Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    )
                }}
            />
            <TitleBlock title="难易程度要求" size="small" marginTop={16} marginBottom={16} />
            {data?.difficultyLimit ? (
                <Table
                    rowKey={record => record.level}
                    columns={levelColumns}
                    // @ts-ignore
                    dataSource={data?.difficultyTableData || []}
                    pagination={false}
                    summary={pageData => {
                        const sum = pageData.reduce((pre, next) => pre + Number(next.needNumber), 0)
                        return (
                            <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>{sum}题</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        )
                    }}
                />
            ) : (
                <>不限制</>
            )}
            <></>
        </>
    )
}

const InnerDescription: FC<{ data: ExamineDetailType }> = props => {
    const { data } = props
    return (
        <>
            <TitleBlock title="题型要求" size="small" marginBottom={16} />
            <p>
                至少包含{' '}
                {data.questionConfigList
                    .map(v => (questionTypeEnum as any)[v.questionType])
                    .join('、')}{' '}
                中的 {data.questionTypeLeast} 种题型
            </p>
            <p style={{ marginTop: '12px' }}>总题数不少于 {data.questionTotal} 题</p>

            <TitleBlock title="难易程度要求" size="small" marginTop={16} marginBottom={16} />
            {data?.difficultyLimit ? (
                <Table
                    rowKey={record => record.level}
                    columns={levelColumns}
                    // @ts-ignore
                    dataSource={data?.difficultyTableData || []}
                    pagination={false}
                    summary={pageData => {
                        const sum = pageData.reduce((pre, next) => pre + Number(next.needNumber), 0)
                        return (
                            <>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>{sum}题</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        )
                    }}
                />
            ) : (
                <>不限制</>
            )}
        </>
    )
}

const QuestionRequireModal: FC<QuestionRequireModalType> = () => {
    const data = useContext(ModalValueContext)
    const { dataSource } = data || {}
    console.log('QuestionRequireModal', data)

    return (
        <>
            {dataSource?.questionStructure === 'questiontype' ? (
                <InnerTable data={dataSource} />
            ) : (
                <InnerDescription data={dataSource} />
            )}
        </>
    )
}

export default QuestionRequireModal
