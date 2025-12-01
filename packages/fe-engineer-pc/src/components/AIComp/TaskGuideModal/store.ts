import { makeAutoObservable } from 'mobx'
import sseClient from '../service/sse'
import type { SSEResult } from '../service/types'
import type { AiSessionDto, ChatMessageDto } from '../service/types'
import { taskGuideSessionHistory } from '../service/service'

const DEFAULT_STREAM_URL = '/wil/ai/task_guide_assistant'

export class Store {
    // 会话列表（对齐 AiSessionDto）
    conversations: AiSessionDto[] = []
    // 当前激活会话 code
    activeId: string | null = null
    // 当前会话消息（对齐 ChatMessageDto）
    messages: ChatMessageDto[] = []
    inputText: string = ''
    streaming: boolean = false
    private streamRef: SSEResult | null = null
    streamUrl: string = DEFAULT_STREAM_URL
    params: any = {}

    // 加载状态
    loadingConversations: boolean = false
    loadingMessages: boolean = false

    // 消息游标分页状态
    messageCursor: string | null = null
    messageHasMore: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get activeConversation(): AiSessionDto | null {
        return this.conversations.find(c => c.code === this.activeId) || null
    }

    setParams(val: any) {
        this.params = val
    }

    setInput(val: string): void {
        this.inputText = val
    }

    // 使用接口请求获取对话消息（基于游标分页，向上滚动加载更早的消息）
    async loadMessages(conversationId: string): Promise<void> {
        if (this.loadingMessages) return

        this.loadingMessages = true

        try {
            // 调用 listSessionHistory 接口获取消息历史
            const response = await taskGuideSessionHistory({
                sessionCode: conversationId,
                cursor: this.messageCursor as any,
                limit: 10,
                type: 4,
                ...this.params,
            })
            const { data, cursor, hasMore } = response as any
            // data 结构期望为 { cursor?: string, data?: ChatMessageDto[], hasMore?: boolean }
            const list = data || []
            this.activeId = data?.[0]?.sessionCode || null
            if (!this.activeId) {
                this.sendMessage()
            }
            if (Array.isArray(list)) {
                const convertedMessages: ChatMessageDto[] = list.reverse().map((msg: any) => ({
                    ...msg,
                    code: msg.code,
                    messageRole: msg.messageRole,
                    content: msg.content,
                    sessionCode: msg.sessionCode,
                }))

                // 历史消息应当插入到顶部，保持时间顺序从旧到新
                this.messages = [...convertedMessages, ...this.messages]

                // 维护游标与是否还有更多
                this.messageCursor = cursor ?? null
                this.messageHasMore = Boolean(hasMore)
            }
        } catch (error) {
            console.error('加载消息失败:', error)
        } finally {
            this.loadingMessages = false
        }
    }

    // 滚动加载更多消息
    loadMoreMessages(): void {
        if (this.activeId && !this.loadingMessages && this.messageHasMore) {
            this.loadMessages(this.activeId)
        }
    }

    closeStream(): void {
        if (this.streamRef) {
            this.streamRef.close()
            this.streamRef = null
        }
        this.streaming = false
    }

    closeModal(): void {
        this.closeStream()
        this.messages = []
        this.messageCursor = null
        this.messageHasMore = true
    }

    async sendMessage(prompt?: string, extraParams?: any): Promise<void> {
        const content = prompt || this.inputText.trim()
        if (this.streaming) return

        // 结束上次流
        this.closeStream()

        const sessionCode = this.activeId || undefined
        const userMsg: ChatMessageDto = {
            code: `${Date.now()}-u`,
            messageRole: 'user',
            content,
            sessionCode,
        }

        const assistantMsg: ChatMessageDto = {
            code: `${Date.now()}-a`,
            messageRole: 'assistant',
            content: '',
            sessionCode,
        }

        // 推入本地消息列表
        if (content) {
            this.messages.push(userMsg)
        }
        this.messages.push(assistantMsg)
        this.inputText = ''
        this.streaming = true

        // 开始SSE流
        const body = {
            prompt: content,
            ...this.params,
            sessionCode,
            ...(extraParams || {}),
        }

        const sse = sseClient<any, any>(this.streamUrl, body)
        this.streamRef = sse
        sse.subscribe(msg => {
            try {
                const data = msg.data as any
                this.activeId = data?.sessionCode || null
                let chunk = ''
                if (typeof data === 'string') {
                    chunk = data
                } else if (data && typeof data === 'object') {
                    chunk = data.delta || data.content || ''
                }

                if (chunk) {
                    const last = this.messages[this.messages.length - 1]
                    if (last && last.messageRole === 'assistant') {
                        last.content = String(chunk)
                    }
                }
            } catch (e) {
                this.finishStream()
            }
        })
        sse.onClose(() => {
            this.finishStream()
        })
    }

    private finishStream(): void {
        this.streaming = false
        this.closeStream()
    }
}
