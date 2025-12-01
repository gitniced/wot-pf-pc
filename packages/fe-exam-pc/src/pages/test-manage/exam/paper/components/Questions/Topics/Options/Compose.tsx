// 组合题

import { observer, useLocalObservable } from 'mobx-react'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import { MarkImgUrl, MarkMiniImgUrl } from '@/pages/test-manage/exam/constant'
import type {
    AnswerItem,
    CurrentQuestion,
    IQuestionProps,
} from '@/pages/test-manage/exam/paper/interface'
import Multiple from './Multiple'
import Single from './Single'
import styles from './index.module.less'
import { isEmpty } from 'lodash'
import Judgment from './Judgment'
import Blank from './Blank'
import Subjective from './Subjective'
import classNames from 'classnames'
import { QUESTION_TYPE_ENUM, QUESTION_TYPE_TEXT } from '@/pages/question/[type]/constants'

export const isEmptyCustomize = <T,>(params: T): boolean => {
    if (Array.isArray(params)) {
        return !params.filter(item => !isEmpty(item)).length
    }

    return isEmpty(params)
}

const Compose = (props: IQuestionProps) => {
    const { questionType: parentQuestionType } = props
    const store = useLocalObservable(() => PaperStore)
    const { currentQuestion, answerList: parentAnswerList, fontSize } = store
    const { questionCode: parentQuestionCode, childList: questions = [] } = currentQuestion

    const getChildList = () => {
        const currentAnswer: AnswerItem | undefined = parentAnswerList.find(
            (answer: AnswerItem) => answer.questionCode === currentQuestion.questionCode,
        )

        const childList = currentAnswer?.childList ?? []
        return childList
    }

    const onChangeAnswer = (changedAnswer: AnswerItem) => {
        const childList = getChildList()

        const findIndex = childList.findIndex(
            item => item.questionCode === changedAnswer.questionCode,
        )

        if (findIndex > -1) {
            childList[findIndex] = {
                ...childList[findIndex],
                ...changedAnswer,
                answer: changedAnswer.answer,
            }
        } else {
            childList.push(changedAnswer)
        }

        // 已做小题的答案
        const partialListLen = childList.filter(_ => !isEmptyCustomize(_?.answer)).length
        const composedAnswer: AnswerItem = {
            questionCode: parentQuestionCode!,
            questionType: parentQuestionType!,
            childList: childList,
            // 判断是否部分答题，已做小题的答案 是否 小于 所有小题的数量
            isPartial: partialListLen < questions.length && partialListLen > 0,
        }

        store.changeAnswer(composedAnswer)
    }

    const renderQuestion = (item: CurrentQuestion) => {
        const { questionCode, questionType, options } = item
        // 组合题的子题包含 单选题、多选题、判断题、填空题、简答题
        if (questionType === QUESTION_TYPE_ENUM.SINGLE)
            return (
                <Single
                    questionCode={questionCode}
                    questionType={QUESTION_TYPE_ENUM.COMPOSE}
                    onChange={onChangeAnswer}
                    options={options}
                />
            )
        if (questionType === QUESTION_TYPE_ENUM.MULTIPLE)
            return (
                <Multiple
                    questionCode={questionCode}
                    questionType={QUESTION_TYPE_ENUM.COMPOSE}
                    onChange={onChangeAnswer}
                    options={options}
                />
            )
        if (questionType === QUESTION_TYPE_ENUM.JUDGEMENT)
            return (
                <Judgment
                    questionCode={questionCode}
                    questionType={QUESTION_TYPE_ENUM.COMPOSE}
                    onChange={onChangeAnswer}
                    options={options}
                />
            )
        if (questionType === QUESTION_TYPE_ENUM.BLANK)
            return (
                <Blank
                    questionCode={questionCode}
                    questionType={QUESTION_TYPE_ENUM.COMPOSE}
                    onChange={onChangeAnswer}
                    options={options}
                />
            )
        if (questionType === QUESTION_TYPE_ENUM.SHORT)
            return (
                <Subjective
                    questionCode={questionCode}
                    questionType={QUESTION_TYPE_ENUM.COMPOSE}
                    onChange={onChangeAnswer}
                />
            )

        return null
    }

    const onMarkAnswer = (changedItem: CurrentQuestion, index: number) => {
        const childList = getChildList()

        const findIndex = childList.findIndex(
            item => item.questionCode === changedItem.questionCode,
        )
        if (findIndex > -1) {
            childList[findIndex] = {
                ...childList[findIndex],
                isMarked: !childList[index]?.isMarked,
            }
        } else {
            childList.push({
                ...changedItem,
                isMarked: true,
            })
        }

        const answer: AnswerItem = {
            questionCode: currentQuestion.questionCode!,
            questionType: QUESTION_TYPE_ENUM.COMPOSE,
            childList: childList,
            isMarked: childList.some(_ => _?.isMarked),
        }

        store.changeAnswer(answer)
    }

    const isMarked = (item: CurrentQuestion) => {
        const childList = getChildList()
        return childList.find(_ => _?.questionCode === item.questionCode)?.isMarked
    }

    return (
        <div className={styles.component_compose}>
            <div className={styles.question_list}>
                {currentQuestion.childList?.map((item, index) => (
                    <div className={styles.question_item} key={item.questionCode}>
                        <div className={styles.title_wrapper}>
                            <div className={styles.question_sort}>{item.questionSort}</div>
                            {parentQuestionType === QUESTION_TYPE_ENUM.COMPOSE && (
                                <div className={styles.question_tag}>
                                    {QUESTION_TYPE_TEXT[item.questionType]}
                                </div>
                            )}

                            <div
                                className={styles.question_title}
                                style={{
                                    fontSize: `${fontSize}px`,
                                }}
                                dangerouslySetInnerHTML={{ __html: item.title }}
                            />
                        </div>
                        <div className={styles.content_wrapper}>{renderQuestion(item)}</div>
                        <div className={styles.mark_wrapper}>
                            <div
                                className={classNames(styles.mark, {
                                    [styles.is_marked]: isMarked(item),
                                })}
                                onClick={() => onMarkAnswer(item, index)}
                            >
                                <img src={isMarked(item) ? MarkMiniImgUrl : MarkImgUrl} />
                                {isMarked(item) ? '取消标记' : '标记'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default observer(Compose)
