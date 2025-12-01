// 试题查重组件

import Breadcrumbs from '@/components/Breadcrumbs'
import { Button, Cascader, Form, message, Select, Spin } from 'antd'
import type { OptionProps } from 'antd/lib/select'
import { observer, useLocalObservable } from 'mobx-react'
// @ts-ignore
import { useRequest } from 'ahooks'

import QuestionCheckStore from './store'

import styles from './index.module.less'
import type { CommonJobParams, KnowledgeParams, QuestionItem } from './interface'
import { useContext, useEffect, useState } from 'react'
import { POLLING_STATUS } from './constants'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import Result from './Result'
import Loading from './Loading'
import { getLocalStorage } from '@/storage'
import {
    BELONG_TYPE_ENUM,
    QUESTION_TYPE_ENUM,
    QUESTION_TYPE_OPTIONS,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '@/constants'
import { QuestionCheckWrapperContext } from './context'
import ProfessionCascade from '../ProfessionCascade'
import TitleBlock from '../TitleBlock'
import { sleep } from '@wotu/wotu-components'
import useUserStore from '@/hooks/useUserStore'

const Check = () => {
    const [form] = Form.useForm()

    const { subject } = useContext(QuestionCheckWrapperContext)
    const store = useLocalObservable(() => QuestionCheckStore)
    const userStore = useUserStore()

    const [repeatedList, setRepeatedList] = useState<QuestionItem[][]>([])
    // 查询状态 成功/失败/查询中/等待查询（前端状态）
    const [pollingStatus, setPollingStatus] = useState<number>(POLLING_STATUS.WAITING)
    // 查重任务code
    const [taskCode, setTaskCode] = useState<string>()

    const commonParams = {
        subject,
        sid: getLocalStorage('SID'),
        belongType: BELONG_TYPE_ENUM.MERCHANT,
        skill: SKILL_TYPE_ENUM.THEORY,
        organizationCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
    }

    let inputEvent: Timeout[] = []

    const { loading, cancel, run } = useRequest(store.getRepeatedQuestionList, {
        manual: true,
        onSuccess: res => {
            const { isFinish, resultMessage, questions = [] } = res as any

            // 是否异常
            if (resultMessage.trim().length) {
                setPollingStatus(POLLING_STATUS.FAIL)
                cancel() // 查询异常，结束轮询
                return message.error(resultMessage)
            }

            setRepeatedList([...questions])

            // 判断是否查询完成
            if (!isFinish) {
                setPollingStatus(POLLING_STATUS.LOADING)
                // 2s后重新查询
                sleep(2000).then(() => {
                    run({ taskCode: taskCode! })
                })
            } else {
                cancel() // 查询完成，结束轮询
                setPollingStatus(POLLING_STATUS.SUCCESS)
            }
        },
        onError: error => {
            cancel() // 查询异常，结束轮询
            setPollingStatus(POLLING_STATUS.FAIL)
        },
    })

    const handleRunTask = () => {
        // 校验搜索条件是否为空
        const { commonJob = [] } = form.getFieldsValue()

        if (commonJob.length < 1) {
            return message.error('请选择职业/工种/等级')
        }

        store.createRepeatTask(commonParams).then((_taskCode: any) => {
            setTaskCode(_taskCode)
            run({ taskCode: _taskCode! })
        })
    }

    useEffect(() => {
        document.title = '试题查重'
        store.getKnowledgeList(commonParams)

        return () => {
            store.resetRepeatTaskParams()
        }
    }, [])

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

    // 修改自定义组件
    const handleChangeCustomContent = (
        field: 'commonJob' | 'knowledgePoint',
        customValue: CommonJobParams | KnowledgeParams,
    ) => {
        store.changeRepeatedQuestionsParams({
            customContent: {
                ...store.repeatTaskParams.customContent,
                [field]: customValue,
            },
        })
    }
    const handleChangeCommonJOb = (selectedOptions: OptionProps[]) => {
        const [jobNameObj, jobTypeObj, jobLevelObj] = selectedOptions

        const commonJob = {
            jobName: jobNameObj?.label,
            jobNameCode: jobNameObj?.value,
            jobType: jobTypeObj?.label,
            jobTypeCode: jobTypeObj?.value,
            jobLevel: jobLevelObj?.label,
            jobLevelCode: jobLevelObj?.value,
        }

        handleChangeCustomContent('commonJob', commonJob as unknown as CommonJobParams)
    }

    return (
        <Spin spinning={loading}>
            <div className={styles.page_question_check}>
                <div className={styles.container}>
                    <TitleBlock title="试题查重" />
                    <Form
                        form={form}
                        initialValues={{
                            questionType: QUESTION_TYPE_ENUM.SINGLE,
                        }}
                    >
                        {/* 搜索条件字段 */}
                        <div className={styles.component_search_form}>
                            {/* 职业工种等级 */}
                            <Form.Item required label="职业/工种/等级" name="commonJob">
                                <ProfessionCascade
                                    changeOnSelect
                                    type="JOB"
                                    onChange={(selectedOptions: any) => {
                                        handleChangeCommonJOb(selectedOptions)
                                    }}
                                />
                            </Form.Item>
                            {/* 题目类型 */}
                            <Form.Item required name="questionType" label="题型">
                                <Select
                                    placeholder="请选择"
                                    options={QUESTION_TYPE_OPTIONS}
                                    onChange={questionType =>
                                        store.changeRepeatedQuestionsParams({
                                            questionType,
                                        })
                                    }
                                    style={{ width: '220px' }}
                                />
                            </Form.Item>
                            <Form.Item name="knowledgePoint" label="分类">
                                <Cascader
                                    changeOnSelect
                                    allowClear={true}
                                    placeholder="请选择"
                                    options={store.knowledgeList}
                                    onChange={(
                                        value: (string | number)[],
                                        selectedOptions: any,
                                    ) => {
                                        const lastSelectedOption =
                                            selectedOptions?.[selectedOptions?.length - 1]

                                        const knowledgePoint = {
                                            code: lastSelectedOption?.value,
                                            levelCode: lastSelectedOption?.levelCode,
                                            codeList: value,
                                        }
                                        handleChangeCustomContent(
                                            'knowledgePoint',
                                            knowledgePoint as unknown as KnowledgeParams,
                                        )
                                    }}
                                    style={{ width: '220px' }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleRunTask}>
                                    查重
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                    {/* 查询结果 */}
                    <Result
                        pollingStatus={pollingStatus}
                        repeatedList={repeatedList}
                        subject={subject}
                    />
                </div>
            </div>

            <Loading open={pollingStatus === POLLING_STATUS.LOADING} />
        </Spin>
    )
}

const ObversePage = observer(Check)
export default ObversePage
