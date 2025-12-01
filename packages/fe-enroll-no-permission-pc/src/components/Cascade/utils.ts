export const generateCommonJobList = (commonJobList: any) => {
    if (!commonJobList) return []
    return commonJobList.map((commonJob: any) => ({
        label: commonJob.name,
        value: commonJob.levelRelationId || commonJob.id,
        hasWorkType: commonJob.hasWorkType, // 是否有工种
        children: generateCommonJobList(
            commonJob.workTypeList?.length ? commonJob.workTypeList : commonJob.levelInfoList,
        ),
    }))
}
