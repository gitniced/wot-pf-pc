// 用户自定义的SSE数据类型
export type SSEData = Record<string, any>

export interface SSEConfig<T = any> {
    method?: 'GET' | 'POST'
    headers?: Record<string, string>
    body?: T
    signal?: AbortSignal
}

export interface SSEMessage<R = SSEData> {
    data: string | R
    event?: string
    id?: string
}

export interface SSEResult<R = SSEData> {
    subscribe: (callback: (message: SSEMessage<R>) => void) => void
    onClose: (callback: () => void) => void
    close: () => void
    connected: boolean
}

/**
 * ChatMessageDto ai对话的标准格式
 */
export interface ChatMessageDto {
    /**
     * 行为
     */
    actionJson?: any
    /**
     * 消息code
     */
    code?: string
    /**
     * 文本
     */
    content?: string
    /**
     * 点赞状态 0未点赞 1已点赞 -1踩
     */
    likeState?: number
    /**
     * 角色
     */
    messageRole?: string
    /**
     * 序号
     */
    messageSerialnumber?: string
    /**
     * 会话code
     */
    sessionCode?: string
    [property: string]: any
}

/**
 * MessageLikeReqDto
 */
export interface MessageLikeReqDto {
    /**
     * 消息code
     */
    code: string
    /**
     * 点赞状态 0默认 1点赞 -1踩
     */
    likeState: number
    [property: string]: any
}

/**
 * AI会话返回
 *
 * AiSessionDto
 */
export interface AiSessionDto {
    /**
     * 会话code
     */
    code: string
    /**
     * 会话标题
     */
    title?: string
    [property: string]: any
}
