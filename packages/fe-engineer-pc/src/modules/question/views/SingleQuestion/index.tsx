import { Form } from 'antd'
import React from 'react'
import { QUESTION_TYPE } from '../../const'
import EditorInput from '@/components/EditorInput'
import QuestionOption from '../../components/QuestionOption'
import useComponentValue from '@/hooks/useComponentValue'
import type { QuestionComponentProps, IQuestion } from '../../types'
import { getQuestionDefaultValue, updateQuestionField } from '../../utils'

/**
 * 单选题
 */
const SingleQuestion = ({ value, onChange, formNamespace }: QuestionComponentProps<IQuestion>) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<IQuestion>({
        value,
        onChange,
        defaultValue: getQuestionDefaultValue(map => map.single),
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
                label="选项"
                name={getFormFieldName('options')}
                rules={[
                    { required: true, message: '请输入选项内容' },
                    {
                        validator: (_, options) => {
                            if (!options || !Array.isArray(options)) {
                                return Promise.reject(new Error('请输入选项内容'))
                            }

                            // 检查选项内容不能为空
                            const emptyOptions = options.filter(
                                option => !option.answer || option.answer.trim() === '',
                            )
                            if (emptyOptions.length > 0) {
                                return Promise.reject(new Error('选项内容不能为空'))
                            }

                            // 检查选项内容不能重复
                            const answers = options
                                .map(option => option.answer.trim())
                                .filter(answer => answer)
                            const uniqueAnswers = [...new Set(answers)]
                            if (answers.length !== uniqueAnswers.length) {
                                return Promise.reject(new Error('选项内容不能重复'))
                            }

                            return Promise.resolve()
                        },
                    },
                ]}
                style={{ marginBottom: 24 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <QuestionOption
                    questionType={QUESTION_TYPE.single}
                    value={formValue?.options}
                    onChange={(val: any) => handleFieldChange('options', val)}
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

export default React.memo(SingleQuestion)
