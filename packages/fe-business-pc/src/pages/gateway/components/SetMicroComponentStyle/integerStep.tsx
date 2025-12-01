import React from 'react'
import { Col, InputNumber, Row, Slider } from 'antd'

const IntegerStep = ({
    value,
    onChange,
    showImageMargin,
}: {
    value?: number
    onChange?: (value: number | null) => void
    showImageMargin?: boolean
}) => {
    return (
        <Row>
            <Col span={15}>
                <Slider
                    min={0}
                    max={showImageMargin ? 32 : 64}
                    onChange={onChange}
                    value={typeof value === 'number' ? value : 24}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={0}
                    max={showImageMargin ? 32 : 64}
                    step={1}
                    precision={0}
                    style={{ margin: '0 16px' }}
                    value={value}
                    onChange={onChange}
                />
            </Col>
        </Row>
    )
}

export default IntegerStep
