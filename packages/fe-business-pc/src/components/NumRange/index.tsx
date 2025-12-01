import { Input, message } from 'antd'
import { useUpdateEffect } from 'ahooks'
import { useState, useEffect } from 'react'
import styles from './index.module.less'

const NumberRange = ({ onChange, style }: { onChange: (e: string[]) => void }) => {
    const [startValue, setStartValue] = useState('')
    const [endValue, setEndValue] = useState('')
    const [startErr, setStartErr] = useState(false)
    const [endErr, setEndErr] = useState(false)

    const verifyChange = (start: string, end: string) => {
        if (start && end) {
            if (isNaN(Number(start))) {
                setStartErr(true)
            } else {
                if (end) {
                    if (Number(start || 0) > Number(end || 0) || Number(start || 0) < 0) {
                        setStartErr(true)
                    } else {
                        setStartErr(false)
                    }
                } else {
                    if (Number(start || 0) < 0) {
                        setStartErr(true)
                    } else {
                        setStartErr(false)
                    }
                }
            }
            if (isNaN(Number(end))) {
                setEndErr(true)
            } else {
                if (start) {
                    if (Number(start || 0) > Number(end || 0) || Number(end || 0) < 0) {
                        setEndErr(true)
                    } else {
                        setEndErr(false)
                    }
                } else {
                    if (Number(end || 0) < 0) {
                        setEndErr(true)
                    } else {
                        setEndErr(false)
                    }
                }
            }
        } else {
            if (Number(start || 0) < 0) {
                setStartErr(true)
            } else {
                setStartErr(false)
            }

            if (Number(end || 0) < 0) {
                setEndErr(true)
            } else {
                setEndErr(false)
            }
        }
    }

    useUpdateEffect(() => {
        onChange([startValue, endValue])
    }, [startValue, endValue])

    useEffect(() => {
        startErr ? message.error('最小金额设置有误') : ''
    }, [startErr])
    useEffect(() => {
        endErr ? message.error('最大金额设置有误') : ''
    }, [endErr])

    const run = ({ value, type }: { value: string; type: string }) => {
        switch (type) {
            case 'start':
                setStartValue(value)
                verifyChange(value, endValue)
                break
            case 'end':
                setEndValue(value)
                verifyChange(startValue, value)
                break
        }
    }

    return (
        <div className={styles.range}>
            <Input
                placeholder="最小金额"
                value={startValue}
                style={style}
                onChange={e => {
                    run({ value: e.target.value.trim(), type: 'start' })
                }}
                status={startErr ? 'error' : ''}
            />
            <Input
                placeholder="最大金额"
                value={endValue}
                onChange={e => {
                    run({ value: e.target.value.trim(), type: 'end' })
                }}
                style={style}
                status={endErr ? 'error' : ''}
            />
        </div>
    )
}

export default NumberRange
