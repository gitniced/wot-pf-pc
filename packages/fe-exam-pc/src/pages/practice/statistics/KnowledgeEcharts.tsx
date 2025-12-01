// 知识点统计

import { Row, Col, Card } from 'antd'
import { useLayoutEffect, useState } from 'react'
import type { KnowledgeCountItem, KnowledgeCountData } from './interface'
import styles from './index.module.less'
import type { Options } from '@ant-design/plots'
import { Pie, Bar } from '@ant-design/plots'
import { Empty, ellipsisText } from '@wotu/wotu-components'

const KnowledgeEcharts: React.FC<KnowledgeCountData> = ({
    questionCount = 0,
    knowledgePointCount = [],
    wrongKnowledgePointCount = [],
}) => {
    const [pieConfig, setPieConfig] = useState<Options>({
        angleField: 'count',
        colorField: 'knowledgePointTitle',
        radius: 0.8,
        innerRadius: 0.6,
        autoFit: true,
        height: 440,
        paddingLeft: 40,
        paddingRight: 40,
        legend: {
            color: {
                title: false,
                position: 'bottom',
                layout: {
                    justifyContent: 'center',
                },
                rowPadding: 5,
                itemLabelFontSize: 16,
                labelFormatter: (title: string) => ellipsisText(title, 6),
            },
        },
        tooltip: {
            title: 'knowledgePointTitle',
            items: [
                {
                    name: '模拟题数量',
                    field: 'count',
                    valueFormatter: d => d,
                },
            ],
        },
    })

    const [barConfig, setBarConfig] = useState<Options>({
        xField: 'knowledgePointTitle',
        yField: 'percent',
        paddingRight: 80,
        height: 440,
        style: {
            maxWidth: 15,
        },
        axis: {
            x: {
                tick: false,
                labelFormatter: (title: string) => ellipsisText(title, 6),
                labelFontSize: 16,
            },
            y: {
                grid: false,
                tick: false,
                label: false,
                title: false,
            },
        },
        label: {
            text: 'percent',
            formatter: '.2%',
            style: {
                fill: '#fff',
                dx: -5,
            },
        },
        tooltip: {
            title: 'knowledgePointTitle',
            items: [
                {
                    name: '错误率',
                    channel: 'y',
                    valueFormatter: d => `${(d * 100).toFixed(2)}%`,
                },
            ],
        },
    })

    useLayoutEffect(() => {
        setPieConfig(prev => ({
            ...prev,
            data: knowledgePointCount,
            label: {
                text: (data: KnowledgeCountItem) =>
                    `${ellipsisText(data.knowledgePointTitle, 5)}\n ${data.count}题`,
                position: 'spider',
                style: {
                    fontSize: 16,
                },
            },
            annotations: [
                {
                    type: 'text',
                    style: {
                        text: '总题数',
                        x: '50%',
                        y: '46%',
                        textAlign: 'center',
                        fontSize: 16,
                        fill: 'rgba(0,0,0,0.45)',
                    },
                },
                {
                    type: 'text',
                    style: {
                        text: `${questionCount}`,
                        x: '50%',
                        y: '54%',
                        textAlign: 'center',
                        fontSize: 30,
                        fill: 'rgba(0,0,0,0.85)',
                    },
                },
            ],
        }))
    }, [knowledgePointCount])

    useLayoutEffect(() => {
        setBarConfig(prev => ({
            ...prev,
            data: wrongKnowledgePointCount,
        }))
    }, [wrongKnowledgePointCount])

    return (
        <div className={styles.component_knowledge_charts}>
            <Row gutter={24}>
                <Col span={12}>
                    <Card className={styles.card} title="模拟题数量">
                        {
                            // @ts-ignore
                            knowledgePointCount.length ? <Pie {...pieConfig} /> : <Empty />
                        }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className={styles.card} title="错误率排序">
                        {
                            // @ts-ignore
                            wrongKnowledgePointCount.length ? <Bar {...barConfig} /> : <Empty />
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default KnowledgeEcharts
