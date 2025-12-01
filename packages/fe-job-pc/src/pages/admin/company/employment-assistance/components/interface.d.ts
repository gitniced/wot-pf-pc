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
    enableState?: number,
    level?: number[],
    serviceNum?: number
}

export interface OptionItem {
    content: string
    isAnswer: number
    score?: number
}
export interface QuestionItem {
    questionCode: string
    title: string
    optionList: OptionItem[]
}

export interface AnswerItem {
    questionCode: string
    answer: number // 选项序号/sort
}



/**
 * 响应数据
 *
 * EmploymentAssistanceRecordDetailDto
 */
export interface EmploymentAssistanceRecordDetailDto {
    /**
     * 年龄
     */
    age?: number;
    /**
     * 就业援助编码
     */
    code?: string;
    /**
     * 诊断结果
     */
    diagnosticResult?: DiagnosticResultDataDto;
    /**
     * 性别 1 : 男 ， 0 : 女
     */
    gender?: number;
    /**
     * 身份证
     */
    idCard?: string;
    /**
     * 就业状态 0-全部 1-已就业 2-持续求职中 3-暂无求职意向 4-其他
     */
    jobState?: number;
    /**
     * 帮扶措施列表
     */
    measureList?: EmploymentAssistanceRecordMeasureDto[];
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 对象类别类型 0-全部 1-易帮扶人员(轻度) 2-较难帮扶人员（较中度) 3-难帮扶人员（中度) 4-重点帮扶人员（较重度) 5-托底帮扶人员（重度)
     */
    objectCategoryType?: number;
    /**
     * 服务记录
     */
    serviceList?: EmploymentAssistanceRecordServerDto[];
    /**
     * 服务单位
     */
    serviceUnit?: string;
    /**
     * 服务状态 0初始化 10调研中 20待诊断 30诊断中 40服务中 50已完成
     */
    state?: number;
    /**
     * 用户编码
     */
    userCode?: string;
    /**
     * 用户信息
     */
    userInfo?: AssistanceUserInfoDto;
    [property: string]: any;
}

/**
 * 诊断结果
 *
 * DiagnosticResultDataDto
 */
export interface DiagnosticResultDataDto {
    /**
     * 就业能力诊断结果 1弱 2一般 3强
     */
    abilityDiagnosticResult?: number;
    /**
     * 就业能力诊断结果维度分级 1弱 2一般 3强
     */
    abilityDiagnosticResultLevel?: number;
    /**
     * 就业能力分数
     */
    abilityScore?: number;
    /**
     * 就业条件诊断结果 1弱 2一般 3强
     */
    conditionsDiagnosticResult?: number;
    /**
     * 就业条件诊断结果维度分级 1弱 2一般 3强
     */
    conditionsDiagnosticResultLevel?: number;
    /**
     * 就业条件分数
     */
    conditionsScore?: number;
    /**
     * 诊断结果
     */
    diagonsticResult?: string;
    /**
     * 诊断结果编码
     */
    diagonsticResultCode?: number;
    /**
     * 就业心态诊断结果 1弱 2一般 3强
     */
    mentalityDiagnosticResult?: number;
    /**
     * 就业心态诊断结果维度分级 1弱 2一般 3强
     */
    mentalityDiagnosticResultLevel?: number;
    /**
     * 就业心态分数
     */
    mentalityScore?: number;
    [property: string]: any;
}

/**
 * 就业援助记录措施明细
 *
 * EmploymentAssistanceRecordMeasureDto
 */
export interface EmploymentAssistanceRecordMeasureDto {
    /**
     * 编码
     */
    code?: string;
    /**
     * 创建时间
     */
    createdAt?: string;
    /**
     * 启用状态 0 禁用 1启用
     */
    enableState?: number;
    /**
     * 就业援助记录编码
     */
    recordCode?: string;
    /**
     * 服务记录数
     */
    serviceNum?: number;
    /**
     * 标题
     */
    title?: string;
    /**
     * 措施类型 1系统推荐措施 2自定义措施
     */
    type?: number;
    /**
     * 更新时间
     */
    updatedAt?: string;
    [property: string]: any;
}

/**
 * 就业援助服务记录信息DTO
 *
 * EmploymentAssistanceRecordServerDto
 */
export interface EmploymentAssistanceRecordServerDto {
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

/**
 * 用户信息
 *
 * AssistanceUserInfoDto
 */
export interface AssistanceUserInfoDto {
    /**
     * 居住详细地址
     */
    address?: string;
    /**
     * 居住所在市
     */
    city?: string;
    /**
     * 居住所在市名称
     */
    cityName?: string;
    /**
     * 学历
     */
    degree?: string;
    /**
     * 居住所在区地区
     */
    district?: string;
    /**
     * 居住所在区地区名称
     */
    districtName?: string;
    /**
     * 意向岗位
     */
    position?: JSONObject[];
    /**
     * 专业
     */
    profession?: string;
    /**
     * 居住所在省
     */
    province?: string;
    /**
     * 居住所在省名称
     */
    provinceName?: string;
    /**
     * 户籍地址
     */
    registeredAddress?: string;
    /**
     * 户籍所在市
     */
    registeredCity?: string;
    /**
     * 户籍所在市名称
     */
    registeredCityName?: string;
    /**
     * 户籍所在区地区
     */
    registeredDistrict?: string;
    /**
     * 户籍所在区地区名称
     */
    registeredDistrictName?: string;
    /**
     * 户籍所在省
     */
    registeredProvince?: string;
    /**
     * 户籍所在省名称
     */
    registeredProvinceName?: string;
    /**
     * 毕业院校
     */
    school?: string;
    /**
     * 人员类别
     */
    type?: number;
    [property: string]: any;
}

/**
 * com.alibaba.fastjson2.JSONObject
 *
 * JSONObject
 */
export interface JSONObject {
    key?: { [key: string]: any };
    [property: string]: any;
}



/**
 * 响应数据
 *
 * QuestionAndAnswerDto
 */
export interface QuestionAndAnswerDto {
    /**
     * 问卷答案
     */
    answer?: QuestionAnswerDto[];
    /**
     * 问卷题目
     */
    question?: AssistanceFromQuestionDto[];
    /**
     * 序列码 更新状态和调研数据时候根据这个来判断数据是否一致
     */
    serialnumber?: string;
    [property: string]: any;
}

/**
 * 就业援助调研问题
 *
 * QuestionAnswerDto
 */
export interface QuestionAnswerDto {
    /**
     * 问题编码
     */
    questionCode?: string;
    /**
     * 问题序号
     */
    sequence?: string;
    [property: string]: any;
}

/**
 * 就业援助表单题目
 *
 * AssistanceFromQuestionDto
 */
export interface AssistanceFromQuestionDto {
    /**
     * 题目编码
     */
    code?: string;
    /**
     * 引导语
     */
    guide?: string;
    /**
     * 模块编码
     */
    moduleCode?: string;
    /**
     * 模块标题
     */
    moduleTitle?: string;
    /**
     * 选项列表
     */
    options?: AssistanceFromQuestionOptionDto[];
    /**
     * 段落编码
     */
    paragraphCode?: string;
    /**
     * 段落标题
     */
    paragraphTitle?: string;
    /**
     * 题干
     */
    title?: string;
    /**
     * 措辞优化
     */
    wordingOptimization?: string;
    [property: string]: any;
}

/**
 * 选项
 *
 * AssistanceFromQuestionOptionDto
 */
export interface AssistanceFromQuestionOptionDto {
    /**
     * 选项描述
     */
    description?: string;
    /**
     * 选项等级 1弱 2一般 3强
     */
    level?: number;
    /**
     * 选项分值
     */
    score?: number;
    /**
     * 选项编码
     */
    sequence?: string;
    /**
     * 选项内容
     */
    title?: string;
    [property: string]: any;
}
