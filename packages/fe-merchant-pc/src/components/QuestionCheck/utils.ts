import type {
    KnowledgeItem,
    KnowledgeOption,
} from '../../pages/question/[type]/components/QuestionTypes/interface'

export const generateCommonJobList = (commonJobList: any) => {
    if (!commonJobList || !commonJobList.length) return undefined
    return commonJobList.map((commonJob: any) => ({
        label: commonJob.name,
        value: commonJob.levelRelationId || commonJob.id,
        children: generateCommonJobList(commonJob.workTypeList || commonJob.levelInfoList),
    }))
}

export const generateKnowledgeList = (
    knowledgeList: KnowledgeItem[],
): KnowledgeOption[] | undefined => {
    if (!knowledgeList || !knowledgeList.length) return undefined

    return knowledgeList.map((knowledge: KnowledgeItem) => ({
        label: knowledge.title,
        value: knowledge.code,
        levelCode: knowledge.levelCode,
        children: generateKnowledgeList(knowledge.childList),
    }))
}
