import React from 'react'
import ThreeDRingChart from '../ThreeDRingChart'
import ImageContainer from '../ImageContainer'
import type { CourseLevelDistribution } from '../../types'

const LEVEL_COLOR_MAP: Record<number, string> = {
    10: '#09BFEF',
    20: '#1BBCAF',
    30: '#E3C289',
}

const LEVEL_NAME_MAP: Record<number, string> = {
    10: '中级技能',
    20: '高级技能',
    30: '预备技师(技师)',
}

interface LevelDistributionChartProps {
    data?: CourseLevelDistribution[]
}

const LevelDistributionChart: React.FC<LevelDistributionChartProps> = ({ data = [] }) => {
    const chartData = data
        .sort((a, b) => a.trainLevel! - b.trainLevel!)
        .map(item => ({
            name: LEVEL_NAME_MAP[item.trainLevel!] || '',
            value: item.courseNum || 0,
            color: LEVEL_COLOR_MAP[item.trainLevel!] || '#09BFEF',
        }))

    return (
        <ImageContainer
            width={508}
            height={175}
            image="https://static.zpimg.cn/public/fe-engineer-pc/images/dashboard/single_bg.png"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 40,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ThreeDRingChart width="323px" data={chartData} height="175px" showCenter />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    paddingRight: '24px',
                }}
            >
                {chartData.map(item => (
                    <div
                        key={item.color}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: item.color,
                                }}
                            />
                            <span
                                style={{
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    color: '#FFFFFF',
                                    lineHeight: '18px',
                                    width: '7em',
                                }}
                            >
                                {item.name}
                            </span>
                        </div>
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: '#FFFFFF',
                                lineHeight: '18px',
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </ImageContainer>
    )
}

export default React.memo(LevelDistributionChart)
