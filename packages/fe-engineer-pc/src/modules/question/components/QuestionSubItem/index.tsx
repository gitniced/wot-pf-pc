import EditorInput from '@/components/EditorInput'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import React, { useMemo } from 'react'
import useComponentValue from '@/hooks/useComponentValue'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import styles from './index.less'
import type { IQuestion } from '../../types'
import { QUESTION_TYPE } from '../../const'
import { updateQuestionOption } from '../../utils'

interface QuestionSubItemProps extends IUseComponentValueProps<IQuestion[]> {
    minItems?: number
    maxItems?: number
    parentCode?: string
}

const QuestionSubItem = ({
    minItems = 1,
    maxItems = 10,
    parentCode,
    ...props
}: QuestionSubItemProps) => {
    const defaultValue = useMemo(() => {
        return [
            {
                serialNumber: 1,
                type: QUESTION_TYPE.essay,
                parentCode: parentCode,
                belongType: 10,
                title: '',
                analysis: '',
                subQuestions: [],
                options: [],
            },
        ]
    }, [parentCode])
    const { value: items, onChange: updateItems } = useComponentValue<IQuestion[]>({
        ...props,
        defaultValue: props.defaultValue?.length ? props.defaultValue : defaultValue,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const addItem = () => {
        updateItems(currentItems => {
            const currentCount = currentItems.length
            if (currentCount >= maxItems) {
                return currentItems
            }

            const newItem: IQuestion = {
                serialNumber: currentCount + 1, // 设置正确的序号
                type: QUESTION_TYPE.essay,
                parentCode: parentCode,
                belongType: 10,
                title: '',
                analysis: '',
                subQuestions: [],
                options: [],
            }
            const newItems = [...currentItems, newItem]

            // 重新分配序号，确保连续
            return newItems.map((item, index) => ({
                ...item,
                serialNumber: index + 1,
            }))
        })
    }

    const removeItem = (serialNumber: number) => {
        updateItems(currentItems => {
            const currentCount = currentItems.length
            if (currentCount <= minItems) {
                return currentItems // 不能删除，返回原数组
            }

            const filteredItems = currentItems.filter(item => item.serialNumber !== serialNumber)

            // 重新分配序号，确保连续
            return filteredItems.map((item, index) => ({
                ...item,
                serialNumber: index + 1,
            }))
        })
    }

    const updateItem = (
        serialNumber: number,
        field: keyof IQuestion | 'options',
        optionIndexOrValue?: any,
        optionField?: string,
        value?: any,
    ) => {
        updateItems(currentItems => {
            return currentItems.map(item => {
                if (item.serialNumber !== serialNumber) return item

                if (field === 'options' && typeof optionIndexOrValue === 'number') {
                    const optionIndex = optionIndexOrValue
                    const newOptions = updateQuestionOption(
                        item.options,
                        optionIndex,
                        optionField!,
                        value,
                    )
                    return { ...item, options: newOptions }
                } else {
                    return { ...item, [field]: optionIndexOrValue }
                }
            })
        })
    }

    const currentCount = items?.length || 0
    const canAddMore = currentCount < maxItems
    const canRemove = currentCount > minItems

    return (
        <div className={styles.question_sub_item}>
            {(items || []).map((item, index) => (
                <div key={item.serialNumber} className={styles.sub_item_card}>
                    <div className={styles.sub_item_header}>
                        <span>小题{item.serialNumber}</span>
                        <Button
                            type="text"
                            size="small"
                            icon={<DeleteOutlined />}
                            style={{ color: 'rgba(0, 0, 0, 45%)' }}
                            onClick={() => removeItem(item.serialNumber)}
                            disabled={!canRemove}
                        />
                    </div>
                    <div className={styles.sub_item_content}>
                        {/* 隐藏的type字段，确保能传递到表单数据中 */}
                        <Form.Item
                            name={['subQuestions', index, 'type']}
                            style={{ display: 'none' }}
                            initialValue={item.type}
                        >
                            <input type="hidden" />
                        </Form.Item>

                        <Form.Item
                            label="题干"
                            name={['subQuestions', index, 'title']}
                            rules={[{ required: true, message: '请输入小题内容' }]}
                            labelCol={{ span: 2 }}
                            labelAlign="right"
                        >
                            <EditorInput
                                placeholder="请输入"
                                value={item.title}
                                onChange={value => updateItem(item.serialNumber, 'title', value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="答案"
                            name={['subQuestions', index, 'options', 0, 'answer']}
                            rules={[{ required: true, message: '请输入答案' }]}
                            labelCol={{ span: 2 }}
                            labelAlign="right"
                        >
                            <EditorInput
                                placeholder="请输入"
                                value={item.options?.[0]?.answer}
                                onChange={value =>
                                    updateItem(item.serialNumber, 'options', 0, 'answer', value)
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            label="解析"
                            name={['subQuestions', index, 'analysis']}
                            labelCol={{ span: 2 }}
                            labelAlign="right"
                            style={{ marginBottom: 0 }}
                        >
                            <EditorInput
                                placeholder="请输入"
                                value={item.analysis}
                                onChange={value => updateItem(item.serialNumber, 'analysis', value)}
                            />
                        </Form.Item>
                    </div>
                </div>
            ))}

            <div>
                <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={addItem}
                    disabled={!canAddMore}
                    style={{ padding: 0, margin: 0 }}
                >
                    新增小题 {!canAddMore && `(最多${maxItems}个)`}
                </Button>
            </div>
        </div>
    )
}

export default React.memo(QuestionSubItem)
