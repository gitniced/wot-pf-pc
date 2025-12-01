/**
 * 批量设置分值
 */
import { ModalCallbackContext, ModalValueContext } from '@/components/ModalProvider'
import { oneDecimal } from '@/utils/numberTransform'
import { InputNumber, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { useContext, useEffect, useState } from 'react'
import { questionTypeEnum } from '../../enums'

const { Text } = Typography

interface DataType {
    questionType: string
    needNumber: number
    unificationScore: number
    totalScore: number
}

const formatData = (v: string) => {
    if (!v) return v
    return oneDecimal(v)
}

const BatchSetScoreModal = () => {
    const { dataSource } = useContext(ModalValueContext)
    const { confirmValueCallback } = useContext(ModalCallbackContext)

    const [tableData, setTableData] = useState(dataSource || [])

    useEffect(() => {
        confirmValueCallback?.(tableData)
    }, [tableData, confirmValueCallback])

    const changeUnificationScore = (value: string, record: DataType) => {
        const d = oneDecimal(value)
        const list = tableData.map((v: DataType) => {
            if (v.questionType === record.questionType) {
                return {
                    ...v,
                    unificationScore: d,
                    totalScore: Number(v.needNumber) * Number(d),
                }
            }
            return v
        })
        setTableData(list)
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
            dataIndex: 'unificationScore',
            render: (t, r) => {
                return (
                    <InputNumber
                        placeholder="请输入"
                        value={t}
                        onBlur={e => changeUnificationScore(e.target.value, r)}
                        // @ts-ignore
                        formatter={formatData}
                        // @ts-ignore
                        parser={formatData}
                    />
                )
            },
        },
        {
            title: '分数',
            dataIndex: 'totalScore',
            render: t => t || '--',
        },
    ]

    return (
        <Table
            rowKey={'questionType'}
            columns={columns}
            dataSource={tableData}
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

export default BatchSetScoreModal
