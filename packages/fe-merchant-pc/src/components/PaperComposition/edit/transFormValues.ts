import dayjs from 'dayjs'

/**
 * 转换为传递给接口的数据
 * @param values 表单值
 * @param type 类型：组卷模板或者试卷
 * @returns 接口数据
 */
const transToSubmitData = (values: Record<string, any>, type: string) => {
    const {
        questionStructure,
        questionConfigList,
        questionTableData,
        templateTableList,
        chaosOrderState,
        chaosOptionsState,
        numContinuousState,
        receiptStartTime,
        receiptEndTime,
        quoteNumStatus,
    } = values || {}
    const obj: Record<string, any> = {
        chaosOrderState: chaosOrderState ? 1 : 0,
        chaosOptionsState: chaosOptionsState ? 1 : 0,
        numContinuousState: numContinuousState ? 1 : 0,
        receiptStartTime: receiptStartTime
            ? dayjs(receiptStartTime).startOf('day').valueOf()
            : undefined,
        receiptEndTime: receiptEndTime ? dayjs(receiptEndTime).endOf('day').valueOf() : undefined,
        quoteNumStatus: quoteNumStatus ? 1 : 0,
    }
    // 题型结构选择规则时，使用questionConfigList；类型为组卷模板时使用templateTableList，类型为试卷时使用questionTableData
    if (questionStructure === 'rules') {
        obj.questionConfigList = questionConfigList
    } else if (type !== 'template') {
        obj.questionConfigList = questionTableData?.filter((item: any) => item?.needNumber > 0)
    } else {
        obj.questionConfigList = templateTableList?.filter((item: any) => item?.needNumber > 0)
    }
    const resultData = {
        ...values,
        ...obj,
    }
    // 删除自定义字段
    delete resultData.questionTableData
    delete resultData.templateTableList
    return resultData
}
/**
 * 转换为表单值
 * @param values 后端传过来的值
 * @returns 表单值
 */
const transToFormFieldsValue = (values: Record<string, any>) => {
    const {
        customContent,
        chaosOrderState,
        chaosOptionsState,
        numContinuousState,
        receiptStartTime,
        receiptEndTime,
        quoteNumStatus,
    } = values || {}
    const { commonJob } = customContent || {}
    const obj: Record<string, any> = {
        chaosOrderState: chaosOrderState ? true : false,
        chaosOptionsState: chaosOptionsState ? true : false,
        numContinuousState: numContinuousState ? true : false,
        receiptStartTime: receiptStartTime ? dayjs(receiptStartTime) : undefined,
        receiptEndTime: receiptEndTime ? dayjs(receiptEndTime) : undefined,
        quoteNumStatus: quoteNumStatus ? true : false,
    }
    if (commonJob?.jobNameCode && commonJob?.jobTypeCode && commonJob?.jobLevelCode) {
        obj.commonJob = [
            {
                value: commonJob?.jobNameCode,
                label: commonJob?.jobName,
            },
            {
                value: commonJob?.jobTypeCode,
                label: commonJob?.jobType,
            }, 
            {
                value: commonJob?.jobLevelCode,
                label: commonJob?.jobLevel,
            }
        ]
    }
    return { ...values, ...obj }
}
export { transToSubmitData, transToFormFieldsValue }
