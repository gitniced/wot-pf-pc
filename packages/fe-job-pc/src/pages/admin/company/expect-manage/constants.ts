/** 求职类型 */
export enum WORK_TYPE {
    fullTime = 1,
    partTime,
    internship,
    campusRecruitment,
}
export const WORK_TYPE_NAME_MAPS: Record<number, string> = {
    [WORK_TYPE.fullTime]: '全职',
    [WORK_TYPE.partTime]: '兼职',
    [WORK_TYPE.internship]: '实习',
    [WORK_TYPE.campusRecruitment]: '校招',
}

export const WORK_TYPE_OPTIONS: Record<string, any>[] = [
    {
        label: WORK_TYPE_NAME_MAPS[WORK_TYPE.fullTime],
        value: WORK_TYPE.fullTime,
        key: WORK_TYPE.fullTime,
    },
    {
        label: WORK_TYPE_NAME_MAPS[WORK_TYPE.partTime],
        value: WORK_TYPE.partTime,
        key: WORK_TYPE.partTime,
    },
    {
        label: WORK_TYPE_NAME_MAPS[WORK_TYPE.internship],
        value: WORK_TYPE.internship,
        key: WORK_TYPE.internship,
    },
    {
        label: WORK_TYPE_NAME_MAPS[WORK_TYPE.campusRecruitment],
        value: WORK_TYPE.campusRecruitment,
        key: WORK_TYPE.campusRecruitment,
    },
]
