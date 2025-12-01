import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react'
import classNames from 'classnames'
import styles from './index.module.less'
import { sanitizeHTML, stripHTMLTags } from './utils'

export interface ContentInputProps {
    active?: boolean
    activeMode?: boolean
    inactiveBackgroundColor?: string
    value?: string
    defaultValue?: string
    placeholder?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    editableStyle?: React.CSSProperties
    lineHeight?: number
    heightMode?: 'auto' | 'full' | 'rows'
    padding?: {
        vertical: number
        horizontal: number
    }
    rows?: number
    showCount?: boolean
    allowClear?: boolean
    autoFocus?: boolean
    plainTextMode?: boolean
    onChange?: (value: string) => void
    onChangeBlur?: (value: string) => void
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
    onPressEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export interface ContentInputRef {
    focus: () => void
    blur: () => void
    setSelectionRange: (start: number, end: number) => void
    scrollToEnd: () => void
}

/**
 * ContentInput 组件 - 基于 contentEditable 的富文本输入组件
 *
 * 特性：
 * - 保留HTML格式（使用innerHTML而非textContent）
 * - 支持多行编辑和换行保留
 * - 自动清理危险的HTML内容
 * - 支持光标位置恢复
 * - 支持图片和富文本内容粘贴
 * - 支持纯文本模式（plainTextMode），自动去除所有HTML标签只保留纯文本
 */
const ContentInput = forwardRef<ContentInputRef, ContentInputProps>((props, ref) => {
    const {
        active = false,
        activeMode = false,
        inactiveBackgroundColor = 'rgba(0, 0, 0, 3%)',
        value,
        defaultValue,
        placeholder = '',
        disabled = false,
        className,
        style,
        editableStyle,
        lineHeight = 24,
        rows = 4,
        heightMode = 'rows',
        padding = {
            vertical: 12,
            horizontal: 12,
        },
        showCount = false,
        allowClear = false,
        autoFocus = false,
        plainTextMode = false,
        onChange,
        onChangeBlur,
        onBlur,
        onFocus,
        onPressEnter,
    } = props

    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '')
    const [isFocused, setIsFocused] = useState(false)
    const [currentLength, setCurrentLength] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)
    const isComposingRef = useRef(false)

    // 初始化内容
    useEffect(() => {
        if (contentRef.current) {
            if (plainTextMode) {
                // 纯文本模式：直接设置文本内容
                contentRef.current.textContent = internalValue || ''
            } else {
                // 富文本模式：设置HTML内容
                contentRef.current.innerHTML = sanitizeHTML(internalValue || '')
            }
            setCurrentLength(contentRef.current.textContent?.length || 0)
        }
    }, [plainTextMode])

    // 处理 autoFocus
    useEffect(() => {
        if (autoFocus && contentRef.current) {
            // 延迟执行，确保组件完全渲染
            requestAnimationFrame(() => {
                contentRef.current?.focus()
            })
        }
    }, [autoFocus])

    // 同步外部 value
    useEffect(() => {
        if (value !== undefined && value !== internalValue) {
            setInternalValue(value)
            if (contentRef.current) {
                const currentContent = plainTextMode
                    ? contentRef.current.textContent
                    : contentRef.current.innerHTML

                if (currentContent !== value) {
                    // 保存当前光标位置
                    const selection = window.getSelection()
                    let cursorPosition = 0

                    if (selection && selection.rangeCount > 0) {
                        try {
                            const range = selection.getRangeAt(0)
                            cursorPosition = range.startOffset
                        } catch (e) {
                            cursorPosition = 0
                        }
                    }

                    // 设置内容
                    if (plainTextMode) {
                        // 纯文本模式：直接设置文本内容
                        contentRef.current.textContent = value || ''
                    } else {
                        // 富文本模式：设置HTML内容（已清理）
                        contentRef.current.innerHTML = sanitizeHTML(value || '')
                    }
                    setCurrentLength(contentRef.current.textContent?.length || 0)

                    // 恢复光标位置
                    if (
                        contentRef.current.firstChild &&
                        document.activeElement === contentRef.current
                    ) {
                        try {
                            const newRange = document.createRange()
                            const textLength =
                                contentRef.current.firstChild.textContent?.length || 0
                            const position = Math.min(cursorPosition, textLength)
                            newRange.setStart(contentRef.current.firstChild, position)
                            newRange.setEnd(contentRef.current.firstChild, position)
                            selection?.removeAllRanges()
                            selection?.addRange(newRange)
                        } catch (e) {
                            // 如果光标位置恢复失败，忽略错误
                        }
                    }
                }
            }
        }
    }, [value, internalValue, plainTextMode])

    // 处理内容变化
    const handleInput = useCallback(
        (e: React.FormEvent<HTMLDivElement>) => {
            if (isComposingRef.current) return

            let newValue: string

            if (plainTextMode) {
                // 纯文本模式：直接获取文本内容
                newValue = e.currentTarget.textContent || ''
            } else {
                // 富文本模式：获取HTML内容并清理
                const rawValue = e.currentTarget.innerHTML || ''
                newValue = sanitizeHTML(rawValue)
            }

            setInternalValue(newValue)
            setCurrentLength(e.currentTarget.textContent?.length || 0)
            onChange?.(newValue)
        },
        [onChange, plainTextMode],
    )

    // 处理组合输入
    const handleCompositionStart = useCallback(() => {
        isComposingRef.current = true
    }, [])

    const handleCompositionEnd = useCallback(
        (e: React.CompositionEvent<HTMLDivElement>) => {
            isComposingRef.current = false
            handleInput(e as any)
        },
        [handleInput],
    )

    // 处理粘贴
    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLDivElement>) => {
            const clipboardData = e.clipboardData

            // 检查是否有文件（图片等）
            const hasFiles = clipboardData.files && clipboardData.files.length > 0

            // 如果有文件（如图片），允许默认粘贴行为
            if (hasFiles) {
                return // 不阻止默认行为，让浏览器处理图片粘贴
            }

            // 检查是否有HTML内容
            const htmlData = clipboardData.getData('text/html')
            const textData = clipboardData.getData('text/plain')

            if (plainTextMode) {
                // 纯文本模式：只使用纯文本内容
                if (textData) {
                    e.preventDefault()
                    document.execCommand('insertText', false, textData)
                } else if (htmlData) {
                    // 如果没有纯文本但有HTML，则提取纯文本
                    e.preventDefault()
                    const plainText = stripHTMLTags(htmlData)
                    document.execCommand('insertText', false, plainText)
                }
            } else {
                // 富文本模式：优先使用HTML
                const pasteContent = htmlData || textData

                if (pasteContent) {
                    e.preventDefault()

                    // 粘贴内容
                    if (htmlData) {
                        // 清理HTML内容并插入
                        const cleanHTML = sanitizeHTML(htmlData)
                        document.execCommand('insertHTML', false, cleanHTML)
                    } else {
                        document.execCommand('insertText', false, textData)
                    }
                }
            }
        },
        [plainTextMode],
    )

    // 处理键盘事件
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
                // 不阻止默认行为，让换行正常发生
                // 但仍然触发回调
                onPressEnter?.(e)

                // 如果没有阻止默认行为，手动插入换行符
                if (!e.defaultPrevented) {
                    e.preventDefault()
                    document.execCommand('insertText', false, '\n')
                }
            }
        },
        [onPressEnter],
    )

    // 处理焦点
    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
            setIsFocused(true)
            onFocus?.(e)
        },
        [onFocus],
    )

    const handleChangeBlur = useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
            setIsFocused(false)
            if (isComposingRef.current) return

            let newValue: string

            if (plainTextMode) {
                // 纯文本模式：直接获取文本内容
                newValue = e.currentTarget.textContent || ''
            } else {
                // 富文本模式：获取HTML内容并清理
                const rawValue = e.currentTarget.innerHTML || ''
                newValue = sanitizeHTML(rawValue)
            }

            onChangeBlur?.(newValue)
        },
        [onChangeBlur, plainTextMode],
    )

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLDivElement>) => {
            setIsFocused(false)
            onBlur?.(e)
            handleChangeBlur(e)
        },
        [onBlur, handleChangeBlur],
    )

    // 清除内容
    const handleClear = useCallback(() => {
        if (contentRef.current) {
            if (plainTextMode) {
                contentRef.current.textContent = ''
            } else {
                contentRef.current.innerHTML = ''
            }
            contentRef.current.focus()
        }
        setInternalValue('')
        setCurrentLength(0)
        onChange?.('')
    }, [onChange, plainTextMode])

    // 暴露方法给 ref
    useImperativeHandle(
        ref,
        () => ({
            focus: () => {
                contentRef.current?.focus()
            },
            blur: () => {
                contentRef.current?.blur()
            },
            setSelectionRange: (start: number, end: number) => {
                if (contentRef.current) {
                    const range = document.createRange()
                    const sel = window.getSelection()
                    const textNode = contentRef.current.firstChild

                    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                        const textLength = textNode.textContent?.length || 0
                        range.setStart(textNode, Math.min(start, textLength))
                        range.setEnd(textNode, Math.min(end, textLength))
                        sel?.removeAllRanges()
                        sel?.addRange(range)
                    }
                }
            },
            scrollToEnd: () => {
                if (contentRef.current) {
                    contentRef.current.scrollTop = contentRef.current.scrollHeight
                }
            },
        }),
        [],
    )

    const minHeightByRows = useMemo(() => {
        return rows * lineHeight + padding.vertical * 2
    }, [rows, lineHeight, padding])

    const _disabled = useMemo(() => {
        return disabled
    }, [disabled, activeMode, active])

    const ActiveModeNotActive = useMemo(() => {
        return activeMode && !active
    }, [activeMode, active])

    return (
        <div
            className={classNames(styles.content_input, className, {
                [styles.focused]: isFocused,
                [styles.disabled]: _disabled,
                [styles.active]: activeMode && active,
                [styles.active_mode]: activeMode,
                [styles.has_value]: currentLength > 0,
                [styles.with_count]: showCount,
                [styles.active_mode_not_active]: ActiveModeNotActive,
            })}
            style={{
                ...style,
                backgroundColor:
                    _disabled || ActiveModeNotActive ? inactiveBackgroundColor : '#fff',
                height: heightMode === 'full' ? '100%' : 'unset',
            }}
        >
            <div
                ref={contentRef}
                className={styles.content_editable}
                style={{
                    lineHeight: `${lineHeight}px`,
                    height:
                        heightMode === 'auto'
                            ? 'auto'
                            : heightMode === 'full'
                            ? '100%'
                            : minHeightByRows,
                    overflow:
                        heightMode === 'auto' ? 'unset' : heightMode === 'full' ? 'unset' : 'auto',
                    padding: `${padding.vertical}px ${padding.horizontal}px`,
                    ...(editableStyle || {}),
                }}
                contentEditable={!_disabled}
                suppressContentEditableWarning
                onInput={handleInput}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                role="textbox"
                aria-placeholder={placeholder}
                aria-multiline="true"
            />

            {!currentLength && !isFocused && (
                <div
                    className={styles.placeholder}
                    style={{ top: `${padding.vertical}px`, left: `${padding.horizontal}px` }}
                >
                    {placeholder}
                </div>
            )}

            {allowClear && currentLength > 0 && !_disabled && (
                <div className={styles.clear_icon} onClick={handleClear}>
                    ×
                </div>
            )}

            {showCount && <div className={styles.count}>{currentLength}</div>}
        </div>
    )
})

ContentInput.displayName = 'ContentInput'

export default ContentInput
