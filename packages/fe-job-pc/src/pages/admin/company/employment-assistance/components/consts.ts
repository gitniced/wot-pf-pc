
export enum EMPLOYMENT_STATUS_ENUM {
    EMPLOYED = 1,
    LOOKING_FOR,
    NO_JOB_INTENTION,
    OTHER,
}

export const EmploymentStatusOptions = [
    { label: '已就业', value: EMPLOYMENT_STATUS_ENUM.EMPLOYED },
    { label: '持续求职中', value: EMPLOYMENT_STATUS_ENUM.LOOKING_FOR },
    { label: '暂无求职意向', value: EMPLOYMENT_STATUS_ENUM.NO_JOB_INTENTION },
    { label: '其他', value: EMPLOYMENT_STATUS_ENUM.OTHER },
]



/**  步骤条  */
export enum DIAGNOSIS_STEP_ENUM {
    FIRST = 0,
    SECOND = 1,
}

export enum MEASURE_TYPE {
    RECOMMEND = 1, // 系统推荐
    MORE, // 系统更多
    CUSTOM, // 自定义
}

export const MEASURE_TYPE_TEXT: Record<number, string> = {
    [MEASURE_TYPE.RECOMMEND]: '系统推荐措施',
    [MEASURE_TYPE.MORE]: '系统更多措施',
    [MEASURE_TYPE.CUSTOM]: '自定义措施',
}


// 人员类别
export const personLevel: Record<string, string> = {
    1: '长期失业人员',
    2: '4050人员',
    3: '低保人员',
    4: '残疾人',
    5: '零就业家庭成员',
    6: '其他就业困难情形',
}

// 就业状态
export const jobStateList: Record<string, string> = {
    1: '已就业',
    2: '持续求职中',
    3: '暂无求职意向',
    4: '其他',
}

// 服务状态
export enum STATUS_TYPE {
    RESEARCH = '10',
    WAIT_DIAFGNOSIS = '20',
    DIAFGNOSIS = '30',
    SERVING = '40',
    FINISH = '50'
}

export const STATUS_TEXT: Record<string, string> = {
    [STATUS_TYPE.RESEARCH]: '调研中',
    [STATUS_TYPE.WAIT_DIAFGNOSIS]: '待诊断',
    [STATUS_TYPE.DIAFGNOSIS]: '诊断中',
    [STATUS_TYPE.SERVING]: '服务中',
    [STATUS_TYPE.FINISH]: '已完成',
}


export const STATUS_COLOR: Record<string, string> = {
    [STATUS_TYPE.RESEARCH]: 'blue',
    [STATUS_TYPE.WAIT_DIAFGNOSIS]: 'orange',
    [STATUS_TYPE.DIAFGNOSIS]: 'green',
    [STATUS_TYPE.SERVING]: 'purple',
    [STATUS_TYPE.FINISH]: 'default',
}


export enum RESULT_LEVE {
    WEAK = '1',
    COMMON = '2',
    STRONG = '3'
}

export const LEVEL_TEXT: Record<string, string> = {
    [RESULT_LEVE.WEAK]: '弱',
    [RESULT_LEVE.COMMON]: '一般',
    [RESULT_LEVE.STRONG]: '强',
}

