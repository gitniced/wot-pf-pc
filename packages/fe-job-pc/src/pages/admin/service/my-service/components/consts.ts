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
