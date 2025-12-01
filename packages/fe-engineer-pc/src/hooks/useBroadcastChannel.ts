import { useEffect, useRef, useCallback } from 'react'
import createBroadcastChannel from '@/utils/broadcastChannel'

type BroadcastChannelCallback<M = any> = (message: M) => void

type BroadcastChannelInstance<M = any> = {
    send: (message: M) => void
    on: (callback: BroadcastChannelCallback<M>) => void
    off: (callback: BroadcastChannelCallback<M>) => void
    once: (callback: BroadcastChannelCallback<M>) => void
    offOnce: (callback: BroadcastChannelCallback<M>) => void
    close: () => void
}

const useBroadcastChannel = <M = any>(channelName: string) => {
    const bcRef = useRef<BroadcastChannelInstance<M> | null>(null)
    // 存储清理函数和回调的映射关系
    const cleanupMapRef = useRef<Map<BroadcastChannelCallback<M>, () => void>>(new Map())

    useEffect(() => {
        // 创建 broadcast channel
        bcRef.current = createBroadcastChannel<M>(channelName)

        // 清理函数
        return () => {
            // 执行所有清理函数
            cleanupMapRef.current.forEach(cleanup => cleanup())
            cleanupMapRef.current.clear()

            // 关闭 broadcast channel
            bcRef.current?.close()
            bcRef.current = null
        }
    }, [channelName])

    const send = useCallback((message: M) => {
        bcRef.current?.send(message)
    }, [])

    const on = useCallback((callback: BroadcastChannelCallback<M>) => {
        if (!bcRef.current) return () => {}

        bcRef.current.on(callback)

        // 添加清理函数并存储映射
        const cleanup = () => {
            bcRef.current?.off(callback)
            cleanupMapRef.current.delete(callback)
        }
        cleanupMapRef.current.set(callback, cleanup)

        return cleanup
    }, [])

    const once = useCallback((callback: BroadcastChannelCallback<M>) => {
        if (!bcRef.current) return () => {}

        // 包装 callback，在调用后自动清理
        const wrappedCallback: BroadcastChannelCallback<M> = (message: M) => {
            callback(message)
            cleanupMapRef.current.delete(wrappedCallback)
        }

        bcRef.current.once(wrappedCallback)

        // 添加清理函数并存储映射
        const cleanup = () => {
            bcRef.current?.offOnce(wrappedCallback)
            cleanupMapRef.current.delete(wrappedCallback)
        }
        cleanupMapRef.current.set(wrappedCallback, cleanup)

        return cleanup
    }, [])

    const off = useCallback((callback: BroadcastChannelCallback<M>) => {
        bcRef.current?.off(callback)

        // 从清理函数映射中移除
        cleanupMapRef.current.delete(callback)
    }, [])

    const offOnce = useCallback((callback: BroadcastChannelCallback<M>) => {
        bcRef.current?.offOnce(callback)

        // 从清理函数映射中移除
        cleanupMapRef.current.delete(callback)
    }, [])

    return {
        send,
        on,
        once,
        off,
        offOnce,
    }
}

export default useBroadcastChannel
