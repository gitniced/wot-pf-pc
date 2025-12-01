export const generateCommonJobList = (commonJobList: any) => {
    if (!commonJobList || !commonJobList.length) return undefined
    return commonJobList.map((commonJob: any) => ({
        label: commonJob.name,
        value: commonJob.id,
        children: generateCommonJobList(commonJob.workList || commonJob.levelList),
    }))
}
