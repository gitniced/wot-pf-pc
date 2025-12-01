/**
 * 将自定义字段转换为接口数据格式
 * @param values 自定义字段
 * @returns
 */
export const transCustomContent = (values: Record<string, any>) => {
    const { commonJob } = values || {}
    const customContent: Record<string, any> = {}

    if (commonJob) {
        const [jobNameObj, jobTypeObj, jobLevelObj] = commonJob
        const { hasWorkType } = jobNameObj

        customContent.commonJob = {
            jobNameCode: jobNameObj?.value,
            jobName: jobNameObj?.label,
        }

        if (hasWorkType) {
            customContent.commonJob = {
                ...customContent.commonJob,
                jobTypeCode: jobTypeObj?.value,
                jobType: jobTypeObj?.label,
                jobLevelCode: jobLevelObj?.value,
                jobLevel: jobLevelObj?.label,
            }
        } else {
            customContent.commonJob = {
                ...customContent.commonJob,
                jobLevelCode: jobTypeObj?.value,
                jobLevel: jobTypeObj?.label,
            }
        }
    }
    return customContent
}
