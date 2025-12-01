import { Button, Form, InputNumber, Radio, Select, Space, Table, Typography, Upload } from 'antd'
import { useEffect, useState } from 'react'
import Hooks from './hooks'
import { ComposeType, TypeOptions, decimalCheck } from './const'
import styles from './index.module.less'
import getColumns from './getColumns'
import type { ComposeSettingProps } from './interface'
import Summary from '../Summary'
import { UploadOutlined } from '@ant-design/icons'
import {
    COMPOSITION_WAY,
    CREATE_VOLUME_LIBRARY_TYPE,
    KP_PAPER_QUESTION,
    QUESTION_STRUCTURE_TYPE,
    SCORE_SETTING_TYPE,
    TEMPLATE_TYPE,
} from '@/pages/paper-library/[type]/const'
import GlobalUpload from '@/components/GlobalUpload'
import { downloadUrlFile } from '@/utils/tool'
import BatchImport from '@/components/BatchImport'
import { IMPORT_TYPE_ENUM } from '@/components/BatchImport/constant'
import useMasterHistory from '@/hooks/userMasterHistory'
import useCommonParams from '@/hooks/useCommonParams'
import {
    IMPORT_TEMPLATE,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '@/pages/question/[type]/constants'
import { useWatch } from 'antd/es/form/Form'
import WritingFormatModal from '../WritingFormatModal'
import { getCookie } from '@/storage'
import getLevelColumns from './getLevelColumns'
import LevelSummary from '../LevelSummary'
/**
 * 组卷设置
 * @param props {
 *  type: 新建类型 template-组卷、examine_create-试卷
 *  form: form表单实例
 *  formData: 表单数据
 *  setFormData: 修改表单数据方法
 * }
 * @returns
 */
const ComposeSetting = (props: ComposeSettingProps) => {
    const masterHistory = useMasterHistory()
    const { code } = masterHistory.location.query || {}
    const { type, formData, siteData = {}, form, setFormData } = props || {}
    const [config, setConfig] = useState<Record<string, string | boolean>>({})
    const hooks = Hooks(props)

    const commonParams = useCommonParams()
    const { skill, subject } = commonParams

    const [openModal, setOpenModal] = useState<boolean>(false)

    const {
        composition,
        fromFileCode,
        fromFileTitle,
        scoreType,
        questionStructure,
        questionConfigList = [],
        questionTableData = [],
        templateTableList = [],
        difficultyLimit,
        difficultyTableData = [],
        templateDifficultyTableData = [],
        questionTotal,
    } = formData || {}

    const commonJob = useWatch('commonJob', form)

    /** 是否是组卷模板 */
    const isTemplate = type === CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION

    const { configList } = siteData
    const {
        kp_paper_org_paper_type_auth,
        kp_paper_org_paper_type_questiontype,
        kp_paper_org_paper_type_import,
        kp_paper_file,
        kp_paper_file_expert_file,
        kp_paper_file_expert_file_required,
        kp_paper_file_expert_file_template,
        kp_paper_file_commitment_file,
        kp_paper_file_commitment_file_required,
        kp_paper_file_commitment_file_template,
        kp_paper_question,
        kp_paper_question_source_country,
        kp_paper_question_source_org,
        kp_paper_question_required,
    } = config
    /** 组卷方式 默认选项 */
    const keyToRadioVal: any = {
        kp_paper_org_paper_type_auth: COMPOSITION_WAY.AUTHENTICATE,
        kp_paper_org_paper_type_questiontype: COMPOSITION_WAY.QUESTION_TYPE,
        kp_paper_org_paper_type_import: COMPOSITION_WAY.FROM_FILE,
    }
    useEffect(() => {
        /** 模拟卷库需要根据沃土云配置展示，组卷模板不需要 */
        if (isTemplate) return
        const configKeys = [
            'kp_paper_org_paper_type_auth',
            'kp_paper_org_paper_type_questiontype',
            'kp_paper_org_paper_type_import',

            'kp_paper_file', // 套题附件
            'kp_paper_file_expert_file', // 专家审核材料
            'kp_paper_file_expert_file_required',
            'kp_paper_file_expert_file_template',
            'kp_paper_file_commitment_file', // 诚信考务承诺书
            'kp_paper_file_commitment_file_required',
            'kp_paper_file_commitment_file_template',
            'kp_paper_question', // 试卷命题类型
            'kp_paper_question_source',
            'kp_paper_question_source_country',
            'kp_paper_question_source_org',
            'kp_paper_question_required',
        ]
        const sort = [
            'kp_paper_org_paper_type_auth',
            'kp_paper_org_paper_type_questiontype',
            'kp_paper_org_paper_type_import',
        ]
        let temp: Record<string, string | boolean> = {}
        configList.forEach((item: { key: string; value: string }) => {
            const { key, value } = item
            if (configKeys.includes(key)) {
                // 非 1，0 的字段
                const notSwitchList = [
                    'kp_paper_file_commitment_file_template',
                    'kp_paper_file_expert_file_template',
                ]
                temp[key] = notSwitchList.includes(key) ? value : !!Number(value)
            }
        })
        setConfig(temp)
        /** 设置默认值 */
        if (code) return

        const isTheory = skill === SKILL_TYPE_ENUM.THEORY

        const hasKeyConfig = (keyStr: string) => {
            return temp[keyStr]
        }

        let newSort = sort.filter(i => hasKeyConfig(i)) || []

        if (!isTheory) {
            newSort = newSort.filter(i => i !== 'kp_paper_org_paper_type_auth')
        }

        if (newSort.length > 0) {
            const tempKey = newSort[0]
            form.setFieldsValue({
                composition: keyToRadioVal[tempKey],
            })
            setFormData((val: any) => {
                return { ...val, composition: keyToRadioVal[tempKey] }
            })
            return
        }
        // for (let key of sort) {
        //     if (temp[key]) {
        //         form.setFieldsValue({
        //             composition: keyToRadioVal[key],
        //         })
        //         setFormData((val: any) => {
        //             return { ...val, composition: keyToRadioVal[key] }
        //         })
        //         return
        //     }
        // }
    }, [])

    const getLevelSummaryQuestionTableData = () => {
        if (type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION) {
            if (questionStructure === QUESTION_STRUCTURE_TYPE.QUESTION_TYPE) {
                return questionTableData
            } else {
                return questionConfigList
            }
        } else {
            return templateTableList
        }
    }

    // 题型结构：组卷模板时使用templateTableList，新建试卷时使用questionTableData
    return (
        <div className={styles.composition}>
            {isTemplate && getCookie('ALIAS') === 'esh' && (
                <Form.Item label="类型" name="subject" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value={TEMPLATE_TYPE.EVALUATE}>评价</Radio>
                        <Radio value={TEMPLATE_TYPE.COMPETITION}>竞赛</Radio>
                    </Radio.Group>
                </Form.Item>
            )}
            <Form.Item label="组卷方式" required>
                <Form.Item name="composition" noStyle>
                    {/* 组卷模板不限制 */}
                    {isTemplate ? (
                        <Radio.Group>
                            <Radio value={COMPOSITION_WAY.AUTHENTICATE}>按考评点组卷</Radio>
                            <Radio value={COMPOSITION_WAY.QUESTION_TYPE}>按题型组卷</Radio>
                        </Radio.Group>
                    ) : subject === SUBJECT_TYPE_ENUM.TRAIN ? ( // 职培新建试卷限制2种方式
                        <Radio.Group className={styles.radio_group}>
                            <Radio value={COMPOSITION_WAY.QUESTION_TYPE}>按题型组卷</Radio>
                            <Radio value={COMPOSITION_WAY.FROM_FILE}>套题组卷</Radio>
                        </Radio.Group>
                    ) : (
                        // 考评新建试卷显示根据站点配置
                        <Radio.Group className={styles.radio_group}>
                            {/* 技能知识卷库不关联坚定点，只有理论知识才关联 */}
                            {skill === SKILL_TYPE_ENUM.THEORY && kp_paper_org_paper_type_auth && (
                                <Radio value={COMPOSITION_WAY.AUTHENTICATE}>按考评点组卷</Radio>
                            )}
                            {kp_paper_org_paper_type_questiontype && (
                                <Radio value={COMPOSITION_WAY.QUESTION_TYPE}>按题型组卷</Radio>
                            )}
                            {/* 新建类型是组卷模板时展示此项 */}
                            {kp_paper_org_paper_type_import && (
                                <Radio value={COMPOSITION_WAY.FROM_FILE}>套题组卷</Radio>
                            )}
                        </Radio.Group>
                    )}
                </Form.Item>
                <p className={`${styles.extra} ${styles.pdt_8}`}>
                    {ComposeType[composition]?.extra}
                </p>
            </Form.Item>
            {/* 组卷方式为考评点组卷展示此项 */}
            {composition === COMPOSITION_WAY.AUTHENTICATE && (
                <Form.Item
                    required
                    label="要素细目表"
                    name="authenticateCode"
                    className={styles.pdt_8}
                >
                    <Select
                        placeholder="请选择"
                        fieldNames={{ label: 'name', value: 'code' }}
                        options={hooks.authenticateOptions}
                    />
                </Form.Item>
            )}
            {/* 组卷方式为套题组卷展示此项 */}
            {composition === COMPOSITION_WAY.FROM_FILE && (
                <Form.Item label="导入文件" required>
                    <Form.Item
                        name="importFile"
                        rules={[
                            {
                                validator() {
                                    if (fromFileCode) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(new Error(`请上传套题`))
                                    }
                                },
                            },
                        ]}
                        noStyle
                    >
                        {fromFileCode ? (
                            <Upload
                                listType="text"
                                fileList={
                                    fromFileCode ? [{ uid: fromFileCode, name: fromFileTitle }] : []
                                }
                                onRemove={hooks.onRemove}
                                disabled={Boolean(code)}
                            />
                        ) : (
                            <Space size={8}>
                                <Button
                                    icon={<UploadOutlined />}
                                    onClick={() => hooks.openModal('excel')}
                                >
                                    Excel
                                </Button>
                                <Button
                                    icon={<UploadOutlined />}
                                    onClick={() => hooks.openModal('word')}
                                >
                                    Word
                                </Button>
                            </Space>
                        )}
                    </Form.Item>

                    <>
                        <p className={`${styles.extra} ${styles.pdt_8}`}>
                            Excel格式支持单选题、多选题、判断题、填空题、简答题、计算题、论述题、案例分析题、组合题9种题型
                        </p>
                        <p className={`${styles.extra} ${styles.pdt_4}`}>
                            Word格式支持单选题、多选题、判断题、简答题、案例分析题5种题型
                            <Typography.Link onClick={() => setOpenModal(true)}>
                                查看Word编写格式
                            </Typography.Link>
                        </p>
                    </>
                </Form.Item>
            )}
            {/* 组卷方式为套题组卷时需要有套题组卷code才展示 */}
            {composition === COMPOSITION_WAY.FROM_FILE && (
                <>
                    {kp_paper_file && kp_paper_file_expert_file && (
                        <Form.Item
                            className={styles.form_upload_wrapper}
                            name="expertReviewMaterials"
                            label="专家审核材料"
                            extra="支持 50M 以内的doc. ppt. xls. pdf. txt.等格式"
                            rules={[
                                {
                                    required: !!kp_paper_file_expert_file_required,
                                    message: '请上传专家审核材料',
                                },
                            ]}
                            normalize={(list = []) => {
                                if (typeof list === 'string') {
                                    return [
                                        {
                                            url: list,
                                            name: list.split('/').splice(-1)[0],
                                        },
                                    ]
                                }

                                return list.map((item: any) => ({
                                    ...item,
                                    url: item?.url || item?.response?.url,
                                }))
                            }}
                        >
                            <GlobalUpload
                                type={21}
                                size={50}
                                otherProps={{
                                    listType: 'picture',
                                    showUploadList: true,
                                }}
                                accept={['excel', 'pdf', 'word', 'ppt', 'txt']}
                                amount={1}
                                drag={false}
                            >
                                <Button icon={<UploadOutlined />}>上传</Button>
                                <Button
                                    type="link"
                                    onClick={e => {
                                        e.stopPropagation()
                                        const name = (kp_paper_file_expert_file_template as string)
                                            ?.split('/')
                                            ?.splice(-1)?.[0]
                                        downloadUrlFile(
                                            kp_paper_file_expert_file_template as string,
                                            name,
                                        )
                                    }}
                                >
                                    下载模板
                                </Button>
                            </GlobalUpload>
                        </Form.Item>
                    )}
                    {kp_paper_file && kp_paper_file_commitment_file && (
                        <Form.Item
                            className={styles.form_upload_wrapper}
                            name="examinationCommitmentLetter"
                            label="诚信考务承诺书"
                            extra="支持 50M 以内的doc. ppt. xls. pdf. txt.等格式"
                            rules={[
                                {
                                    required: !!kp_paper_file_commitment_file_required,
                                    message: '请上传诚信考务承诺书',
                                },
                            ]}
                            normalize={(list = []) => {
                                return list.map((item: any) => ({
                                    ...item,
                                    url: item?.url || item?.response?.url,
                                }))
                            }}
                        >
                            <GlobalUpload
                                type={21}
                                size={50}
                                otherProps={{
                                    listType: 'picture',
                                    showUploadList: true,
                                }}
                                accept={['excel', 'pdf', 'word', 'ppt', 'txt']}
                                amount={1}
                                drag={false}
                            >
                                <Button icon={<UploadOutlined />}>上传</Button>
                                <Button
                                    type="link"
                                    onClick={e => {
                                        e.stopPropagation()
                                        const name = (
                                            kp_paper_file_commitment_file_template as string
                                        )
                                            ?.split('/')
                                            ?.splice(-1)?.[0]
                                        downloadUrlFile(
                                            kp_paper_file_commitment_file_template as string,
                                            name,
                                        )
                                    }}
                                >
                                    下载模板
                                </Button>
                            </GlobalUpload>
                        </Form.Item>
                    )}
                    {kp_paper_question && (
                        <Form.Item
                            label="试卷命题类型"
                            name="questionSourceType"
                            rules={[
                                {
                                    required: !!kp_paper_question_required,
                                    message: '请选择试卷命题类型',
                                },
                            ]}
                            className={styles.pdt_8}
                            initialValue={KP_PAPER_QUESTION.COUNTRY}
                        >
                            <Radio.Group>
                                {kp_paper_question_source_country && (
                                    <Radio value={KP_PAPER_QUESTION.COUNTRY}>
                                        参考国家题库命题
                                    </Radio>
                                )}
                                {kp_paper_question_source_org && (
                                    <Radio value={KP_PAPER_QUESTION.ORG}>机构自主命题</Radio>
                                )}
                            </Radio.Group>
                        </Form.Item>
                    )}
                </>
            )}
            {/* 组卷方式为套题组卷时需要有套题组卷code才展示 */}
            {(composition !== COMPOSITION_WAY.FROM_FILE || fromFileCode) && (
                <>
                    <Form.Item label="分值设置" name="scoreType" required className={styles.pdt_8}>
                        <Radio.Group>
                            <Radio value={SCORE_SETTING_TYPE.QUESTION_TYPE}>按题型设置</Radio>
                            <Radio value={SCORE_SETTING_TYPE.SINGLE}>单题独立设置</Radio>
                            <Radio value={SCORE_SETTING_TYPE.UNIFICATION}>统一分值</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* 分值设置为统一分值时展示此项 */}
                    {scoreType === SCORE_SETTING_TYPE.UNIFICATION && (
                        <Form.Item label="单题统一分值" required className={styles.pdt_8}>
                            <Form.Item name="unificationScore" noStyle>
                                <InputNumber
                                    placeholder="请输入"
                                    min={0}
                                    // @ts-ignore
                                    formatter={decimalCheck}
                                    parser={decimalCheck}
                                />
                            </Form.Item>
                            <span className={styles.add_margin}>分</span>
                        </Form.Item>
                    )}
                    <Form.Item label="合格线" required className={styles.pdt_8}>
                        <Form.Item name="qualifiedProp" noStyle>
                            <InputNumber
                                placeholder="请输入"
                                min={0}
                                max={100}
                                // @ts-ignore
                                formatter={value => value && parseInt(value)}
                            />
                        </Form.Item>
                        <span className={styles.add_margin}>%</span>
                    </Form.Item>

                    <Form.Item label="题型结构" required className={styles.pdt_8}>
                        {/* 组卷方式为套题组卷时不展示此选项 */}
                        {composition !== COMPOSITION_WAY.FROM_FILE && (
                            <Form.Item name="questionStructure" noStyle>
                                <Radio.Group className={styles.radio_group}>
                                    <Radio value={QUESTION_STRUCTURE_TYPE.QUESTION_TYPE}>
                                        指定题型题数
                                    </Radio>
                                    <Radio
                                        value={QUESTION_STRUCTURE_TYPE.RULES}
                                        disabled={
                                            composition === COMPOSITION_WAY.AUTHENTICATE ||
                                            scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE
                                        }
                                    >
                                        按规则随机抽取
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                        {/* 套题组卷和(分值设置为非按题型设置)时不展示 */}
                        {(composition === COMPOSITION_WAY.AUTHENTICATE ||
                            (composition !== COMPOSITION_WAY.FROM_FILE &&
                                scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE)) && (
                            <p className={styles.extra}>
                                选择【
                                {composition === COMPOSITION_WAY.AUTHENTICATE
                                    ? '按考评点组卷'
                                    : '按题型设置分值'}
                                】时，不支持【按规则随机抽取】试题
                            </p>
                        )}
                        {/* 套题组卷和题型结构选择(指定题型题数)时展示 */}
                        {(composition === COMPOSITION_WAY.FROM_FILE ||
                            questionStructure === QUESTION_STRUCTURE_TYPE.QUESTION_TYPE) && (
                            <Table
                                rowKey="questionType"
                                columns={getColumns({
                                    type,
                                    composition,
                                    scoreType,
                                    inputChange: hooks.inputChange,
                                    templateInputChange: hooks.templateInputChange,
                                })}
                                dataSource={
                                    type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION
                                        ? questionTableData
                                        : templateTableList
                                }
                                className={styles.table}
                                bordered
                                pagination={false}
                                summary={
                                    questionTableData?.length > 0 || templateTableList?.length > 0
                                        ? (pageData: any) => (
                                              <Summary scoreType={scoreType} pageData={pageData} />
                                          )
                                        : undefined
                                }
                            />
                        )}
                    </Form.Item>
                    {/* 题型结构选择(按规则随机抽取)时展示 */}
                    {questionStructure === QUESTION_STRUCTURE_TYPE.RULES && (
                        <Form.Item label="规则设置" required className={styles.pdt_8}>
                            <Select
                                placeholder="请选择可抽题型"
                                value={questionConfigList.map(item => item.questionType)}
                                options={TypeOptions}
                                mode="multiple"
                                onChange={hooks.extractChange}
                            />
                            <div className={styles.mgt_24}>
                                <span>以上勾选题型至少抽取</span>
                                <Form.Item name="questionTypeLeast" noStyle>
                                    <InputNumber
                                        className={styles.add_margin}
                                        placeholder="请输入"
                                        min={0}
                                        // @ts-ignore
                                        formatter={value => value && parseInt(value)}
                                    />
                                </Form.Item>
                                <span>种，总题数</span>
                                <Form.Item name="questionTotal" noStyle>
                                    <InputNumber
                                        className={styles.add_margin}
                                        placeholder="请输入"
                                        min={0}
                                        // @ts-ignore
                                        formatter={value => value && parseInt(value)}
                                    />
                                </Form.Item>
                                <span>题</span>
                            </div>
                        </Form.Item>
                    )}

                    {/* 题型结构选择(组卷方式为按题型组卷时展示) */}
                    {composition === COMPOSITION_WAY.QUESTION_TYPE && (
                        <Form.Item label="难易程度分布" required className={styles.pdt_8}>
                            {/* 组卷方式为套题组卷时不展示此选项 */}
                            <Form.Item name="difficultyLimit" noStyle>
                                <Radio.Group className={styles.radio_group}>
                                    <Radio value={false}>不限制</Radio>
                                    <Radio value={true}>限制</Radio>
                                </Radio.Group>
                            </Form.Item>
                            {difficultyLimit ? (
                                <Table
                                    rowKey="level"
                                    columns={getLevelColumns({
                                        type,
                                        inputChange: hooks.levelInputChange,
                                        templateInputChange: hooks.templateLevelInputChange,
                                    })}
                                    dataSource={
                                        type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION
                                            ? difficultyTableData
                                            : templateDifficultyTableData
                                    }
                                    className={styles.table}
                                    bordered
                                    pagination={false}
                                    summary={
                                        difficultyTableData?.length > 0 ||
                                        templateDifficultyTableData?.length > 0
                                            ? (pageData: any) => (
                                                  <LevelSummary
                                                      type={type}
                                                      questionStructure={questionStructure}
                                                      ruleQuestionTotal={questionTotal}
                                                      questionTableData={getLevelSummaryQuestionTableData()}
                                                      pageData={pageData}
                                                  />
                                              )
                                            : undefined
                                    }
                                />
                            ) : null}
                        </Form.Item>
                    )}
                </>
            )}

            <BatchImport
                {...commonParams}
                title="批量导入"
                importApi="/question/front/excel/import"
                open={hooks.importVisible}
                onCancel={hooks.closeModal}
                onOk={hooks.handleSuccess}
                importFileType={hooks.importFileType}
                businessType={IMPORT_TYPE_ENUM.QUESTION_EXCEL}
                importTemplate={IMPORT_TEMPLATE.default}
                commonJob={commonJob}
                description={
                    <div>
                        <p>1.请按照模板文件内的相关说明，进行试题内容填写；</p>
                        <p>
                            2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示。
                        </p>
                        <p>3.若库中存在相同题目/题干的试题，则会直接新增一道试题。</p>
                    </div>
                }
                showContinue={false}
            />

            <WritingFormatModal open={openModal} onCancel={() => setOpenModal(false)} />
        </div>
    )
}

export default ComposeSetting
