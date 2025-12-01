import { Button, Space, Checkbox, Radio, Input } from 'antd'
import React, { useMemo } from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { QUESTION_TYPE } from '../../const'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { IQuestionOption } from '../../types'
import styles from './index.module.less'
import EditorInput from '@/components/EditorInput'

interface QuestionOptionProps extends IUseComponentValueProps<IQuestionOption[]> {
    questionType?: QUESTION_TYPE
    minOptions?: number
    maxOptions?: number
    description?: string
    inputPlaceholder?: string
}

const generateOptionSort = (index: number): string => {
    let result = ''
    let temp = index
    do {
        result = String.fromCharCode(65 + (temp % 26)) + result
        temp = Math.floor(temp / 26) - 1
    } while (temp >= 0)
    return result
}

const numberToChinese = (num: number): string => {
    const chineseNumbers = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const units = ['', '十', '百', '千']

    if (num === 0) return '零'
    if (num < 10) return chineseNumbers[num]
    if (num === 10) return '十'
    if (num < 20) return '十' + chineseNumbers[num - 10]
    if (num < 100) {
        const tens = Math.floor(num / 10)
        const ones = num % 10
        return chineseNumbers[tens] + '十' + (ones ? chineseNumbers[ones] : '')
    }

    // 处理100以上的数字（如果需要）
    let result = ''
    let unitIndex = 0
    let tempNum = num

    while (tempNum > 0) {
        const digit = tempNum % 10
        if (digit !== 0) {
            result = chineseNumbers[digit] + units[unitIndex] + result
        } else if (result !== '' && !result.startsWith('零')) {
            result = '零' + result
        }
        tempNum = Math.floor(tempNum / 10)
        unitIndex++
    }

    return result
}

const QuestionOption = ({
    questionType = QUESTION_TYPE.single,
    minOptions = 2,
    maxOptions = 20,
    description,
    inputPlaceholder,
    ...props
}: QuestionOptionProps) => {
    const defaultValue = useMemo(() => {
        return Array.from({ length: minOptions }, (_, index) => ({
            sort: generateOptionSort(index),
            answer: '',
            isAnswer: questionType === QUESTION_TYPE.single ? index === 0 : false,
        }))
    }, [minOptions])

    const { value: options, onChange: updateOptions } = useComponentValue<IQuestionOption[]>({
        value: props.value,
        defaultValue: props.defaultValue?.length ? props.defaultValue : defaultValue,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const addOption = () => {
        updateOptions(currentOptions => {
            const currentCount = currentOptions.length
            if (currentCount >= maxOptions) {
                return currentOptions // 达到最大选项数，不允许继续添加
            }

            const nextLabel = generateOptionSort(currentCount)
            const newOption: IQuestionOption = {
                sort: nextLabel,
                answer: '',
                isAnswer: false,
            }
            return [...currentOptions, newOption]
        })
    }

    const removeOption = (index: number) => {
        updateOptions(currentOptions => {
            const currentCount = currentOptions.length
            if (currentCount <= minOptions) {
                return currentOptions // 不能删除，返回原数组
            }

            const newOptions = [...currentOptions]
            newOptions.splice(index, 1)

            // 重新分配标签，创建新对象避免直接修改
            newOptions.forEach((option, idx) => {
                newOptions[idx] = {
                    ...option,
                    sort: generateOptionSort(idx),
                }
            })
            return newOptions
        })
    }

    const updateOptionContent = (index: number, answer: string) => {
        updateOptions(currentOptions => {
            const newOptions = [...currentOptions]
            if (newOptions[index]) {
                newOptions[index] = { ...newOptions[index], answer }
            }
            return newOptions
        })
    }

    const updateOptionCorrect = (index: number, isAnswer: boolean) => {
        updateOptions(currentOptions => {
            const newOptions = [...currentOptions]

            if (questionType === QUESTION_TYPE.single) {
                // 单选题：只能选择一个正确答案，创建新对象避免直接修改
                newOptions.forEach((option, idx) => {
                    newOptions[idx] = {
                        ...option,
                        isAnswer: idx === index ? isAnswer : false,
                    }
                })
            } else {
                // 多选题：可以选择多个正确答案
                if (newOptions[index]) {
                    newOptions[index] = { ...newOptions[index], isAnswer }
                }
            }

            return newOptions
        })
    }

    const currentCount = options?.length || 0
    const canAddMore = currentCount < maxOptions
    const canRemove = currentCount > minOptions

    return (
        <div className={styles.question_option}>
            <div className={styles.question_option_tip}>
                {description ? description : `选项范围从${minOptions}到${maxOptions}`}
            </div>
            <Space direction="vertical" style={{ width: '100%' }}>
                {(options || []).map((option, index) => (
                    <div
                        key={option.sort}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        {questionType === QUESTION_TYPE.single ? (
                            <Radio
                                checked={option.isAnswer}
                                onChange={e => updateOptionCorrect(index, e.target.checked)}
                            />
                        ) : questionType === QUESTION_TYPE.multiple ? (
                            <Checkbox
                                checked={option.isAnswer}
                                onChange={e => updateOptionCorrect(index, e.target.checked)}
                                style={{ marginRight: 8 }}
                            />
                        ) : questionType === QUESTION_TYPE.fill ? (
                            <div
                                style={{
                                    background: 'rgba(0,0,0,0.06)',
                                    borderRadius: '6px',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    color: 'rgba(0,0,0,0.85)',
                                    lineHeight: '40px',
                                    height: '40px',
                                    padding: '0 8px',
                                }}
                            >
                                第{numberToChinese(index + 1)}空
                            </div>
                        ) : null}

                        {questionType !== QUESTION_TYPE.fill && (
                            <span style={{ marginRight: 4 }}>{option.sort}.</span>
                        )}
                        {questionType !== QUESTION_TYPE.fill ? (
                            <EditorInput
                                placeholder={
                                    inputPlaceholder
                                        ? inputPlaceholder
                                        : '点击编辑，选中即为正确答案 (必填)'
                                }
                                value={option.answer}
                                onChange={val => {
                                    updateOptionContent(index, val)
                                }}
                                style={{ flex: 1 }}
                                mode="simple"
                            />
                        ) : (
                            <Input
                                placeholder={
                                    inputPlaceholder
                                        ? inputPlaceholder
                                        : '点击编辑，选中即为正确答案 (必填)'
                                }
                                value={option.answer}
                                onChange={val => {
                                    updateOptionContent(index, val.target.value)
                                }}
                                style={{ flex: 1, height: '40px' }}
                            />
                        )}

                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeOption(index)}
                            style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 45%)' }}
                            disabled={!canRemove}
                        />
                    </div>
                ))}

                <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={addOption}
                    disabled={!canAddMore}
                    style={{ padding: 0, margin: 0 }}
                >
                    新增{questionType === QUESTION_TYPE.fill ? '填空' : '选项'}
                    {!canAddMore && `(最多${maxOptions}个)`}
                </Button>
            </Space>
        </div>
    )
}

export default React.memo(QuestionOption)
