import * as echarts from 'echarts'
import { useRef, useLayoutEffect } from 'react'

const Index = () => {
    const barChartRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const barChart = echarts.init(barChartRef.current as unknown as HTMLDivElement)
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                },
            ],
        }
        option && barChart.setOption(option)
    }, [])

    return <div style={{ width: 300, height: 300 }} ref={barChartRef} />
}

export default Index
