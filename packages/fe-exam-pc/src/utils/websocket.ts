import type { Timeout } from '@/pages/test-manage/exam/paper/components/Header/types'

/** 心跳机制 */
class HeartCheck {
    timeout: number = 3000
    timer: Timeout | null = null // 倒计时
    serverTimeoutObj: Timeout | null = null // 定时器
    times = 3
    socket: WebSocket | null = null

    constructor(socket: WebSocket) {
        this.socket = socket
    }

    resetTimes = () => {
        this.times = 3
    }

    reset = () => {
        clearTimeout(this.timer as Timeout)
        clearTimeout(this.serverTimeoutObj as Timeout)
        return this
    }

    start = () => {
        this.timer = setTimeout(() => {
            this.send()
        }, this.timeout)
    }

    send() {
        this.socket?.send('ping')
        // 发送心跳后，如果后端没有在指定时间内返回消息，则可以认为服务端连接断开，此时客户端需要断开重连
        this.serverTimeoutObj = setTimeout(() => {
            this.times--
            // 试错
            if (this.times > 0) {
                // 重新发起心跳检测
                this.reset().send()
                return
            }
            this.times = 3
            this.socket?.close()
        }, this.timeout)
    }
}

export default class SWebSocket {
    /** URL地址 */
    url: string = ''
    /** 心跳对象 */
    heartCheck: any = null
    socket: WebSocket | null = null

    /** 避免重复连接 */
    lockReconnect: boolean = false
    /** 是否可以重连*/
    canReconnectWebsocket: boolean = true
    /** 重连定时器 */
    reconnectTimeout: Timeout | null = null

    reconnectTime: number = 3000

    //最大重连次数
    reconnectTimes: number = 1

    onMessage = console.log

    constructor(url: string, onMessage: (data: any) => void) {
        this.url = url
        this.onMessage = onMessage
        this.createWebSocket()
    }

    /** 创建连接 */
    createWebSocket = () => {
        try {
            this.init()
        } catch (error) {
            this.reconnect()
        }
    }

    /** 连接初始化 */
    init = () => {
        this.socket = new WebSocket(this.url)
        this.heartCheck = new HeartCheck(this.socket)
        this.socket.onopen = e => {
            console.log('连接成功', e)
            //心跳检测重置
            this.heartCheck.start()
        }

        this.socket.onerror = () => {
            console.log('发生错误')
            this.reconnect()
        }

        this.socket.onclose = msg => {
            console.log('连接关闭', this.url, msg)
            this.reconnect()
        }

        this.socket.onmessage = event => {
            //如果获取到消息，心跳检测重置
            try {
                const messageData = event.data
                if (messageData) {
                    this.dealResult(messageData)
                }
            } catch (e) {
                console.warn('消息功能解析数据出错')
                return
            }
        }
    }

    /** 重连 */
    reconnect = () => {
        if (this.lockReconnect || !this.canReconnectWebsocket) return
        //限制重连次数
        if (this.reconnectTimes > 20) return
        this.lockReconnect = true
        this.reconnectTimeout && clearTimeout(this.reconnectTimeout)
        this.reconnectTimeout = setTimeout(() => {
            this.createWebSocket()
            this.lockReconnect = false
            this.reconnectTimes++
        }, this.reconnectTime)
    }

    //通过返回结果来执行是否需要重置心跳或者关闭链接
    dealResult = (result: string) => {
        const reconnectActions: Record<string, () => void> = {
            // 认证失败，前端直接断开连接
            'Auth Fail': () => {
                this.canReconnectWebsocket = false
                this.socket?.close()
            },
            // 心跳连接成功，重置心跳检测
            'Auth Success': () => {
                this.heartCheck.resetTimes()
                this.heartCheck.reset().start()
            },
        }
        reconnectActions[result] && reconnectActions[result]()
        if (!reconnectActions[result]) {
            this.heartCheck.resetTimes()
            this.heartCheck.reset().start()
            this.onMessage(result)
        }
    }
}
