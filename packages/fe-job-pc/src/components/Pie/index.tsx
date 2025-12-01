import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const Index = () => {
    const chartRef = useRef(null)

    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                bottom: 'bottom',
                icon: 'circle'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 484, name: '第一产业' },
                        { value: 300, name: '第二产业' },
                    ],
                    emphasis: {
                        itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false, //隐藏标示文字
                            },
                            labelLine: {
                                show: false, //隐藏标示线
                            },
                        },
                    },
                },
            ],
        }
        const myChart = echarts.init(chartRef.current)
        option && myChart.setOption(option)
    }, [])

    return (
        <div>
            <canvas width={300} height={300} ref={chartRef} />
        </div>
    )
}

export default Index
