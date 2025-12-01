/**  认证证件类型  */
export enum CERTIFY_CERTIFICATE_TYPE {
    /**  多合一证书  */
    MULTI_IN_ONE_CERTIFICATE = 0,
    /**  普通营业执照  */
    ORDINARY_BUS_LICENSE = 1,
    /**  事业单位法人证书或统一信用代码证书  */
    CREDIT_CERTIFICATE = 2,
    /**  普通组织机构代码证  */
    ORGANIZATION_CERTIFICATE = 3,
    /**  其他证件类型  */
    OTHER_TYPES_DOCUMENTS = 4,
}

export const UNIFIED_SOCIAL_CREDIT: Record<string, string> = {
    [CERTIFY_CERTIFICATE_TYPE.MULTI_IN_ONE_CERTIFICATE]: '统一社会信用代码',
    [CERTIFY_CERTIFICATE_TYPE.ORDINARY_BUS_LICENSE]: '注册号',
    [CERTIFY_CERTIFICATE_TYPE.CREDIT_CERTIFICATE]: '统一社会信用代码',
    [CERTIFY_CERTIFICATE_TYPE.ORGANIZATION_CERTIFICATE]: '组织机构代码',
    [CERTIFY_CERTIFICATE_TYPE.OTHER_TYPES_DOCUMENTS]: '资质证件号码',
}

/**  
 * 1. 资质证件类型=多合一证书、普通营业执照：展示
2. 资质证件类型 不等于  多合一证书、普通营业执照：不展示
  */
export const DOCUMENT_TYPE_ARR = [
    CERTIFY_CERTIFICATE_TYPE.MULTI_IN_ONE_CERTIFICATE,
    CERTIFY_CERTIFICATE_TYPE.ORDINARY_BUS_LICENSE,
]

export const getRuleOfType = (type: number) => {
    const handler: Record<string, any> = {
        [CERTIFY_CERTIFICATE_TYPE.MULTI_IN_ONE_CERTIFICATE]: {
            pattern: /[0-9A-Z]/,
            message: '请输入18位，数字或大写字母',
        },
        [CERTIFY_CERTIFICATE_TYPE.ORDINARY_BUS_LICENSE]: {
            pattern: /[0-9a-zA-Z\S]/,
            message: '请输入最多25位 ，支持数字、字母、特殊符号',
        },
        [CERTIFY_CERTIFICATE_TYPE.CREDIT_CERTIFICATE]: {
            pattern: /[0-9A-Z]/,
            message: '请输入18位，数字或大写字母',
        },
        [CERTIFY_CERTIFICATE_TYPE.ORGANIZATION_CERTIFICATE]: {
            pattern: /[0-9a-zA-Z\S]/,
            message: '请输入最多25位 ，支持数字、字母、特殊符号',
        },
        [CERTIFY_CERTIFICATE_TYPE.OTHER_TYPES_DOCUMENTS]: {
            pattern: /[0-9a-zA-Z\S]/,
            message: '请输入最多25位 ，支持数字、字母、特殊符号',
        },
    }
    return handler?.[type] || {}
}
export const getMaxLength = (t: number) => {
    const handler: Record<string, number> = {
        [CERTIFY_CERTIFICATE_TYPE.MULTI_IN_ONE_CERTIFICATE]: 18,
        [CERTIFY_CERTIFICATE_TYPE.ORDINARY_BUS_LICENSE]: 25,
        [CERTIFY_CERTIFICATE_TYPE.CREDIT_CERTIFICATE]: 18,
        [CERTIFY_CERTIFICATE_TYPE.ORGANIZATION_CERTIFICATE]: 25,
        [CERTIFY_CERTIFICATE_TYPE.OTHER_TYPES_DOCUMENTS]: 25,
    }
    return handler?.[t] || 9999
}
