import { ConfigProvider, Input } from 'antd'
import React, { useRef, useMemo } from 'react'
import styles from './index.module.less'
import type { InputRef } from 'antd'

interface Props {
    value: string
    onChange: (val: string) => void
    onSend?: () => void
    onClose?: () => void
    disabled?: boolean
    placeholder?: string
    showSend?: boolean
}

export default function ChatInput(props: Props) {
    const { value, onChange, onSend, disabled, placeholder, showSend = true, onClose } = props
    const inputRef = useRef<InputRef>(null)

    // 生成唯一的渐变ID，避免ID冲突
    const gradientIds = useMemo(
        () => ({
            send: `gradient-send-${Math.random().toString(36).substr(2, 9)}`,
            close: `gradient-close-${Math.random().toString(36).substr(2, 9)}`,
        }),
        [],
    )

    return (
        <ConfigProvider prefixCls={'chat'}>
            <div className={styles.chat_input_wrapper} onClick={() => inputRef.current?.focus()}>
                <Input.TextArea
                    ref={inputRef}
                    className={styles.chat_input}
                    placeholder={placeholder || '有问题尽管问我～'}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    value={value}
                    onChange={e => {
                        console.log(e.target.value)
                        onChange(e.target.value)
                    }}
                    onPressEnter={e => {
                        if (!e.shiftKey) {
                            e.preventDefault()
                            !disabled && onSend?.()
                        }
                    }}
                />
                {showSend && (
                    <div className={`${styles.options_bar}`}>
                        {!disabled ? (
                            <svg
                                className={styles.send_btn}
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={e => {
                                    e.stopPropagation()
                                    if (!disabled) onSend?.()
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id={gradientIds.send}
                                        x1="0%"
                                        y1="0%"
                                        x2="0%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            style={{ stopColor: '#5088F5', stopOpacity: 1 }}
                                        />
                                        <stop
                                            offset="100%"
                                            style={{ stopColor: '#4D3AEB', stopOpacity: 1 }}
                                        />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill={`url(#${gradientIds.send})`}
                                    d="M759.648 136.096l-594.72 278.4a36.032 36.032 0 0 0-2.72 64.064l120.224 68.864c17.6 10.048 40 4 50.016-13.44l2.72-5.888a35.968 35.968 0 0 0-16.192-43.328l-59.968-34.368 531.84-248.928a10.432 10.432 0 0 1 11.968 1.632l2.24 2.304c1.824 2.56 2.56 5.76 1.44 9.824l-141.056 504.736-113.216-60.544-5.44-2.368a36.8 36.8 0 0 0-41.28 12.576l-60.928 80.928 0.064-149.248 229.12-182.336c15.136-12.8 17.184-35.04 4.8-50.24-12.512-15.36-35.2-17.92-50.88-5.76l-242.656 196.16c-8.512 6.88-13.44 17.152-13.44 27.968v272.736c0 19.904 16.32 36.16 36.544 36.16l6.72-0.64c8.832-1.664 16.96-6.56 22.528-13.888l107.84-143.616 125.76 67.296c9.792 5.248 21.472 5.76 31.744 1.44 10.176-4.32 17.824-12.992 20.8-23.52L876.8 234.496a82.816 82.816 0 0 0-26.688-86.4 83.936 83.936 0 0 0-90.464-12z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className={styles.send_btn}
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={e => {
                                    e.stopPropagation()
                                    onClose?.()
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id={gradientIds.close}
                                        x1="0%"
                                        y1="0%"
                                        x2="0%"
                                        y2="100%"
                                    >
                                        <stop
                                            offset="0%"
                                            style={{ stopColor: '#5088F5', stopOpacity: 1 }}
                                        />
                                        <stop
                                            offset="100%"
                                            style={{ stopColor: '#4D3AEB', stopOpacity: 1 }}
                                        />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill={`url(#${gradientIds.close})`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    d="M512 53.333333C258.688 53.333333 53.333333 258.688 53.333333 512S258.688 970.666667 512 970.666667 970.666667 765.312 970.666667 512 765.312 53.333333 512 53.333333z m0 64a394.666667 394.666667 0 1 1 0 789.333334 394.666667 394.666667 0 0 1 0-789.333334z"
                                    p-id="9340"
                                />
                                <path
                                    fill={`url(#${gradientIds.close})`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    d="M341.333333 341.333333m85.333334 0l170.666666 0q85.333333 0 85.333334 85.333334l0 170.666666q0 85.333333-85.333334 85.333334l-170.666666 0q-85.333333 0-85.333334-85.333334l0-170.666666q0-85.333333 85.333334-85.333334Z"
                                    p-id="9341"
                                />
                            </svg>
                        )}
                    </div>
                )}
            </div>
        </ConfigProvider>
    )
}
