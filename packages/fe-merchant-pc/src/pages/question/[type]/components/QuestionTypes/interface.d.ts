export interface KnowledgeParams {
    belongType: number // 来源 机构/资源方/站点
    skill: number
    subject: number
    sid?: number
    organizationCode?: string
}

export interface KnowledgeOption {
    value: string;
    label: string;
    levelCode: string
    children?: KnowledgeOption[];
}

export interface KnowledgeItem {
    belongType: number // 来源 机构/资源方/站点
    skill: number
    subject: number
    code: string
    level: number
    levelCode: string
    organizationCode: string
    sid: number
    sort: number
    title: string
    totalQuestion: number
    childList: KnowledgeItem[]
}

export interface CreateKnowledge {
    code: string
    levelCode: string
    codeList: (string | number)[]
}