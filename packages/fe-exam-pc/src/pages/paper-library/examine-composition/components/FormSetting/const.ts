import {
    DIFFICULTY_LEVEL,
    EASY,
    LITTLE_EASY,
    MEDIUM,
    LITTLE_HARD,
    HARD,
} from '@/pages/paper-library/[type]/const'

export const templateTableList = [
    { questionType: 10 },
    { questionType: 20 },
    { questionType: 30 },
    { questionType: 40 },
    { questionType: 50 },
    { questionType: 60 },
    { questionType: 70 },
    { questionType: 80 },
    { questionType: 90 },
]

const templateDifficultyTableData = [
    { level: 10, levelName: DIFFICULTY_LEVEL[EASY] },
    { level: 20, levelName: DIFFICULTY_LEVEL[LITTLE_EASY] },
    { level: 30, levelName: DIFFICULTY_LEVEL[MEDIUM] },
    { level: 40, levelName: DIFFICULTY_LEVEL[LITTLE_HARD] },
    { level: 50, levelName: DIFFICULTY_LEVEL[HARD] },
]

export const compositionClearValues = {
    authenticateCode: undefined,
    fromFileCode: '',
    fromFileTitle: '',
    scoreType: 'questiontype',
    unificationScore: undefined,
    qualifiedProp: undefined,
    questionStructure: 'questiontype',
    questionConfigList: [],
    questionTableData: [],
    templateTableList: templateTableList,
    questionTotal: 0,
    questionTypeLeast: 0,
    suggestedTime: 0,
    precautions: '',
    canEditState: 1,
    randomQuestionState: 0,
    randomQuestionNum: 0,
    receiptStatus: false,
    receiptStartTime: 0,
    receiptEndTime: 0,
    quoteNumStatus: false,
    questionCitedLimit: undefined,
    examinationCommitmentLetter: undefined,
    expertReviewMaterials: undefined,
    questionSourceType: undefined,
    templateDifficultyTableData,
}
export const clearValues = {
    composition: 'authenticate',
    ...compositionClearValues,
}
