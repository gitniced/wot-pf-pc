import { fetchEventSource } from '@microsoft/fetch-event-source'
// import { getCookie } from '@wotu/wotu-components'
import type { SSEConfig, SSEData, SSEMessage, SSEResult } from './types'
import { getCookie } from '@/storage'
import { message } from 'antd'

let kingUrl = ''

switch (BUILD_ENV) {
    case 'dev':
        kingUrl = 'https://api-develop.cloud.wozp.cn' // 开发
        break

    case 'test':
        // kingUrl = 'http://192.168.13.69:36001' // 测试
        kingUrl = 'https://api.cloud.wozp.cn' // 测试
        break

    case 'pre':
        kingUrl = 'https://api-pre.cloud.wozp.cn' // 预发
        break

    case 'pro':
        kingUrl = `https://api.cloud.wozhipei.com` // 正式
        break

    default:
        // 开发
        kingUrl = 'https://api.cloud.wozp.cn' // 测试
        // kingUrl = 'http://192.168.13.69:36001' // 测试

        break
}

/**
 * SSE客户端函数
 * @param body 请求体参数
 * @param options 配置选项（包含url）
 * @returns 包含subscribe方法的对象
 */
export function sseClient<T = any, R = SSEData>(
    url: string,
    body?: T,
    options: Partial<SSEConfig<T>> = {} as any,
): SSEResult<R> {
    let abortController: AbortController | null = null
    let isConnected: boolean = false
    let messageCallback: ((message: SSEMessage<R>) => void) | null = null
    let closeCallback: () => void

    const config: SSEConfig<T> = {
        method: options.method || 'POST',
        headers: {
            // Authorization: getCookie('TOKEN') || undefined,
            'X-Site-Alias': getCookie('ALIAS'),
            'Content-Type': 'application/json',
            Authorization: getCookie('TOKEN'),
            ...(options.headers || {}),
        },
        body,
        signal: options.signal,
    }

    /**
     * 通知消息回调
     * @param message 消息内容
     */
    const notifyCallback = (messageData: SSEMessage<R>): void => {
        if (messageCallback) {
            try {
                messageCallback(messageData)
            } catch (error) {
                console.error('SSE callback error:', error)
            }
        }
    }

    /**
     * 关闭SSE连接
     */
    const close = (): void => {
        if (abortController) {
            abortController.abort()
            abortController = null
        }
        isConnected = false
    }

    /**
     * 建立SSE连接
     */
    const connect = async (): Promise<void> => {
        // 如果已经连接，先关闭现有连接
        if (isConnected) {
            close()
        }

        abortController = new AbortController()
        const { signal } = abortController

        try {
            isConnected = true

            await fetchEventSource(`${kingUrl}${url}`, {
                method: config.method,
                headers: config.headers,
                body: config.body ? JSON.stringify(config.body) : undefined,
                openWhenHidden: true,
                signal,
                async onopen(response) {
                    console.log('SSE连接已建立:', response.status)
                },
                onerror: error => {
                    console.error('SSE连接错误:', error)
                    isConnected = false
                    // 错误时不重连，直接关闭连接
                    close()
                    message.error('ai服务繁忙，请稍后再试')
                    throw error
                },
                onclose: () => {
                    console.log('SSE连接已关闭')
                    closeCallback?.()
                    isConnected = false
                },
                onmessage: msg => {
                    try {
                        let data: string | R

                        // 尝试解析JSON
                        try {
                            data = JSON.parse(msg.data)
                        } catch {
                            // 如果不是JSON，直接使用字符串
                            data = msg.data as string
                        }

                        const messageData: SSEMessage<R> = {
                            data,
                            event: msg.event,
                            id: msg.id,
                        }

                        notifyCallback(messageData)
                    } catch (error) {
                        console.error('SSE消息解析错误:', error)
                    }
                },
            })
        } catch (error) {
            console.error('SSE连接失败:', error)
            isConnected = false
            throw error
        }
    }

    // 立即建立连接
    connect()

    return {
        /**
         * 订阅消息（设置回调函数）
         * @param callback 消息回调函数
         */
        subscribe: (callback: (message: SSEMessage<R>) => void) => {
            messageCallback = callback
        },
        /**
         * 关闭连接
         */
        close,
        // 关闭回掉地址
        onClose: (callback: () => void) => {
            closeCallback = callback
        },
        /**
         * 连接状态
         */
        get connected(): boolean {
            return isConnected
        },
    }
}

export default sseClient
