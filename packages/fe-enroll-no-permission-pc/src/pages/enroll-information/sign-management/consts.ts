export enum TAB_ENUM {
    SITE = 'site',
    ORGANIZE = 'organize',
}

// 打卡类型
export enum SING_TYPE {
    SING_IN = 1,
    SING_OUT,
}

export const SING_TYPE_TEXT: Record<number, string> = {
    [SING_TYPE.SING_IN]: '签到',
    [SING_TYPE.SING_OUT]: '签退',
}

// 签到类型
export enum RULE_TYPE {
    DISPERSION = 1,
    CONCENTRATED = 2,
}

export const RULE_TYPE_TEXT: Record<number, string> = {
    [RULE_TYPE.CONCENTRATED]: '集中打卡',
    [RULE_TYPE.DISPERSION]: '分散打卡',
}

// 打卡方式
export enum CHECK_TYPE {
    MANUAL = 1,
    AUTOMATIC = 2,
    REPLACEMENT_CARD = 4,
}

export const CHECK_TYPE_TEXT: Record<number, string> = {
    [CHECK_TYPE.MANUAL]: '手动',
    [CHECK_TYPE.AUTOMATIC]: '自动',
    [CHECK_TYPE.REPLACEMENT_CARD]: '补卡',
}

export enum CERTIFICATE_TYPE {
    ID_CARD = 1,
    PASSPORT,
    OTHER,
}
export const CERTIFICATE_TYPE_TEXT: Record<number, string> = {
    [CERTIFICATE_TYPE.ID_CARD]: '居民身份证',
    [CERTIFICATE_TYPE.PASSPORT]: '护照',
    [CERTIFICATE_TYPE.OTHER]: '其他',
}

// 证件类型
export enum CARD_NUMBER_TYPE {}
