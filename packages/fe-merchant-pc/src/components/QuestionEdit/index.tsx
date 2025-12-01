import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, message, Row, Space } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import { toJS } from 'mobx'
// @ts-ignore
import { history, useParams } from 'umi'

import { rules } from './rules'
import { parseFromValue, parseData } from './transFromValue'

import TitleBlock from '../TitleBlock'
import QuestionTypes from '../../pages/question/[type]/components/QuestionTypes'
import Question from '../../pages/question/[type]/components/Question'
import QuestionItem from '../../pages/question/[type]/components/QuestionItem'

import { getDetailStore } from './store'
import QuestionTypesStore from '../../pages/question/[type]/components/QuestionTypes/store'
import styles from './index.modules.less'
import { findSiteData } from '@/utils/valueGet'
import { QuestionEditWrapperContext } from './context'
import {
    BELONG_TYPE_ENUM,
    QUESTION_TYPE_ENUM,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '@/constants'
import { getCookie, getLocalStorage } from '@/storage'
import type { CustomContent } from '../QuestionCheck/interface'
import type { RepeatModalData } from './interface'
import RepeatQuestionModal from './RepeatQuestionModal'
import useSiteStore from '@/hooks/useSiteStore'
import type { QuestionRouteType } from '@/hooks/useCommonParams'

const Edit = () => {
    const siteStore = useSiteStore()

    const organizationCode = getCookie('SELECT_ORG_CODE')

    const { subject } = useContext(QuestionEditWrapperContext)
    const { type } = useParams() as { type: QuestionRouteType }
    const isReal = subject === SUBJECT_TYPE_ENUM.REAL

    const store = useLocalObservable(() => getDetailStore())
    const questionTypesStore = useLocalObservable(() => QuestionTypesStore)

    const [initValue, setInitValue] = useState({
        workLevel: QUESTION_TYPE_ENUM.SINGLE,
        level: 30,
        discrimination: 30,
        knowledgePointCode: [],
    })
    const [repeatModalData, setRepeatModal] = useState<RepeatModalData>({
        subject,
        open: false,
        questionList: [],
    })

    const code = history.location.query!?.code as string
    const [form] = Form.useForm()

    const commonParams = {
        subject,
        skill: SKILL_TYPE_ENUM.THEORY,
        belongType: BELONG_TYPE_ENUM.MERCHANT,
        organizationCode,
        sid: getLocalStorage('SID'),
    }

    // 是否有重复试题
    const hasRepeatedQuestionList = (customContent: CustomContent) => {
        const { nowquestion } = store
        return new Promise(resolve => {
            store
                .getRepeatedQuestionListByTitle({
                    ...commonParams,
                    customContent,
                    questionType: nowquestion.type,
                    title: nowquestion.title?.content,
                })
                .then(repeatedList => {
                    resolve(repeatedList)
                })
        })
    }

    // 保存接口
    const enterQuestion = (callBack: () => void) => {
        const handleSave = (
            lastDataParams: any,
            level: number,
            type: number,
            lastCustomContent: CustomContent,
        ) => {
            const finishParams = {
                ...lastDataParams,
                level,
                type,
                customContent: lastCustomContent,
                subject,
                belongType: BELONG_TYPE_ENUM.MERCHANT,
                skill: SKILL_TYPE_ENUM.THEORY,
                sid: getLocalStorage('SID'),
            }

            if (code) {
                store.toEditQuestion({ ...finishParams, code }).then(() => {
                    message.success('题目编辑成功')
                    callBack?.()
                })
            } else {
                store.toEnterQuestion({ ...finishParams }).then(() => {
                    message.success('题目录入成功')
                    callBack?.()
                })
            }
        }

        form.validateFields().then(res => {
            if (rules(toJS(store.nowquestion))) {
                const lastFromParams = parseFromValue(res)
                const lastDataParams = parseData(toJS(store.nowquestion) as any)

                const { customContent, level, type } = lastFromParams
                const lastCustomContent = {
                    ...customContent,
                    knowledgePoint: questionTypesStore.selectKnowledge,
                }

                // 判断是否有重复试题
                hasRepeatedQuestionList(customContent).then((repeatedList: any) => {
                    if (repeatedList.length) {
                        // 显示弹窗
                        setRepeatModal({
                            ...repeatModalData,
                            open: true,
                            questionList: [{ ...lastDataParams, level, type }, ...repeatedList],
                            callback: () => {
                                setRepeatModal({ ...repeatModalData, open: false })
                                handleSave(lastDataParams, level, type, lastCustomContent)
                            },
                        })
                        return
                    }

                    // 直接下一步
                    handleSave(lastDataParams, level, type, lastCustomContent)
                })
            }
        })
    }

    // 重置题目数据到
    const onValuesChange = (changedValues: any) => {
        if (changedValues?.workLevel) {
            store.setWorkLevel(changedValues?.workLevel)
            let optionList: object[] = []
            switch (changedValues?.workLevel) {
                case QUESTION_TYPE_ENUM.BLANK:
                    optionList = [{}]
                    break
                case QUESTION_TYPE_ENUM.SINGLE:
                    optionList = [{}, {}, {}, {}]
                    break
                case QUESTION_TYPE_ENUM.JUDGEMENT:
                    optionList = [{}, {}, {}, {}]
                    break

                default:
                    break
            }

            form.setFieldsValue({ title: '', analysis: '', childList: '', optionList })
        }
    }

    // 重置
    const resetQuestion = () => {
        onValuesChange({ workLevel: store.nowquestion.type })
    }

    // 前往列表页
    const goList = () => {
        history.push(`/question/${type}/list`)
    }

    useEffect(() => {
        const siteName = findSiteData(siteStore?.siteData, 'name', { findKey: 'baseInfo' })

        document.title = `录入${isReal ? '理论' : '模拟'}试题-${siteName}`

        onValuesChange({ workLevel: QUESTION_TYPE_ENUM.SINGLE })
        store.updateLastOrganizationCode(organizationCode)

        if (code) {
            store.getValues(code).then((res: any) => {
                form.setFieldsValue(res)
                setInitValue(res)
            })
        }

        return () => {
            store.clearStore()
        }
    }, [])

    const handleCancel = () => {
        history.push(`/question/${type}/list`)
    }
    return (
        <div className={styles.page_theory_edit}>
            <Form
                form={form}
                name="control-hooks"
                onValuesChange={onValuesChange}
                initialValues={initValue}
            >
                <TitleBlock title={`录入${isReal ? '理论' : '模拟'}试题`} />
                {/* 公共的筛选项 */}
                <QuestionTypes initValue={initValue} form={form} subject={subject} />
            </Form>

            {store.question?.status === 1 ? (
                <QuestionItem
                    value={store.question}
                    onChange={store.updateQuestion}
                    addButtonStyle={{
                        paddingLeft: '66px',
                    }}
                />
            ) : null}

            {store.question.status === 2 ? (
                <Question value={store.question} onChange={store.updateQuestion} />
            ) : null}

            <Row justify="center" className={styles.center_bottom}>
                <Space size={8}>
                    <Button onClick={() => handleCancel()}>取消</Button>
                    <Button type="primary" onClick={() => enterQuestion(goList)}>
                        完成
                    </Button>
                    <Button type="primary" onClick={() => enterQuestion(resetQuestion)}>
                        录下一题
                    </Button>
                </Space>
            </Row>

            <RepeatQuestionModal
                {...repeatModalData}
                subject={subject}
                onCancel={() => setRepeatModal({ ...repeatModalData, open: false })}
            />
        </div>
    )
}
const ObserverPage = observer(Edit)

export default ObserverPage
