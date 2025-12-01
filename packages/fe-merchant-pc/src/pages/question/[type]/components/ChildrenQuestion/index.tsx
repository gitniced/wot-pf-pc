// 组合体的子题目 的 题目主题 题干+答案+解析
// 答案很具不同题型切换不同格式
import { Form } from 'antd'

import EditorInput from '../EditorInput'
import EditorRadio from '../EditorRadio'
import EditorBlock from '../EditorBlock'
import JudgeQuestion from '../JudgeQuestion'
import EditorCheck from '../EditorCheck'
import styles from './index.module.less'
import { QUESTION_TYPE_ENUM, QUESTION_TYPE_TEXT } from '@/constants'

interface PropsType {
    workLevel: QUESTION_TYPE_ENUM
    questionKey: number
    sort: number
    deleteQuestion: (questionKey: number, index: number) => void
    onChange?: (value: any) => void
    value?: any
}
export default function Index({
    workLevel,
    questionKey,
    sort,
    deleteQuestion,
    onChange,
}: PropsType) {
    const [form] = Form.useForm()

    const onValuesChange = (_: any, allValues: any) => {
        onChange?.({ ...allValues, type: workLevel })
    }
    return (
        <div className={styles.children}>
            <div className={styles.title}>
                <span>
                    {sort + 1}.{QUESTION_TYPE_TEXT?.[workLevel]}
                </span>
                <span
                    onClick={() => {
                        deleteQuestion(questionKey, sort)
                    }}
                >
                    删
                </span>
            </div>
            <div className={styles.question}>
                {/* 题干 */}
                <Form form={form} name="control-hooks" onValuesChange={onValuesChange}>
                    <Form.Item noStyle name="title">
                        <EditorInput minHeight={64} placeholder="子题干，点击编辑 (必填)" />
                    </Form.Item>
                    <div className={styles.line} />
                    {/* 选项 */}

                    {/* 单选题 */}
                    {workLevel === QUESTION_TYPE_ENUM.SINGLE && <EditorRadio />}
                    {/* 多选题 */}
                    {workLevel === QUESTION_TYPE_ENUM.MULTIPLE && <EditorCheck />}
                    {/*填空题 */}
                    {workLevel === QUESTION_TYPE_ENUM.BLANK && <EditorBlock />}
                    {/* 判断题 */}
                    {workLevel === QUESTION_TYPE_ENUM.JUDGEMENT && <JudgeQuestion />}
                    {/* 简答题 */}
                    <div className={styles.line} />
                    {workLevel === QUESTION_TYPE_ENUM.SHORT && (
                        <Form.Item noStyle name="answer">
                            <EditorInput minHeight={64} />
                        </Form.Item>
                    )}

                    <Form.Item noStyle name="analysis">
                        <EditorInput placeholder="子解析，点击编辑 (选填)" minHeight={64} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
