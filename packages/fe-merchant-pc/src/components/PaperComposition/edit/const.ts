import type { QuestionItem } from './interface'

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

export const initValues = {
    composition: 'authenticate',
    scoreType: 'questiontype',
    questionStructure: 'questiontype',
    questionConfigList: [],
    templateTableList: templateTableList,
    receiptStatus: false,
    quoteNumStatus: false,
    randomQuestionState: 0,
    canEditState: 1,
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
