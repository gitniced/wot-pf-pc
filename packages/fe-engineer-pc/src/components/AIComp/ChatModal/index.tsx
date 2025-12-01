import { Empty, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import './index.less'
import Home from '../components/Home'
import ChatContent from '../components/ChatContent'
import { Store } from './store'
import { observer, useLocalObservable } from 'mobx-react'
import type { ChatModalInterface } from './types'

export const ChatModal = observer((props: ChatModalInterface) => {
    const { open, onCancel, streamUrl, params, welcome, title } = props
    const store = useLocalObservable(() => new Store())
    const historyScrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (streamUrl) store.streamUrl = streamUrl
    }, [streamUrl])

    useEffect(() => {
        if (!open) {
            store.closeStream()
        } else {
            store.setParams(params)
            // 先设为新对话（不写入历史）
            store.newConversation()
            // 再加载历史会话，不显示新对话
            store.loadConversations()
        }
    }, [open])

    // 监听右侧组件显示状态，当显示Home时获取推荐问题
    useEffect(() => {
        console.log(store.activeId)
        const shouldShowHome = !store.activeId || store.activeId?.startsWith('new')
        if (shouldShowHome && open) {
            store.getRecommendQues()
        }
    }, [store.activeId, open])

    // 处理历史对话列表的滚动加载
    // const handleHistoryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    //     const target = e.target as HTMLDivElement
    //     const { scrollTop, scrollHeight, clientHeight } = target

    //     // 滚动到底部时加载更多对话
    //     if (scrollTop + clientHeight >= scrollHeight - 10) {
    //         store.loadMoreConversations()
    //     }
    // }

    return (
        <Modal
            open={open}
            footer={false}
            wrapClassName="pt_ai_chat_modal__container"
            className="pt_ai_chat_modal__wrapper"
            mask={false}
            style={{
                top: 0,
                paddingBottom: 0,
                marginRight: 0,
                minWidth: 700,
            }}
            width={960}
            onCancel={onCancel}
            maskClosable={false}
        >
            <div className="pt_ai_chat_modal__body">
                <div className="pt_ai_chat_modal__left">
                    <div className="pt_ai_chat_modal__title">
                        <img
                            src="https://static.zpimg.cn/public/fe-engineer-pc/images/png_aizhushou%402x_96b38b91.png"
                            alt=""
                        />
                        <span>{title || 'AI助教'}</span>
                    </div>
                    <div className="pt_ai_chat_modal__add" onClick={() => store.newConversation()}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#newmessage`} />
                            </svg>
                            <span>新对话</span>
                        </div>
                    </div>
                    <div className="pt_ai_chat_modal__history">
                        <span className="pt_ai_chat_modal__history_subtitle">历史对话</span>
                        <div
                            className="pt_ai_chat_modal__history_wrapper"
                            ref={historyScrollRef}
                            // onScroll={handleHistoryScroll}
                        >
                            {!store.loadingConversations && !store.conversations?.length && (
                                <>
                                    <Empty />
                                </>
                            )}
                            {!store.loadingConversations &&
                                store.conversations.map(item => (
                                    <div
                                        className={`history_item${
                                            store.activeId === item.code ? ' active' : ''
                                        }`}
                                        key={item.code}
                                        onClick={() => store.selectConversation(item.code)}
                                    >
                                        <div className="icon_wrapper">
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref={`#message1`} />
                                            </svg>
                                        </div>
                                        <span>{item.title}</span>
                                    </div>
                                ))}
                            {store.loadingConversations && (
                                <div className="history_loading">
                                    <span>加载中...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="pt_ai_chat_modal__right">
                    {/* 每次打开时展示Home 发送信息后展示 ChatContent */}
                    {store.messages.length || !store.activeId?.startsWith('new') ? (
                        <ChatContent store={store} />
                    ) : (
                        <Home
                            value={store.inputText}
                            onChange={store.setInput}
                            onSend={store.sendMessage}
                            recommendQuestions={store.recommendQuestions}
                            welcome={welcome}
                            title={title}
                        />
                    )}
                </div>
            </div>
        </Modal>
    )
})
