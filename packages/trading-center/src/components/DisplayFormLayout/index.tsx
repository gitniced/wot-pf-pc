import React from 'react'
import { Row, Col, Tooltip } from 'antd'
import styles from './index.module.less'
import type { DisplayFormLayoutType } from './interface'
import dayjs from 'dayjs'

/**
 * 纯展示表单布局，不含交互，默认一行三列  col: {span: 8}
 * 包含功能：时间戳自动转日期；不存在字段自动展示 - ；
 * @returns
 */
const DisplayFormLayout = (props: DisplayFormLayoutType) => {
    const { data = [], col = { span: 8 }, row = {} } = props
    /**
     * 通过时间戳得到日期
     */
    const getDateBytimeStamp = (
        timeStamp: number | number[],
        format: string,
    ): string | undefined => {
        let value: string | undefined
        if (timeStamp === 0 || !timeStamp) return
        if (Array.isArray(timeStamp)) {
            // [start, end]
            let startTime = getDateBytimeStamp(timeStamp[0], format)
            let endTime = getDateBytimeStamp(timeStamp[1], format)
            if (startTime) {
                value = startTime
            }
            if (endTime) {
                value = `${startTime}至${endTime}`
            }
        } else {
            value = dayjs(timeStamp).format(format)
        }
        return value
    }
    return (
        <Row gutter={[32, 24]} {...row} className={styles.rows}>
            {data.map(item => {
                let { label, value, tooltip, timeStamp, format = 'YYYY-MM-DD' } = item
                // 处理tooltip
                let isTooltip = false
                let title
                if (typeof tooltip === 'boolean') {
                    isTooltip = tooltip
                    title = item.value
                } else {
                    isTooltip = true
                    title = tooltip
                }
                // 处理时间戳
                if (timeStamp) {
                    value = getDateBytimeStamp(value, format)
                }
                let valueContent = <div className={styles.value}>{value || '-'}</div>

                return (
                    <Col {...col} key={item.toString()} className={styles.col}>
                        <div className={styles.label}>{label}：</div>
                        {isTooltip ? <Tooltip title={title}>{valueContent}</Tooltip> : valueContent}
                    </Col>
                )
            })}
        </Row>
    )
}

export default DisplayFormLayout
