
export type QUERY_TYPE = 'agreement' | 'policy'


export enum AGREEMENT_TYPE {
    // 用户协议
    USER_AGREEMENT = 1,
    // 隐私政策
    PRIVACY_POLICY = 2,
    // 默认协议
    DEFAULT_AGREEMENT = 0,
    // 实名认证协议
    REAL_NAME_AGREEMENT = 3,
}


export const AGREEMENT_TYPE_MAP = {
    agreement: AGREEMENT_TYPE.USER_AGREEMENT,
    policy: AGREEMENT_TYPE.PRIVACY_POLICY,
    realName: AGREEMENT_TYPE.REAL_NAME_AGREEMENT

}

export const AGREEMENT_TYPE_MAP_CHINESE = {
    agreement: '用户协议',
    policy: '隐私政策',
}
