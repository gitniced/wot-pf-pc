import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

interface SummaryProps {
    scoreType: string
    pageData: {
        count?: number
        questionType: number
        needNumber: number
        score: number
    }[]
}

const Summary = (props: SummaryProps) => {
    const { pageData = [], scoreType } = props || {}
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalScore, setTotalScore] = useState<number>(0)

    // 计算总题数和总分
    const calculate = () => {
        let counts = 0,
            scores = 0
        pageData.forEach(item => {
            // 计算总题数和总分数
            const { needNumber = 0, score = 0 } = item || {}
            counts += Number(needNumber)
            scores += Number((Number(needNumber) * Number(score)).toFixed(1))
        })
        setTotalCount(counts)
        setTotalScore(scores)
    }

    useEffect(() => {
        calculate()
    }, [pageData])

    return (
        <>
            <Table.Summary.Row style={{ textAlign: 'center' }}>
                <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>{totalCount}题</Table.Summary.Cell>
                {scoreType === 'questiontype' && (
                    <>
                        <Table.Summary.Cell index={2}>-</Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                            <p style={{ width: '88px', wordWrap: 'break-word', margin: 'auto' }}>
                                {totalScore ? totalScore : '--'}分
                            </p>
                        </Table.Summary.Cell>
                    </>
                )}
            </Table.Summary.Row>
        </>
    )
}

export default Summary
