import dayjs from 'dayjs'

/**
 * 随机生成模板名称
 * @param businessName 业务字段名称
 * @returns 模板名称
 */
export const generateName = (businessName: string) => {
    return businessName + dayjs().format('YYMMDD') + (Math.floor(Math.random() * 90) + 10)
}
/**
 * 职业工种等级格式化成后端接口所需
 * @param values 职业、工种、等级级联下拉选中项
 * @returns
 */
export const formatCommonJobData = (values: string[]) => {
    const [career, work, level] = values ?? []
    return {
        jobName: career && JSON.parse(career)?.label,
        jobNameCode: career && JSON.parse(career)?.value,
        jobType: work && JSON.parse(work)?.label,
        jobTypeCode: work && JSON.parse(work)?.value,
        jobLevel: level && JSON.parse(level)?.label,
        jobLevelCode: level && JSON.parse(level)?.value,
    }
}
