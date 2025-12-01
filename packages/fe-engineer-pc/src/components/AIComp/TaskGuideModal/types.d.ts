interface TaskGuideModalInterface {
    open: boolean
    onCancel?: () => void
    streamUrl?: string
    params: any
    preprocess?: (sendMessage: (prompt?: string, extraParams?: any) => Promise<void>) => void
}

type Role = 'user' | 'assistant'

export interface JSONObject {
    key?: Record<string, any>
    [property: string]: any
}

/**
 * 历史会话的返回数据结构
 */
export interface ResponseCursorPageResultChatMessageDto {
    /**
     * 响应数据
     */
    data?: CursorPageResultChatMessageDto
    /**
     * 响应消息
     */
    message?: string
    /**
     * 响应消息编码
     */
    messageCode?: string
    /**
     * 是否成功
     */
    success?: boolean
    [property: string]: any
}

/**
 * 响应数据
 *
 * CursorPageResultChatMessageDto
 */
export interface CursorPageResultChatMessageDto {
    /**
     * 游标值，用于下一页查询
     */
    cursor?: string
    /**
     * 数据列表
     */
    data?: ChatMessageDto[]
    /**
     * 是否还有更多数据
     */
    hasMore?: boolean
    [property: string]: any
}

/**
 * 聊天消息返回
 *
 * ChatMessageDto
 */
export interface ChatMessageDto {
    /**
     * 行为
     */
    actionJosn?: JSONObject
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
    messageRole?: Role
    /**
     * 序号
     */
    messageSerialnumber?: string
    /**
     * 会话code
     */
    sessionCode?: string
}
