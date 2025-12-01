interface optionListType {
    key?: React.Key
    id?: React.Key
    name: string
}
interface AttributeListType {
    attributeCode?: string
    value?: string
}

interface GoodsAttributeListType {
    attributeCode?: string
    code?: string
    goodsCode?: string
    isRequire?: boolean
    name?: string
    value?: string
}

export interface GoodeDetailType {
    content?: string
    dingdingAgencyCode?: string
    dingdingCompanyCode?: string
    goodsCategoryId?: string
    imageUrl?: string
    imageList?: string[]
    name?: string
    price?: number | string
    siteList?: optionListType[]
    taxRate?: number
    attributeList?: AttributeListType[]
    code?: React.Key
    tagList?: optionListType[]
    categoryList?: optionListType[]
    categoryNames?: string
    matterCode?: string
    goodsAttributeList?: GoodsAttributeListType[]
    [key: string]: any
}

export interface OrderDetailType {
    agentCode?: string //代理商编码	string
    agentName?: string //代理商	string
    buyerType?: string //买家类型1无客户2客户	integer(int32)
    city?: string //客户所在的市	integer(int32)
    cityName?: string //市名称	string
    code?: string //唯一编码	string
    contract?: any //合同	合同详情_概览	合同详情_概览
    contractOrder?: boolean //是否合同订单	boolean
    createdAt?: 11 //创建时间，下单时间	integer(int64)
    customerCode?: string //客户编码	string
    customerName?: string //客户名称	string
    goodsList?: GoodeDetailType[] //商品列表	array	商品分页返回数据
    invoicingStatus?: number //开票状态，0未开票，1已开票	integer(int32)
    invoicingTime?: number //开票时间	integer(int64)
    orderNo?: string //订单编号	string
    payTime?: number //支付时间	integer(int64)
    payment?: string //支付记录	支付流水	支付流水
    province?: string //客户所在的省	integer(int32)
    provinceName?: string //省名称	string
    remark?: string //备注	string
    settleTargetCode?: string //结算对象编码	string
    settleTargetName?: string //结算对象名称	string
    sid?: string //站点	integer(int32)
    sname?: string //string
    status?: number //订单状态，0未支付、1已支付、2已关闭	integer(int32)
    tagNameList?: string //业务标签名称	array	string
    totalAmount?: string //总额	number(bigdecimal)
    userCode?: string //用户编码	string
    goodsOrderList?: any[]
}
export type OrderGoodInfoType = {
    /** 商品订单唯一编码 */
  code: string
  /** 优惠价(暂时无用字段) */
  discountPrice: number
  /** 商品属性名称 */
  goodsAttributes?: string
  /** 商品类目名称 */
  goodsCategories?: string
  /** 商品编码 */
  goodsCode: string
  /** 商品图片 */
  goodsImage?: string
  /** 商品名称 */
  goodsName: string
  /** 是否存在售后单，存在则展示查看售后按钮 */
  hasRefunded?: boolean
  /** 订单编码 */
  orderCode?: string
  /** 实付单价 */
  preferentialPrice: number
  /** 实付款 */
  preferentialAmount: number
  /** 商品原价 */
  price: number
  /** 购买数量 */
  quantity: number
  /** 退款状态 0可退款 1不可继续退款(有在进行中的退款) */
  refundStatus?: number
  /** 正在进行中的退款单 */
  refundingOrderCode?: string
  /** 剩余可退款金额 */
  remainRefundAmount?: number
  /** 剩余可退款数量 */
  remainRefundQuantity?: number
}
export interface FormValueType {
    refundCount: number
    refundReason: string
}
