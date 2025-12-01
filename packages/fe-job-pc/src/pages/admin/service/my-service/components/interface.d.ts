export interface SurveyScoreItem {
    value?: number
}

export interface JudgmentResultItem {
    value?: number
}

export interface DimensionHierarchyItem {
    value?: number
}

export interface MeasureItem {
    code?: string
    title?: string
    type?: number
    enableState?: number
    serviceNum?: number
    level?: number[]
}

export interface RecordItem {
    /**
     * 编码
     */
    code?: string;
    /**
     * 服务记录
     */
    content?: string;
    /**
     * 创建时间
     */
    createdAt?: string;
    /**
     * 措施
     */
    measure?: string;
    /**
     * 措施编码
     */
    measureCode?: string;
    /**
     * 就业援助编码
     */
    recordCode?: string;
    /**
     * 服务时间
     */
    serverAt?: string;
    /**
     * 服务人员用户编码
     */
    userCode?: string;
    /**
     * 服务人员用户名
     */
    userName?: string;
    [property: string]: any;
}
