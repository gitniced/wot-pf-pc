let socketUrl = ''

switch (BUILD_ENV) {
    case 'dev':
        // socketUrl = '/wtApi/' // 开发
        socketUrl = 'wss://api.cloud.wozp.cn/ai/socket/resume' // 开发
        break

    case 'test':
        socketUrl = 'wss://api.cloud.wozp.cn/ai/socket/resume' // 测试
        break

    case 'pre':
        socketUrl = 'wss://api-pre.cloud.wozp.cn/ai/socket/resume' // 预发
        break

    case 'pro':
        socketUrl = `wss://api.cloud.wozhipei.com/ai/socket/resume` // 正式
        break

    default:
        // 开发
        socketUrl = 'wss://api.cloud.wozp.cn/ai/socket/resume'
        break
}

export default socketUrl
