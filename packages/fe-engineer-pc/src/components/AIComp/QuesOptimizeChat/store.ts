import { makeAutoObservable } from 'mobx'
import sseClient from '../service/sse'
import type { AiSessionDto, SSEResult } from '../service/types'
import { api } from '../service/api'
import { aiLike, getHistoryData, listSessionHistory } from '../service/service'

export interface OptimizeResult {
    sessionCode: string
    role?: 'user' | 'assistant'
    content: string
    code: string
    messageSerialnumber: string
    messageRole: string
    likeState: number
    actionJson: any
    timestamp?: number
    userPrompt?: string // 存储对应的用户指令
    finishStatus?: number
    extra?: any
}

export class Store {
    streamRef: SSEResult | null = null
    inputText: string = ''
    streaming: boolean = false
    messages: OptimizeResult[] = []
    currentOptimizeResult: OptimizeResult | null = null
    isGenerating: boolean = false
    currentStreamingMessageId: string | null = null
    params: any = {}

    step: number = 0
    historyList: AiSessionDto[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setStep(val: number): void {
        this.step = val
    }

    setInput(val: string): void {
        this.inputText = val
    }

    setParams = (params: any) => {
        this.params = params
    }

    setMessages(val: OptimizeResult[]): void {
        this.messages = val
    }

    async sendMessage(extraParams: any): Promise<void> {
        const content = this.inputText.trim()
        if (!content || this.streaming) return

        // 添加用户消息到历史记录
        const userMessage: OptimizeResult = {
            sessionCode: `user_${Date.now()}`,
            role: 'user',
            content,
            code: `user_${Date.now()}`,
            messageSerialnumber: `user_${Date.now()}`,
            messageRole: 'user',
            likeState: 0,
            timestamp: Date.now(),
            actionJson: { extra: { questionConfig: extraParams } },
        }
        this.messages = [userMessage]

        this.inputText = ''
        this.streaming = true
        this.isGenerating = true

        // 清空之前的优化结果
        this.currentOptimizeResult = null

        const body = {
            prompt: content,
            extra: { questionConfig: extraParams },
            ...this.params,
        }

        try {
            const sse = sseClient<any, any>(api.courseWaysOptimize, body)
            this.streamRef = sse
            let isFirst = false
            sse.subscribe(msg => {
                if (msg.data && typeof msg.data === 'object') {
                    if (!isFirst) {
                        isFirst = true
                        this.getHistoryData()
                    }
                    const data = msg.data as OptimizeResult
                    this.step = 1

                    // 更新当前优化结果
                    this.currentOptimizeResult = {
                        ...this.currentOptimizeResult,
                        ...data,
                    }

                    // 实时更新流式消息内容
                    // if (data.content) {
                    const curMsg = this.messages.find(
                        d => d.sessionCode === this.currentStreamingMessageId,
                    )
                    if (curMsg) {
                        curMsg.content = data.content
                        // 同步其他字段
                        curMsg.code = data.code || curMsg.code
                        curMsg.messageSerialnumber =
                            data.messageSerialnumber || curMsg.messageSerialnumber
                        curMsg.messageRole = data.messageRole || curMsg.messageRole
                        curMsg.likeState = data.likeState || curMsg.likeState
                        curMsg.actionJson = data.actionJson || curMsg.actionJson
                        curMsg.finishStatus = data.finishStatus || curMsg.finishStatus
                    } else {
                        this.currentStreamingMessageId = data.sessionCode
                        this.messages.push({ ...data, userPrompt: content })
                    }
                    // }
                }
            })

            sse.onClose(() => {
                this.streaming = false
                this.isGenerating = false
                this.currentStreamingMessageId = null
            })
        } catch (error) {
            console.error('发送消息失败:', error)
            this.streaming = false
            this.isGenerating = false
            this.currentStreamingMessageId = null

            // 移除流式消息占位符
            if (this.currentStreamingMessageId) {
                const index = this.messages.findIndex(
                    msg => msg.sessionCode === this.currentStreamingMessageId,
                )
                if (index !== -1) {
                    this.messages.splice(index, 1)
                }
            }
        }
    }

    closeStream(): void {
        if (this.streamRef) {
            this.streamRef.close()
            this.streamRef = null
        }
        this.streaming = false
        this.currentStreamingMessageId = null
    }

    regenerate(data: OptimizeResult): void {
        if (this.isGenerating) return

        // 重新发送最后一条用户消息
        if (data.userPrompt) {
            this.inputText = data.userPrompt
            this.sendMessage(this?.messages?.[0]?.actionJson?.extra?.questionConfig)
        }
    }

    // 切换指定消息的点赞状态
    toggleMessageLike(code: string, likeState: number): void {
        const message = this.messages.find(msg => msg.code === code)
        if (message) {
            message.likeState = likeState
        }
        aiLike({ code, likeState })
    }

    // 获取历史数据
    getHistoryData() {
        getHistoryData({ type: 1, ...this.params }).then(data => {
            this.historyList = data
        })
    }

    async getAnswerData(code: string): Promise<void> {
        // 调用 listSessionHistory 接口获取消息历史
        const response = await listSessionHistory({
            sessionCode: code,
            limit: 10,
        })
        const { data } = response as any
        // data 结构期望为 { cursor?: string, data?: ChatMessageDto[], hasMore?: boolean }
        const list = data || []
        if (Array.isArray(list)) {
            const convertedMessages: any[] = list.reverse().map((msg: any) => ({
                ...msg,
                code: msg.code,
                messageRole: msg.messageRole,
                content: msg.content,
                sessionCode: msg.sessionCode,
            }))

            // 历史消息应当插入到顶部，保持时间顺序从旧到新
            this.messages = [...convertedMessages]
            this.step = 1
        }
    }
}
