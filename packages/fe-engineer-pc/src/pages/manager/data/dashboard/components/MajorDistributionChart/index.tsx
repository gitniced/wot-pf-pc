import React, { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import type { CourseMajorDistribution } from '../../types'

interface MajorDistributionChartProps {
    data?: CourseMajorDistribution[]
}

const MajorDistributionChart: React.FC<MajorDistributionChartProps> = ({ data = [] }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const chartRef = useRef<Chart | null>(null)

    useEffect(() => {
        if (!ref.current) return

        if (!data || data.length === 0) {
            return
        }

        const sortedValues = [...data].map(item => item.courseNum || 0).sort((a, b) => b - a)

        const uniqueValues = Array.from(new Set(sortedValues))

        const valueToOpacity = new Map<number, number>()
        const minOpacity = 0.25
        const maxOpacity = 1

        uniqueValues.forEach((value, index) => {
            if (uniqueValues.length === 1) {
                valueToOpacity.set(value, maxOpacity)
            } else {
                const opacity =
                    maxOpacity - (index / (uniqueValues.length - 1)) * (maxOpacity - minOpacity)
                valueToOpacity.set(value, opacity)
            }
        })

        const chartData = {
            name: '课程专业分布',
            children: data.map(item => ({
                name: item.majorName || '未知专业',
                value: item.courseNum || 0,
            })),
        }

        if (chartRef.current) {
            chartRef.current.destroy()
            chartRef.current = null
        }

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
            height: 180,
            padding: 0,
            margin: 0,
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
            .treemap()
            .data({
                value: chartData,
            })
            .layout({
                path: d => d.name,
                tile: 'treemapSquarify',
                paddingInner: 4,
                paddingOuter: 0,
            })
            .encode('value', 'value')
            .legend('color', false)
            .tooltip({
                title: d => d.data.name,
                items: [
                    (d, _index, _data, _column) => {
                        return {
                            name: '课程数',
                            value: d.value,
                        }
                    },
                ],
            })
            .style({
                margin: 0,
                padding: 0,
                fill: '#1B5494',
                fillOpacity: (d: any) => {
                    return valueToOpacity.get(d.value) || 0.25
                },
                // labelFillOpacity: (d: any) => {
                //     return valueToOpacity.get(d.value) || 0.25
                // },
                stroke: '#5294DF',
                lineWidth: 1,
                radius: 4,
                shadowColor: '#4B8ED9',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                inset: true,
                labelFill: '#fff',
                labelFontSize: 16,
                labelLineWidth: 0,
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

        chart.render()
        chartRef.current = chart

        return () => {
            chart.destroy()
            chartRef.current = null
        }
    }, [data])

    return <div ref={ref} />
}

export default React.memo(MajorDistributionChart)
