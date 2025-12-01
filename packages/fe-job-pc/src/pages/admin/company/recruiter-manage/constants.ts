// 单位性质
export enum COMPANY_TYPE_ENUMS {
    stateOwned,
    stateControlled,
    foreignInvestment,
    jointVenture,
    private,
    businessUnits,
    stateAdministrative,
    other = 99,
}
export const COMPANY_TYPE_MAPS: Record<number, string> = {
    [COMPANY_TYPE_ENUMS.stateOwned]: '国有企业',
    [COMPANY_TYPE_ENUMS.stateControlled]: '国有控股企业',
    [COMPANY_TYPE_ENUMS.foreignInvestment]: '外资企业',
    [COMPANY_TYPE_ENUMS.jointVenture]: '合资企业',
    [COMPANY_TYPE_ENUMS.private]: '私营企业',
    [COMPANY_TYPE_ENUMS.businessUnits]: '事业单位',
    [COMPANY_TYPE_ENUMS.stateAdministrative]: '国家行政机关',
    [COMPANY_TYPE_ENUMS.other]: '其他',
}
