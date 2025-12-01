export enum QrcodeType {
    // 二维码类型
    WEIXIN = 'wx', // 微信
    DINGDING = 'dd', // 钉钉
    NNC= 'nnc' // 国家网络认证
}

export const QRCODE: Record<string, string> = {
    [QrcodeType.WEIXIN]: '微信',
    [QrcodeType.DINGDING]: '钉钉',
    [QrcodeType.NNC]: '国家网络身份认证'

}
