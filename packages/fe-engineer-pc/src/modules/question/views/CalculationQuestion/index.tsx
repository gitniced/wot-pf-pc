import { Form } from 'antd'
import React from 'react'
import EditorInput from '@/components/EditorInput'
import useComponentValue from '@/hooks/useComponentValue'
import type { QuestionComponentProps, IQuestion } from '../../types'
import { getQuestionDefaultValue, updateQuestionField } from '../../utils'

/**
 * 计算题
 */
const CalculationQuestion = ({
    value,
    onChange,
    formNamespace,
}: QuestionComponentProps<IQuestion>) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<IQuestion>({
        value,
        onChange,
        defaultValue: getQuestionDefaultValue(map => map.calculation),
    })

    const handleFieldChange = (field: string, fieldValue: any) => {
        const updatedQuestion = updateQuestionField(formValue!, field, fieldValue)
        handleChange(updatedQuestion)
    }

    // 构建表单字段名，支持嵌套路径
    const getFormFieldName = (fieldName: string | (string | number)[]) => {
        if (!formNamespace || formNamespace.length === 0) {
            return fieldName
        }
        if (Array.isArray(fieldName)) {
            return [...formNamespace, ...fieldName]
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
                name={getFormFieldName(['options', 0, 'answer'])}
                rules={[{ required: true, message: '请输入答案' }]}
                style={{ marginBottom: 24 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <EditorInput
                    placeholder="请输入"
                    value={formValue?.options?.[0]?.answer}
                    onChange={val => handleFieldChange('options[0].answer', val)}
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

export default React.memo(CalculationQuestion)
