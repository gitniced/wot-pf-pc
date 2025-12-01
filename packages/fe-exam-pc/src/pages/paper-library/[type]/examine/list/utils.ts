import type { RouteQuery } from './interface'

// 获取地址栏数据
export const mapJobName = (params: RouteQuery) => {
    const { jobName, jobNameCode, jobType, jobTypeCode, jobLevel, jobLevelCode } = params

    const options = []
    if (jobNameCode) {
        options.push({
            label: jobName,
            value: Number(jobNameCode),
        })
    }

    if (jobTypeCode) {
        options.push({
            label: jobType,
            value: Number(jobTypeCode),
        })
    }

    if (jobLevelCode) {
        options.push({
            label: jobLevel,
            value: Number(jobLevelCode),
        })
    }
    return options
}
