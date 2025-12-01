import { api } from './api'
import http from '@/servers/http'
import type { ChatMessageDto, MessageLikeReqDto, AiSessionDto } from './types'

export const aiLike = (data: MessageLikeReqDto) => {
    return http<any, string>(api.aiLike, 'post', data)
}

export const getAnswer = (data: { sessionCode: string }) => {
    return http<any, ChatMessageDto>(api.getAnswer, 'get', data)
}

// 获取会话列表
export const listSession = (params: { type: string }) => {
    return http<any, AiSessionDto[]>(api.listSession, 'get', params)
}

// 获取会话历史记录
export const listSessionHistory = (data: {
    sessionCode: string
    cursor?: string | null
    limit?: number
}) => {
    return http<any, { data: ChatMessageDto[]; cursor?: string | null; hasMore?: boolean }>(
        api.listSessionHistory,
        'post',
        data,
    )
}

// 获取任务指导会话历史记录
export const taskGuideSessionHistory = (data: {
    sessionCode: string
    cursor?: string | null
    limit?: number
}) => {
    return http<any, { data: ChatMessageDto[]; cursor?: string | null; hasMore?: boolean }>(
        api.taskGuideSessionHistory,
        'get',
        data,
    )
}

// 使用AI生成内容
export const converterContent = (data: { messageCode: string }) => {
    return http<any, ChatMessageDto[]>(api.converterContent, 'post', data)
}

// 获取热门问题
export const recommendQuestion = (data: { courseCode?: string }) => {
    return http<any, ChatMessageDto[]>(api.recommendQuestion, 'get', data)
}

export const getHistoryData = (params: any) => {
    return http<any, AiSessionDto[]>(api.listSession, 'GET', params)
}
