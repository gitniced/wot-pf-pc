import { Form } from 'antd'
import React from 'react'
import EditorInput from '@/components/EditorInput'
import useComponentValue from '@/hooks/useComponentValue'
import type { QuestionComponentProps, IQuestion } from '../../types'
import QuestionOption from '../../components/QuestionOption'
import { QUESTION_TYPE } from '../../const'
import { getQuestionDefaultValue, updateQuestionField } from '../../utils'

/**
 * 填空题
 */
const FillQuestion = ({
    questionType = QUESTION_TYPE.fill,
    value,
    onChange,
    formNamespace,
}: QuestionComponentProps<IQuestion>) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<IQuestion>({
        value,
        onChange,
        defaultValue: getQuestionDefaultValue(map => map.fill),
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
                labelAlign="right"
                labelCol={{ span: 2 }}
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
                required
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
                    questionType={questionType}
                    value={formValue?.options}
                    minOptions={1}
                    maxOptions={100}
                    onChange={val => handleFieldChange('options', val)}
                    description="若一个空有多个正确答案，每个答案间用“,”分隔，学员答案匹配任意一个都算正确"
                    inputPlaceholder="点击编辑（必填）"
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

export default React.memo(FillQuestion)
