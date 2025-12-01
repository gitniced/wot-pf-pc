import { useEffect, useState } from 'react'
import type {
    AuthenticateItem,
    ComposeSettingProps,
    ImportFileValues,
    TableItem,
} from './interface'
import type { UploadFile } from 'antd/es/upload/interface'
import http from '@/servers/http'
import API from './api'
import { compositionClearValues } from '../FormSetting/const'
import dayjs from 'dayjs'
import { COMPOSITION_WAY, CREATE_VOLUME_LIBRARY_TYPE } from '@/components/PaperExamine/const'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'

/**
 * @param props {
 *  type: 新建类型 template-组卷、examine_create-试卷
 *  form: form表单实例
 *  formData: 表单数据
 *  setFormData: 修改表单数据方法
 * }
 */
export default (props: ComposeSettingProps) => {
    const userStore = useUserStore()
    const commonParams = useCommonParams()

    const { type, form, formData, setFormData } = props || {}
    const {
        customContent,
        composition,
        fromFileCode,
        authenticateCode,
        questionTableData = [],
        templateTableList = [],
        receiptStartTime,
        receiptEndTime,
        quoteNumStatus,
        questionCitedLimit,
    } = formData || {}
    /** 要素细目表下拉列表 */
    const [authenticateOptions, setAuthenticateOptions] = useState<AuthenticateItem[]>([])
    /** 套题导入弹窗显示 */
    const [importVisible, setImportVisible] = useState<boolean>(false)

    /** 套题组卷导入文件后查询题型题数 */
    const getQuestionList = async () => {
        const params = {
            authenticateCode,
            customContent,
            fromFileCode,
            merchantCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
        }
        const res =
            ((await http(API.getQuestionList, 'post', {
                ...params,
                ...commonParams,
            })) as unknown as TableItem[]) || []
        const tableArr: TableItem[] = res.map(item => {
            const { count } = item || {}
            return {
                ...item,
                needNumber: count,
            }
        })
        setFormData((v: any) => ({
            ...v,
            questionTableData: tableArr,
        }))
    }
    useEffect(() => {
        // 导入文件存在时，查询数据
        if (fromFileCode) {
            getQuestionList()
        }
    }, [fromFileCode])
    /** 获取题型题数 */
    const getQuestionStructure = async () => {
        const params = {
            authenticateCode,
            customContent,
            receiptStartTime: receiptStartTime
                ? dayjs(receiptStartTime).startOf('day').valueOf()
                : undefined,
            receiptEndTime: receiptEndTime
                ? dayjs(receiptEndTime).endOf('day').valueOf()
                : undefined,
            questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
            merchantCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
        }
        const res =
            ((await http(API.getQuestionStructure, 'post', {
                ...params,
                ...commonParams,
            })) as unknown as TableItem[]) || []
        // 将获取到的题型题数和原数据进行数据整合
        const tableArr: TableItem[] = res.map(item => {
            const tableItem = questionTableData.find(ele => ele.questionType === item.questionType)
            if (tableItem) {
                return {
                    ...tableItem,
                    ...item,
                }
            } else return item
        })
        setFormData((v: any) => ({ ...v, questionTableData: tableArr }))
    }
    useEffect(() => {
        // 组卷模板以及套题组卷不需要请求该接口获取题型题数
        if (
            type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION &&
            composition !== COMPOSITION_WAY.FROM_FILE &&
            customContent
        ) {
            getQuestionStructure()
        }
    }, [composition, authenticateCode, customContent])
    /** 获取要素细目表下拉列表 */
    const getAuthenticateList = async () => {
        const params = {
            categoryId: customContent?.commonJob?.jobLevelCode,
            orgCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
            ...commonParams,
        }
        const res =
            ((await http(
                API.getAuthenticateList,
                'get',
                params,
            )) as unknown as AuthenticateItem[]) || []
        setAuthenticateOptions(res)
    }
    useEffect(() => {
        // 组卷方式为鉴定点组卷和职业工种等级存在时
        if (composition === COMPOSITION_WAY.AUTHENTICATE && customContent?.commonJob) {
            getAuthenticateList()
        }
    }, [composition, customContent?.commonJob?.jobLevelCode])

    /**
     * Excel套题移除文件
     * @param file 文件
     */
    const onRemove = (file: UploadFile) => {
        if (file.uid === fromFileCode) {
            form.setFieldsValue({ ...compositionClearValues })
            setFormData((v: any) => ({
                ...v,
                ...compositionClearValues,
            }))
        }
    }
    /**
     * 试卷题型结构内输入框
     * @param value 输入的值
     * @param type 题型
     * @param attribute 题目数量或者分值类型
     */
    const inputChange = (value: string | number | null, examType: number, attribute: string) => {
        let copyData = JSON.parse(JSON.stringify(questionTableData)) || []
        copyData.map((ele: TableItem) => {
            if (ele.questionType === examType) {
                ele[attribute] = Number(value)
            }
            return ele
        })
        setFormData((v: any) => ({ ...v, questionTableData: copyData }))
    }
    /**
     * 模板题型结构内输入框
     * @param value 输入的值
     * @param type 题型
     * @param attribute 题目数量或者分值类型
     */
    const templateInputChange = (
        value: string | number | null,
        examType: number,
        attribute: string,
    ) => {
        let copyData = JSON.parse(JSON.stringify(templateTableList)) || []
        copyData.map((ele: TableItem) => {
            if (ele.questionType === examType) {
                ele[attribute] = Number(value)
            }
            return ele
        })
        setFormData((v: any) => ({ ...v, templateTableList: copyData }))
    }
    /**
     * 规则设置下拉回调
     * @param value 选中值
     */
    const extractChange = (value: number[]) => {
        const selected = value.map(item => {
            return {
                questionType: item,
                needNumber: 0,
                score: 0,
            }
        })
        setFormData((v: any) => ({ ...v, questionConfigList: selected }))
    }
    // 打开套题导入弹窗
    const openModal = () => {
        setImportVisible(true)
    }
    /**
     * 关闭套题导入弹窗
     * @param values 关闭弹窗返回数据
     */
    const closeModal = (values?: ImportFileValues) => {
        if (values) {
            const { uploadData, importData: importFileData } = values || {}
            setFormData((v: any) => ({
                ...v,
                fromFileTitle: uploadData?.name,
                fromFileCode: importFileData?.code,
            }))
        }
        setImportVisible(false)
    }
    return {
        authenticateOptions,
        importVisible,
        onRemove,
        inputChange,
        templateInputChange,
        extractChange,
        openModal,
        closeModal,
    }
}
