/**
 * LoadingAnimation 组件演示页面
 * 展示各种加载动画效果
 */
import React, { useState } from 'react'
import { Card, Radio, Select, Space, Divider } from 'antd'
import LoadingAnimation from './index'
import type { AnimationType, SizeType, ColorType } from './interface'

const { Option } = Select

const LoadingDemo: React.FC = () => {
    const [type, setType] = useState<AnimationType>('spinner')
    const [size, setSize] = useState<SizeType>('medium')
    const [color, setColor] = useState<ColorType>('primary')
    const [showText, setShowText] = useState(true)

    const animationTypes: { value: AnimationType; label: string }[] = [
        { value: 'spinner', label: '旋转圆环' },
        { value: 'dots', label: '跳动点' },
        { value: 'pulse', label: '脉冲效果' },
        { value: 'wave', label: '波浪效果' },
        { value: 'squares', label: '旋转方块' },
        { value: 'ring', label: '多环旋转' },
    ]

    const sizes: { value: SizeType; label: string }[] = [
        { value: 'small', label: '小' },
        { value: 'medium', label: '中' },
        { value: 'large', label: '大' },
    ]

    const colors: { value: ColorType; label: string }[] = [
        { value: 'primary', label: '主色' },
        { value: 'success', label: '成功' },
        { value: 'warning', label: '警告' },
        { value: 'error', label: '错误' },
    ]

    return (
        <div style={{ padding: '24px' }}>
            <Card title="LoadingAnimation 组件演示" style={{ marginBottom: '24px' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* 控制面板 */}
                    <div>
                        <Space wrap>
                            <div>
                                <span style={{ marginRight: '8px' }}>动画类型：</span>
                                <Select value={type} onChange={setType} style={{ width: '120px' }}>
                                    {animationTypes.map(item => (
                                        <Option key={item.value} value={item.value}>
                                            {item.label}
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <span style={{ marginRight: '8px' }}>尺寸：</span>
                                <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                                    {sizes.map(item => (
                                        <Radio.Button key={item.value} value={item.value}>
                                            {item.label}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>

                            <div>
                                <span style={{ marginRight: '8px' }}>颜色：</span>
                                <Radio.Group value={color} onChange={e => setColor(e.target.value)}>
                                    {colors.map(item => (
                                        <Radio.Button key={item.value} value={item.value}>
                                            {item.label}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>

                            <div>
                                <span style={{ marginRight: '8px' }}>显示文字：</span>
                                <Radio.Group
                                    value={showText}
                                    onChange={e => setShowText(e.target.value)}
                                >
                                    <Radio.Button value={true}>是</Radio.Button>
                                    <Radio.Button value={false}>否</Radio.Button>
                                </Radio.Group>
                            </div>
                        </Space>
                    </div>

                    <Divider />

                    {/* 效果展示 */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '200px',
                            background: '#f5f5f5',
                            borderRadius: '8px',
                        }}
                    >
                        <LoadingAnimation
                            type={type}
                            size={size}
                            color={color}
                            text={showText ? '正在加载中...' : undefined}
                        />
                    </div>

                    <Divider />

                    {/* 所有动画类型展示 */}
                    <div>
                        <h3>所有动画类型预览：</h3>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '16px',
                                marginTop: '16px',
                            }}
                        >
                            {animationTypes.map(item => (
                                <Card
                                    key={item.value}
                                    size="small"
                                    title={item.label}
                                    style={{ textAlign: 'center' }}
                                >
                                    <div style={{ padding: '20px' }}>
                                        <LoadingAnimation
                                            type={item.value}
                                            size="medium"
                                            color="primary"
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Space>
            </Card>
        </div>
    )
}

export default LoadingDemo
