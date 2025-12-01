import React from 'react'
import type { IQuestion } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import styles from './index.module.less'
import SwitchQuesRender from '../SwitchQuesRender'

interface ComplexQuesInterface {
    data: IQuestion
    showType?: boolean
    showAnalysis?: boolean
    answerData?: any
    correct?: any
    // 题目容器渲染fn
    wrapperRender?: (child: React.ReactElement, index: number) => React.ReactElement
}

export default function ComplexQues({
    data,
    showType,
    answerData,
    wrapperRender,
    showAnalysis,
    correct,
}: ComplexQuesInterface) {
    const { subQuestions } = data

    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            <div className={styles.sub_ques_container}>
                {subQuestions?.map((item, index) => {
                    const subAnswer = answerData?.subAnswer?.filter(
                        (ans: any) => ans.questionCode === item.code,
                    )?.[0]
                    const subCorrect = correct?.subCorrect?.filter(
                        (ans: any) => ans.questionCode === item.code,
                    )?.[0]
                    console.log(answerData?.subAnswer)
                    return wrapperRender?.(
                        <div className={styles.sub_ques_wrapper} key={item.code}>
                            <div className={styles.sub_ques_title}>
                                <div>【小题{index + 1}】</div>
                                <div className={styles.sub_ques_title_wrapper}>
                                    <SwitchQuesRender
                                        data={item}
                                        answerData={subAnswer}
                                        showAnalysis={showAnalysis}
                                        correct={subCorrect}
                                    />
                                </div>
                            </div>
                        </div>,
                        index,
                    )
                })}
            </div>
        </div>
    )
}
