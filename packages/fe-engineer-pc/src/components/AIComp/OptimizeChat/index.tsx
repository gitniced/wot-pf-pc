import React, { useRef } from 'react'
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons'
import './index.less'
import ChatInput from '../components/ChatInput'
import { observer, useLocalObservable } from 'mobx-react'
import type { OptimizeResult } from './store'
import { Store } from './store'
import { CustomMarkdown } from '../components/CustomMarkdown'
import { useDeepCompareEffect } from 'ahooks'
import DotLoading from '../components/DotLoading'
import { Spin } from 'antd'
import { useSmartScroll } from '../hooks/useSmartScroll'
interface OptimizeChatProps {
    params: any
    onOptionsClick: (type: string, values: any) => void
}

export const OptimizeChat = observer(function (props: OptimizeChatProps) {
    const { params, onOptionsClick } = props
    const store = useLocalObservable(() => new Store())
    const contentRef = useRef<HTMLDivElement>(null)

    const handleUse = (message: OptimizeResult) => {
        if (Number(message.finishStatus) === 3) {
            onOptionsClick?.('use', message)
        }
    }

    useDeepCompareEffect(() => {
        store.setParams(params)
    }, [params])

    useSmartScroll(contentRef, store.messages?.[1]?.content, [store.currentOptimizeResult])

    return (
        <div className="optimize_container">
            <div className="optimize_container_title">
                <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/ai_small_icon_c47234e4.png" />
                <span>智能优化</span>
            </div>
            <div className="optimize_container_content" ref={contentRef}>
                {/* 对话历史记录 */}
                {store.messages.map((message, index) => (
                    <div
                        key={message.sessionCode}
                        className={
                            message.role === 'user' ? 'optimize_right_block' : 'optimize_left_block'
                        }
                    >
                        {message.role === 'user' ? (
                            <div>
                                <div className="message_content">{message.content}</div>
                            </div>
                        ) : (
                            <>
                                <CustomMarkdown>{message.content}</CustomMarkdown>
                                {store.streaming && index === store.messages.length - 1 && (
                                    <DotLoading />
                                )}
                                {/* 每条 AI 助手消息都显示操作按钮 */}
                                {(!store.streaming || index !== store.messages.length - 1) && (
                                    <div className="options_bar">
                                        <div
                                            className={`blank_btn ${
                                                store.streaming && 'disabled_btn'
                                            }`}
                                            onClick={() =>
                                                !store.streaming && store.regenerate(message)
                                            }
                                        >
                                            <SyncOutlined />
                                            重新生成
                                        </div>

                                        <div
                                            className={`blank_btn ${
                                                (message?.finishStatus || 0) !== 3 && 'disabled_btn'
                                            }`}
                                            onClick={() => {
                                                handleUse(message)
                                            }}
                                        >
                                            {message?.finishStatus === 2 && <Spin size="small" />}
                                            {message?.finishStatus === 3 && <CheckCircleOutlined />}
                                            {message?.finishStatus === 4 && <CloseCircleOutlined />}
                                            使用
                                        </div>
                                        <div
                                            className={`solid_btn ${
                                                message.likeState === 1 ? 'liked' : ''
                                            }`}
                                            onClick={() =>
                                                store.toggleMessageLike(
                                                    message.code,
                                                    message.likeState === 1 ? 0 : 1,
                                                )
                                            }
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                {/* dianzan_mian */}
                                                <use
                                                    xlinkHref={
                                                        message.likeState === 1
                                                            ? '#dianzan_mian'
                                                            : `#dianzan`
                                                    }
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`solid_btn ${
                                                message.likeState === -1 ? 'disliked' : ''
                                            }`}
                                            onClick={() =>
                                                store.toggleMessageLike(
                                                    message.code,
                                                    message.likeState === -1 ? 0 : -1,
                                                )
                                            }
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                <use
                                                    xlinkHref={
                                                        message.likeState === -1
                                                            ? `#cai_mian`
                                                            : '#cai'
                                                    }
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            <ChatInput
                placeholder="请输入优化指令"
                value={store.inputText}
                onChange={store.setInput}
                onSend={() => {
                    store.sendMessage()
                    setTimeout(() => {
                        contentRef.current.scrollTop = contentRef.current.scrollHeight
                    }, 100)
                }}
                disabled={store.streaming}
                onClose={store.closeStream}
            />
        </div>
    )
})
