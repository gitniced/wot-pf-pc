import classNames from 'classnames'
import styles from './index.module.less'
import { useCallback, useRef } from 'react'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import React from 'react'
import type { ContentInputRef } from '@/components/ContentInput'
import ContentInput from '@/components/ContentInput'

interface IClickEditInputProps extends IUseComponentValueProps<string> {
    placeholder?: string
    active: boolean
    setActive: (active: boolean) => void
    style?: React.CSSProperties
    className?: string
    /**
     * @default 4
     */
    rows?: number
    lineHeight?: number
    backgroundColor?: string
    padding?: {
        vertical: number
        horizontal: number
    }
    autoFocus?: boolean
    plainTextMode?: boolean
    disabled?: boolean
}

const ClickEditInput: React.FC<IClickEditInputProps> = props => {
    const { value, onChange, onChangeBlur } = useComponentValue<string>(props)
    const {
        style,
        placeholder,
        rows = 4,
        lineHeight = 24,
        backgroundColor = 'rgba(0, 0, 0, 3%)',
        padding = {
            vertical: 12,
            horizontal: 12,
        },
        autoFocus = false,
        plainTextMode = false,
        disabled = false,
    } = props
    const contentInputRef = useRef<ContentInputRef>(null)
    const containerRef = useRef<HTMLDivElement>(null) // 添加容器引用

    const isPreview = /assistant\/course\/.*\/preview/.test(location.pathname)

    const handleFocus = useCallback(() => {
        // props.setActive(true)
        requestAnimationFrame(() => {
            contentInputRef.current?.focus()

            // if (value) {
            //     const textLength = value.length
            //     contentInputRef.current?.setSelectionRange(textLength, textLength)
            //     contentInputRef.current?.scrollToEnd()
            // }

            // 激活后自动滚动到当前输入框位置，避免被其他元素高度变化影响
            if (containerRef.current) {
                // 延迟执行，等待DOM更新完成
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center', // 滚动到视口中心
                            inline: 'nearest',
                        })
                    }
                }, 100) // 给DOM足够时间完成高度变化
            }
        })
    }, [props.setActive, value])

    if (isPreview) {
        return (
            <div style={{ ...style }}>
                <div
                    className={styles.preview}
                    dangerouslySetInnerHTML={{ __html: value || '-' }}
                />
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            onClick={handleFocus}
            className={classNames(styles.click_edit_input, props.className)}
            style={style}
        >
            <ContentInput
                ref={contentInputRef}
                active={props.active}
                activeMode
                inactiveBackgroundColor={backgroundColor}
                rows={rows}
                autoFocus={autoFocus}
                lineHeight={lineHeight}
                padding={padding}
                value={value}
                onChange={onChange}
                onChangeBlur={onChangeBlur}
                placeholder={placeholder}
                plainTextMode={plainTextMode}
                disabled={disabled}
            />
        </div>
    )
}

export default React.memo(ClickEditInput)
