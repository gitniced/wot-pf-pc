import React, { useRef } from 'react'
import styles from './index.module.less'
import ChatInput from '../ChatInput'
import type { Store } from '../../ChatModal/store'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import DotLoading from '../DotLoading'
import { useSmartScroll } from '../../hooks/useSmartScroll'
import { CustomMarkdown } from '../CustomMarkdown'
import { useDeepCompareEffect } from 'ahooks'
import ScrollIcon from '../ScrollIcon'

interface Props {
    store: Store
    style?: React.CSSProperties
}

function ChatContent({ store, style }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null)

    const messages = store.messages || []

    const { isAtBottom } = useSmartScroll(
        scrollRef,
        messages
            .slice(-1)
            .map(m => m.content)
            .join(''),
    )

    useDeepCompareEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [messages?.[0]?.sessionCode])

    // 处理消息列表的滚动加载
    const handleMessageScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        const { scrollTop } = target

        // 滚动到顶部时加载更多历史消息
        if (scrollTop <= 50) {
            store.loadMoreMessages()
        }
    }

    return (
        <div className={styles.chat_content} style={style}>
            <div
                className={styles.chat_scroll_wrapper}
                ref={scrollRef}
                onScroll={handleMessageScroll}
            >
                {/* 加载更多消息的提示 */}
                {store.loadingMessages && (
                    <div className={styles.loading_messages}>
                        <span>加载历史消息中...</span>
                    </div>
                )}

                {messages.map((m, idx) => {
                    const shouldShowTime = (() => {
                        if (!m.createdAt) return false

                        if (idx === 0) return true // 第一条消息总是显示时间

                        const prevMessage = messages[idx - 1]
                        if (!prevMessage?.createdAt) return false

                        const currentTime = dayjs(m.createdAt)
                        const prevTime = dayjs(prevMessage.createdAt)
                        const diffMinutes = currentTime.diff(prevTime, 'minute')

                        return Math.abs(diffMinutes) >= 10 // 间隔10分钟以上才显示
                    })()

                    return (
                        <React.Fragment key={m.code || idx}>
                            {shouldShowTime && (
                                <div className={styles.timer}>
                                    {dayjs(m.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                            )}
                            {m.messageRole === 'assistant' ? (
                                <div className={styles.left_block}>
                                    <CustomMarkdown>{m.content || ''}</CustomMarkdown>
                                    {store.streaming && idx === messages.length - 1 && (
                                        <DotLoading />
                                    )}
                                </div>
                            ) : (
                                <div className={styles.right_block}>{m.content}</div>
                            )}
                        </React.Fragment>
                    )
                })}
                {!isAtBottom && (
                    <ScrollIcon
                        onClick={() => {
                            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                        }}
                    />
                )}
            </div>
            <div className={styles.chat_input_wrapper}>
                <ChatInput
                    value={store.inputText}
                    onChange={store.setInput}
                    onSend={() => {
                        store.sendMessage()
                        setTimeout(() => {
                            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                        }, 100)
                    }}
                    disabled={store.streaming}
                    onClose={store.closeStream}
                />
            </div>
        </div>
    )
}

export default observer(ChatContent)
