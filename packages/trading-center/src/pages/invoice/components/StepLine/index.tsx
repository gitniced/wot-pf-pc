import React from 'react'
// import styles from './index.module.less'
import { Steps } from 'antd'

const { Step } = Steps
function StepLine({ current = 1, error }: { current: 0 | 1 | 2 | 3; error?: boolean }) {
    const items = () => [
        {
            title: '等待审核',
        },
        {
            title: '等待开票',
        },
        {
            title: error ? '开票失败' : '开票成功',
        },
    ]
    return (
        <Steps current={current} status={error ? 'error' : 'process'}>
            {items().map((i: { title: string }) => (
                <Step title={i.title} key={i.title} />
            ))}
        </Steps>
    )
}

export default StepLine
