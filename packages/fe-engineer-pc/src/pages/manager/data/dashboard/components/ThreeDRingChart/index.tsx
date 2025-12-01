import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import 'echarts-gl'

interface ChartDataItem {
    name: string
    value: number
    color?: string
}

interface ThreeDRingChartProps {
    data?: ChartDataItem[]
    width?: string
    height?: string
    colors?: string[]
    showCenter?: boolean
    showTooltip?: boolean
}

const defaultColors = [
    '#0079FE',
    '#F740E4',
    '#33CCFF',
    '#F6C458',
    '#02E097',
    '#FF5733',
    '#C70039',
    '#900C3F',
    '#581845',
    '#28B463',
    '#1F618D',
    '#D68910',
    '#E74C3C',
    '#8E44AD',
    '#3498DB',
    '#1ABC9C',
    '#F39C12',
    '#2ECC71',
    '#9B59B6',
    '#E67E22',
    '#2C3E50',
    '#D4AC0D',
    '#16A085',
    '#2980B9',
    '#C0392B',
]

function getParametricEquation(
    startRatio: number,
    endRatio: number,
    isSelected: boolean,
    isHovered: boolean,
    k: number,
    height: number,
) {
    const midRatio = (startRatio + endRatio) / 2

    const startRadian = startRatio * Math.PI * 2
    const endRadian = endRatio * Math.PI * 2
    const midRadian = midRatio * Math.PI * 2

    let selected = isSelected
    if (startRatio === 0 && endRatio === 1) {
        selected = false
    }

    const kValue = typeof k !== 'undefined' ? k : 1 / 3

    const offsetX = selected ? Math.cos(midRadian) * 0.1 : 0
    const offsetY = selected ? Math.sin(midRadian) * 0.1 : 0

    const hoverRate = isHovered ? 1.05 : 1

    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 2,
            step: Math.PI / 32,
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },

        x: function (u: number, v: number) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * kValue) * hoverRate
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * kValue) * hoverRate
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * kValue) * hoverRate
        },

        y: function (u: number, v: number) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * kValue) * hoverRate
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * kValue) * hoverRate
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * kValue) * hoverRate
        },

        z: function (u: number, v: number) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u)
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u)
            }
            return Math.sin(v) > 0 ? 1 * height : -1
        },
    }
}

function getPie3D(
    pieData: ChartDataItem[],
    internalDiameterRatio: number,
    colors: string[] = defaultColors,
    showTooltip: boolean = true,
) {
    const series: any[] = []
    let sumValue = 0
    let startValue = 0
    let endValue = 0
    const legendData: string[] = []
    const k =
        typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3

    const maxValue = Math.max(...pieData.map(item => item.value))
    const minValue = Math.min(...pieData.map(item => item.value))

    const baseHeight = 0.6
    const minHeight = 0.1

    const heightRatio = (baseHeight - minHeight) / (maxValue - minValue || 1)

    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value

        const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k,
            },
            itemStyle: {
                color: pieData[i].color || colors[i % colors.length],
                opacity: 0.6,
            },
        }

        series.push(seriesItem)
    }

    for (let i = 0; i < series.length; i++) {
        const height = minHeight + (series[i].pieData.value - minValue) * heightRatio

        endValue = startValue + series[i].pieData.value
        series[i].pieData.startRatio = startValue / sumValue
        series[i].pieData.endRatio = endValue / sumValue
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            height,
        )

        startValue = endValue

        legendData.push(series[i].name)
    }

    const option: any = {
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: 50,
            left: 0,
            right: 0,
            top: -25,
            bottom: 0,
            viewControl: {
                distance: 180,
                alpha: 25,
                beta: 40,
            },
        },
        series: series,
    }

    if (showTooltip) {
        option.tooltip = {
            backgroundColor: 'rgba(0,0,16,0.9)',
            borderColor: '#4570AE',
            borderWidth: 1,
            borderRadius: 4,
            textStyle: {
                color: '#fff',
            },
            extraCssText:
                'box-shadow: 0px 0px 8px 0px #062C5E; display: flex; flex-direction: column; gap: 8px; min-width: 150px;',
            formatter: (params: any) => {
                if (params.seriesName !== 'mouseoutSeries') {
                    return `<div style="color: #fff; opacity: 0.65; font-size: 14px; font-weight: 400; line-height: 20px;">${
                        params.seriesName
                    }</div><div style="display: flex; align-items: center; justify-content: space-between;"><div style="display: flex; align-items: center;"><span style="display:inline-block;margin-right:6px;border-radius:0;width:8px;height:8px;background-color:${
                        params.color
                    };"></span><span style="color: #fff; font-size: 14px; font-weight: 400; line-height: 20px;">数量</span></div><span style="color: #fff; font-size: 14px; font-weight: 500; line-height: 20px;">${
                        series[params.seriesIndex].pieData.value
                    }</span></div>`
                }
            },
        }
    }

    return option
}

const ThreeDRingChart: React.FC<ThreeDRingChartProps> = ({
    data = [],
    width = '100%',
    height = '100%',
    colors = defaultColors,
    showCenter = false,
    showTooltip = false,
}) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const chartRef = useRef<echarts.ECharts | null>(null)
    const [centerData, setCenterData] = useState<ChartDataItem | null>(null)

    useEffect(() => {
        if (!ref.current) return

        chartRef.current = echarts.init(ref.current)

        return () => {
            if (chartRef.current) {
                chartRef.current.dispose()
                chartRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (chartRef.current) {
            const option = getPie3D(data, 0.6, colors, showTooltip)
            chartRef.current.setOption(option)

            if (showCenter && data.length > 0) {
                setCenterData(data[data.length - 1])

                const series = option.series
                const lastIndex = data.length - 1

                series.forEach((_: any, index: number) => {
                    series[index].itemStyle = {
                        ...series[index].itemStyle,
                        opacity: index === lastIndex ? 0.9 : 0.4,
                    }
                })

                chartRef.current.setOption({
                    series: series,
                })
            }

            chartRef.current.off('mouseover')
            chartRef.current.off('mouseout')

            chartRef.current.on('mouseover', (params: any) => {
                if (params.seriesName !== 'mouseoutSeries') {
                    const seriesIndex = params.seriesIndex
                    const series = option.series

                    series.forEach((_: any, index: number) => {
                        series[index].itemStyle = {
                            ...series[index].itemStyle,
                            opacity: index === seriesIndex ? 0.9 : 0.4,
                        }
                    })

                    chartRef.current?.setOption({
                        series: series,
                    })

                    if (showCenter) {
                        const hoveredData = data.find(d => d.name === params.seriesName)
                        if (hoveredData) {
                            setCenterData(hoveredData)
                        }
                    }
                }
            })

            chartRef.current.on('mouseout', () => {
                const series = option.series

                if (showCenter && data.length > 0) {
                    const lastIndex = data.length - 1
                    series.forEach((_: any, index: number) => {
                        series[index].itemStyle = {
                            ...series[index].itemStyle,
                            opacity: index === lastIndex ? 0.9 : 0.4,
                        }
                    })

                    setCenterData(data[data.length - 1])
                } else {
                    series.forEach((_: any, index: number) => {
                        series[index].itemStyle = {
                            ...series[index].itemStyle,
                            opacity: 0.6,
                        }
                    })
                }

                chartRef.current?.setOption({
                    series: series,
                })
            })
        }
    }, [data, colors, showCenter, showTooltip])

    return (
        <div style={{ position: 'relative', height, width }}>
            <div ref={ref} style={{ height, width }} />
            {showCenter && centerData && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 4,
                            paddingBottom: '35px',
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '32px',
                                color: '#FFFFFF',
                                lineHeight: '32px',
                                textShadow: '0px 2px 4px rgba(0,0,0,0.12)',
                            }}
                        >
                            {centerData.value}
                        </span>
                        <span
                            style={{
                                fontWeight: 400,
                                fontSize: '16px',
                                color: '#FFFFFF',
                                lineHeight: '22px',
                                textShadow: '0px 2px 4px rgba(0,0,0,0.12)',
                            }}
                        >
                            {centerData.name}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default React.memo(ThreeDRingChart)
