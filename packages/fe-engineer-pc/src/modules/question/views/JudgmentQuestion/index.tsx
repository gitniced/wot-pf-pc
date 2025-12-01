import { Form, Radio } from 'antd'
import React, { useMemo, useRef } from 'react'
import EditorInput from '@/components/EditorInput'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { QuestionComponentProps, IQuestion, IQuestionOption } from '../../types'
import { getQuestionDefaultValue, updateQuestionField } from '../../utils'

const AnswerRadio = React.memo((props: IUseComponentValueProps<IQuestionOption[]>) => {
    const defaultValue = useRef([
        {
            sort: 'A',
            answer: '正确',
            isAnswer: true,
        },
        {
            sort: 'B',
            answer: '错误',
            isAnswer: false,
        },
    ])
    const { value, onChange } = useComponentValue<IQuestionOption[]>({
        ...props,
        defaultValue: defaultValue.current,
    })

    const currentAnswer = useMemo(() => {
        return value?.find(option => option.isAnswer)?.answer
    }, [value])

    return (
        <Radio.Group
            value={currentAnswer}
            onChange={e => {
                onChange(v => {
                    const options = v || []
                    options.forEach(option => {
                        option.isAnswer = option.answer === e.target.value
                    })

                    return [...options]
                })
            }}
        >
            <Radio value="正确">正确</Radio>
            <Radio value="错误">错误</Radio>
        </Radio.Group>
    )
})

/**
 * 判断题
 */
const JudgmentQuestion = ({
    value,
    onChange,
    formNamespace,
}: QuestionComponentProps<IQuestion>) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<IQuestion>({
        value,
        onChange,
        defaultValue: getQuestionDefaultValue(map => map.judgment),
    })

    const handleFieldChange = (field: string, fieldValue: any) => {
        const updatedQuestion = updateQuestionField(formValue!, field, fieldValue)
        handleChange(updatedQuestion)
    }

    // 构建表单字段名，支持嵌套路径
    const getFormFieldName = (fieldName: string) => {
        if (!formNamespace || formNamespace.length === 0) {
            return fieldName
        }
        return [...formNamespace, fieldName]
    }

    return (
        <>
            <Form.Item
                label="题干"
                name={getFormFieldName('title')}
                rules={[{ required: true, message: '请输入题干' }]}
                style={{ marginBottom: 24 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <EditorInput
                    placeholder="请输入"
                    value={formValue?.title}
                    onChange={val => handleFieldChange('title', val)}
                />
            </Form.Item>

            <Form.Item
                label="答案"
                name={getFormFieldName('options')}
                rules={[{ required: true, message: '请选择正确答案' }]}
                style={{ marginBottom: 24 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <AnswerRadio
                    value={formValue?.options}
                    onChange={val => handleFieldChange('options', val)}
                />
            </Form.Item>

            <Form.Item
                label="解析"
                name={getFormFieldName('analysis')}
                style={{ marginBottom: 0 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <EditorInput
                    placeholder="请输入"
                    value={formValue?.analysis}
                    onChange={val => handleFieldChange('analysis', val)}
                />
            </Form.Item>
        </>
    )
}

export default React.memo(JudgmentQuestion)
