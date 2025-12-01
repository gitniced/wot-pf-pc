import { transCustomContent } from './transformValues'
import type { QuestionItem, DetailType } from './interface'
import type { FormInstance } from 'antd'
import { templateTableList, compositionClearValues, clearValues } from './const'
import http from '@/servers/http'
import dayjs from 'dayjs'
// 获取题型题数
const getQuestionTableList = async (values: any) => {

    const {
        authenticateCode,
        customContent,
        receiptStartTime,
        receiptEndTime,
        questionCitedLimit,
        lastOrganizationCode,
    } = values || {}
    if (!customContent) return
    const params = {
        authenticateCode,
        customContent,
        receiptStartTime,
        receiptEndTime,
        questionCitedLimit,
        merchantCode: lastOrganizationCode,
    }
    const res = ((await http('question/front/point/count', 'post', params)) as unknown) || []
    return res
}

class handleValues {
    /**
     * 清空输入
     * @param data 列表数据
     * @returns 清空输入数据的列表数据
     */
    private clearTableInputData(data: QuestionItem[], composition: string) {
        const newArr = data?.map(item => {
            // 套题组卷时题目数量不需要清除
            if (composition === 'fromfile') {
                return { ...item, score: undefined }
            } else return { ...item, needNumber: undefined, score: undefined }
        })
        return newArr
    }
    /**
     * 选择组卷模板
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @param form 表单
     * @returns
     */
    private templateType(fieldValue: Record<string, any>, values: DetailType, form: FormInstance) {
        form.setFieldsValue({ templateCode: undefined, ...clearValues })
        return {
            ...fieldValue,
            templateCode: '',
            templateTitle: '',
            ...clearValues,
        }
    }
    /**
     * 选中具体的模板
     * @param fieldValue 字段值（对象）
     * @returns
     */
    private templateCode(fieldValue: Record<string, any>) {
        const { label, value } = fieldValue.templateCode || {}
        return {
            templateTitle: label,
            templateCode: value,
        }
    }
    /**
     * 职业/工种/等级处理
     * @param fieldValue 字段值（对象）
     * @returns
     */
    private commonJob(fieldValue: Record<string, any>, values: DetailType, form: FormInstance) {
        form.setFieldsValue({ templateCode: undefined, authenticateCode: undefined })
        return {
            customContent: transCustomContent(fieldValue),
            templateCode: undefined,
            authenticateCode: undefined,
            questionConfigList: [],
        }
    }
    /**
     * 组卷方式处理
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @returns
     */
    private composition(fieldValue: Record<string, any>, values: DetailType, form: FormInstance) {
        form.setFieldsValue({ ...compositionClearValues })
        return {
            ...fieldValue,
            ...compositionClearValues,
        }
    }
    /**
     * 要素细目表处理
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @returns
     */
    private authenticateCode(fieldValue: Record<string, any>) {
        return {
            ...fieldValue,
            questionConfigList: [],
            questionTableData: [],
            questionTypeLeast: 0,
            questionTotal: 0,
        }
    }
    /**
     * 分值设置数据处理
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @returns
     */
    private scoreType(fieldValue: Record<string, any>, values: DetailType, form: FormInstance) {
        form.setFieldValue('unificationScore', 0)
        const data: any = {
            ...fieldValue,
            unificationScore: 0,
            questionConfigList: [],
            questionTableData: this.clearTableInputData(
                values.questionTableData,
                values?.composition,
            ),
            templateTableList: templateTableList,
            questionTypeLeast: 0,
            questionTotal: 0,
        }
        if (values.composition === 'authenticate' || fieldValue.scoreType === 'questiontype') {
            data.questionStructure = 'questiontype'
            form.setFieldValue('questionStructure', 'questiontype')
        }
        return data
    }
    /**
     * 选择题型结构类型数据处理
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @returns
     */
    private questionStructure(fieldValue: Record<string, any>, values: DetailType) {
        return {
            ...fieldValue,
            questionTypeLeast: 0,
            questionTotal: 0,
            questionConfigList: [],
            questionTableData: this.clearTableInputData(
                values.questionTableData,
                values?.composition,
            ),
            templateTableList: templateTableList,
        }
    }
    /**
     * 是否随机生成试卷数据处理
     * @param fieldValue 字段值（对象）
     * @returns
     */
    private randomQuestionState(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
    ) {
        form.setFieldValue('randomQuestionNum', 0)
        return {
            ...fieldValue,
            randomQuestionNum: 0,
        }
    }
    /**
     * 是否选择试题入库时间数据处理
     * @param fieldValue 字段值（对象）
     * @returns
     */
    private async receiptStatus(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
        type: string,
        lastOrganizationCode?: string
    ) {
        const data = { ...fieldValue }
        if (!data.receiptStatus) {
            const {
                authenticateCode,
                customContent,
                receiptStartTime,
                receiptEndTime,
                quoteNumStatus,
                questionCitedLimit,
            } = values || {}
            if (type !== 'template' && receiptStartTime && receiptEndTime) {
                data.questionTableData = await getQuestionTableList({
                    authenticateCode,
                    customContent,
                    questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
                    lastOrganizationCode
                })
            }
            form.setFieldsValue({ receiptStartTime: undefined, receiptEndTime: undefined })
            data.receiptStartTime = undefined
            data.receiptEndTime = undefined
        }
        return data
    }
    /**
     * 试题入库开始时间
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @returns
     */
    private async receiptStartTime(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
        type: string,
        lastOrganizationCode?: string
    ) {
        const data = { ...fieldValue }
        const {
            authenticateCode,
            customContent,
            receiptEndTime,
            quoteNumStatus,
            questionCitedLimit,
        } = values || {}
        if (type !== 'template' && data.receiptStartTime && receiptEndTime) {
            data.questionTableData = await getQuestionTableList({
                authenticateCode,
                customContent,
                receiptStartTime: dayjs(data.receiptStartTime).startOf('day').valueOf(),
                receiptEndTime: dayjs(receiptEndTime).endOf('day').valueOf(),
                questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
                lastOrganizationCode
            })
        }
        return data
    }
    /**
     * 试题入库结束时间
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @returns
     */
    private async receiptEndTime(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
        type: string,
        lastOrganizationCode?: string
    ) {
        const data = { ...fieldValue }
        const {
            authenticateCode,
            customContent,
            receiptStartTime,
            quoteNumStatus,
            questionCitedLimit,
        } = values || {}
        if (type !== 'template' && receiptStartTime && data.receiptEndTime) {
            data.questionTableData = await getQuestionTableList({
                authenticateCode,
                customContent,
                receiptStartTime: dayjs(receiptStartTime).startOf('day').valueOf(),
                receiptEndTime: dayjs(data.receiptEndTime).endOf('day').valueOf(),
                questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
                lastOrganizationCode
            })
        }
        return data
    }
    /**
     * 是否选择试题引用次数数据处理
     * @param fieldValue 字段值（对象）
     * @returns
     */
    private async quoteNumStatus(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
        type: string,
        lastOrganizationCode?: string
    ) {
        const data = { ...fieldValue }
        if (!data.quoteNumStatus) {
            const {
                authenticateCode,
                customContent,
                receiptStartTime,
                receiptEndTime,
                questionCitedLimit,
            } = values || {}
            if (type !== 'template' && typeof questionCitedLimit === 'number') {
                data.questionTableData = await getQuestionTableList({
                    authenticateCode,
                    customContent,
                    receiptStartTime: receiptStartTime
                        ? dayjs(receiptStartTime).startOf('day').valueOf()
                        : undefined,
                    receiptEndTime: receiptEndTime
                        ? dayjs(receiptEndTime).endOf('day').valueOf()
                        : undefined,
                    lastOrganizationCode
                })
            }
            form.setFieldValue('questionCitedLimit', undefined)
            data.questionCitedLimit = undefined
        }
        return data
    }
    /**
     * 引用次数
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @param form
     * @returns
     */
    private async questionCitedLimit(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
        type: string,
        lastOrganizationCode?: string
    ) {
        const data = { ...fieldValue }
        if (type !== 'template' && typeof data.questionCitedLimit === 'number') {
            const { authenticateCode, customContent, receiptStartTime, receiptEndTime } =
                values || {}
            data.questionTableData = await getQuestionTableList({
                authenticateCode,
                customContent,
                receiptStartTime: receiptStartTime
                    ? dayjs(receiptStartTime).startOf('day').valueOf()
                    : undefined,
                receiptEndTime: receiptEndTime
                    ? dayjs(receiptEndTime).endOf('day').valueOf()
                    : undefined,
                questionCitedLimit: data.questionCitedLimit,
                lastOrganizationCode
            })
        }
        return data
    }
    /**
     * 对表单项值change后需要进行数据处理的方法
     * @param fieldValue 字段值（对象）
     * @param values 详情数据
     * @param form 表单
     * @param type 类型 新建模板或新建试卷
     * @returns
     */
    public processedValue(
        fieldValue: Record<string, any>,
        values: DetailType,
        form: FormInstance,
        type: string,
        lastOrganizationCode?: string
    ) {
        const fieldName = Object.keys(fieldValue)[0]
        if (!(this as any)[fieldName]) {
            return fieldValue
        } else return (this as any)[fieldName](fieldValue, values, form, type, lastOrganizationCode)
    }
}

export default new handleValues()
