// 试题查重

import Breadcrumbs from '@/components/Breadcrumbs'
import { Button, Cascader, Form, message, Select, Spin } from 'antd'
import type { OptionProps } from 'antd/lib/select'
import { observer, useLocalObservable } from 'mobx-react'
import { useParams } from 'umi'
import type { IRoute } from 'umi'
// @ts-ignore
import { useRequest } from 'ahooks'
import { QUESTION_TYPE_ENUM, QUESTION_TYPE_OPTIONS } from '../constants'

import QuestionCheckStore from './store'

import styles from './index.module.less'
import { SuperCascader } from '@wotu/kp-components'
import type { QuestionItem } from './interface'
import { useEffect, useState } from 'react'
import { POLLING_STATUS } from './constants'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import Result from './Result'
import Loading from './Loading'
import { getLocalStorage } from '@/storage'
import { sleep } from '@wotu/wotu-components'
import useUserStore from '@/hooks/useUserStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'
import useCommonParams from '@/hooks/useCommonParams'
import { getTitleByType } from '../utils'
import type { CommonJob, KnowledgeParams } from '../interface'
import usePageParams from '@/hooks/usePageParams'

const Check = () => {
    const { type } = useParams() as { type: QuestionRouteType }
    const [form] = Form.useForm()

    const store = useLocalObservable(() => QuestionCheckStore)
    const userStore = useUserStore()

    const [repeatedList, setRepeatedList] = useState<QuestionItem[][]>([])
    // 查询状态 成功/失败/查询中/等待查询（前端状态）
    const [pollingStatus, setPollingStatus] = useState<number>(POLLING_STATUS.WAITING)
    // 查重任务code
    const [taskCode, setTaskCode] = useState<string>()

    const urlParams = usePageParams()
    const commonParams = useCommonParams()
    const pageTitle = getTitleByType(commonParams)

    const commonQuery = {
        ...commonParams,
        sid: getLocalStorage('SID'),
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

        store.createRepeatTask(commonQuery).then((_taskCode: any) => {
            setTaskCode(_taskCode)
            run({ taskCode: _taskCode! })
        })
    }

    useEffect(() => {
        document.title = '试题查重'
        store.getKnowledgeList(commonQuery as KnowledgeParams)

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
    const handleChangeCustomContent = (selectedOptions: OptionProps[]) => {
        const [jobNameObj, jobTypeObj, jobLevelObj] = selectedOptions
        // 判断是否有工种
        const { hasWorkType } = jobNameObj

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

        store.changeRepeatedQuestionsParams({
            customContent: {
                commonJob: tempCommonJob,
            },
        })
    }

    return (
        <Spin spinning={loading}>
            <div className={styles.page_question_check}>
                <Breadcrumbs
                    crumbData={[
                        { name: pageTitle, link: `/question/${type}/list?${urlParams}` },
                        { name: '试题查重' },
                    ]}
                />

                <div className={styles.container}>
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
                                {/* @ts-ignore */}
                                <SuperCascader
                                    changeOnSelect={false}
                                    maxTagCount="responsive"
                                    placeholder="请选择"
                                    // @ts-ignore
                                    showCheckedStrategy={SuperCascader.SHOW_CHILD}
                                    colSetting={[
                                        {
                                            // @ts-ignore
                                            onEventChange: handleSearchCommonJob,
                                        },
                                    ]}
                                    extraOptions={store.commonJobList}
                                    // @ts-ignore
                                    onChange={(_: number[], selectedOptionList: OptionProps[]) => {
                                        handleChangeCustomContent(selectedOptionList)
                                    }}
                                    getPopupContainer={() => document.body}
                                    displayRender={(label: string[]) => label.join('/')}
                                    style={{ width: '220px' }}
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

                                        store.changeRepeatedQuestionsParams({
                                            customContent: {
                                                ...store.repeatTaskParams.customContent,
                                                knowledgePoint: {
                                                    code: lastSelectedOption?.value,
                                                    levelCode: lastSelectedOption?.levelCode,
                                                    codeList: value,
                                                },
                                            },
                                        })
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
                    <Result pollingStatus={pollingStatus} repeatedList={repeatedList} />
                </div>
            </div>

            <Loading open={pollingStatus === POLLING_STATUS.LOADING} />
        </Spin>
    )
}

const ObversePage: IRoute = observer(Check)
ObversePage.title = '试题查重'

export default ObversePage
