import React from 'react'
import { Row, Col } from 'antd'
import styles from './index.module.less'
import { TYPE_ITEM, TYPE_ITEM_ENUM } from '../superTables/const'

export type DataJsonItem = {
    label: string
    type?: TYPE_ITEM_ENUM
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
            <Row className={styles.rows} gutter={32}>
                {dataJson.map(item => {
                    const { type } = item
                    let content: string | React.ReactNode
                    if (typeof item.render === 'function') {
                        content = item.render()
                    } else {
                        content = item.value || '-'
                    }
                    switch (type) {
                        case TYPE_ITEM[TYPE_ITEM_ENUM.CATE]:
                            return (
                                <Col span={8} key={item.toString()} className={styles.col}>
                                    <div className={styles.label}>{item.label}：</div>
                                    {/* <Tooltip title={content}></Tooltip> */}
                                    <div className={styles.value}>{content}</div>
                                </Col>
                            )
                        case TYPE_ITEM[TYPE_ITEM_ENUM.IMAGE]:
                            return (
                                <Col span={8} key={item.toString()} className={styles.col}>
                                    <div className={styles.label}>{item.label}：</div>
                                    <div className={styles.value}>{content}</div>
                                </Col>
                            )
                        case TYPE_ITEM[TYPE_ITEM_ENUM.TIME]:
                            return (
                                <Col span={8} key={item.toString()} className={styles.col}>
                                    <div className={styles.label}>{item.label}：</div>
                                    <div className={styles.value}>{content}</div>
                                </Col>
                            )
                        default:
                            return (
                                <Col span={8} key={item.toString()} className={styles.col}>
                                    <div className={styles.label}>{item.label}：</div>
                                    <div className={styles.value}>{content}</div>
                                </Col>
                            )
                    }
                })}
            </Row>
        </div>
    )
}

export default RenderItem
