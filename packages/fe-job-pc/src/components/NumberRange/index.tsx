import React, { useEffect } from 'react'
import { Input, message } from 'antd'
import styles from './index.module.less'
export const NumberRange = ({
    holderStr = '',
    minStr = '',
    maxStr = '',
    onChange,
    value,
}: {
    holderStr?: string
    minStr?: string
    maxStr?: string
    onChange?: (e: number[]) => void
    value?: number[]
}) => {
    useEffect(() => {
        if (Array.isArray(value) && value.length === 2) {
            if (Number(value?.[0]) > Number(value?.[1])) {
                message.error(`${holderStr}设置有误`)
            }
        }
    }, [value])

    return (
        <div className={styles.range}>
            <Input
                placeholder={minStr}
                value={value?.[0]}
                onChange={e => onChange?.([e.target.value, value?.[1]])}
                style={{ width: '172px' }}
            />
            <span className={styles.line}>-</span>
            <Input
                placeholder={maxStr}
                value={value?.[1]}
                onChange={e => onChange?.([value?.[0], e.target.value])}
                style={{ width: '172px' }}
            />
        </div>
    )
}
