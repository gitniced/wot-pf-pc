import ProfessionCascade from '@/components/ProfessionCascade'
import { Form, Input, Radio, Select } from 'antd'
import { useEffect, useState } from 'react'
import type { BaseSettingProps, TableItem, TemplateList } from './interface'
import http from '@/servers/http'
import API from './api'
import { getLocalStorage } from '@/storage'
import type { DetailType } from '../FormSetting/interface'
import { history } from 'umi'
import styles from './index.module.less'
import {
    CREATE_VOLUME_LIBRARY_TYPE,
    DIFFICULTY_LEVEL,
    TEMPLATE_TYPE,
} from '@/pages/paper-library/[type]/const'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'
import { SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'
import { cloneDeep } from 'lodash'

/**
 * 基本设置
 * @param props {
 *  type: 新建类型 template-组卷、examine_create-试卷
 *  formData: 表单数据
 *  setFormData: 修改表单数据方法
 * }
 * @returns
 */
const BaseSetting = (props: BaseSettingProps) => {
    const userStore = useUserStore()
    const commonParam = useCommonParams()
    const { subject } = commonParam

    const { type, formData, setFormData, form } = props || {}
    const { code } = history.location.query || {}
    const { title, customContent, templateType, templateCode, templateTitle, precautions } =
        formData || {}
    /** 组卷模板下拉列表 */
    const [templateTypeOptions, setTemplateTypeOptions] = useState<TableItem[]>([])

    const { code: userCode } = userStore?.userData || {}

    /** 获取模板下拉列表 */
    const getTemplateList = async () => {
        const params: any = {
            customContent,
            userCode,
            organizationCode: userStore?.selectedOrganization,
            pageNo: 1,
            pageSize: 30,
            ...commonParam,
        }
        if (templateType === TEMPLATE_TYPE.SID) {
            params.templateSid = getLocalStorage('SID')
            params.organizationCode = null
        }
        // 职培试卷的组卷模板定制
        if (subject === SUBJECT_TYPE_ENUM.TRAIN) {
            params.randomState = 1
        }
        const res = (await http(API.getTemplateList, 'post', params)) as unknown as TemplateList
        if (res) {
            setTemplateTypeOptions(res.data || [])
        }
    }
    useEffect(() => {
        // 组卷模板为不使用时不需要请求该接口
        if (customContent && templateType && templateType !== TEMPLATE_TYPE.NONE) {
            getTemplateList()
        }

        if (customContent) {
            const { jobName, jobNameCode, jobType, jobTypeCode, jobLevel, jobLevelCode } =
                customContent.commonJob
            if (jobNameCode) {
                form.setFieldValue(
                    'commonJob',
                    [
                        {
                            label: jobName,
                            value: jobNameCode,
                        },
                        {
                            label: jobType,
                            value: jobTypeCode,
                        },
                        {
                            label: jobLevel,
                            value: jobLevelCode,
                        },
                    ].filter(item => Boolean(item.value)),
                )
            }
        }
    }, [customContent, templateType])
    /**
     * 获取题型题数
     * @param data 模板数据
     */
    const getQuestionStructure = async (data: DetailType) => {
        const {
            authenticateCode,
            receiptStartTime,
            receiptEndTime,
            quoteNumStatus,
            questionCitedLimit,
            questionConfigList = [],
        } = data || {}
        const params = {
            authenticateCode,
            customContent,
            receiptStartTime: receiptStartTime ? receiptStartTime : undefined,
            receiptEndTime: receiptEndTime ? receiptEndTime : undefined,
            questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
            merchantCode: userStore?.selectedOrganization,
            ...commonParam,
        }
        const res = ((await http(API.getQuestionStructure, 'post', params)) as any) || []
        const tableArr = questionConfigList.map(item => {
            if (!item) return { count: 0 }
            const tableItem = res.find((ele: any) => ele?.questionType === item.questionType)
            if (tableItem) {
                return {
                    ...tableItem,
                    ...item,
                }
            } else return { ...item, count: 0 }
        })
        // setFormData(() => ({ ...data, questionConfigList: tableArr }))
        return tableArr
    }

    /** 获取难易度题数 */
    const getDifficultyCount = async (data: DetailType) => {
        const {
            // authenticateCode,
            receiptStartTime,
            receiptEndTime,
            quoteNumStatus,
            questionCitedLimit,
            difficultyConfigList = [],
        } = data || {}
        const params = {
            // authenticateCode,
            customContent,
            receiptStartTime: receiptStartTime ? receiptStartTime : undefined,
            receiptEndTime: receiptEndTime ? receiptEndTime : undefined,
            questionCitedLimit: quoteNumStatus ? questionCitedLimit : undefined,
            merchantCode: userStore?.selectedOrganization,
            ...commonParam,
        }
        const oldDifficultyTableData = cloneDeep(difficultyConfigList) || []
        const tempDifficultyTableData =
            ((await http(API.getDifficultyCount, 'post', params)) as unknown as TableItem[]) || []
        oldDifficultyTableData.map(oldItem => {
            tempDifficultyTableData.map(item => {
                if (!oldItem.count) {
                    if (oldItem.level === item.level) {
                        oldItem.count = item.count!
                    } else {
                        oldItem.count = 0
                    }
                }
            })
            oldItem.levelName = isNaN(oldItem.level as number)
                ? ''
                : DIFFICULTY_LEVEL[Number(oldItem.level)] || ''
        })

        // setFormData((v: any) => ({ ...v, difficultyTableData: oldDifficultyTableData }))
        return oldDifficultyTableData
    }

    /** 获取模板详情 */
    const getDetail = async () => {
        http(`${API.getTemplateDetail}/${templateCode}`, 'GET', { ...commonParam }).then(
            async (res: any) => {
                const params = {
                    ...res,
                    title,
                    customContent,
                    templateType,
                    templateCode,
                    templateTitle,
                    questionTableData: res.questionConfigList,
                }
                // 试卷编辑时，应使用试卷详情里的注意事项
                if (code) {
                    params.precautions = precautions
                }

                const questionConfigList = await getQuestionStructure(params)
                const difficultyTableData = await getDifficultyCount(params)
                setFormData(() => {
                    return {
                        ...params,
                        questionConfigList,
                        difficultyTableData,
                    }
                })
            },
        )
    }
    // 使用模板 --> 获取模板详情 --> 获取模板题型题数
    useEffect(() => {
        if (templateCode) {
            // 如果是试卷编辑时，templateCode不为空
            getDetail()
        }
    }, [templateCode])

    return (
        <div className={styles.base}>
            {
                type === CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION ? <>
                    <Form.Item label="职业/工种/等级" name="commonJob" className={styles.pdt_8} required>
                        <ProfessionCascade changeOnSelect={false} onChange={(value) => {
                            const newTitle = `${value.map((item: any) => item?.label || "").join('/')}组卷模版`
                            form.setFieldValue('title', newTitle)
                            setFormData({ ...formData, title: newTitle })
                        }} />
                    </Form.Item>
                    <Form.Item
                        label={type === CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION ? '模板名称' : '试卷名称'}
                        name="title"
                        required
                    >
                        <Input showCount maxLength={60} placeholder="请输入" />
                    </Form.Item>
                </> : <>
                    <Form.Item
                        label={type === CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION ? '模板名称' : '试卷名称'}
                        name="title"
                        required
                    >
                        <Input showCount maxLength={60} placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="职业/工种/等级" name="commonJob" className={styles.pdt_8} required>
                        <ProfessionCascade changeOnSelect={false} />
                    </Form.Item>
                </>
            }
            {type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION && (
                <Form.Item label="组卷模板" className={styles.pdt_8} required>
                    <Form.Item name="templateType" noStyle>
                        <Radio.Group>
                            <Radio value={TEMPLATE_TYPE.SELF}>自有模板</Radio>
                            <Radio value={TEMPLATE_TYPE.SID}>站点模板</Radio>
                            <Radio value={TEMPLATE_TYPE.NONE}>不使用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {templateType !== TEMPLATE_TYPE.NONE && (
                        <Form.Item name="templateCode" noStyle>
                            <Select
                                placeholder="请选择"
                                style={{ marginTop: '12px' }}
                                labelInValue={true}
                                fieldNames={{ label: 'title', value: 'code' }}
                                options={templateTypeOptions}
                            />
                        </Form.Item>
                    )}
                </Form.Item>
            )}
        </div>
    )
}

export default BaseSetting
