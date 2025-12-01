import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import socketUrl from './socketUrl'
let reconnectInterval = 1000 // 重连间隔时间，1秒

interface ConnectWSProp {
    // 当前信息的标识，一问一答为同一code
    sessionCode?: string | undefined
    // 收到服务端消息的事件
    onMessage?: (data: string) => void
    // ws连接关闭的事件
    onClose?: () => void
    // isInit: 是否是初始化 初始化ws的onopen也发消息，否则不发
    isInit?: boolean
}
// 定时器
let timeoutIds: Timeout[] = []
// ws实例
let websocket: WebSocket | null
// 当前连接错误次数
let errorCount: number = 0
// 最多错误五次
const MAX_RETRY_COUNT = 5

export const connectWS = (props?: ConnectWSProp) => {
    let { sessionCode, onClose, isInit } = props || {}

    // 清除定时器数组
    timeoutIds.map(timeoutId => {
        timeoutId && clearTimeout(timeoutId)
    })

    // 创建ws实例
    websocket = new WebSocket(socketUrl)
    // ws连接成功
    websocket.onopen = () => {
        console.log('websocket连接成功')
        // 连接成功后将错误次数设置为0
        errorCount = 0
        if (websocket) {
            if (isInit) {
                websocket.send(JSON.stringify({ cmd: 'select', sessionCode }))
            }
            let timeoutId = setTimeout(() => {
                console.log('websocket保活5s')

                websocket?.send(JSON.stringify({ cmd: 'test' }))
            }, 5000)
            timeoutIds.push(timeoutId)
        }
    }

    websocket.onclose = evt => {
        console.log('连接关闭中...', evt)
        websocket = null

        setTimeout(() => {
            console.log('WebSocket 正在尝试重连...')
            connectWS()
            reconnectInterval *= 2 // 重连间隔时间加倍
        }, reconnectInterval)
        onClose?.()
    }

    websocket.onerror = () => {
        websocket = null
        errorCount++
        console.log('错误次数小于5次 触发重新连接,当前连接错误次数：', errorCount)
        // 错误次数小于5次 触发重新连接
        if (errorCount <= MAX_RETRY_COUNT) {
            let timeoutId = setTimeout(() => connectWS(props), 5000)
            timeoutIds.push(timeoutId)
        }
    }

    return websocket
}
