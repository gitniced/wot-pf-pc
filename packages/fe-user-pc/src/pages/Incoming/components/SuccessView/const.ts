export enum managementEnum {
    ZERO = 0,
    ENTITY = 1, //1：实体商户
    NETWORK = 2, //2：网络商户
    BOTH = 3, //3：实体兼网络商户
}

export const BUSINESS_CLASS: Record<number, string> = {
    [managementEnum.ZERO]: '-',
    [managementEnum.ENTITY]: '实体商户',
    [managementEnum.NETWORK]: '网络商户',
    [managementEnum.BOTH]: '实体兼网络商户',
}

//证件类型，1：营业执照注册号（非三证合一），2：统一社会信用代码（三证合一证件），3：事业单位事业证，4：个体户注册号，5：社会团队社会号
export enum documentTypeEnum {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export const DOCUMENT_TYPE: Record<string, string> = {
    [documentTypeEnum.ZERO]: '-',
    [documentTypeEnum.ONE]: '营业执照注册号（非三证合一）',
    [documentTypeEnum.TWO]: '统一社会信用代码（三证合一证件）',
    [documentTypeEnum.THREE]: '事业单位事业证',
    [documentTypeEnum.FOUR]: '个体户注册号',
    [documentTypeEnum.FIVE]: '社会团队社会号',
}

export enum crossBorderEnum {
    NO = 0,
    YES = 1,
}

export const ONLINE_RETAILERS: Record<string, string> = {
    [crossBorderEnum.NO]: '否',
    [crossBorderEnum.YES]: '是',
}


//	自然人类型，1：法人代表，2：商户负责人，3：授权经办人，4:受益人, 6：业务联系人，A：商户管理员
export enum NATICETYPE {
    ONE = '1',
    TWO = '2',
    THREE = '3',
    SIX = '6',
    A = 'A',
    BENEFICIAY = '4'
}

export const NATURAL_PERSON: Record<string, string> = {
    [NATICETYPE.ONE]: '法人代表',
    [NATICETYPE.TWO]: '商户负责人',
    [NATICETYPE.THREE]: '授权经办人',
    [NATICETYPE.SIX]: '业务联系人',
    [NATICETYPE.A]: '商户管理员',
}

export enum sameLegalPersonEnum {
    NO = 0,
    YES = 1,
}

export const LEGAL_PERSON: Record<string, string> = {
    [sameLegalPersonEnum.NO]: '否',
    [sameLegalPersonEnum.YES]: '是',
}

//自然人证件类型，1：身份证，2：军官证，3：护照，4：户口簿，5：士兵证，6：港澳来往内地通行证，7：台湾同胞来往内地通行证，8：临时身份证，9：外国人居留证，10：警官证，11：其他
export enum certificatesEnum {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    ELEVEN = 11,
}

export const LEGAL_PERSON_TYPE: Record<string, string> = {
    [certificatesEnum.ONE]: '身份证',
    [certificatesEnum.TWO]: '军官证',
    [certificatesEnum.THREE]: '护照',
    [certificatesEnum.FOUR]: '户口簿',
    [certificatesEnum.FIVE]: '士兵证',
    [certificatesEnum.SIX]: '港澳来往内地通行证',
    [certificatesEnum.SEVEN]: '台湾同胞来往内地通行证',
    [certificatesEnum.EIGHT]: '临时身份证',
    [certificatesEnum.NINE]: '外国人居留证',
    [certificatesEnum.TEN]: '警官证',
    [certificatesEnum.ELEVEN]: '其他',
}

//	结算账号类型，1：个人结算账户，2：单位结算账户
export enum settlementEnum {
    PERSONAL = 1,
    COMPANY = 2,
}

export const SETTLEMENT: Record<string, string> = {
    [settlementEnum.PERSONAL]: '个人结算账户',
    [settlementEnum.COMPANY]: '单位结算账户',
}
