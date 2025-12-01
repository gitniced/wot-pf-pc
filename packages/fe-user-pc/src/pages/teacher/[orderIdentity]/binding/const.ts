export enum QrcodeType {
    PERSONAL = 1, // 个人
    ORG = 2, // 机构
    resourceSide = 3, // 资源方
}

export const QRCODE: Record<string, string> = {
    [QrcodeType.PERSONAL]: '个人',
    [QrcodeType.ORG]: '机构',
    [QrcodeType.resourceSide]: '资源方',
}

export enum Type {
    // 二维码类型
    WEIXIN = 'wx', // 微信
    DINGDING = 'dd', // 钉钉
    QQ = 'qq', // 钉钉
    SHEBAOKA = 'ess', // 社保卡
}

export const QRCODE_TYPE: Record<string, string> = {
    [Type.WEIXIN]: '微信',
    [Type.DINGDING]: '钉钉',
    [Type.QQ]: 'QQ',
    [Type.SHEBAOKA]: '电子社保卡'
}
