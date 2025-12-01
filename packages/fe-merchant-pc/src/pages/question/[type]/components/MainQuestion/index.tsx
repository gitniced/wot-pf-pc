// 题目主题 题干+答案+解析
// 答案很具不同题型切换不同格式
import { Form } from 'antd'
import React from 'react'
import EditorInput from '../EditorInput'
import EditorRadio from '../EditorRadio'
import ItemContainer from '../ItemContainer'
import EditorBlock from '../EditorBlock'
import JudgeQuestion from '../JudgeQuestion'
import GroupQuestion from '../GroupQuestion'
import EditorCheck from '../EditorCheck'
import { QUESTION_TYPE_ENUM } from '@/constants'

export default function Index({ workLevel }: { workLevel: QUESTION_TYPE_ENUM }) {
    const HEADING_TYPE: Record<number, string> = {
        [QUESTION_TYPE_ENUM.COMPOSE]: '子试题',
        [QUESTION_TYPE_ENUM.SHORT]: '答案',
        [QUESTION_TYPE_ENUM.BLANK]: '选项',
        [QUESTION_TYPE_ENUM.MULTIPLE]: '选项',
        [QUESTION_TYPE_ENUM.JUDGEMENT]: '选项',
        [QUESTION_TYPE_ENUM.SINGLE]: '选项',
    }

    let titleLabel = workLevel === QUESTION_TYPE_ENUM.COMPOSE ? '主题干' : '题干'
    return (
        <>
            {/* 题干 */}
            <ItemContainer title={titleLabel}>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: `请填写${titleLabel}` }]}
                >
                    <EditorInput minHeight={64} placeholder="点击编辑(必填)" />
                </Form.Item>
            </ItemContainer>
            {/* 选项 */}
            <ItemContainer
                title={HEADING_TYPE[workLevel]}
                isDashed={workLevel !== QUESTION_TYPE_ENUM.COMPOSE}
            >
                {/* 单选题 */}
                {workLevel === QUESTION_TYPE_ENUM.SINGLE && <EditorRadio />}
                {/* 多选题 */}
                {workLevel === QUESTION_TYPE_ENUM.MULTIPLE && <EditorCheck />}
                {/*填空题 */}
                {workLevel === QUESTION_TYPE_ENUM.BLANK && <EditorBlock />}
                {/* 判断题 */}
                {workLevel === QUESTION_TYPE_ENUM.JUDGEMENT && <JudgeQuestion />}
                {/* 简答题 */}
                {workLevel === QUESTION_TYPE_ENUM.SHORT && (
                    <Form.Item noStyle name="answer">
                        <EditorInput minHeight={64} />
                    </Form.Item>
                )}
                {/* 组合题*/}
                {workLevel === QUESTION_TYPE_ENUM.COMPOSE && <GroupQuestion />}
            </ItemContainer>
            {workLevel !== QUESTION_TYPE_ENUM.COMPOSE && (
                <ItemContainer title="解析" isDashed={false}>
                    <Form.Item noStyle name="analysis">
                        <EditorInput placeholder="点击编辑 (选填)" minHeight={64} />
                    </Form.Item>
                </ItemContainer>
            )}
        </>
    )
}
