
export enum CERTIFICATE_TYPE {
    // PASSPORT = 1,
    // IDCARD,
    // OTHER,
    IDCARD = 1,
    PASSPORT,
    OTHER,
}

export const CERTIFICATE_TYPE_VALUE = {
    [CERTIFICATE_TYPE.IDCARD]: '身份证',
    [CERTIFICATE_TYPE.PASSPORT]: '护照',
    [CERTIFICATE_TYPE.OTHER]: '其他类型',
}


