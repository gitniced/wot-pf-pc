export enum Type {
    // 二维码类型
    PERSONAL = '1', // 个人
    ORG = '2', // 机构
}

export enum CURRENT_STEP_TYPE {
    // 账号绑定
    ACCOUNT = '1',
    // 完善身份信息
    IDENTITY = '2',
}

export const REG_TYPE: Record<string, string> = {
    [Type.PERSONAL]: '个人注册',
    [Type.ORG]: '机构入驻',
}
