let kingUrl = 'https://api.cloud.wozp.cn'

switch (BUILD_ENV) {
    case 'dev':
        kingUrl = 'https://api.cloud.wozp.cn' // 开发
        break

    case 'test':
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
        kingUrl = 'https://api.cloud.wozp.cn'
        break
}

export default kingUrl
