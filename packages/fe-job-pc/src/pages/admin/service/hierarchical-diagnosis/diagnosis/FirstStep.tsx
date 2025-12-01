import styles from './index.module.less'
import { Radio } from 'antd'
import { useEffect } from 'react'
import type { AssistanceFromQuestionDto } from './interface'
import TitleAdvance from '@/components/TitleAdvance'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'

const FirstStep = ({ code }: any) => {
    const store = useLocalObservable(() => Store)
    const { surveyQuestionList, judgmentQuestionList, answerObj } = store

    // @ts-ignore
    const handleChangAnswer = (question: AssistanceFromQuestionDto, sequence: string) => {
        store.setAnswerObj(question.code!, sequence)
    }

    useEffect(() => {
        store?.getAssistanceJobQuestionData(code)
        store?.getAassistanceServerQuestionData(code)
    }, [])

    return (
        <div className={styles.first_step_content}>
            <div className={styles.job_seeker_survey}>
                <TitleAdvance title="求职者调查">
                    <div className={styles.question_list}>
                        {surveyQuestionList.map(
                            (item: AssistanceFromQuestionDto, index: number) => (
                                <div className={styles.question_item} key={item.code}>
                                    {item.paragraphTitle !==
                                        surveyQuestionList?.[index - 1]?.paragraphTitle && (
                                        <div className={styles.paragraphTitle}>
                                            {item.paragraphTitle}
                                        </div>
                                    )}
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.option_list}>
                                        {item?.options?.map(option => (
                                            <Radio
                                                checked={answerObj[item.code!] === option.sequence}
                                                key={option.sequence}
                                                onChange={() =>
                                                    handleChangAnswer(item, option.sequence!)
                                                }
                                            >
                                                <div className={styles.option_item}>
                                                    {option.title}
                                                </div>
                                            </Radio>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </TitleAdvance>
            </div>
            <div className={styles.judgment_question}>
                <TitleAdvance title="研判提问">
                    <div className={styles.question_list}>
                        {judgmentQuestionList.map(
                            (item: AssistanceFromQuestionDto, index: number) => (
                                <div className={styles.question_item} key={item.code}>
                                    {item.paragraphTitle !==
                                        judgmentQuestionList?.[index - 1]?.paragraphTitle && (
                                        <div className={styles.paragraphTitle}>
                                            {item.paragraphTitle}
                                        </div>
                                    )}
                                    <div className={styles.title}>{item.title}</div>
                                    <div className={styles.option_list}>
                                        {item?.options?.map(option => (
                                            <Radio
                                                checked={answerObj[item.code!] === option.sequence}
                                                key={option.sequence}
                                                onChange={() =>
                                                    handleChangAnswer(item, option.sequence!)
                                                }
                                            >
                                                <div className={styles.option_item}>
                                                    {option.title}
                                                </div>
                                            </Radio>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </TitleAdvance>
            </div>
        </div>
    )
}

export default observer(FirstStep)
