export interface KnowledgePoint {
    knowledgePointCode?: string
    knowledgePointLevelCode?: string
    knowledgePointName?: string
}
export interface AnalysisQuestionWordUsingPOSTRequest {
    /** 解析文本, 每一行之间需要有\n换行符 */
    analysisText?: string
    /** 要素细目表dto */
    authenticatePoint?: AuthenticateCustomDto
    /** 职业dto */
    commonJob: CommonJobCustomDto
    /** 资源方组织code */
    merchantCode: string
    knowledgePoint: KnowledgePoint
    belongType: number // 来源 机构/资源方/站点
    skill?: number
    subject?: number
    templateType: string // 国标(默认) ｜ 常规
}
interface CommonJobCustomDto {
    /** 等级名称 */
    jobLevel?: string
    /** 等级code */
    jobLevelCode?: number
    /** 职业名称 */
    jobName?: string
    /** 职业code */
    jobNameCode?: number
    /** 工种名称 */
    jobType?: string
    /** 工种code */
    jobTypeCode?: number
}

interface AuthenticateCustomDto {
    /** 要素细目表code */
    code: string
    /** 第一层鉴定范围code */
    firstRangeCode?: string
    /** 第一层鉴定范围name */
    firstRangeName?: string
    /** 要素细目表name */
    name: string
    /** 鉴定点code */
    pointCode?: string
    /** 鉴定点name */
    pointName?: string
    /** 第二层鉴定范围code */
    secondRangeCode?: string
    /** 第二层鉴定范围name */
    secondRangeName?: string
    /** 第三层鉴定范围code */
    thirdRangeCode?: string
    /** 第三层鉴定范围name */
    thirdRangeName?: string
}

export interface KnowledgeParams {
    belongType: number // 来源 机构/资源方/站点
    skill?: number
    subject?: number
    sid?: number
    organizationCode?: string
}

export interface KnowledgeOption {
    value: string
    label: string
    levelCode: string
    children?: KnowledgeOption[]
}
