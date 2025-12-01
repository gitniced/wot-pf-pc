// 试卷

import { observer, useLocalObservable } from 'mobx-react'
import type { Item, PaperItem, QuestionItem } from '../interface'
import styles from './index.module.less'
import MarkSettingStore from '../store'
import { Select } from 'antd'
import { MULTIPLE_TYPE_ENUM } from '../../grading-manage/constants'
import { getDecodeInfo } from '@wotu/wotu-components'

type IProps = {
    mode: 'preview' | 'edit'
    paper: PaperItem & { index: number }
    onChange?: (teacherUserCode: string, questionCode: string) => void
    multiple: MULTIPLE_TYPE_ENUM
}

const PaperItemComp = ({ paper, mode, onChange, multiple }: IProps) => {
    const store = useLocalObservable(() => MarkSettingStore)

    const { gradingDetail } = store
    const { teacherDetails = [] } = gradingDetail ?? {}

    // 具体的题目
    const renderTopic = (question: Item) => {
        const currTeacher = teacherDetails?.filter(teacher =>
            teacher.questionCodes.includes(question.questionCode),
        )

        return (
            <div className={styles.topic_item} key={question.questionCode}>
                <div className={styles.topic_title}>
                    <div> {question.logicSort}、</div>
                    <div dangerouslySetInnerHTML={{ __html: question.title }} />
                </div>
                <div className={styles.select_teacher}>
                    {mode === 'edit' ? (
                        <Select
                            placeholder="请选择"
                            value={currTeacher?.map(item => item.userCode)}
                            onChange={(value: any) => onChange?.(value, question.questionCode)}
                            options={teacherDetails?.map(t => ({
                                label: getDecodeInfo(t.name || ''),
                                value: t.userCode,
                            }))}
                            mode={multiple === MULTIPLE_TYPE_ENUM.TRUE ? 'multiple' : undefined}
                        />
                    ) : (
                        currTeacher?.map(item => getDecodeInfo(item.name || '')).join('、')
                    )}
                </div>
            </div>
        )
    }

    // 题型
    const renderQuestion = (questionType: QuestionItem) => {
        return (
            <div className={styles.question_item} key={questionType.questionType}>
                <div className={styles.question_title}>
                    {questionType.logicSort}、{questionType.title}
                </div>
                {/* 题目列表 */}
                <div className={styles.topic_list}>
                    {questionType.questionList.map(_questionType => renderTopic(_questionType))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.component_paper_item}>
            <div className={styles.paper_item} key={paper.paperCode}>
                <div className={styles.paper_title}>
                    {`试卷${paper.index + 1}：${paper.paperTitle}`}
                </div>
                {/* 题型列表（题型） */}

                <div className={styles.question_list}>
                    {paper.paperQuestionList.map(question => renderQuestion(question))}
                </div>
            </div>
        </div>
    )
}

export default observer(PaperItemComp)
