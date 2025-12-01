import React from 'react'
import styles from '../../index.module.less'
import type { ExamDetailType, QuestionItemType } from '../../interface'
import { SCORE_SETTING_TYPE } from '@/pages/paper-library/[type]/const'
/**
 * 试题组件
 * @param props {
 *  examDetail: 试卷详情
 *  questionItem: 试题信息
 * }
 * @returns
 */
const QuestionComponent = (props: {
    examDetail?: ExamDetailType
    questionItem: QuestionItemType
}) => {
    const { examDetail, questionItem } = props || {}
    const { scoreType } = examDetail || {}
    const { logicSort, questionType, title, options, score, childList } = questionItem || {}
    /** 只有单选和多选需要选项 */
    const needOption = [20, 30].includes(questionType)
    /** 图片需要设置跨域属性 */
    let question_title = title
    if (question_title?.includes('<img')) {
        question_title.replace('<img', '<img crossOrigin="Anonymous" ')
    }
    return (
        <div className={styles.question_type_box}>
            <p className={styles.mg_0} style={{ pageBreakInside: 'avoid' }}>
                <span className={`${styles.song_5} ${styles.question_title}`}>
                    {logicSort}、{/* 分值设置为单题独立设置和设置了分数时 */}
                    {scoreType === SCORE_SETTING_TYPE.SINGLE && Boolean(score) && (
                        <span className={styles.signle_score}>（{score}分）</span>
                    )}
                    {/* 判断题需要在题目前面增加括号 */}
                    {questionType && Number(questionType) === 10 ? (
                        <span>(&nbsp;&nbsp;) </span>
                    ) : (
                        ''
                    )}
                    <span
                        className={styles.html_box}
                        dangerouslySetInnerHTML={{ __html: question_title }}
                    />
                </span>
            </p>

            {needOption && (
                <p
                    className={`${styles.mg_0} ${styles.option_1}`}
                    style={{ pageBreakInside: 'avoid' }}
                >
                    {(options || []).map((o_item, o_index) => {
                        const { answer: o_title } = o_item || {}
                        let width = '100%'
                        let index1 = options.findIndex(i => i.answer.length > 17) // 一栏

                        if (o_title.includes('img')) {
                            width = '100%'
                        } else if (index1 !== -1) {
                            width = '100%'
                        } else {
                            let index2 = options.findIndex(i => i.answer.length > 10) // 两栏

                            if (index2 !== -1) {
                                width = '50%'
                            } else {
                                width = '25%'
                            }
                        }

                        let option_title = o_title
                        if (option_title.includes('<img')) {
                            option_title.replace('<img', '<img crossOrigin="Anonymous" ')
                        }
                        // 100% 50% 25%
                        return (
                            <span
                                style={{ width }}
                                className={`${styles.song_5} ${styles.option_title}`}
                                key={o_item.sort}
                            >
                                {String.fromCharCode(o_index + 65)}、
                                <span
                                    className={styles.html_box}
                                    dangerouslySetInnerHTML={{ __html: option_title }}
                                />
                            </span>
                        )
                    })}
                </p>
            )}

            {childList && childList.length > 0 && (
                <div className={styles.group_question_box}>
                    {childList.map(g_item => {
                        return (
                            <QuestionComponent
                                examDetail={examDetail}
                                questionItem={g_item}
                                key={g_item?.questionCode}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
export default QuestionComponent
