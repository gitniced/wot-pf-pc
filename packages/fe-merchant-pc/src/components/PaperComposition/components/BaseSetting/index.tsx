import ProfessionCascade from '@/components/ProfessionCascade'
import { Form, Input, Radio, Select } from 'antd'
import { useEffect, useState } from 'react'
import type { BaseSettingProps, TableItem, TemplateList } from './interface'
import http from '@/servers/http'
import API from './api'
import { getCookie, getLocalStorage } from '@/storage'
import type { DetailType } from '../FormSetting/interface'
import { history } from 'umi'
import styles from './index.module.less'
import { CREATE_VOLUME_LIBRARY_TYPE, TEMPLATE_TYPE } from '@/components/PaperExamine/const'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'

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
    const commonParams = useCommonParams()

    const { type, formData, setFormData } = props || {}
    const { code } = history.location.query || {}
    const { title, customContent, templateType, templateCode, templateTitle, precautions } =
        formData || {}
    /** 组卷模板下拉列表 */
    const [templateTypeOptions, setTemplateTypeOptions] = useState<TableItem[]>([])

    const { code: userCode } = userStore?.userData || {}

    const organizationCode = getCookie('SELECT_ORG_CODE')

    /** 获取模板下拉列表 */
    const getTemplateList = async () => {
        const params: any = {
            customContent,
            userCode,
            pageNo: 1,
            pageSize: 30,
            organizationCode,
        }
        if (templateType === TEMPLATE_TYPE.SID) {
            params.templateSid = getLocalStorage('SID')
        }
        const res = (await http(API.getTemplateList, 'post', {
            ...params,
            ...commonParams,
        })) as unknown as TemplateList
        if (res) {
            setTemplateTypeOptions(res.data || [])
        }
    }
    useEffect(() => {
        // 组卷模板为不使用时不需要请求该接口
        if (customContent && templateType && templateType !== TEMPLATE_TYPE.NONE) {
            getTemplateList()
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
            merchantCode: organizationCode,
        }
        const res =
            ((await http(API.getQuestionStructure, 'post', {
                ...params,
                ...commonParams,
            })) as any) || []
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
        setFormData(() => ({ ...data, questionConfigList: tableArr }))
    }
    /** 获取模板详情 */
    const getDetail = async () => {
        const res =
            ((await http(
                `${API.getTemplateDetail}/${templateCode}`,
                'get',
                {},
            )) as unknown as DetailType) || {}
        const data = {
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
            data.precautions = precautions
        }
        getQuestionStructure(data)
    }
    // 使用模板 --> 获取模板详情 --> 获取模板题型题数
    useEffect(() => {
        if (templateCode) {
            getDetail()
        }
    }, [templateCode])

    return (
        <div className={styles.base}>
            <Form.Item
                label={type === CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION ? '模板名称' : '试卷名称'}
                name="title"
                required
            >
                <Input showCount maxLength={60} placeholder="请输入" />
            </Form.Item>
            <Form.Item label="职业/工种/等级" name="commonJob" className={styles.pdt_8} required>
                <ProfessionCascade type="JOB" />
            </Form.Item>
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
