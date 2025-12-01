import { EASY, LITTLE_EASY, MEDIUM, LITTLE_HARD, HARD, DIFFICULTY_LEVEL } from '../../[type]/const'
import type { LevelItem, QuestionItem } from './interface'

const templateTableList = [
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

export const initValues = {
    composition: 'authenticate',
    scoreType: 'questiontype',
    questionStructure: 'questiontype',
    questionConfigList: [],
    templateTableList: templateTableList,
    templateDifficultyTableData,
    receiptStatus: false,
    quoteNumStatus: false,
    randomQuestionState: 0,
    randomQuestionType: 0,
    canEditState: 1,
    difficultyLimit: false,
}
/**
 * 将接口返回的表格数据和初始化数据进行整合
 * @param questionConfigList 表格数据
 * @returns 整合后的数据
 */
export const handleTemplateTableList = (questionConfigList: QuestionItem[]) => {
    return templateTableList.map(item => {
        const tableItem = questionConfigList.find(ele => ele.questionType === item.questionType)
        if (tableItem) {
            return {
                ...tableItem,
                ...item,
            }
        } else return item
    })
}

/**
 * 将接口返回的表格数据和初始化数据进行整合
 * @param questionConfigList 表格数据
 * @returns 整合后的数据
 */
export const handleTemplateDifficultyTableData = (difficultyConfigList: LevelItem[]) => {
    return templateDifficultyTableData.map(item => {
        const tableItem = difficultyConfigList.find(ele => ele.level === item.level)
        if (tableItem) {
            return {
                ...tableItem,
                ...item,
            }
        } else return item
    })
}
