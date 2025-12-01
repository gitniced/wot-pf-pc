import React from 'react'
import { Row, Col, Tooltip } from 'antd'
import styles from './index.module.less'

export type DataJsonItem = {
    label: string
    type?: any
    value?: number | string | undefined | React.ReactNode
    render?: () => React.ReactNode
}

interface RenderItemProps {
    dataJson: DataJsonItem[]
}
const RenderItem = (props: RenderItemProps) => {
    const { dataJson = [] } = props
    return (
        <div className={styles.template_content}>
            <Row className={styles.rows}>
                {dataJson.map(item => {
                    let content: string | React.ReactNode
                    if (typeof item.render === 'function') {
                        content = item.render()
                    } else {
                        content = item.value || '-'
                    }
                    return (
                        <Col span={8} key={item.toString()} className={styles.col}>
                            <div className={styles.label}>{item.label}：</div>
                            <Tooltip title={content}>
                                <div className={styles.value}>{content}</div>
                            </Tooltip>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default RenderItem
