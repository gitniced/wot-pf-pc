import { useEffect, useState } from 'react'
import { Cascader, Form, Select, Tabs, Tooltip, message } from 'antd'
import type {
    AnalysisQuestionWordUsingPOSTRequest,
    CommonJobCustomDto,
    AuthenticateCustomDto,
} from './interface'
import { findSiteData } from '@/utils/valueGet'
import { history, useParams } from 'umi'

import { InfoCircleOutlined } from '@ant-design/icons'
import PreviewModal from './components/PreviewModal'
import { observer } from 'mobx-react'
import WordImportStore from './store'
import ImportText from './components/ImportText'
import WordStandard from './components/WordStandard'
import BatchImportResultModal from './components/BatchImportResultModal/BatchImportResultModal'

import styles from './index.module.less'
import { getCookie, getLocalStorage } from '@/storage'
import ProfessionCascade from '@/components/ProfessionCascade'
import { BELONG_TYPE_ENUM, SKILL_TYPE_ENUM, SUBJECT_TYPE_ENUM } from '@/constants'
import useSiteStore from '@/hooks/useSiteStore'
import useUserStore from '@/hooks/useUserStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import useCommonParams from '@/hooks/useCommonParams'

const { Option } = Select
const WordImport = () => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()
    const [form] = Form.useForm()

    const { type: routeType } = useParams() as { type: QuestionRouteType }

    const { siteData } = siteStore || {}
    const organizationCode = getCookie('SELECT_ORG_CODE')
    const [templateType, setTemplateType] = useState<string>('conventional')

    const commonParams = useCommonParams()
    const { subject, skill } = commonParams

    // 是否是理论知识真题
    const isRealAndTheory = subject === SUBJECT_TYPE_ENUM.REAL && skill === SKILL_TYPE_ENUM.THEORY

    useEffect(() => {
        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' })
        document.title = `Word智能录入${
            subject === SUBJECT_TYPE_ENUM.REAL ? '理论' : '模拟'
        }试题-${siteName}`
        WordImportStore.getKnowledgeList({
            ...commonParams,
            belongType: BELONG_TYPE_ENUM.MERCHANT,
            organizationCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
            sid: getLocalStorage('SID'),
        }).then(() => {
            const initKnowledge = WordImportStore.knowledgeList[0]
            if (initKnowledge) {
                form.setFieldValue('knowledgePointCode', initKnowledge.value)
            }
        })

        return () => {
            WordImportStore.elementTable = []
        }
    }, [])
    /** 完成并继续 */
    const onOk = async () => {
        const values = form.getFieldsValue()
        if (!values.commonJob) return message.error('请选中职业/工种/等级')
        // 需要要素细目表的情况下判断
        if (isRealAndTheory && templateType === 'default' && !values.authenticate)
            return message.error('请选中要素细目表')
        if (!values.knowledgePointCode) return message.error('请选择分类')
        // 校验导入text
        if (WordImportStore.textValue.trim().length === 0) return message.error('试题文本不能为空')

        const [work, type, level] = values.commonJob
        const commonJob = {
            jobName: work?.label,
            jobNameCode: work?.value,
            jobType: type?.label,
            jobTypeCode: type?.value,
            jobLevel: level?.label,
            jobLevelCode: level?.value,
        } as CommonJobCustomDto

        const selectElementTable = WordImportStore.elementTable.find(
            item => item.code === values.authenticate,
        )

        const authenticatePoint = {
            code: selectElementTable?.code,
            name: selectElementTable?.name,
        } as AuthenticateCustomDto

        const params: AnalysisQuestionWordUsingPOSTRequest = {
            ...commonParams,
            commonJob,
            templateType,
            authenticatePoint,
            merchantCode: organizationCode,
            analysisText: WordImportStore.textValue,
            knowledgePoint: WordImportStore.selectKnowledge,
        }

        // 打开弹窗
        BatchImportResultModal({
            params,
            loading: true,
            organizationCode,
            goList: () => {
                // 跳转列表页面，刷新新数据
                history.goBack()
            },
        })
    }
    /** 鉴定点预览 */
    const onClickPreview = async () => {
        const values = form.getFieldsValue()
        if (!values.authenticate) return message.error('请选中要素细目表')
        const data = WordImportStore.elementTable.find(item => {
            return item.code === values.authenticate
        })
        PreviewModal({
            selectElementTable: data,
        })
    }
    return (
        <div className={styles.word_import}>
            {isRealAndTheory && (
                <Tabs
                    activeKey={templateType}
                    items={[
                        { label: '常规格式', key: 'conventional' },
                        { label: '国标格式', key: 'default' },
                    ]}
                    onChange={value => setTemplateType(value)}
                />
            )}
            <Form form={form} name="control-hooks" className={styles.work_import_from}>
                <div className={styles.form_item} id="wordImportCommonJob">
                    <Form.Item required label="职业/工种/等级" name="commonJob">
                        <ProfessionCascade
                            type="JOB"
                            changeOnSelect={false}
                            onChange={async value => {
                                // 清空要素细目表的值
                                form.setFieldsValue({ authenticate: undefined })
                                WordImportStore.updateJobValue(value)
                                const data = await WordImportStore.getJobData({
                                    workCode: value?.[0].value,
                                })
                                WordImportStore.lastSelectJob = data
                                await WordImportStore.getElementTableData(value?.at(-1)?.value)
                            }}
                            style={{ width: 220 }}
                        />
                    </Form.Item>
                </div>
                {templateType === 'default' && (
                    <Form.Item required label="要素细目表" name="authenticate">
                        <Select
                            placeholder="请选择"
                            style={{ width: '180px' }}
                            getPopupContainer={target => target.parentNode}
                        >
                            {WordImportStore.elementTable.map(item => {
                                return (
                                    <Option key={item.code} value={item.code}>
                                        {item.name}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                )}

                <Form.Item required name="knowledgePointCode" label="分类">
                    <Cascader
                        changeOnSelect
                        allowClear={false}
                        style={{ width: '180px' }}
                        placeholder="请选择"
                        options={WordImportStore.knowledgeList}
                        onChange={(value: (string | number)[], selectedOptions: any) => {
                            const lastSelectedOption = selectedOptions[selectedOptions.length - 1]

                            WordImportStore.setSelectKnowledge({
                                knowledgePointCode: lastSelectedOption?.value,
                                knowledgePointLevelCode: lastSelectedOption?.levelCode,
                                knowledgePointName: lastSelectedOption?.label,
                            })
                        }}
                        getPopupContainer={target => target.parentNode}
                    />
                </Form.Item>
                {/* 只有国际格式，因为需要选择要素细目表 */}
                {templateType === 'default' && (
                    <div className={styles.form_item_preview}>
                        <span onClick={onClickPreview}>预览</span>
                        <Tooltip placement="top" title="点击预览可便捷对照鉴定点代码">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </div>
                )}
            </Form>
            <div className={styles.word_import_content}>
                <WordStandard templateType={templateType} />
                <ImportText onOk={onOk} />
            </div>
        </div>
    )
}

export default observer(WordImport)
