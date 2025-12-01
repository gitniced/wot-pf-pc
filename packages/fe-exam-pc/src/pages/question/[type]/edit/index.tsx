/* eslint-disable @typescript-eslint/no-shadow */
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, Select, message, Cascader, Spin } from 'antd'
// @ts-ignore
import { history, useParams } from 'umi'
import { isEmpty } from 'lodash'

import Breadcrumbs from '@/components/Breadcrumbs'
import TitleBlock from '@/components/TitleBlock'

import {
    BELONG_TYPE_ENUM,
    DISCRIMINATION_OPTIONS,
    QUESTION_LEVEL_ENUM,
    QUESTION_LEVEL_OPTIONS,
    QUESTION_TYPE_ENUM,
    QUESTION_TYPE_OPTIONS,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '../constants'
import type { EditQuestionItem, RepeatModalData } from './interface'
import type {
    CommonJob,
    CreateQuestionParams,
    CustomContent,
    KnowledgeOption,
    QuestionListItem,
    RouteQuery,
} from '../interface'
import QuestionStore from '../store'
import BasicQuestion from './BasicQuestion'

import {
    validateTitle,
    generaDefaultOptionList,
    validateChildList,
    validateCommonJob,
    validateParentQuestion,
    getTitleByType,
} from '../utils'
import ComposeQuestion from './ComposeQuestion'

import styles from './index.module.less'
import { SuperCascader } from '@wotu/kp-components'
import type { OptionProps } from 'antd/lib/select'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import RepeatQuestionModal from './RepeatQuestionModal'
import { getLocalStorage } from '@/storage'
import useUserStore from '@/hooks/useUserStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import useCommonParams from '@/hooks/useCommonParams'
import AuthenticateCascade from '@/components/AuthenticateCascade'
import usePageParams from '@/hooks/usePageParams'

const CreateQuestion = () => {
    const userStore = useUserStore()

    const statusRef = useRef({ loading: false })
    const [form] = Form.useForm()
    const { code, isNewVersion } = history.location.query as unknown as RouteQuery
    const urlParams = usePageParams(code ? ['code', 'isNewVersion'] : [])

    const { type: routeType } = useParams() as { type: QuestionRouteType }

    const store = useLocalObservable(() => QuestionStore)
    const [questionItem, setQuestionItem] = useState<EditQuestionItem>({
        level: QUESTION_LEVEL_ENUM.MEDIUM,
        type: QUESTION_TYPE_ENUM.SINGLE,
        optionList: generaDefaultOptionList(QUESTION_TYPE_ENUM.SINGLE),
    })

    const [repeatModalData, setRepeatModal] = useState<RepeatModalData>({
        open: false,
        questionList: [],
    })

    const [commonLevelCode, setCommonLevelCode] = useState(-1)
    const [isShow, setIsShow] = useState<boolean>(false)

    const commonParams = useCommonParams()
    const { subject, skill } = commonParams
    // 是否是理论知识真题 竞赛
    const isRealAndSkill =
        subject &&
        [SUBJECT_TYPE_ENUM.REAL, SUBJECT_TYPE_ENUM.COMPETITION].includes(subject) &&
        skill === SKILL_TYPE_ENUM.THEORY

    const pageTitle = getTitleByType(commonParams)

    let inputEvent: Timeout[] = []

    const commonQuery = {
        ...commonParams,
        organizationCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
        sid: getLocalStorage('SID'),
    }

    // 获取职业/工种/等级初始值
    const commonJobInitialValue = (newDetail: QuestionListItem) => {
        const { customContent } = newDetail
        const { commonJob } = customContent ?? {}
        const { jobNameCode, jobTypeCode, jobLevelCode } = commonJob ?? {}

        return [jobNameCode, jobTypeCode, jobLevelCode].filter(item => Boolean(item)) as number[]
    }

    // 考评点回显
    const authenticatePointInitialValue = (customContent?: CustomContent) => {
        const { authenticatePoint } = customContent ?? {}

        const {
            code,
            name,
            firstRangeCode,
            firstRangeName,
            secondRangeCode,
            secondRangeName,
            thirdRangeCode,
            thirdRangeName,
            pointCode,
            pointName,
        } = authenticatePoint ?? {}

        return [
            { label: name, value: code },
            { label: firstRangeName, value: firstRangeCode },
            { label: secondRangeName, value: secondRangeCode },
            { label: thirdRangeName, value: thirdRangeCode },
            { label: pointName, value: pointCode },
        ].filter(item => Boolean(item.value))
    }
    const knowledgePointInitialValue = (
        initialKnowldege: KnowledgeOption,
        customContent?: CustomContent,
    ) => {
        const { knowledgePoint } = customContent ?? {}

        if (!knowledgePoint) {
            return {
                code: initialKnowldege?.value,
                levelCode: initialKnowldege?.levelCode,
                codeList: [initialKnowldege?.value],
            }
        }
        return knowledgePoint
    }

    useEffect(() => {
        document.title = code ? '编辑' : '录入'

        store
            .getKnowledgeList({
                ...commonParams,
                belongType: BELONG_TYPE_ENUM.ORGANIZE,
                organizationCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
                sid: getLocalStorage('SID'),
            })
            .then(() => {
                const initialKnowldege = store.knowledgeList[0]

                // 获取题目详情
                if (code) {
                    // @ts-ignore
                    store.getQuestionDetail(code).then((newDetail: QuestionListItem) => {
                        const {
                            level,
                            type,
                            optionList,
                            analysis,
                            title,
                            childList,
                            customContent,
                        } = newDetail

                        // 职业工种等级回显数据
                        const commonJob = commonJobInitialValue(newDetail)
                        // 考评点回显
                        const authenticatePoint = authenticatePointInitialValue(customContent)
                        // 区分度回显
                        const discrimination = customContent?.discrimination
                        // 分类回显
                        const knowledgePoint = knowledgePointInitialValue(
                            initialKnowldege,
                            customContent,
                        )

                        setQuestionItem({
                            commonJob,
                            level: level!,
                            type: type!,
                            title,
                            analysis,
                            optionList,
                            childList,
                            customContent: { ...customContent, knowledgePoint },
                        })

                        // 获取额外的数据（例：之前创建的数据在第三页，初始化只获取第一页，导致渲染不对，手动获取第三页的数据，拼在options的最上面）

                        const [workCode, typeCode, levelCode] = commonJob
                        workCode && store.getExtraCommonJobList([workCode])

                        if (isRealAndSkill) {
                            levelCode && setCommonLevelCode(levelCode)
                            authenticatePoint?.length && setIsShow(true)
                        }

                        form.setFieldsValue({
                            level,
                            type,
                            commonJob,
                            discrimination,
                            authenticatePoint,
                            knowledgePoint: knowledgePoint
                                ? knowledgePoint.codeList
                                : [initialKnowldege?.value],
                        })
                    })
                }

                setQuestionItem(prev => ({
                    ...prev,
                    customContent: {
                        knowledgePoint: {
                            code: initialKnowldege?.value,
                            levelCode: initialKnowldege?.levelCode,
                            codeList: [initialKnowldege?.value],
                        },
                    },
                }))

                form.setFieldsValue({
                    knowledgePoint: [initialKnowldege?.value],
                })
            })

        return () => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
        }
    }, [code])

    // 搜索职业工种等级
    const handleSearchCommonJob = async ({ input, page }: { input: string; page: number }) => {
        return new Promise(resolve => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
            const t = setTimeout(() => {
                inputEvent.map((i: Timeout) => {
                    clearTimeout(i)
                    inputEvent = []
                })
                store.getCommonJobList({ name: input, pageNo: page }).then(res => {
                    resolve(res)
                })
            }, 500)

            inputEvent.push(t)
        })
    }

    // 修改题目
    const onChangeQuestion = (field: string, value: any) => {
        const { level, commonJob, customContent } = questionItem
        // 修改题目之后清空其他的选项
        if (field === 'type') {
            // 基础搜索条件不重置
            setQuestionItem(() => ({
                level,
                type: value as number,
                commonJob,
                customContent,
                optionList: generaDefaultOptionList(value as number),
                childList: [], // 组合题也置为空
            }))
        } else {
            setQuestionItem(prev => ({ ...prev, [field]: value }))
        }
    }

    // 校验表单
    const validateQuestionItem = () => {
        const { commonJob, type, title, childList = [] } = questionItem

        // 职业/工种/等级校验
        if (!validateCommonJob(commonJob)) {
            return false
        }

        // 校验组合题
        if ([QUESTION_TYPE_ENUM.COMPOSE, QUESTION_TYPE_ENUM.ANALYSIS].includes(type)) {
            // 校验主题题干
            if (!validateTitle(type, title)) {
                return false
            }

            if (isEmpty(childList)) {
                message.error('至少添加一条组合题')
                return false
            }
            if (!validateChildList(type, childList)) {
                return false
            }
            return true
        }
        return validateParentQuestion(questionItem)
    }

    // 取消
    const handleCancel = () => {
        form.resetFields()
        history.push(`/question/${routeType}/list?${urlParams}`)
    }

    const generateChildList = () => {
        const { childList = [] } = questionItem

        return childList.map(item => ({
            ...item,
            optionList: item.optionList?.map((option, index) => ({
                ...option,
                sort: index,
            })),
        }))
    }

    const handleSave = (isNext = false) => {
        const { optionList = [], title, type, level, analysis, customContent } = questionItem

        const values: CreateQuestionParams = {
            ...commonQuery,
            title,
            type,
            level,
            analysis,
            customContent: customContent!,
            // @ts-ignore
            optionList: optionList.map((item, index) => ({
                ...item,
                sort: index,
            })),
            childList: generateChildList(),
        }

        if (code) {
            store[isNewVersion ? 'createVersion' : 'editQuestion']({ ...values, code }).then(() => {
                message.success(isNewVersion ? '题目创建成功' : '题目编辑成功')
                history.push(`/question/${routeType}/list?${urlParams}`)
            })
        } else {
            store.createQuestion(values).then(() => {
                message.success('题目创建成功')
                // 点击完成回到题库列表，点击下一题保存之后停留在当前页面
                if (isNext) {
                    return onChangeQuestion('type', questionItem.type)
                }
                history.push(`/question/${routeType}/list?${urlParams}`)
            })
        }
    }

    // 是否有重复试题
    const hasRepeatedQuestionList = () => {
        return new Promise(resolve => {
            store
                .getRepeatedQuestionListByTitle({
                    ...commonQuery,
                    questionType: questionItem.type,
                    customContent: questionItem.customContent,
                    title: questionItem.title,
                    code,
                })
                .then(repeatedList => {
                    resolve(repeatedList)
                })
        })
    }

    // 校验是否有重复试题
    const handleValidateRepeatQuestion = (isNext = false) => {
        if (statusRef?.current?.loading) {
            return
        }
        if (validateQuestionItem()) {
            statusRef.current.loading = true
            hasRepeatedQuestionList()
                .then((repeatedList: any) => {
                    if (repeatedList.length) {
                        // 显示弹窗
                        setRepeatModal({
                            ...repeatModalData,
                            open: true,
                            questionList: [questionItem, ...repeatedList],
                            callback: () => {
                                setRepeatModal({ ...repeatModalData, open: false })
                                handleSave(isNext)
                            },
                        })
                        return
                    }
                    // 直接保存/下一题
                    handleSave(isNext)
                })
                .catch((errMsg: string) => {
                    message.error(errMsg)
                })
                .finally(() => {
                    statusRef.current.loading = false
                })
        }
    }

    // 录下一题
    const handleImportNext = () => {
        handleValidateRepeatQuestion(true)
    }

    const renderQuestionItem = () => {
        const { type } = questionItem
        if ([QUESTION_TYPE_ENUM.COMPOSE, QUESTION_TYPE_ENUM.ANALYSIS].includes(type)) {
            return <ComposeQuestion questionItem={questionItem} onChange={onChangeQuestion} />
        }

        return <BasicQuestion questionItem={questionItem} onChange={onChangeQuestion} />
    }

    return (
        <div className={styles.page_edit_question}>
            <Breadcrumbs
                crumbData={[
                    { name: pageTitle, link: `/question/${routeType}/list?${urlParams}` },
                    { name: `${code ? '编辑' : '录入'}` },
                ]}
            />

            <Spin spinning={store.loading}>
                <div className={styles.container}>
                    <TitleBlock title="手动录入" />

                    <Form form={form} style={isNewVersion ? { cursor: 'not-allowed' } : {}}>
                        {/* 搜索条件字段 */}
                        <div className={styles.component_search_form} style={isNewVersion ? { pointerEvents: 'none', cursor: 'not-allowed' } : {}}>
                            {/* 职业工种等级 */}
                            <Form.Item
                                label="职业/工种/等级"
                                name="commonJob"
                                rules={[
                                    {
                                        required: true,
                                        message: '职业/工种/等级',
                                    },
                                ]}
                            >
                                {/* @ts-ignore */}
                                <SuperCascader
                                    changeOnSelect={false}
                                    placeholder="请选择"
                                    colSetting={[
                                        {
                                            // @ts-ignore
                                            onEventChange: handleSearchCommonJob,
                                        },
                                    ]}
                                    extraOptions={store.commonJobList}
                                    // @ts-ignore
                                    onChange={(
                                        commonJob: number[],
                                        selectedOptions: OptionProps[],
                                    ) => {
                                        const [jobNameObj, jobTypeObj, jobLevelObj] =
                                            selectedOptions

                                        // 判断是否有工种
                                        const { hasWorkType } = jobNameObj

                                        const { customContent } = questionItem
                                        const tempCommonJob: CommonJob = {
                                            jobName: jobNameObj?.label,
                                            jobNameCode: jobNameObj?.value,
                                        }

                                        if (hasWorkType) {
                                            tempCommonJob.jobType = jobTypeObj?.label
                                            tempCommonJob.jobTypeCode = jobTypeObj?.value
                                            tempCommonJob.jobLevel = jobLevelObj?.label
                                            tempCommonJob.jobLevelCode = jobLevelObj?.value
                                        } else {
                                            tempCommonJob.jobLevel = jobTypeObj?.label
                                            tempCommonJob.jobLevelCode = jobTypeObj?.value
                                        }

                                        onChangeQuestion('commonJob', commonJob)
                                        onChangeQuestion('customContent', {
                                            ...customContent,
                                            commonJob: tempCommonJob,
                                        })
                                        jobLevelObj?.value && setCommonLevelCode(jobLevelObj.value)
                                    }}
                                />
                            </Form.Item>
                            {/* 考评点 */}
                            {isRealAndSkill && (
                                <Form.Item
                                    label="考评点"
                                    name="authenticatePoint"
                                    rules={[
                                        {
                                            message: '必须选择到某一个考评点',
                                            validator(rule, value) {
                                                if (value?.length) {
                                                    if (value?.length >= 5) {
                                                        return Promise.resolve()
                                                    } else {
                                                        return Promise.reject()
                                                    }
                                                }
                                                return Promise.resolve()
                                            },
                                        },
                                    ]}
                                >
                                    <AuthenticateCascade
                                        key={commonLevelCode}
                                        commonJobCode={commonLevelCode}
                                        // onDropdownVisibleChange={e => {
                                        //     const authenticatePointLength =
                                        //         form.getFieldValue('authenticatePoint')?.length
                                        //     if (!e && authenticatePointLength < 5) {
                                        //         form.resetFields(['authenticatePoint'])
                                        //     }
                                        // }}
                                        onChange={authenticatePoint => {
                                            form.setFieldsValue({
                                                discrimination: 30,
                                            })

                                            setIsShow(true)

                                            const { customContent } = questionItem

                                            const [root, first, second, third] =
                                                authenticatePoint.slice(0, -1)
                                            const [point] = authenticatePoint.slice(-1)

                                            onChangeQuestion('customContent', {
                                                ...customContent,
                                                authenticatePoint: {
                                                    code: root?.value,
                                                    name: root?.label,
                                                    firstRangeCode: first?.value,
                                                    firstRangeName: first?.label,
                                                    secondRangeCode: second?.value,
                                                    secondRangeName: second?.label,
                                                    thirdRangeCode: third?.value,
                                                    thirdRangeName: third?.label,
                                                    pointCode: point?.value,
                                                    pointName: point?.label,
                                                },
                                                discrimination: 30,
                                            })
                                        }}
                                    />
                                </Form.Item>
                            )}
                            {isShow && (
                                <Form.Item
                                    label="区分度"
                                    name="discrimination"
                                    shouldUpdate={(prevValues, currentValues) =>
                                        prevValues.authenticatePoint !==
                                        currentValues.authenticatePoint
                                    }
                                    rules={[{ required: true, message: '请选择区分度' }]}
                                >
                                    <Select
                                        placeholder="请选择"
                                        options={DISCRIMINATION_OPTIONS}
                                        onChange={discrimination => {
                                            const { customContent } = questionItem
                                            onChangeQuestion('customContent', {
                                                ...customContent,
                                                discrimination,
                                            })
                                        }}
                                    />
                                </Form.Item>
                            )}
                            {/* 分类 */}
                            <Form.Item
                                name="knowledgePoint"
                                label="分类"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择分类',
                                    },
                                ]}
                            >
                                {/* @ts-ignore */}
                                <Cascader
                                    changeOnSelect
                                    allowClear={false}
                                    placeholder="请选择"
                                    options={store.knowledgeList}
                                    onChange={(
                                        value: (string | number)[],
                                        selectedOptions: any,
                                    ) => {
                                        const lastSelectedOption =
                                            selectedOptions[selectedOptions.length - 1]

                                        const { customContent } = questionItem

                                        onChangeQuestion('customContent', {
                                            ...customContent,
                                            knowledgePoint: {
                                                code: lastSelectedOption?.value,
                                                levelCode: lastSelectedOption?.levelCode,
                                                codeList: value,
                                            },
                                        })
                                    }}
                                />
                            </Form.Item>
                            {/* 难易程度 */}
                            <Form.Item
                                name="level"
                                label="难易程度"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择难易程度',
                                    },
                                ]}
                                initialValue={questionItem.level}
                            >
                                <Select
                                    placeholder="请选择"
                                    options={QUESTION_LEVEL_OPTIONS.filter(
                                        item => item.label !== '全部',
                                    )}
                                    onChange={level => onChangeQuestion('level', level)}
                                />
                            </Form.Item>
                            {/* 题目类型 */}
                            <Form.Item
                                name="type"
                                label="题型"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择题型',
                                    },
                                ]}
                                initialValue={questionItem.type}
                            >
                                <Select
                                    placeholder="请选择"
                                    options={QUESTION_TYPE_OPTIONS}
                                    onChange={type => onChangeQuestion('type', type)}
                                />
                            </Form.Item>
                        </div>
                    </Form>

                    {/* 题目字段 */}
                    {renderQuestionItem()}

                    {/* 操作 */}
                    <div className={styles.operate_btn}>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" onClick={() => handleValidateRepeatQuestion()}>
                            完成
                        </Button>
                        {!code && (
                            <Button type="primary" onClick={handleImportNext}>
                                录下一题
                            </Button>
                        )}
                    </div>
                </div>
            </Spin>

            <RepeatQuestionModal
                {...repeatModalData}
                onCancel={() => setRepeatModal({ ...repeatModalData, open: false })}
            />
        </div>
    )
}

export default observer(CreateQuestion)
