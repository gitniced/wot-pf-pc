let socketUrl = ''

switch (BUILD_ENV) {
    case 'dev':
        // socketUrl = '/wtApi/' // 开发
        socketUrl = 'wss://api-develop.cloud.wozp.cn/ai/chat' // 开发
        break

    case 'test':
        socketUrl = 'wss://api.cloud.wozp.cn/ai/chat' // 测试
        break

    case 'pre':
        socketUrl = 'wss://api-pre.cloud.wozp.cn/ai/chat' // 预发
        break

    case 'pro':
        socketUrl = `wss://api.cloud.wozhipei.com/ai/chat` // 正式
        break

    default:
        // 开发
        socketUrl = 'wss://api-develop.cloud.wozp.cn/ai/chat'
        break
}

export default socketUrl
