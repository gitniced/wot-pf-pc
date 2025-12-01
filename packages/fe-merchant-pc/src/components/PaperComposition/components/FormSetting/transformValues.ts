/**
 * 将自定义字段转换为接口数据格式
 * @param values 自定义字段
 * @returns
 */
export const transCustomContent = (values: Record<string, any>) => {
    const { commonJob } = values || {}
    const customContent: Record<string, any> = {}
    
    if (commonJob && commonJob.length > 2) {
        const [jobNameObj, jobTypeObj, jobLevelObj] = commonJob
        
        customContent.commonJob = {
            jobNameCode: jobNameObj?.value,
            jobName: jobNameObj?.label,
            jobTypeCode: jobTypeObj?.value,
            jobType: jobTypeObj?.label,
            jobLevelCode: jobLevelObj?.value,
            jobLevel: jobLevelObj?.label,
        }
    }
    return customContent
}
