import React from 'react'
import type { IQuestion } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import QuesAnalyze from '../../components/QuesAnalyzeRender'
import classNames from 'classnames'
import styles from './index.module.less'

interface FillQuesInterface {
    data: IQuestion
    showType?: boolean
    answerData?: any
    showAnalysis?: boolean
    correct?: any
}

export default function FillQues({
    data,
    showType,
    answerData,
    showAnalysis,
    correct,
}: FillQuesInterface) {
    // 下标转汉字数字，例如 0 => 一，11 => 十一
    function indexToChinese(num: number): string {
        const cnNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
        if (num < 0) return ''
        if (num < 10) return cnNums[num]
        if (num < 20) return '十' + (num % 10 === 0 ? '' : cnNums[num % 10])
        if (num < 100) {
            const ten = Math.floor(num / 10)
            const unit = num % 10
            return cnNums[ten] + '十' + (unit === 0 ? '' : cnNums[unit])
        }
        // 超过99暂不处理
        return num.toString()
    }

    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            {answerData && (
                <div className={styles.fill_ques_options}>
                    {data?.options?.map((option, index) => {
                        return (
                            <div className={styles.fill_ques_wrapper} key={option.sort}>
                                <span>第{indexToChinese(index)}空：</span>
                                <div
                                    className={classNames(styles.input_modal, {
                                        [styles.correct]: option.answer === answerData?.[index],
                                        [styles.error]: option.answer !== answerData?.[index],
                                    })}
                                >
                                    {answerData?.[index]}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {showAnalysis && <QuesAnalyze {...data} correct={correct} />}
        </div>
    )
}
