const defaultKingUrl = 'https://api.cloud.wozp.cn'

const kingUrl: Record<string, string> = {
    local: 'https://api.cloud.wozp.cn',
    // test: 'http://192.168.13.69:36001',
    dev: 'https://api-develop.cloud.wozp.cn',
    test: 'https://api.cloud.wozp.cn',
    pre: 'https://api-pre.cloud.wozp.cn',
    pro: 'https://api.cloud.wozhipei.com',
}

export const wsKingUrlObj: Record<string, string> = {
    local: 'wss://api.cloud.wozp.cn',
    dev: 'wss://api-develop.cloud.wozp.cn',
    test: 'wss://api.cloud.wozp.cn',
    pre: 'wss://api-pre.cloud.wozp.cn',
    pro: 'wss://api.cloud.wozhipei.com',
}

export default kingUrl[BUILD_ENV] || defaultKingUrl
