import React, { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import type { CourseDesignProgress } from '../../types'

interface DesignProgressChartProps {
    data?: CourseDesignProgress[]
}

const DesignProgressChart: React.FC<DesignProgressChartProps> = ({ data = [] }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const chartRef = useRef<Chart | null>(null)

    useEffect(() => {
        if (!ref.current) return

        if (!data || data.length === 0) {
            return
        }

        const chartData: { range: string; value: number; progress: number }[] = []

        for (let i = 1; i <= 10; i++) {
            const item = data.find(d => d.progress === i)
            const rangeLabel = `${(i - 1) * 10}%~${i * 10}%`

            chartData.push({
                range: rangeLabel,
                value: item?.courseNum || 0,
                progress: i,
            })
        }

        if (chartRef.current) {
            chartRef.current.destroy()
            chartRef.current = null
        }

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
            height: 132,
            paddingBottom: 12,
        })

        chart.theme({
            type: 'classicDark',
            components: {
                axis: {
                    gridLine: { stroke: 'rgba(255,255,255,0.08)' },
                    titleFill: 'rgba(255,255,255,0.65)',
                    labelFill: 'rgba(221,234,255,0.85)',
                },
                legendCategory: {
                    titleFill: 'rgba(221,234,255,0.85)',
                    itemLabelFill: 'rgba(221,234,255,0.85)',
                },
                tooltip: {},
            },
            canvas: { backgroundColor: '#021630' },
        })

        chart
            .interval()
            .data(chartData)
            .encode('x', 'range')
            .encode('y', 'value')
            .encode('color', d => {
                const colors = [
                    'linear-gradient(180deg, #03DFFC 0%, #1482D7 100%)',
                    'linear-gradient(180deg, #60F9F9 0%, #05A998 100%)',
                ]
                return colors[(d.progress - 1) % 2]
            })
            .scale('x', { padding: 0 })
            .scale('y', { nice: true })
            .legend('color', false)
            .tooltip({
                title: d => `进度${d.range}`,
                items: [
                    (d, _index, _data, _column) => {
                        return {
                            name: '课程数',
                            value: d.value,
                        }
                    },
                ],
            })

        chart.interaction('tooltip', {
            shared: false,
            groupName: false,
            css: {
                '.g2-tooltip': {
                    background: 'rgba(0,0,16,0.9)',
                    border: '1px solid #4570AE',
                    'border-radius': '4px',
                    'box-shadow': '0px 0px 8px 0px #062C5E',
                    display: 'flex',
                    'flex-direction': 'column',
                    gap: '8px',
                },
                '.g2-tooltip-list': {
                    display: 'flex',
                    'flex-direction': 'column',
                    gap: '8px',
                },
                '.g2-tooltip-title': {
                    color: '#fff',
                    opacity: 0.65,
                    'font-size': '14px',
                    'font-weight': '400',
                    'line-height': '20px',
                },
                '.g2-tooltip-list-item-name-label': {
                    color: '#fff',
                    'font-size': '14px',
                    'font-weight': '400',
                    'line-height': '20px',
                },
                '.g2-tooltip-list-item-value': {
                    color: '#fff',
                    'font-size': '14px',
                    'font-weight': '500',
                    'line-height': '20px',
                },
                '.g2-tooltip-list-item-marker': {
                    display: 'none',
                },
            },
        })

        chart.axis('x', {
            title: false,
            labelAutoHide: false,
            labelSpacing: 8,
            labelTextAlign: _datum => {
                return _datum?.label === '100%' ? 'start' : 'right'
            },
            tick: false,
            labelFormatter: (text: string) => {
                const progressMap = {
                    '0%~10%': '0%',
                    '10%~20%': '',
                    '20%~30%': '20%',
                    '30%~40%': '',
                    '40%~50%': '40%',
                    '50%~60%': '',
                    '60%~70%': '60%',
                    '70%~80%': '',
                    '80%~90%': '80%',
                    '90%~100%': '100%',
                }
                return progressMap[text] || ''
            },
        })

        chart.axis('y', {
            title: false,
            tick: false,
            labelSpacing: 9,
        })

        chart.render()
        chartRef.current = chart

        return () => {
            chart.destroy()
            chartRef.current = null
        }
    }, [data])

    return <div ref={ref} />
}

export default React.memo(DesignProgressChart)
