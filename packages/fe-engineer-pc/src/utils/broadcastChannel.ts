type BroadcastChannelCallback<M = any> = (message: M) => void

const createBroadcastChannel = <M = any>(channelName: string) => {
    const bc = new BroadcastChannel(channelName)

    // 存储普通监听器的映射
    const listenerMap = new WeakMap<
        BroadcastChannelCallback<M>,
        (message: MessageEvent<M>) => void
    >()

    // 存储一次性监听器的映射
    const onceWeakMap = new WeakMap<
        BroadcastChannelCallback<M>,
        (message: MessageEvent<M>) => void
    >()

    return {
        send: (message: M) => {
            bc.postMessage(message)
        },
        on: (callback: BroadcastChannelCallback<M>) => {
            // 创建包装函数并存储映射关系
            const handler = (message: MessageEvent<M>) => {
                callback(message.data)
            }
            listenerMap.set(callback, handler)
            bc.addEventListener('message', handler)
        },
        off: (callback: BroadcastChannelCallback<M>) => {
            // 获取对应的处理函数并移除
            const handler = listenerMap.get(callback)
            if (handler) {
                bc.removeEventListener('message', handler)
                listenerMap.delete(callback)
            }
        },
        once: (callback: BroadcastChannelCallback<M>) => {
            const handler = (message: MessageEvent<M>) => {
                callback(message.data)
                bc.removeEventListener('message', handler)
                onceWeakMap.delete(callback)
            }

            onceWeakMap.set(callback, handler)
            bc.addEventListener('message', handler)
        },
        offOnce: (callback: BroadcastChannelCallback<M>) => {
            const handler = onceWeakMap.get(callback)
            if (handler) {
                bc.removeEventListener('message', handler)
                onceWeakMap.delete(callback)
            }
        },
        close: () => {
            bc.close()
        },
    }
}

export default createBroadcastChannel
