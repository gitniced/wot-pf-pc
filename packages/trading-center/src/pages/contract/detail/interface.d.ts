export interface ContractDetailType {
    /** 区域市 */
    city?: number
    /** 区域市名称 */
    cityName?: string
    /** 编码 */
    code?: string
    /** 合同有效期 */
    contractEnd?: number
    /** 合同编号 */
    contractNo?: string
    /** 签订日期 */
    contractStart?: number
    /** 客户编码 */
    customerCode?: string
    /** 交付/验收时间 */
    deliverTime?: number
    /** 甲方名称code */
    partACode?: string
    /** 甲方名称(结算对象) */
    partyA?: string
    /** 甲方签字人 */
    partyASign?: string
    /** 乙方(结算对象) */
    partyB?: string
    /** 乙方签字人 */
    partyBSign?: string
    /** 分成优惠 */
    preferential?: number
    /** 区域省 */
    province?: number
    /** 区域省名称 */
    provinceName?: string
    /** 关联商品编码 */
    relatedGoodsCodes?: any[]
    /** 销售负责人编码 */
    saleCode?: any[]
    /** 销售负责人 */
    saleName?: AdminPageDto
    /** 服务周期 结束 */
    serviceEnd?: number
    /** 服务周期 开始 */
    serviceStart?: number
    /** 结算标准 */
    settleStandard?: string
    /** 结算标准 */
    settleStandardName?: string
    /** 结算方式 */
    settleType?: number
    /** 结算方式 名称 */
    settleTypeName?: string
    /** 分成比例 */
    sharePercent?: number
    /** 站点id */
    sid?: number
    /** 站点 */
    siteName?: string
    /** 标签id */
    tagId?: any[]
    /** 标签名称 */
    tagName?: TagsListType[]
    /** 合同名称 */
    title?: string
    /** 合同类型 */
    type?: number
    /** 合同类型名称 */
    typeName?: string
    /** 合作单价 */
    unitPrice?: number
}
interface TagsListType {
    /** id */
    id?: number
    /** 标题 */
    name?: string
    /** 类型 */
    type?: number
}
interface AdminPageDto {
    /**  */
    avatar?: string
    /**  */
    code?: string
    /**  */
    mobile?: string
    /**  */
    name?: string
    /**  */
    roleName?: string
    /**  */
    status?: number
}
