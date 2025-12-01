import { Form } from 'antd'
import React from 'react'
import EditorInput from '@/components/EditorInput'
import useComponentValue from '@/hooks/useComponentValue'
import type { QuestionComponentProps, IQuestion } from '../../types'
import QuestionSubItem from '../../components/QuestionSubItem'
import { getQuestionDefaultValue, updateQuestionField } from '../../utils'

/**
 * 案例分析题
 */
const CaseQuestion = ({ value, onChange, formNamespace }: QuestionComponentProps<IQuestion>) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<IQuestion>({
        value,
        onChange,
        defaultValue: getQuestionDefaultValue(map => map.case),
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
                label="小题"
                name={getFormFieldName('subQuestions')}
                rules={[{ required: true, message: '请输入小题内容' }]}
                style={{ marginBottom: 0 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <QuestionSubItem parentCode={formValue?.code} />
            </Form.Item>
        </>
    )
}

export default React.memo(CaseQuestion)
