/**
 * 题型分值详情
 */
import { ModalValueContext } from '@/components/ModalProvider'
import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { useContext } from 'react'
import { questionTypeEnum } from '../../enums'

const { Text } = Typography

interface DataType {
    questionType: string
    needNumber: number
    score: number
    totalScore: number
}

const columns: ColumnsType<DataType> = [
    {
        title: '题型',
        dataIndex: 'questionType',
        render: t => (t ? (questionTypeEnum as any)[t] : '--'),
    },
    {
        title: '题目数量',
        dataIndex: 'needNumber',
    },
    {
        title: '分值',
        dataIndex: 'score',
    },
    {
        title: '分数',
        dataIndex: 'totalScore',
        render: t => (t ? `${t}分` : '--'),
    },
]
const ScoreDetailModal = () => {
    const { dataSource } = useContext(ModalValueContext)

    const data = dataSource

    return (
        <Table
            rowKey={record => record.questionType}
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            summary={pageData => {
                const map = pageData.reduce(
                    (pre, next) => {
                        pre.que = Number(next.needNumber) + pre.que
                        pre.totalScore = next.totalScore
                            ? Number(next.totalScore) + pre.totalScore
                            : pre.totalScore
                        return pre
                    },
                    { que: 0, totalScore: 0 },
                )

                return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Text>{map.que}题</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>
                                <Text>-</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>
                                <Text>{map.totalScore}分</Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                )
            }}
        />
    )
}

export default ScoreDetailModal
