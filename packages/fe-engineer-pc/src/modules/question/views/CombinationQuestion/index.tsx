import { Form, Button } from 'antd'
import React, { useEffect } from 'react'
import { QUESTION_TYPE, QUESTION_TYPE_LABEL } from '../../const'
import EditorInput from '@/components/EditorInput'
import useComponentValue from '@/hooks/useComponentValue'
import type { QuestionComponentProps, IQuestion } from '../../types'
import { getQuestionDefaultValue, updateQuestionField } from '../../utils'
import { DeleteOutlined } from '@ant-design/icons'
import SwitchQuestion from '../SwitchQuestion'
import styles from './index.module.less'

/**
 * 组合题
 */
const CombinationQuestion = ({
    value,
    onChange,
    formNamespace,
}: QuestionComponentProps<IQuestion>) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<IQuestion>({
        value,
        onChange,
        defaultValue: getQuestionDefaultValue(map => map.combination),
    })
    console.log(formValue, value)

    const subQuestions = formValue?.subQuestions || []

    // 确保 subQuestions 都有正确的 serialNumber，组合题至少要有一个子问题
    useEffect(() => {
        const currentSubQuestions = formValue?.subQuestions || []

        if (currentSubQuestions.length === 0) {
            // 如果没有子问题，创建一个默认的单选题
            const defaultSubQuestion: IQuestion = {
                ...getQuestionDefaultValue(QUESTION_TYPE.single, formValue?.code),
                serialNumber: 1,
            }

            handleChange(currentValue => ({
                ...currentValue!,
                subQuestions: [defaultSubQuestion],
            }))
        } else {
            // 检查是否需要重新分配序号
            const needsUpdate = currentSubQuestions.some((q, index) => q.serialNumber !== index + 1)

            if (needsUpdate) {
                handleChange(currentValue => {
                    const reorderedSubQuestions = (currentValue?.subQuestions || []).map(
                        (item, index) => ({
                            ...item,
                            serialNumber: index + 1,
                        }),
                    )

                    return {
                        ...currentValue!,
                        subQuestions: reorderedSubQuestions,
                    }
                })
            }
        }
    }, [formValue?.subQuestions?.length, formValue?.code, handleChange]) // 依赖长度和code变化

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

    const addSubQuestion = (type: QUESTION_TYPE) => {
        handleChange(currentValue => {
            const currentSubQuestions = currentValue?.subQuestions || []
            const newSubQuestion: IQuestion = {
                ...getQuestionDefaultValue(type, currentValue?.code),
                serialNumber: currentSubQuestions.length + 1, // 设置正确的序号
            }
            const newSubQuestions = [...currentSubQuestions, newSubQuestion]

            // 重新分配序号，确保连续
            const reorderedSubQuestions = newSubQuestions.map((item, index) => ({
                ...item,
                serialNumber: index + 1,
            }))

            return {
                ...currentValue!,
                subQuestions: reorderedSubQuestions,
            }
        })
    }

    const removeSubQuestion = (serialNumber: number) => {
        handleChange(currentValue => {
            const currentSubQuestions = currentValue?.subQuestions || []
            if (currentSubQuestions.length <= 1) {
                return currentValue! // 不能删除，返回原值
            }

            const filteredSubQuestions = currentSubQuestions.filter(
                q => q.serialNumber !== serialNumber,
            )

            // 重新分配序号，确保连续
            const reorderedSubQuestions = filteredSubQuestions.map((item, index) => ({
                ...item,
                serialNumber: index + 1,
            }))

            return {
                ...currentValue!,
                subQuestions: reorderedSubQuestions,
            }
        })
    }

    const updateSubQuestionData = (serialNumber: number, data: any) => {
        handleChange(currentValue => {
            const currentSubQuestions = currentValue?.subQuestions || []
            const updatedSubQuestions = currentSubQuestions.map(q =>
                q.serialNumber === serialNumber
                    ? {
                          ...q,
                          ...data,
                          type: data.type || q.type,
                          belongType: data.belongType || q.belongType,
                          serialNumber: q.serialNumber,
                      }
                    : q,
            )

            return {
                ...currentValue!,
                subQuestions: updatedSubQuestions,
            }
        })
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
                required
                style={{ marginBottom: 0 }}
                labelCol={{ span: 2 }}
                labelAlign="right"
            >
                <div className={styles.combination_question}>
                    <div className={styles.combination_question_content}>
                        {subQuestions.map(subQuestion => (
                            <div
                                key={subQuestion.serialNumber}
                                className={styles.sub_question_card}
                            >
                                <div className={styles.sub_question_header}>
                                    <div className={styles.sub_question_title}>
                                        <span>
                                            {subQuestion.serialNumber}.
                                            {QUESTION_TYPE_LABEL[subQuestion.type]}
                                        </span>
                                    </div>
                                    <div className={styles.sub_question_actions}>
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            onClick={() =>
                                                removeSubQuestion(subQuestion.serialNumber)
                                            }
                                            style={{ color: 'rgba(0, 0, 0, 45%)' }}
                                            disabled={subQuestions.length <= 1}
                                        />
                                    </div>
                                </div>
                                <div className={styles.sub_question_content}>
                                    <Form.Item
                                        name={getFormFieldName([
                                            'subQuestions',
                                            subQuestion.serialNumber - 1,
                                            'serialNumber',
                                        ])}
                                        style={{ display: 'none' }}
                                        initialValue={subQuestion.serialNumber}
                                    >
                                        <input type="hidden" />
                                    </Form.Item>

                                    <Form.Item
                                        name={getFormFieldName([
                                            'subQuestions',
                                            subQuestion.serialNumber - 1,
                                            'type',
                                        ])}
                                        style={{ display: 'none' }}
                                        initialValue={subQuestion.type}
                                    >
                                        <input type="hidden" />
                                    </Form.Item>

                                    <SwitchQuestion
                                        questionType={subQuestion.type}
                                        value={subQuestion}
                                        formNamespace={
                                            getFormFieldName([
                                                'subQuestions',
                                                subQuestion.serialNumber - 1,
                                            ]) as (string | number)[]
                                        }
                                        onChange={(data: any) =>
                                            updateSubQuestionData(subQuestion.serialNumber, data)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.add_sub_question}>
                        <div className={styles.add_title}>添加一道小题</div>
                        <div className={styles.question_type_buttons}>
                            <Button
                                type="link"
                                onClick={() => addSubQuestion(QUESTION_TYPE.single)}
                                style={{ padding: 0, margin: 0 }}
                            >
                                单选题
                            </Button>
                            <Button
                                type="link"
                                onClick={() => addSubQuestion(QUESTION_TYPE.multiple)}
                                style={{ padding: 0, margin: 0 }}
                            >
                                多选题
                            </Button>
                            <Button
                                type="link"
                                onClick={() => addSubQuestion(QUESTION_TYPE.judgment)}
                                style={{ padding: 0, margin: 0 }}
                            >
                                判断题
                            </Button>
                            <Button
                                type="link"
                                onClick={() => addSubQuestion(QUESTION_TYPE.fill)}
                                style={{ padding: 0, margin: 0 }}
                            >
                                填空题
                            </Button>
                            <Button type="link" onClick={() => addSubQuestion(QUESTION_TYPE.essay)}>
                                简答题
                            </Button>
                        </div>
                    </div>
                </div>
            </Form.Item>
        </>
    )
}

export default React.memo(CombinationQuestion)
