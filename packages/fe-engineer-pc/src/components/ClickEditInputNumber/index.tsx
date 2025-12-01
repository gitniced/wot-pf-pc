import classNames from 'classnames'
import styles from './index.module.less'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import React from 'react'
import { InputNumber } from 'antd'

interface IClickEditInputNumberProps extends IUseComponentValueProps<number> {
    placeholder?: string
    active: boolean
    setActive: (active: boolean) => void
    style?: React.CSSProperties
    className?: string
    max?: number
    disabled?: boolean
}

const ClickEditInputNumber: React.FC<IClickEditInputNumberProps> = props => {
    const { value, onChange, onChangeBlur } = useComponentValue<number>(props)
    const { placeholder = '请输入', max, disabled = false } = props

    const isPreview = /assistant\/course\/.*\/preview/.test(location.pathname)

    // const handleActive = useCallback(() => {
    //     props.setActive(true)
    // }, [props.setActive])

    if (isPreview) {
        return (
            <div style={{ ...props?.style }}>
                <div className={styles.preview}>{value || '-'}</div>
            </div>
        )
    }

    return (
        <div
            className={classNames(styles.click_edit_input_number, props.className)}
            style={props.style}
        >
            {disabled ? (
                <div className={styles.preview}>{value || '-'}</div>
            ) : (
                <InputNumber
                    controls
                    value={value}
                    onChange={val => onChange?.(val || 0)}
                    onBlur={onChangeBlur}
                    // onFocus={handleActive}
                    placeholder={placeholder}
                    min={0}
                    max={max}
                    parser={v => (max ? Math.min(Number(v || 0), max) : Number(v))}
                />
            )}
        </div>
    )
}

export default React.memo(ClickEditInputNumber)
