import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { useLocation } from 'umi'
import { ChatModal } from '@/components/AIComp'
import aiStore from '@/modules/ai/store'
import type { SSEResult } from '@/components/AIComp/service/types'
import api from './api'
import sseClient from '@/components/AIComp/service/sse'
import { message } from 'antd'
import LoadingAnimation from '@/components/LoadingAnimation'
import { CustomMarkdown } from '../../../../../components/AIComp/components/CustomMarkdown'

const ExplainPopover = forwardRef<
    HTMLDivElement,
    {
        position: { x: number; y: number }
        title: string
        content: string
        onClose: () => void
        visible: boolean
        loading: boolean
        handleClick: (type: string) => void
    }
>((props, ref) => {
    const { position, title, content, onClose, visible, loading, handleClick } = props
    const [isAnimating, setIsAnimating] = useState(false)
    const [shouldRender, setShouldRender] = useState(visible)

    useEffect(() => {
        if (visible) {
            setShouldRender(true)
            // 延迟一帧触发动画，确保DOM已渲染
            requestAnimationFrame(() => {
                setIsAnimating(true)
            })
        } else {
            setIsAnimating(false)
            // 等待动画结束后移除DOM
            const timer = setTimeout(() => {
                setShouldRender(false)
            }, 300) // 与CSS动画时间保持一致
            return () => clearTimeout(timer)
        }
    }, [visible])

    useEffect(() => {
        if (content && visible) {
            const explainContentDom =
                document.querySelector?.(`.${styles.explain_content_info_content}`) || null
            if (explainContentDom) {
                const explainContentDomHeight = explainContentDom.scrollHeight
                explainContentDom.scrollTop = explainContentDomHeight
            }
        }
    }, [content, visible])

    if (!shouldRender) return null

    return (
        <div
            ref={ref}
            className={`${styles.explain_popover} ${
                isAnimating ? styles.explain_popover_visible : styles.explain_popover_hidden
            }`}
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                zIndex: 9999,
            }}
            onMouseDown={e => e.stopPropagation()}
        >
            <div className={styles.explain_content}>
                {/* 顶部 */}
                <div className={styles.explain_content_title_content}>
                    <div className={styles.explain_content_title}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#Question-Circle-Fill`} />
                        </svg>
                        <span>名词解释</span>
                    </div>

                    <div className={styles.explain_content_close} onClick={onClose}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#a-icon_guanbichacha`} />
                        </svg>
                    </div>
                </div>
                {/* 内容 */}
                <div className={styles.explain_content_info_content}>
                    <div className={styles.explain_content_select_content}>
                        <div className={styles.explain_content_select_content_sign} />
                        <div className={styles.explain_content_select_content_text}>{title}</div>
                    </div>

                    <CustomMarkdown>{content || ''}</CustomMarkdown>
                    {loading && <LoadingAnimation type={'wave'} size={'small'} />}
                </div>
                {/* 底部 */}
                <div className={styles.explain_content_foot_content}>
                    <div
                        className={styles.explain_content_foot_content_button}
                        onClick={() => handleClick('copy')}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#ic_fuzhi`} />
                        </svg>
                        <span>复制</span>
                    </div>

                    <div
                        className={styles.explain_content_foot_content_button}
                        onClick={() => handleClick('ai')}
                    >
                        <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/button_ai_small.png" />
                        <span>打开AI助教</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

const useHighlight = (courseCode: string) => {
    const { pathname, search } = useLocation()
    // 解释弹窗引用
    const explainRef = useRef<HTMLDivElement>(null)
    // sse引用
    const currentSSERef = useRef<SSEResult | null>(null)
    // 是否显示小浮动DOM
    const [showTooltip, setShowTooltip] = useState(false)
    // 小浮动DOM位置
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
    // 选中文本
    const [selectedText, setSelectedText] = useState('')
    // 是否显示解释弹窗
    const [showPopover, setShowPopover] = useState(false)
    // 解释弹窗位置
    const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 })
    // 解释内容
    const [explainContent, setExplainContent] = useState('')
    // 是否显示加载中
    const [showLoading, setShowLoading] = useState(false)
    // 是否显示AI助教
    const [open, setOpen] = useState(false)

    // 存储选中范围的引用
    const [selectedRange, setSelectedRange] = useState<Range | null>(null)

    useEffect(() => {
        if (courseCode && selectedText) {
            setShowLoading(true)
            currentSSERef.current = sseClient<any, any>(api.nounExplainAssistant, {
                courseCode,
                prompt: selectedText,
            })

            currentSSERef.current.subscribe(({ data }: { data: any }) => {
                setExplainContent(data?.content)
                if (String(data?.finishStatus) === '2') {
                    setShowLoading(false)
                }
            })
        }
        return () => {
            if (currentSSERef.current) {
                currentSSERef.current.close()
            }
        }
    }, [courseCode, selectedText])

    useEffect(() => {
        if (!showPopover) {
            setSelectedText('')
            if (currentSSERef.current) {
                currentSSERef.current.close()
            }
        }
    }, [showPopover])

    // 计算大浮动DOM的最佳位置（智能选择上下显示位置）
    const calculatePopoverPosition = (
        smallTooltipPos: { x: number; y: number },
        range?: Range | null,
    ) => {
        // 获取实际的弹窗尺寸，如果ref还没有值则使用估算尺寸
        const popoverWidth = explainRef?.current?.offsetWidth || 360
        const popoverHeight = explainRef?.current?.offsetHeight || 400
        const margin = 16 // 边距

        // 获取视口尺寸
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // 获取选中文本的位置信息
        let textTop = smallTooltipPos.y
        let textBottom = smallTooltipPos.y

        if (range) {
            const textRect = range.getBoundingClientRect()
            textTop = textRect.top
            textBottom = textRect.bottom
        }

        // 计算上方和下方的可用空间
        const spaceAbove = textTop - margin
        const spaceBelow = viewportHeight - textBottom - margin

        // 默认位置（在小浮动DOM位置）
        let x = smallTooltipPos.x
        let y = smallTooltipPos.y

        // 垂直位置智能选择
        if (spaceBelow >= popoverHeight) {
            // 下方空间足够，显示在选中文本下方
            y = textBottom + 4
        } else if (spaceAbove >= popoverHeight) {
            // 下方空间不够但上方空间足够，显示在选中文本上方
            y = textTop - popoverHeight - 4
        } else {
            // 上下空间都不够，选择空间较大的一侧
            if (spaceAbove > spaceBelow) {
                y = margin // 贴近顶部
            } else {
                y = viewportHeight - popoverHeight - margin // 贴近底部
            }
        }

        // 水平方向调整：确保不超出右边界
        if (x + popoverWidth > viewportWidth) {
            x = viewportWidth - popoverWidth - margin
        }

        // 水平方向调整：确保不超出左边界
        if (x < margin) {
            x = margin
        }

        return { x, y }
    }

    // 更新浮层位置
    const updateTooltipPosition = (range: Range) => {
        const rect = range.getBoundingClientRect()
        // 检查元素是否还在可见区域
        if (rect.width > 0 && rect.height > 0) {
            // 使用fixed定位，不需要加滚动偏移
            setTooltipPos({
                x: rect.left,
                y: rect.bottom + 4,
            })
            return true
        }
        return false
    }

    // 检查是否为可选择的DOM元素（基于CSS user-select属性）
    const isSelectableElement = (element: Element): boolean => {
        // 检查当前元素及其父元素的user-select属性
        let currentElement: Element | null = element
        while (currentElement) {
            const computedStyle = window.getComputedStyle(currentElement)
            if (computedStyle.userSelect === 'none') {
                return false
            }
            currentElement = currentElement.parentElement
        }
        return true
    }

    const handleMouseUp = () => {
        const selection = window.getSelection()
        if (selection && selection.toString().trim()) {
            const range = selection.getRangeAt(0)
            const rect = range.getBoundingClientRect()

            // 检查选中内容的容器元素是否可选择
            const container = range.commonAncestorContainer
            const targetElement =
                container.nodeType === Node.TEXT_NODE
                    ? container.parentElement
                    : (container as Element)

            // 只处理可见区域且可选择的划词
            if (
                rect.width > 0 &&
                rect.height > 0 &&
                targetElement &&
                isSelectableElement(targetElement)
            ) {
                setSelectedRange(range)
                updateTooltipPosition(range)
                setSelectedText(selection.toString())
                setShowTooltip(true)
            } else {
                setShowTooltip(false)
                setSelectedRange(null)
            }
        } else {
            setShowTooltip(false)
            setSelectedRange(null)
        }
    }

    // 点击页面其他地方关闭浮层
    const handleClick = () => {
        setShowTooltip(false)
        setShowPopover(false)
        setSelectedRange(null)
    }

    // 监听滚动事件，更新浮层位置
    const handleScroll = () => {
        if (selectedRange) {
            const rect = selectedRange.getBoundingClientRect()
            const isVisible = rect.width > 0 && rect.height > 0

            if (isVisible) {
                // 如果选中内容还在可视区域，更新位置
                const newPos = {
                    x: rect.left,
                    y: rect.bottom + 4,
                }

                // 更新小浮层位置
                if (showTooltip) {
                    setTooltipPos(newPos)
                }

                // 更新大浮层位置
                if (showPopover) {
                    const popoverPosition = calculatePopoverPosition(newPos, selectedRange)
                    setPopoverPos(popoverPosition)
                }
            } else {
                // 如果选中的内容已经不在可视区域，隐藏所有浮层
                setShowTooltip(false)
                setShowPopover(false)
                setSelectedRange(null)
            }
        }
    }

    // 监听鼠标划词
    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousedown', handleClick)
        window.addEventListener('scroll', handleScroll, true) // 使用捕获模式监听所有滚动
        window.addEventListener('resize', handleScroll) // 窗口大小变化时也需要更新

        return () => {
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousedown', handleClick)
            window.removeEventListener('scroll', handleScroll, true)
            window.removeEventListener('resize', handleScroll)
        }
    }, [selectedRange, showTooltip, showPopover])

    useEffect(() => {
        handleClick()
    }, [pathname, search])

    // 点击"名词解释"按钮
    const handleExplainClick = () => {
        setShowTooltip(false) // 隐藏小浮动DOM
        // 计算大浮动DOM的位置，智能选择上下显示位置
        const popoverPosition = calculatePopoverPosition(tooltipPos, selectedRange)
        setPopoverPos(popoverPosition)
        // 这里可以根据实际需求请求接口获取名词解释内容
        setExplainContent(`${selectedText}`)
        setShowPopover(true) // 显示大浮动DOM
    }

    const explainClick = (type: string) => {
        if (type === 'copy') {
            navigator.clipboard.writeText(explainContent)
            message.success('复制成功')
        }
        if (type === 'ai') {
            setOpen(true)
        }
    }

    // 渲染浮动按钮和解释弹窗（互斥显示）
    const render = () => (
        <>
            {showTooltip && !showPopover && (
                <div
                    style={{
                        position: 'fixed',
                        left: tooltipPos.x,
                        top: tooltipPos.y,
                        zIndex: 9999,
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                    onMouseDown={e => e.stopPropagation()}
                    onClick={handleExplainClick}
                >
                    <div className={styles.highlight_tooltip}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#Question-Circle-Fill`} />
                        </svg>
                        <span>名词解释</span>
                    </div>
                </div>
            )}
            <ExplainPopover
                ref={explainRef}
                visible={showPopover}
                loading={showLoading}
                position={popoverPos}
                title={selectedText}
                content={explainContent}
                onClose={handleClick}
                handleClick={explainClick}
            />
            <ChatModal
                params={{ courseCode: aiStore?.exchangeData?.courseCode }}
                open={open}
                onCancel={() => setOpen(false)}
            />
        </>
    )

    return { render }
}

export default useHighlight

// 用法示例：
// 在页面组件中
// const { render } = useHighlight()
// return (
//   <>
//     {render()}
//     <div>页面内容...</div>
//   </>
// )
