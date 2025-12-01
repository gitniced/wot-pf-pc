import { useEffect, useRef, useState } from 'react'

/**
 * 智能滚动Hook - 当内容变动时自动滚动到底部，用户手动滚动时暂停自动滚动
 * @param domRef DOM对象引用
 * @param content 内容变化时的依赖项
 * @param dependencies 依赖项
 */
export const useSmartScroll = (
    domRef: React.RefObject<HTMLElement>,
    content: any,
    dependencies?: any[],
) => {
    const resumeDelay = 1000000
    const isUserScrollingRef = useRef(false)
    const scrollTimerRef = useRef<NodeJS.Timeout | null>(null)
    const lastContentRef = useRef(content)
    const isAutoScrollingRef = useRef(false) // 标志位：是否正在自动滚动
    const [isAtBottom, setIsAtBottom] = useState(true) // 是否在底部

    // 滚动到底部的函数
    const scrollToBottom = () => {
        if (domRef.current && !isUserScrollingRef.current) {
            isAutoScrollingRef.current = true // 标记为自动滚动
            domRef.current.scrollTop = domRef.current.scrollHeight
            // 延迟重置自动滚动标志，确保scroll事件处理完成
            setTimeout(() => {
                isAutoScrollingRef.current = false
            }, 100)
        }
    }

    // 处理用户滚动事件
    const handleUserScroll = () => {
        if (!domRef.current) return

        // 如果是自动滚动触发的scroll事件，忽略处理
        if (isAutoScrollingRef.current) {
            return
        }

        const { scrollTop, scrollHeight, clientHeight } = domRef.current
        const isAtBottomValue = scrollTop + clientHeight >= scrollHeight - 10 // 10px容差

        // 更新是否在底部的状态
        setIsAtBottom(isAtBottomValue)

        // 如果用户滚动到底部，恢复自动滚动
        if (isAtBottomValue) {
            isUserScrollingRef.current = false
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
                scrollTimerRef.current = null
            }
        } else if (!isUserScrollingRef.current) {
            // 用户手动滚动，暂停自动滚动
            isUserScrollingRef.current = true

            // 清除之前的定时器
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
            }

            // 设置新的定时器，5秒后恢复自动滚动
            scrollTimerRef.current = setTimeout(() => {
                isUserScrollingRef.current = false
                scrollTimerRef.current = null
            }, resumeDelay)
        }
    }

    useEffect(() => {
        const dom = domRef.current
        if (!dom) return

        // 添加滚动事件监听器
        dom.addEventListener('scroll', handleUserScroll, { passive: true })

        return () => {
            dom.removeEventListener('scroll', handleUserScroll)
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current)
            }
        }
    }, [])

    // 监听内容变化
    useEffect(() => {
        lastContentRef.current = content
        // 使用 setTimeout 确保DOM已更新
        setTimeout(scrollToBottom, 0)
    }, [content, ...(dependencies || [])])

    return {
        scrollToBottom,
        isUserScrolling: isUserScrollingRef.current,
        isAtBottom,
    }
}
