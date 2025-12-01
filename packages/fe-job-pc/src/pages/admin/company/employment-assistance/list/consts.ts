export enum SOURCE_TYPE {
    Organization = 1,
    CompetentAuthority,
    Organization_CompetentAuthority = '1,2',
}
export const SourceTypeOptions = [
    { label: '主管部门', value: SOURCE_TYPE.CompetentAuthority },
    { label: '机构', value: SOURCE_TYPE.Organization },
]
export const SOURCE_TYPE_TEXT: Record<number | string, string> = {
    [SOURCE_TYPE.CompetentAuthority]: '主管部门',
    [SOURCE_TYPE.Organization]: '机构',
    [SOURCE_TYPE.Organization_CompetentAuthority]: '机构、主管部门',
}

export const JobStateText = ['-', '已就业', '持续求职中', '暂无求职意向', '其他']

export const JobStateOptions = [
    { label: '全部', value: null },
    { label: '已就业', value: 1 },
    { label: '持续求职中', value: 2 },
    { label: '暂无求职意向', value: 3 },
    { label: '其他', value: 4 },
]

export enum SERVICE_STATE {
    ALL = 0,
    UnderInvestigation = 10,
    ToBeDiagnosed = 20,
    Diagnosing = 30,
    InService = 40,
    Completed = 50,
}

export const ServiceStateText: Record<number, string> = {
    [SERVICE_STATE.UnderInvestigation]: '调研中',
    [SERVICE_STATE.ToBeDiagnosed]: '待诊断',
    [SERVICE_STATE.Diagnosing]: '诊断中',
    [SERVICE_STATE.InService]: '服务中',
    [SERVICE_STATE.Completed]: '已完成',
}
export const ServiceStateColor: Record<number, string> = {
    [SERVICE_STATE.UnderInvestigation]: 'processing',
    [SERVICE_STATE.ToBeDiagnosed]: 'warning',
    [SERVICE_STATE.Diagnosing]: 'success',
    [SERVICE_STATE.InService]: 'purple',
    [SERVICE_STATE.Completed]: 'default',
}
export const ObjectCategoryTypeText: string[] = [
    '-',
    '易帮扶人员(轻度)',
    '较难帮扶人员（较中度)',
    '难帮扶人员（中度)',
    '重点帮扶人员（较重度)',
    '托底帮扶人员（重度)',
]

export const ObjectCategoryTypeOptions = [
    { label: '全部', value: null },
    { label: '易帮扶人员(轻度)', value: 1 },
    { label: '较难帮扶人员（较中度)', value: 2 },
    { label: '难帮扶人员（中度)', value: 3 },
    { label: '重点帮扶人员（较重度)', value: 4 },
    { label: '托底帮扶人员（重度)', value: 5 },
]

export enum CERTIFICATE_TYPE {
    ID_CARD = 1,
    PASSPORT,
    OTHER,
}

export const CERTIFICATE_TYPE_TEXT: Record<number, string> = {
    [CERTIFICATE_TYPE.ID_CARD]: '居民身份证',
    [CERTIFICATE_TYPE.PASSPORT]: '护照',
    [CERTIFICATE_TYPE.OTHER]: '其他',
}

export enum GENDER {
    FEMALE,
    MALE,
}

export const GENDER_TEXT: Record<number, string> = {
    [GENDER.FEMALE]: '女',
    [GENDER.MALE]: '男',
}
