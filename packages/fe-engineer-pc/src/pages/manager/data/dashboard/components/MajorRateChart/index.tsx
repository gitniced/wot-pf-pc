import React, { useEffect, useRef } from 'react'
import { Chart } from '@antv/g2'
import type { MajorQualificationRate } from '../../types'

interface MajorRateChartProps {
    data?: MajorQualificationRate[]
}

const MajorRateChart: React.FC<MajorRateChartProps> = ({ data = [] }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const chartRef = useRef<Chart | null>(null)

    // 字符串百分比 -> number(0-100)
    const toPercent = (v?: string): number => {
        if (v == null) return 0
        const s = String(v).trim()
        if (s.endsWith('%')) return Math.max(0, Math.min(100, parseFloat(s)))
        const n = Number(s)
        if (!Number.isFinite(n)) return 0
        if (n <= 1) return Math.max(0, Math.min(100, n * 100))
        return Math.max(0, Math.min(100, n))
    }

    useEffect(() => {
        if (!ref.current) return

        if (!data || data.length === 0) {
            return
        }

        const processedChartData: { major: string; level: string; value: number }[] = []

        data.forEach(item => {
            const majorName = item.majorName || '未知专业'

            processedChartData.push({
                major: majorName,
                level: '中级技能',
                value: toPercent(item.middleLevelQualificationRate),
            })

            processedChartData.push({
                major: majorName,
                level: '高级技能',
                value: toPercent(item.highLevelQualificationRate),
            })

            processedChartData.push({
                major: majorName,
                level: '预备技师（技师）',
                value: toPercent(item.preLevelQualificationRate),
            })
        })

        if (chartRef.current) {
            chartRef.current.destroy()
            chartRef.current = null
        }

        const chart = new Chart({
            container: ref.current,
            autoFit: true,
            height: 260,
            paddingBottom: 36,
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
            .data(processedChartData)
            .encode('x', 'major')
            .encode('y', 'value')
            .encode('color', 'level')
            .scale('color', {
                type: 'ordinal',
                domain: ['中级技能', '高级技能', '预备技师（技师）'],
                range: ['#09BFEF', '#1BBCAF', '#E3C289'],
            })
            .scale('y', { domain: [0, 100], nice: true })
            .legend('color', false)

        chart
            .line()
            .style('lineWidth', 2)
            .tooltip({
                shared: true,
                title: d => d.major,
                items: [
                    (d, _index, _data, _column) => {
                        const colorMap = {
                            中级技能: '#09BFEF',
                            高级技能: '#1BBCAF',
                            '预备技师（技师）': '#E3C289',
                        }

                        return {
                            name: d.level,
                            value: `${d.value}%`,
                            color: colorMap[d.level] || '#1890ff',
                        }
                    },
                ],
            })

        chart.interaction('tooltip', {
            shared: true,
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
                    'margin-right': '6px',
                    'border-radius': '0',
                    width: '8px',
                    height: '2px',
                },
            },
        })

        chart
            .axis('x', {
                title: false,
                labelAutoHide: false,
                labelSpacing: 8,
                labelTransform: 'rotate(45)',
                tick: false,
                labelFormatter: (text: string) => {
                    return text.length > 4 ? text.slice(0, 4) + '...' : text
                },
            })
            .axis('y', {
                title: false,
                tick: false,
                labelSpacing: 9,
                labelFormatter: (v: string) => `${v}%`,
            })

        chart.render()
        chartRef.current = chart

        return () => {
            chart.destroy()
            chartRef.current = null
        }
    }, [data])

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                }}
            >
                <span
                    style={{
                        fontWeight: 400,
                        fontSize: 12,
                        color: '#FFFFFF',
                        lineHeight: '18px',
                        height: '18px',
                        opacity: 0.7,
                    }}
                >
                    合格率
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 2, background: '#09BFEF' }} />
                        <span
                            style={{
                                fontWeight: 400,
                                fontSize: '12px',
                                color: '#FFFFFF',
                                lineHeight: '18px',
                            }}
                        >
                            中级
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 2, background: '#1BBCAF' }} />
                        <span
                            style={{
                                fontWeight: 400,
                                fontSize: '12px',
                                color: '#FFFFFF',
                                lineHeight: '18px',
                            }}
                        >
                            高级
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 2, background: '#E3C289' }} />
                        <span
                            style={{
                                fontWeight: 400,
                                fontSize: '12px',
                                color: '#FFFFFF',
                                lineHeight: '18px',
                            }}
                        >
                            预备技师（技师）
                        </span>
                    </div>
                </div>
            </div>
            <div ref={ref} />
        </div>
    )
}

export default React.memo(MajorRateChart)
