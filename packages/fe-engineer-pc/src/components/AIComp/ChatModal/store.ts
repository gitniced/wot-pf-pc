import { makeAutoObservable } from 'mobx'
import sseClient from '../service/sse'
import type { SSEResult } from '../service/types'
import type { AiSessionDto, ChatMessageDto } from '../service/types'
import { listSession, listSessionHistory, recommendQuestion } from '../service/service'
// ai助教
const DEFAULT_STREAM_URL = '/wil/ai/student_ai_assistant'
// 课程设计助手
// '/wil/ai/course_design_assistant'

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

    // 推荐问题
    recommendQuestions: any[] = []

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

    // 获取推荐问题
    getRecommendQues() {
        // personType 用户类型， 默认是2学生，1是课程设计助手
        recommendQuestion({ personType: '2', ...this.params }).then(res => {
            this.recommendQuestions = res
        })
    }

    // 获取对话列表 - 使用接口请求替代缓存
    async loadConversations(): Promise<void> {
        if (this.loadingConversations) return

        this.loadingConversations = true

        try {
            // 调用 listSession 接口获取会话列表
            const response = await listSession({ type: '2', ...this.params })

            if (response && Array.isArray(response)) {
                const convertedConversations: AiSessionDto[] = response.map((session: any) => ({
                    code: session.code,
                    title: session.title || '新对话',
                }))

                this.conversations = convertedConversations

                // 设置第一个对话为活跃对话
                if (!this.activeId && this.conversations.length > 0) {
                    this.activeId = this.conversations[0].code
                }
            }
        } catch (error) {
            console.error('加载对话列表失败:', error)
        } finally {
            this.loadingConversations = false
        }
    }

    // 使用接口请求获取对话消息（基于游标分页，向上滚动加载更早的消息）
    async loadMessages(conversationId: string, force: boolean = false): Promise<void> {
        if (this.loadingMessages || (!this.messageCursor && !force)) return

        const conv = this.conversations.find(c => c.code === conversationId)
        if (!conv) return

        this.loadingMessages = true

        try {
            // 调用 listSessionHistory 接口获取消息历史
            const response = await listSessionHistory({
                sessionCode: conversationId,
                cursor: this.messageCursor as any,
                limit: 10,
            })
            const { data, cursor, hasMore } = response as any
            // data 结构期望为 { cursor?: string, data?: ChatMessageDto[], hasMore?: boolean }
            const list = data || []
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

    // 新对话：仅设置激活会话与清空消息，不写入历史列表
    newConversation(): void {
        if (this.activeId && String(this.activeId).startsWith('new-')) return
        const code = `new-${Date.now()}`
        this.activeId = code
        this.messages = []
        this.closeStream()
    }

    selectConversation(id: string): void {
        // 切换会话时关闭之前的SSE流
        this.closeStream()

        this.activeId = id
        // 选择对话时加载该会话消息
        this.messages = []
        this.messageCursor = null
        this.messageHasMore = true
        this.loadMessages(id, true)
    }

    // 滚动加载更多对话
    loadMoreConversations(): void {
        if (!this.loadingConversations) {
            this.loadConversations()
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

    async sendMessage(): Promise<void> {
        const content = this.inputText.trim()
        if (!content || this.streaming) return

        if (!this.activeConversation) this.newConversation()

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
        this.messages.push(userMsg)
        this.messages.push(assistantMsg)

        // 简易标题·
        const conv = this.activeConversation
        if (conv && (conv.title || '') === '新对话' && userMsg.content) {
            conv.title = String(userMsg.content)
        }

        this.inputText = ''
        this.streaming = true

        // 开始SSE流
        const body = {
            prompt: content,
            sessionCode:
                sessionCode && !String(sessionCode).startsWith('new-') ? sessionCode : undefined,
            ...this.params,
        }

        const sse = sseClient<any, any>(this.streamUrl, body)
        this.streamRef = sse
        sse.subscribe(msg => {
            try {
                const data = msg.data as any
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

                // 检查是否收到完整的会话信息，更新历史对话列表
                if (
                    data &&
                    typeof data === 'object' &&
                    data.sessionCode &&
                    !String(data.sessionCode).startsWith('new-')
                ) {
                    // 收到真实的sessionCode，更新新对话信息
                    this.updateNewConversationInHistory(
                        data.sessionCode,
                        data.title || this.getConversationTitle(),
                    )
                }
            } catch (e) {
                this.finishStream()
            }
        })
        sse.onClose(() => {
            this.finishStream()
        })
    }

    // 获取对话标题（取第一条用户消息的前12个字符）
    private getConversationTitle(): string {
        const firstUserMessage = this.messages.find(msg => msg.messageRole === 'user')
        if (firstUserMessage && firstUserMessage.content) {
            return String(firstUserMessage.content).slice(0, 12)
        }
        return '新对话'
    }

    // 更新新对话到历史对话列表
    private updateNewConversationInHistory(sessionCode: string, title: string): void {
        // 检查是否已经存在这个会话
        const existingIndex = this.conversations.findIndex(conv => conv.code === sessionCode)

        if (existingIndex === -1) {
            // 新会话，添加到历史列表
            const newConversation: AiSessionDto = {
                code: sessionCode,
                title: title,
            }
            this.conversations.unshift(newConversation)

            // 更新当前选中的会话ID为真实的sessionCode
            this.activeId = sessionCode
        }
    }

    private finishStream(): void {
        this.streaming = false
        this.closeStream()
    }
}
