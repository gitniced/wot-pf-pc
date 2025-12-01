import React from 'react'
import styles from '../../index.module.less'
import type { QuestionItemType } from '../../interface'
/**
 * 试题组件
 * @param props {
 *  examDetail: 试卷详情
 *  questionItem: 试题信息
 * }
 * @returns
 */
const QuestionAnswer = (props: { questionItem: QuestionItemType }) => {
    const { questionItem } = props || {}
    const { logicSort, questionType, options, analysis, childList = [] } = questionItem || {}
    /** 只有单选和多选需要选项 */
    const needOption = [20, 30].includes(questionType)
    /** 将正确答案筛选出来 */
    const tempOptions = options
        .sort((a, b) => Number(a.sort) - Number(b.sort))
        .map((option, index) => ({
            ...option,
            sort: index,
        }))
    const answer = tempOptions.filter(item => item.isAnswer === 1)
    /** 非需要选项的题型展示答案 */
    let answerText = answer.map(ele => ele.answer).join('、')
    /** 图片需要设置跨域属性 */
    if (answerText.includes('<img')) {
        answerText.replace('<img', '<img crossOrigin="Anonymous" ')
    }
    let analysisText = analysis
    if (analysisText.includes('<img')) {
        analysisText.replace('<img', '<img crossOrigin="Anonymous" ')
    }

    return (
        <div className={styles.question_type_box}>
            {childList.length === 0 ? (
                // 没有子题的试题
                <>
                    <span>{logicSort}、</span>
                    <div className={styles.question_content}>
                        {needOption ? (
                            <span className={styles.answer}>
                                {answer.map(ele => String.fromCharCode(ele.sort + 65)).join('')}
                            </span>
                        ) : (
                            <div
                                className={styles.answer}
                                dangerouslySetInnerHTML={{ __html: answerText }}
                            />
                        )}
                        <div className={styles.analysis}>
                            <span>解析：</span>
                            <div
                                className={styles.analysis_content}
                                dangerouslySetInnerHTML={{ __html: analysisText }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <span>{logicSort}</span>
                    <div style={{ width: '100%' }}>
                        {(childList || []).map(item => {
                            return <QuestionAnswer questionItem={item} key={item?.questionCode} />
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
export default QuestionAnswer
