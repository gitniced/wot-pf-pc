/**
 * 如果遇到bug，您可以钉钉搜索封东其或者给 fengdongqi@hzwotu.com 邮箱发邮件
 * 欢迎大家提 issue 或者 PR。
 * @title 沃土Saas服务
 * @description 沃土Saas服务是一个 Spring Boot项目
 * @version v1.0
 * @date 2023/10/26 11:19:37
 **/

/**
 * requestUrl /business/biz_menu/editMenu
 * method post
 */
export interface SaveOrUpdateMenuUsingPOSTRequest {}

/**
 * requestUrl /business/biz_menu/editMenu
 * method post
 */
export interface SaveOrUpdateMenuUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 业务线菜单跳转信息响应对象 {
    /** 唯一编码 */
    code?: string
    /** 菜单编码 */
    menuCode?: string
    /** 菜单名称 */
    menuName?: string
    /** 跳转链接 */
    url?: string
}

/**
 * requestUrl /business/biz_menu/list
 * method get
 */
export interface ListMenuUsingGETResponse {
    /** 响应数据 */
    data?: 业务线菜单跳转信息响应对象
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface FooterVisitDto {
    /** 友情链接 */
    friendshipLinks?: FooterLinkDto
    /** 营销链接 */
    marketingLinks?: FooterLinkDto
    /** 导航链接 */
    navigationLinks?: FooterLinkDto
    /** 1 模版1 2 模版2 3模版3 模版4 */
    type: number
}

interface FooterLinkDto {
    /** 跳转链接 */
    link: string
    /** 排序 */
    sort: number
    /** 名称 */
    title: string
}

/**
 * requestUrl /business/footer/get/visit/{organizationCode}
 * method get
 */
export interface GetVisitUsingGETResponse {
    /** 响应数据 */
    data?: FooterVisitDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface FooterUpdateReqDto {
    /** 友情链接 */
    friendshipLinks?: FooterLinkDto
    /** 营销链接 */
    marketingLinks?: 营销子类型链接
    /** 导航链接 */
    navigationLinks?: 导航子类型链接
    /** 机构编码 */
    organizationCode: string
    /** 1 模版1 2 模版2 3模版3 模版4 */
    type: number
}

interface 营销子类型链接 {
    /** 是否启用 */
    disableState?: number
    /** 跳转链接 */
    link: string
    /** 营销标识 */
    marketingType?: string
    /** 排序 */
    sort: number
    /** 名称 */
    title: string
}

interface 导航子类型链接 {
    /** 跳转链接 */
    link: string
    /** 链接标题 */
    linkTitle?: string
    /** 链接类型 */
    linkType?: string
    /** 排序 */
    sort: number
    /** 名称 */
    title: string
}

/**
 * requestUrl /business/footer/get/{organizationCode}
 * method get
 */
export interface GetUsingGETResponse {
    /** 响应数据 */
    data?: FooterUpdateReqDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/footer/update
 * method post
 */
export interface UpdateUsingPOSTRequest {
    /** 友情链接 */
    friendshipLinks?: FooterLinkDto
    /** 营销链接 */
    marketingLinks?: 营销子类型链接
    /** 导航链接 */
    navigationLinks?: 导航子类型链接
    /** 机构编码 */
    organizationCode: string
    /** 1 模版1 2 模版2 3模版3 模版4 */
    type: number
}

/**
 * requestUrl /business/footer/update
 * method post
 */
export interface UpdateUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext/delete/{code}
 * method post
 */
export interface DeleteUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext/insert
 * method post
 */
export interface InsertUsingPOSTRequest {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 分类编码 */
    categoryCodes?: any[]
    /** 内容 */
    content: string
    /** 封面 */
    cover?: string
    /** 机构编码 */
    organizationCode: string
    /** 站点sid */
    sid?: number
    /** 排序字段 */
    sort: number
    /** 状态0草稿1发布 */
    status: number
    /** 抬头 */
    title: string
}

/**
 * requestUrl /business/backend/imagetext/insert
 * method post
 */
export interface InsertUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 图文vo {
    /** 分类code数组 */
    categoryCodeList?: any[]
    /** 图文分类 */
    categoryList?: 图文分类精简返回对象
    /** 分类名称数组 */
    categoryNameList?: any[]
    /** 编码 */
    code?: string
    /** 内容 */
    content?: string
    /** 封面 */
    cover?: string
    /** 机构编码 */
    organizationCode: string
    /** 机构名称 */
    organizationName?: string
    /** 发布时间 */
    publishTime?: number
    /** 站点id */
    sid?: number
    /** 站点name */
    siteName?: string
    /** 排序 */
    sort?: number
    /** 状态0草稿1发布 */
    status?: number
    /** 抬头 */
    title?: string
}

interface 图文分类精简返回对象 {
    /** 图文分类唯一编码 */
    code?: string
    /** 图文分类名称 */
    name?: string
}

/**
 * requestUrl /business/backend/imagetext/list_all
 * method get
 */
export interface ListAllUsingGETResponse {
    /** 响应数据 */
    data?: 图文vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp图文vo {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 图文vo
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

/**
 * requestUrl /business/backend/imagetext/page
 * method post
 */
export interface PageUsingPOSTRequest {
    /** 分类code */
    categoryCodes?: any[]
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code */
    organizationCode: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
    /** 状态 */
    status?: number
    /** 图文标题 */
    title?: string
}

/**
 * requestUrl /business/backend/imagetext/page
 * method post
 */
export interface PageUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRsp图文vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext/publish
 * method post
 */
export interface PublishUsingPOSTRequest {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 分类编码 */
    categoryCodes: any[]
    /** 编码 */
    code: string
    /** 内容 */
    content: string
    /** 封面 */
    cover?: string
    /** 是否是tabbar */
    isTabBar: number
    /** 机构编码 */
    organizationCode?: string
    /** sid */
    sid?: number
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
    /** 抬头 */
    title: string
}

/**
 * requestUrl /business/backend/imagetext/publish
 * method post
 */
export interface PublishUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext/publish/{code}
 * method post
 */
export interface PublishFromDraftUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SummaryImageTextRespDto {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 图文code */
    code?: string
    /** 内容 */
    content?: string
    /** 封面 */
    cover?: string
    /** 图文分类标签 */
    imageTextCategoryList?: any[]
    /** 图文分类List */
    imageTextCategoryNameDtoList?: ImageTextCategoryNameDto
    /** 图文分类名称 */
    imageTextCategoryNameList?: any[]
    /** 是否是tabbar */
    isTabBar?: number
    /** 机构code */
    organizationCode?: string
    /** 发布时间 */
    publishTime?: number
    /** 状态 */
    status?: number
    /** 图文标题 */
    title?: string
}

interface ImageTextCategoryNameDto {
    /** 图文分类标签 */
    code?: string
    /** 图文分类List */
    name?: string
}

/**
 * requestUrl /business/backend/imagetext/summary/{code}
 * method get
 */
export interface SummaryUsingGETResponse {
    /** 响应数据 */
    data?: SummaryImageTextRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext/update
 * method post
 */
export interface UpdateUsingPOST_1Request {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 分类编码 */
    categoryCodes: any[]
    /** 编码 */
    code: string
    /** 内容 */
    content: string
    /** 封面 */
    cover?: string
    /** 是否是tabbar */
    isTabBar: number
    /** 机构编码 */
    organizationCode?: string
    /** sid */
    sid?: number
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
    /** 抬头 */
    title: string
}

/**
 * requestUrl /business/backend/imagetext/update
 * method post
 */
export interface UpdateUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext/update_tab_bar
 * method post
 */
export interface UpdateTabBarUsingPOSTRequest {}

/**
 * requestUrl /business/backend/imagetext/update_tab_bar
 * method post
 */
export interface UpdateTabBarUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext_category/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext_category/insert
 * method post
 */
export interface InsertUsingPOST_1Request {
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/backend/imagetext_category/insert
 * method post
 */
export interface InsertUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp图文分类vo {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 图文分类vo
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 图文分类vo {
    /** 编码 */
    code?: string
    /** 创建时间 */
    createdAt?: string
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 机构名称 */
    organizationName?: string
    /** 站点id */
    sid?: number
    /** 站点名称 */
    siteName?: string
}

/**
 * requestUrl /business/backend/imagetext_category/page
 * method post
 */
export interface PageUsingPOST_1Request {
    /** 分类名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code, 如果有则必传 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/backend/imagetext_category/page
 * method post
 */
export interface PageUsingPOST_1Response {
    /** 响应数据 */
    data?: BasePaginationRsp图文分类vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/backend/imagetext_category/update
 * method post
 */
export interface UpdateUsingPOST_2Request {
    /** 编码 */
    code?: string
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/backend/imagetext_category/update
 * method post
 */
export interface UpdateUsingPOST_2Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/imagetext_category/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_2Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/imagetext_category/insert
 * method post
 */
export interface InsertUsingPOST_2Request {
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/imagetext_category/insert
 * method post
 */
export interface InsertUsingPOST_2Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/imagetext_category/page
 * method post
 */
export interface PageUsingPOST_2Request {
    /** 分类名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code, 如果有则必传 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/imagetext_category/page
 * method post
 */
export interface PageUsingPOST_2Response {
    /** 响应数据 */
    data?: BasePaginationRsp图文分类vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRspImageTextCategoryAndCountRespDto {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ImageTextCategoryAndCountRespDto
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface ImageTextCategoryAndCountRespDto {
    /** 创建时间 */
    createdAt?: number
    /** 编码 */
    id?: string
    /** 分类下对应的图文集合 */
    imageCodeList?: any[]
    /** 分类下对应的图文code */
    imageCodes?: string
    /** 图文数量 */
    imageTextCount?: number
    /** 名称 */
    name?: string
}

/**
 * requestUrl /business/imagetext_category/pageCategoryAndCount
 * method post
 */
export interface PageImageCategoryAndCountUsingPOSTRequest {
    /** 分类名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code, 如果有则必传 */
    organizationCode?: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/imagetext_category/pageCategoryAndCount
 * method post
 */
export interface PageImageCategoryAndCountUsingPOSTResponse {
    /** 响应数据 */
    data?: BasePaginationRspImageTextCategoryAndCountRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/imagetext_category/update
 * method post
 */
export interface UpdateUsingPOST_3Request {
    /** 编码 */
    code?: string
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/imagetext_category/update
 * method post
 */
export interface UpdateUsingPOST_3Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_3Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface ImageTextCategoryBatchRespDto {
    /** 图文分类 */
    categoryList?: 图文分类精简返回对象
    /** 图文code */
    code?: string
    /** 内容 */
    content?: string
    /** 封面 */
    cover?: string
    /** 是否是tabbar */
    isTabBar?: number
    /** 机构编码 */
    organizationCode: string
    /** 发布时间 */
    publishTime?: number
    /** 状态 */
    status?: number
    /** 图文标题 */
    title?: string
}

/**
 * requestUrl /business/front/imagetext/imagetext_list_by_codes
 * method post
 */
export interface ImagetextListByCodeUsingPOSTRequest {
    /**  */
    codes?: any[]
}

/**
 * requestUrl /business/front/imagetext/imagetext_list_by_codes
 * method post
 */
export interface ImagetextListByCodeUsingPOSTResponse {
    /** 响应数据 */
    data?: ImageTextCategoryBatchRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/insert
 * method post
 */
export interface InsertUsingPOST_3Request {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 分类编码 */
    categoryCodes?: any[]
    /** 内容 */
    content: string
    /** 封面 */
    cover?: string
    /** 机构编码 */
    organizationCode: string
    /** 站点sid */
    sid?: number
    /** 排序字段 */
    sort: number
    /** 状态0草稿1发布 */
    status: number
    /** 抬头 */
    title: string
}

/**
 * requestUrl /business/front/imagetext/insert
 * method post
 */
export interface InsertUsingPOST_3Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/list_all
 * method get
 */
export interface ListAllUsingGET_1Response {
    /** 响应数据 */
    data?: 图文vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/list_all_copy
 * method post
 */
export interface ListAllCopyUsingPOSTRequest {}

/**
 * requestUrl /business/front/imagetext/list_all_copy
 * method post
 */
export interface ListAllCopyUsingPOSTResponse {
    /** 响应数据 */
    data?: 图文vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/page
 * method post
 */
export interface PageUsingPOST_3Request {
    /** 分类code */
    categoryCodes?: any[]
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code */
    organizationCode: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 站点id */
    sid?: number
    /** 状态 */
    status?: number
    /** 图文标题 */
    title?: string
}

/**
 * requestUrl /business/front/imagetext/page
 * method post
 */
export interface PageUsingPOST_3Response {
    /** 响应数据 */
    data?: BasePaginationRsp图文vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/publish
 * method post
 */
export interface PublishUsingPOST_1Request {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 分类编码 */
    categoryCodes: any[]
    /** 编码 */
    code: string
    /** 内容 */
    content: string
    /** 封面 */
    cover?: string
    /** 是否是tabbar */
    isTabBar: number
    /** 机构编码 */
    organizationCode?: string
    /** sid */
    sid?: number
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
    /** 抬头 */
    title: string
}

/**
 * requestUrl /business/front/imagetext/publish
 * method post
 */
export interface PublishUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/publish/{code}
 * method post
 */
export interface PublishFromDraftUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/summary/{code}
 * method get
 */
export interface SummaryUsingGET_1Response {
    /** 响应数据 */
    data?: SummaryImageTextRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/update
 * method post
 */
export interface UpdateUsingPOST_4Request {
    /** 附件json数组，格式：[{name:附件名称,url:附件链接},{name:附件名称,url:附件链接}] */
    attachmentJson?: string
    /** 分类编码 */
    categoryCodes: any[]
    /** 编码 */
    code: string
    /** 内容 */
    content: string
    /** 封面 */
    cover?: string
    /** 是否是tabbar */
    isTabBar: number
    /** 机构编码 */
    organizationCode?: string
    /** sid */
    sid?: number
    /** 排序 */
    sort?: number
    /** 状态 */
    status?: number
    /** 抬头 */
    title: string
}

/**
 * requestUrl /business/front/imagetext/update
 * method post
 */
export interface UpdateUsingPOST_4Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/front/imagetext/update_tab_bar
 * method post
 */
export interface UpdateTabBarUsingPOST_1Request {}

/**
 * requestUrl /business/front/imagetext/update_tab_bar
 * method post
 */
export interface UpdateTabBarUsingPOST_1Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/jumpurl/insert
 * method post
 */
export interface InsertUsingPOST_4Request {
    /** 接入方式 1:跳转链接 2:个人中心 */
    accessType: number
    /** 别名 */
    alias: string
    /**  */
    code?: string
    /** 图标 */
    icon?: string
    /** 跳转样式1：pc 门户、个人中心  2：H5：不可选，默认底部导航跳转后保持底部导航显示，非底部导航跳转链接直接跳新页面 */
    jumpStyle: number
    /** 是否有后续操作 */
    operate?: boolean
    /** 父级编码code */
    parentCode?: string
    /** 关联权限id,多个权限id用逗号拼接 */
    permissionIds?: string
    /** 0 未知 1 平台 2 职业  3 考评 4 创培  */
    source: number
    /** 标题 */
    title: string
    /** 终端类型，1：pc，2:h5 */
    type: number
    /** 跳转链接 */
    url?: string
}

/**
 * requestUrl /business/jumpurl/insert
 * method post
 */
export interface InsertUsingPOST_4Response {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface JumpUrlRespDto {
    /** 别名 */
    alias?: string
    /** 下级列表 */
    children?: JumpUrlRespDto
    /** 图标 */
    icon?: string
    /** 唯一标识 */
    id?: string
    /** 跳转code */
    key?: string
    /**  */
    layoutHeader?: number
    /**  */
    layoutMenu?: number
    /** 是否有后续操作 */
    operate?: boolean
    /** 上级code */
    parentCode?: string
    /** 跳转链接 */
    route?: string
    /** 标题 */
    title?: string
    /** 组件类型 */
    type?: string
}

/**
 * requestUrl /business/jumpurl/list
 * method get
 */
export interface GetJumpUrlListUsingGETResponse {
    /** 响应数据 */
    data?: JumpUrlRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/jumpurl/update
 * method post
 */
export interface UpdateUsingPOST_5Request {
    /** 接入方式 1:跳转链接 2:个人中心 */
    accessType: number
    /** 别名 */
    alias: string
    /**  */
    code?: string
    /** 图标 */
    icon?: string
    /** 跳转样式1：pc 门户、个人中心  2：H5：不可选，默认底部导航跳转后保持底部导航显示，非底部导航跳转链接直接跳新页面 */
    jumpStyle: number
    /** 是否有后续操作 */
    operate?: boolean
    /** 父级编码code */
    parentCode?: string
    /** 关联权限id,多个权限id用逗号拼接 */
    permissionIds?: string
    /** 0 未知 1 平台 2 职业  3 考评 4 创培  */
    source: number
    /** 标题 */
    title: string
    /** 终端类型，1：pc，2:h5 */
    type: number
    /** 跳转链接 */
    url?: string
}

/**
 * requestUrl /business/jumpurl/update
 * method post
 */
export interface UpdateUsingPOST_5Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/micropage/delete/{code}
 * method post
 */
export interface DeleteUsingPOST_4Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface BasePaginationRsp微页面vo {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: 微页面vo
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface 微页面vo {
    /** 编码 */
    code?: string
    /** 自定义字段内容 */
    customContent?: string
    /** 默认页面是否可编辑0否1是 */
    isEdit?: number
    /** 是否为tabbar */
    isTabBar?: number
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode: string
    /** 预设页面编码，is_pre_define=1时不为空 */
    preDefineMicropageCode?: string
    /** 预览Url */
    preViewUrl?: string
    /** 发布时间 */
    publishTime?: number
    /** 只读不可编辑，0否，1是 */
    readonly?: number
    /** 状态0草稿1发布 */
    status?: number
}

/**
 * requestUrl /business/micropage/page
 * method post
 */
export interface PageUsingPOST_4Request {
    /** 页面名称 */
    name?: string
    /** 升降序规则,ASC或DESC */
    order?: string
    /** 排序字段 */
    orderBy?: string
    /** 机构code */
    organizationCode: string
    /** 页码，从1开始数，默认是1 */
    pageNo?: number
    /** 单页显示数量，默认是10 */
    pageSize?: number
    /** 状态 */
    status?: number
    /** 微页面类型，1：h5，2:PC */
    type: number
}

/**
 * requestUrl /business/micropage/page
 * method post
 */
export interface PageUsingPOST_4Response {
    /** 响应数据 */
    data?: BasePaginationRsp微页面vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/micropage/publish
 * method post
 */
export interface PublishUsingPOST_2Request {
    /** 背景色 */
    backgroudColor: string
    /** 机构编码 */
    code: string
    /** 自定义字段内容 */
    customContent?: any[]
    /** 名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
    /** 状态0草稿1发布 */
    status: number
    /** 微页面类型，1：h5，2:PC */
    type: number
}

/**
 * requestUrl /business/micropage/publish
 * method post
 */
export interface PublishUsingPOST_2Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/micropage/publish/{code}
 * method post
 */
export interface PublishUsingPOST_3Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/micropage/saveOrUpdateDraft
 * method post
 */
export interface SaveOrUpdateMicropageDraftUsingPOSTRequest {
    /** 背景色 */
    backgroudColor: string
    /** 机构编码 */
    code: string
    /** 自定义字段内容 */
    customContent?: any[]
    /** 名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
    /** 状态0草稿1发布 */
    status: number
    /** 微页面类型，1：h5，2:PC */
    type: number
}

/**
 * requestUrl /business/micropage/saveOrUpdateDraft
 * method post
 */
export interface SaveOrUpdateMicropageDraftUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SummaryMicropageAndStatusCodeRespDto {
    /** http状态码 */
    httpStatusCode?: string
    /** 微页面详情响应 */
    summaryMicropageRespDto?: 微页面详情
}

interface 微页面详情 {
    /** 背景色 */
    backgroundColor?: string
    /** code */
    code?: string
    /** 课程详情集合 */
    courseList?: 课程详情
    /** 自定义字段内容 */
    customContent?: string
    /** 图文详情集合 */
    imageTexts?: MicropageImageTextRespDto
    /** 是否是tabbar */
    isTabBar?: number
    /** 名称 */
    name?: string
    /** 机构code */
    organizationCode?: string
    /** 计划内容详情集合 */
    planFormulas?: ExamPlanDto
    /** 状态 */
    status?: number
}

interface 课程详情 {
    /** id */
    id?: number
    /** 封面 */
    image?: string
    /** 职业id */
    jobId?: number
    /** 等级id */
    levelId?: number
    /** 价格 */
    price?: number
    /** 课程名称 */
    title?: string
    /** 课时 */
    totalPeriod?: number
    /** 工种id */
    workId?: number
}

interface MicropageImageTextRespDto {
    /** 图文分类名称列表 */
    categoryNameList?: any[]
    /** 编码 */
    code?: string
    /** 内容 */
    content?: string
    /** 封面 */
    cover?: string
    /** 创建时间 */
    createdAt?: number
    /** 机构编码 */
    organizationCode: string
    /** 发布时间 */
    publishTime?: number
    /** 抬头 */
    title?: string
}

interface ExamPlanDto {
    /** 评价详情 */
    appraise?: 评价详情
    /** 评价详情ID */
    appraiseId?: number
    /** 创建时间 */
    createTime?: number
    /** 计划ID */
    id?: number
    /** 评价计划名称 */
    planName?: string
    /** 评价类型 */
    planType?: number
    /** 评价类型枚举 */
    planTypeCategory?: ComponentCategoryDto
    /** 公示内容 */
    publicityContent?: string
    /** 计划类型 */
    type?: string
    /**  */
    uni?: string
}

interface 评价详情 {
    /** 计划名称 */
    name?: string
}

interface ComponentCategoryDto {
    /** key值 */
    key?: number
    /** 内容 */
    name?: string
}

/**
 * requestUrl /business/micropage/summary
 * method post
 */
export interface SummaryUsingPOSTRequest {
    /** 微页面code */
    code?: string
    /** 机构code */
    organizationCode?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/micropage/summary
 * method post
 */
export interface SummaryUsingPOSTResponse {
    /** 响应数据 */
    data?: SummaryMicropageAndStatusCodeRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/micropage/summary_of_admin
 * method post
 */
export interface SummaryOfAdminUsingPOSTRequest {
    /** 微页面code */
    code?: string
    /** 机构code */
    organizationCode?: string
    /** 站点id */
    sid?: number
}

/**
 * requestUrl /business/micropage/summary_of_admin
 * method post
 */
export interface SummaryOfAdminUsingPOSTResponse {
    /** 响应数据 */
    data?: SummaryMicropageAndStatusCodeRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/micropage/update_tab_bar
 * method post
 */
export interface UpdateTabBarsUsingPOSTRequest {}

/**
 * requestUrl /business/micropage/update_tab_bar
 * method post
 */
export interface UpdateTabBarsUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/navigation/delete_pc
 * method post
 */
export interface DeletePcUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/navigation/edit_pc
 * method post
 */
export interface EditPcUsingPOSTRequest {
    /** 导航唯一编码 */
    code?: string
    /** 链接名称 */
    linkName?: string
    /** 链接类型,1微页面,2图文,3自定义链接,4图文列表...，前端维护 */
    linkType?: number
    /** 链接 */
    linkUrl?: string
    /** 导航唯一编码 */
    name?: string
    /** 排序值 */
    sort?: number
}

/**
 * requestUrl /business/navigation/edit_pc
 * method post
 */
export interface EditPcUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 导航vo {
    /** 编码 */
    code?: string
    /** 默认icon */
    icon?: string
    /** 是否可以编辑 0否 1是 */
    isEdit?: number
    /** 预设页面0不是，1是 */
    isPreDefine?: number
    /** 链接名称 */
    linkName?: string
    /** 链接类型 */
    linkType?: number
    /** 链接 */
    linkUrl?: string
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode: string
    /** 预设页面编码，is_pre_define=1时不为空 */
    preDefineMicropageCode?: string
    /** 只读不可编辑，0否，1是 */
    readonly?: number
    /** 被选择时icon */
    selectedIcon?: string
    /** 排序 */
    sort?: number
}

/**
 * requestUrl /business/navigation/list_h5
 * method get
 */
export interface GetH5NavigationsUsingGETResponse {
    /** 响应数据 */
    data?: 导航vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface PcNavigationRespDto {
    /** 二级导航 */
    childNaviList?: PcNavigationRespDto
    /** 编码 */
    code?: string
    /** 是否可以编辑 0否 1是 */
    isEdit?: number
    /** 预设页面0不是，1是 */
    isPreDefine?: number
    /** 链接名称 */
    linkName?: string
    /** 链接类型 */
    linkType?: number
    /** 链接 */
    linkUrl?: string
    /** 名称 */
    name?: string
    /** 机构编码 */
    organizationCode: string
    /** 预设导航编码，is_pre_define=1时不为空 */
    preDefineNavigationCode?: string
    /** 只读不可编辑，0否，1是 */
    readonly?: number
    /** 排序 */
    sort?: number
}

/**
 * requestUrl /business/navigation/list_pc
 * method get
 */
export interface GetPcNavigationsUsingGETResponse {
    /** 响应数据 */
    data?: PcNavigationRespDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/navigation/one/{code}
 * method get
 */
export interface GetNavigationUsingGETResponse {
    /** 响应数据 */
    data?: 导航vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/navigation/save_batch
 * method post
 */
export interface SaveBathUsingPOSTRequest {}

/**
 * requestUrl /business/navigation/save_batch
 * method post
 */
export interface SaveBathUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/navigation/save_pc
 * method post
 */
export interface SavePcUsingPOSTRequest {
    /** 导航名称 */
    name: string
    /** 机构编码 */
    organizationCode: string
    /** 一级导航编码，非二级导航可不传 */
    parentCode?: string
    /** 排序值 */
    sort: number
}

/**
 * requestUrl /business/navigation/save_pc
 * method post
 */
export interface SavePcUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/portal/fix_old_portal
 * method get
 */
export interface FixOldPortalUsingGETResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/portal/insert
 * method post
 */
export interface InsertUsingPOST_5Request {
    /** 简介 */
    intro?: string
    /** 机构Code */
    organizationCode: string
    /** 机构LogoUrl */
    organizationLogo: string
    /** 机构名称 */
    organizationName: string
    /** 主题色 */
    themeColor: string
}

/**
 * requestUrl /business/portal/insert
 * method post
 */
export interface InsertUsingPOST_5Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 门户vo {
    /** 编码 */
    code?: string
    /** 自定义域名 */
    customDomain?: string
    /** 简介 */
    intro?: string
    /** 门户链接 */
    linkUrl?: string
    /** 导航logo */
    naviLogo?: string
    /** 机构code */
    organizationCode: string
    /** 机构LogoUrl */
    organizationLogo?: string
    /** 机构名称 */
    organizationName?: string
    /** 简称 */
    shortName?: string
    /** 主题色 */
    themeColor?: string
    /** 门户类型，1：h5，2:PC */
    type?: number
}

/**
 * requestUrl /business/portal/one
 * method get
 */
export interface GetOneUsingGETResponse {
    /** 响应数据 */
    data?: 门户vo
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/portal/update
 * method post
 */
export interface UpdateUsingPOST_6Request {
    /** 编码 */
    code: string
    /** 自定义域名 */
    customDomain?: string
    /** 简介 */
    intro?: string
    /** 导航logo */
    naviLogo: string
    /** 机构code */
    organizationCode: string
    /** 机构LogoUrl */
    organizationLogo: string
    /** 机构名称 */
    organizationName: string
    /** 简称 */
    shortName?: string
    /** 主题色 */
    themeColor: string
}

/**
 * requestUrl /business/portal/update
 * method post
 */
export interface UpdateUsingPOST_6Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface 访问门户VO {
    /** 访问门户链接 */
    portalUrl?: string
}

/**
 * requestUrl /business/portal/visit/{organizationCode}
 * method get
 */
export interface VisitUsingGETResponse {
    /** 响应数据 */
    data?: 访问门户VO
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/suspension/change_sort
 * method post
 */
export interface ChangeSortUsingPOSTRequest {}

/**
 * requestUrl /business/suspension/change_sort
 * method post
 */
export interface ChangeSortUsingPOSTResponse {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/suspension/create
 * method post
 */
export interface CreateUsingPOSTRequest {
    /** 交互文案 */
    actionText?: string
    /** 交互类型 1 悬浮出现图片 2 悬浮出现文案 3 点击跳转链接 */
    actionType: number
    /** 交互跳转链接 */
    actionUrl?: string
    /** 交互跳转链接标题 */
    actionUrlTitle?: string
    /** 交互跳转链接类型 */
    actionUrlType?: string
    /** 编码 */
    code?: string
    /** 名称 */
    name?: string
    /** 名称显示 1 显示 2隐藏 */
    nameType: number
    /** 机构编码 */
    organizationCode: string
    /** 被选择时icon */
    selectedIcon: string
    /** 上传图片 */
    uploadImg?: string
    /** 图片描述 */
    uploadImgText?: string
}

/**
 * requestUrl /business/suspension/create
 * method post
 */
export interface CreateUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/suspension/delete
 * method post
 */
export interface DeleteUsingPOST_5Request {
    /** 编码 */
    code: string
}

/**
 * requestUrl /business/suspension/delete
 * method post
 */
export interface DeleteUsingPOST_5Response {
    /** 响应数据 */
    data?: boolean
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

/**
 * requestUrl /business/suspension/edit
 * method post
 */
export interface EditUsingPOSTRequest {
    /** 交互文案 */
    actionText?: string
    /** 交互类型 1 悬浮出现图片 2 悬浮出现文案 3 点击跳转链接 */
    actionType: number
    /** 交互跳转链接 */
    actionUrl?: string
    /** 交互跳转链接标题 */
    actionUrlTitle?: string
    /** 交互跳转链接类型 */
    actionUrlType?: string
    /** 编码 */
    code?: string
    /** 名称 */
    name?: string
    /** 名称显示 1 显示 2隐藏 */
    nameType: number
    /** 机构编码 */
    organizationCode: string
    /** 被选择时icon */
    selectedIcon: string
    /** 上传图片 */
    uploadImg?: string
    /** 图片描述 */
    uploadImgText?: string
}

/**
 * requestUrl /business/suspension/edit
 * method post
 */
export interface EditUsingPOSTResponse {
    /** 响应数据 */
    data?: string
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SuspensionDetailVisitDto {
    /** 交互文案 */
    actionText?: string
    /** 交互类型 1 悬浮出现图片 2 悬浮出现文案 3 点击跳转链接 */
    actionType: number
    /** 交互跳转链接 */
    actionUrl?: string
    /** 名称 */
    name?: string
    /** 名称显示 1 显示 2隐藏 */
    nameType: number
    /** 被选择时icon */
    selectedIcon: string
    /** 上传图片 */
    uploadImg?: string
    /** 图片描述 */
    uploadImgText?: string
}

/**
 * requestUrl /business/suspension/list/visit/{organizationCode}
 * method get
 */
export interface ListVisitUsingGETResponse {
    /** 响应数据 */
    data?: SuspensionDetailVisitDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}

interface SuspensionDetailDto {
    /** 交互文案 */
    actionText?: string
    /** 交互类型 1 悬浮出现图片 2 悬浮出现文案 3 点击跳转链接 */
    actionType: number
    /** 交互跳转链接 */
    actionUrl?: string
    /** 交互跳转链接标题 */
    actionUrlTitle?: string
    /** 交互跳转链接类型 */
    actionUrlType?: string
    /** 编码 */
    code?: string
    /** 名称 */
    name?: string
    /** 名称显示 1 显示 2隐藏 */
    nameType: number
    /** 机构编码 */
    organizationCode: string
    /** 被选择时icon */
    selectedIcon: string
    /** 上传图片 */
    uploadImg?: string
    /** 图片描述 */
    uploadImgText?: string
}

/**
 * requestUrl /business/suspension/list/{organizationCode}
 * method get
 */
export interface ListUsingGETResponse {
    /** 响应数据 */
    data?: SuspensionDetailDto
    /** 响应消息 */
    message?: string
    /** 响应消息编码 */
    messageCode?: string
    /** 是否成功 */
    success?: boolean
}
