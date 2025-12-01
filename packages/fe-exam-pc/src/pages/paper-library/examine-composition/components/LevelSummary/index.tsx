import { QUESTION_STRUCTURE_TYPE } from '@/pages/paper-library/[type]/const'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

const LevelSummary = (props: any) => {
    const {
        pageData = [],
        type,
        questionStructure,
        questionTableData,
        ruleQuestionTotal,
    } = props || {}
    // const [summaryText, setSummaryText] = useState<string>('')
    const [summaryText, setSummaryText] = useState<React.ReactElement>(<></>)

    // 计算总题数和总分
    const calculate = (tempNum: number, tempTotal: number) => {
        if (tempTotal) {
            if (tempNum === tempTotal) {
                // setSummaryText(`共 ${tempNum} 题，符合试卷试题数量要求`)
                setSummaryText(<span>共 {tempNum} 题，符合试卷试题数量要求</span>)
            } else {
                if (tempNum > tempTotal) {
                    // setSummaryText(`共 ${tempNum} 题，超出 ${tempNum - tempTotal} 题`)
                    setSummaryText(
                        <span>
                            共 {tempNum} 题，超出{' '}
                            <span style={{ color: '#ff0000' }}>{tempNum - tempTotal}</span> 题
                        </span>,
                    )
                } else {
                    // setSummaryText(`共 ${tempNum} 题，仍缺 ${tempTotal - tempNum} 题`)
                    setSummaryText(
                        <span>
                            共 {tempNum} 题，仍缺{' '}
                            <span style={{ color: '#ff0000' }}>{tempTotal - tempNum}</span> 题
                        </span>,
                    )
                }
            }
        } else {
            // setSummaryText('请先设置题型结构')
            setSummaryText(<span>请先设置题型结构</span>)
        }
    }

    useEffect(() => {
        let num = pageData.reduce((acc: number, item: any) => {
            return acc + (item.needNumber || 0)
        }, 0)
        let total = 0
        if (type === 'examine_create_detail') {
            // setSummaryText(`共 ${num} 题`)
            setSummaryText(<span>共 {num} 题</span>)
        } else {
            if (questionStructure === QUESTION_STRUCTURE_TYPE.QUESTION_TYPE) {
                total = questionTableData.reduce((acc: number, item: any) => {
                    return acc + Number(item.needNumber || 0)
                }, 0)

                // 计算总题数和总分
                // 并更新 summaryText
                // 这里的 num 是总题数，total 是可用题数
                calculate(num, total)
            } else {
                if (questionTableData.length === 0) {
                    // setSummaryText('请先设置题型结构')
                    setSummaryText(<span>请先设置题型结构</span>)
                } else {
                    total = ruleQuestionTotal || 0
                    // 计算总题数和总分
                    // 并更新 summaryText
                    // 这里的 num 是总题数，total 是可用题数
                    calculate(num, total)
                }
            }
        }
    }, [pageData, questionTableData, ruleQuestionTotal])

    return (
        <>
            <Table.Summary.Row style={{ textAlign: 'center' }}>
                <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>{summaryText}</Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    )
}

export default LevelSummary
