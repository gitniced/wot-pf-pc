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
import {
    COMPOSITION_WAY,
    CREATE_VOLUME_LIBRARY_TYPE,
    DIFFICULTY_LEVEL,
    QUESTION_STRUCTURE_TYPE,
    SCORE_SETTING_TYPE,
    TEMPLATE_TYPE,
} from '@/pages/paper-library/[type]/const'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'
import { message } from 'antd'
import { cloneDeep } from 'lodash'
import { useDebounce } from 'ahooks'
import { useLocation } from 'umi'

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
    const commonParam = useCommonParams()
    const { code: paperCode } = useLocation().query || {}
    // 组卷方式为按题型组卷时，题型题数表
    const { type, form, formData, setFormData } = props || {}
    const {
        scoreType,
        templateType,
        customContent,
        composition,
        fromFileCode,
        authenticateCode,
        questionStructure,
        questionConfigList = [],
        questionTableData = [],
        templateTableList = [],
        templateDifficultyTableData = [],
        difficultyTableData = [],
        receiptStartTime,
        receiptEndTime,
        quoteNumStatus,
        questionCitedLimit,
        subject = 10,
    } = formData || {}
    /** 要素细目表下拉列表 */
    const [authenticateOptions, setAuthenticateOptions] = useState<AuthenticateItem[]>([])
    /** 套题导入弹窗显示 */
    const [importVisible, setImportVisible] = useState<boolean>(false)
    const [importFileType, setImportFileType] = useState<'excel' | 'word'>()

    /** 套题组卷导入文件后查询题型题数 */
    const getQuestionList = async (code: string) => {
        const params = {
            authenticateCode,
            customContent,
            fromFileCode: code || fromFileCode,
            merchantCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
            ...commonParam,
        }
        const res =
            ((await http(API.getQuestionList, 'post', params)) as unknown as TableItem[]) || []
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
            ...commonParam,
        }
        const res =
            ((await http(API.getQuestionStructure, 'post', params)) as unknown as TableItem[]) || []
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

    /** 获取难易度题数 */
    const getDifficultyCount = async (questionTypeList: string[] = [], isNew: boolean = false) => {
        const params = {
            // authenticateCode,
            customContent,
            receiptStartTime: receiptStartTime
                ? dayjs(receiptStartTime).startOf('day').valueOf()
                : undefined,
            receiptEndTime: receiptEndTime
                ? dayjs(receiptEndTime).endOf('day').valueOf()
                : undefined,
            questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
            merchantCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
            ...commonParam,
            questionTypeList,
        }
        const oldDifficultyTableData = cloneDeep(difficultyTableData)
        const tempDifficultyTableData =
            ((await http(API.getDifficultyCount, 'post', params)) as unknown as TableItem[]) || []
        tempDifficultyTableData.map(item => {
            if (!isNew) {
                oldDifficultyTableData.map(oldItem => {
                    if (item.level === oldItem.level) {
                        item.needNumber = oldItem.needNumber!
                    }
                })
            }
            item.levelName = isNaN(item.level as number)
                ? ''
                : DIFFICULTY_LEVEL[Number(item.level)] || ''
        })
        setFormData((v: any) => ({ ...v, difficultyTableData: tempDifficultyTableData }))
    }

    const debounceQuestionConfigList = useDebounce(questionConfigList, { wait: 1000 })
    const debounceQuestionTableData = useDebounce(questionTableData, { wait: 1000 })

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

    /**
     * 职业工种等级（customContent）、
     * 组卷模版（templateType）、
     * 组卷方式（composition）、
     * 分值设置（scoreType）、
     * 题型结构（questionStructure）
     * 变化时，全量更新难易度分布
     */
    useEffect(() => {
        if (questionStructure === QUESTION_STRUCTURE_TYPE.RULES) {
            getQuestionStructure()
        } else {
            form.setFieldValue('questionTotal', 0)
            form.setFieldValue('questionTypeLeast', 0)
        }
        // 新建组卷时
        if (customContent && !paperCode) {
            // 组卷方式为按题型组卷时
            getDifficultyCount([], true)
        }
    }, [customContent, templateType, composition, scoreType, questionStructure])

    // 题型结构 表格配置修改时 增量更新难易度分布
    useEffect(() => {
        if (
            customContent &&
            composition === COMPOSITION_WAY.QUESTION_TYPE &&
            templateType === TEMPLATE_TYPE.NONE
        ) {
            // 组卷方式为按题型组卷时
            if (!questionStructure) return
            let questionTypeList: string[] = []
            if (questionStructure === QUESTION_STRUCTURE_TYPE.RULES) {
                questionTypeList = debounceQuestionConfigList.map(item =>
                    item.questionType.toString(),
                )
            } else {
                questionTypeList = debounceQuestionTableData
                    .filter(item => item.needNumber)
                    .map(item => item.questionType.toString())
            }

            getDifficultyCount(questionTypeList)
        }
    }, [debounceQuestionConfigList, debounceQuestionTableData])

    /** 获取要素细目表下拉列表 */
    const getAuthenticateList = async () => {
        const params = {
            categoryId:
                customContent?.commonJob?.jobLevelCode || customContent.commonJob.jobTypeCode,
            orgCode: userStore?.selectedOrganization,
            ...commonParam,
            subject,
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
        // 组卷方式为考评点组卷和职业工种等级存在时
        if (composition === COMPOSITION_WAY.AUTHENTICATE && customContent?.commonJob) {
            getAuthenticateList()
        }
    }, [composition, customContent?.commonJob?.jobLevelCode])

    useEffect(() => {
        getAuthenticateList()
        if (subject) {
            form.setFieldValue('authenticateCode', undefined)
        }
    }, [subject])

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
     * 模板题型结构内输入框
     * @param value 输入的值
     * @param type 题型
     */
    const templateLevelInputChange = (value: string | number | null, level: number) => {
        let copyData = JSON.parse(JSON.stringify(templateDifficultyTableData)) || []
        console.log('copyData', copyData)
        copyData.map((ele: TableItem) => {
            if (ele.level === level) {
                ele.needNumber = Number(value)
            }
            return ele
        })
        setFormData((v: any) => ({ ...v, templateDifficultyTableData: copyData }))
    }
    /**
     * 难易度分布输入框
     * @param value 输入的值
     * @param level 难度
     */
    const levelInputChange = (value: string | number | null, level: number) => {
        let copyData = JSON.parse(JSON.stringify(difficultyTableData)) || []
        copyData.map((ele: any) => {
            if (Number(ele.level) === Number(level)) {
                ele.needNumber = Number(value)
            }
            return ele
        })
        setFormData((v: any) => ({ ...v, difficultyTableData: copyData }))
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
    const openModal = (type: 'excel' | 'word') => {
        if (customContent?.commonJob) {
            setImportVisible(true)
            setImportFileType(type)
        } else {
            message.warning('请先选择职业/工种/等级')
        }
    }
    /**
     * 关闭套题导入弹窗
     * @param values 关闭弹窗返回数据
     */
    const closeModal = () => {
        setImportVisible(false)
    }
    const handleSuccess = (isSuccess: boolean, values: ImportFileValues, query: any) => {
        if (isSuccess) {
            const { code } = values || {}
            setFormData((v: any) => ({
                ...v,
                fromFileTitle: query?.name,
                fromFileCode: code,
            }))
            form.setFieldsValue({ importFile: true })
            getQuestionList(code)
        }
    }

    return {
        authenticateOptions,
        importVisible,
        importFileType,
        onRemove,
        inputChange,
        templateInputChange,
        levelInputChange,
        templateLevelInputChange,
        extractChange,
        openModal,
        closeModal,
        handleSuccess,
    }
}
