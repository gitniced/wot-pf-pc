// 组合题
import { Divider, Form, Space, Typography, message } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import Title from './Title'

import {
    MAX_OPTION_COUNT,
    MAX_OPTION_COUNT_BLANK,
    QUESTION_TYPE_ENUM,
    QUESTION_TYPE_OPTIONS,
    QUESTION_TYPE_TEXT,
} from '../constants'

import type { ComposeQuestionProps } from './interface'
import type { OptionItem } from '../interface'

import EditorInput from '@/components/EditorInput'

import SingleOptions from './Single'
import MultipleOptions from './Multiple'
import JudgementOptions from './Judgement'
import BlankOptions from './Blank'

import styles from './index.module.less'
import Answer from './Answer'
import { nanoid } from 'nanoid'
import { generaDefaultOptionList } from '../utils'

export const isBasicQuestion = (questionType: number) => {
    return [
        QUESTION_TYPE_ENUM.SINGLE,
        QUESTION_TYPE_ENUM.MULTIPLE,
        QUESTION_TYPE_ENUM.JUDGEMENT,
        QUESTION_TYPE_ENUM.BLANK,
        QUESTION_TYPE_ENUM.SHORT,
    ].includes(questionType)
}

const ComposeQuestion = ({ questionItem, onChange }: ComposeQuestionProps) => {
    const { level, type, title, childList = [] } = questionItem

    // 删除子题
    const handleRemoveChild = (index: number) => {
        childList.splice(index, 1)
        onChange('childList', childList)
    }

    // 新增子题
    const handleAddChild = (item: { label: string; value: number }) => {
        childList.push({
            level,
            type: item.value,
            optionList: generaDefaultOptionList(item.value),
        })

        onChange('childList', childList)
    }

    // 修改题干
    const handleChangeTitle = (index: number, _title: string) => {
        childList[index].title = _title
        onChange('childList', childList)
    }

    // 新增选项
    const handleAddOption = (questionType: number, index: number) => {
        const { optionList = [] } = childList[index]
        const maxCount =
            questionType === QUESTION_TYPE_ENUM.BLANK ? MAX_OPTION_COUNT_BLANK : MAX_OPTION_COUNT

        if (optionList.length >= maxCount) {
            message.error(`最多添加${maxCount}个选项`)
            return
        }

        optionList?.push({ isAnswer: false, code: nanoid() })

        onChange('childList', childList)
    }

    // 修改选项
    const handleChangeOptions = (optionList: OptionItem[], index: number) => {
        childList[index].optionList = optionList

        onChange('childList', childList)
    }

    //修改解析
    const handleChangeAnalysis = (index: number, analysis: string) => {
        childList[index].analysis = analysis
        onChange('childList', childList)
    }

    // 添加更多
    const renderAddMore = (questionType: number, index: number) => {
        if ([QUESTION_TYPE_ENUM.SHORT, QUESTION_TYPE_ENUM.JUDGEMENT].includes(questionType)) {
            return null
        }
        return (
            <div className={styles.add_more_option}>
                <Space onClick={() => handleAddOption(questionType, index)}>
                    <PlusOutlined size={18} />
                    {questionType !== QUESTION_TYPE_ENUM.BLANK ? (
                        <Typography.Link>添加选项</Typography.Link>
                    ) : (
                        <Typography.Link>添加填空</Typography.Link>
                    )}
                </Space>
            </div>
        )
    }

    const renderOption = (questionType: number, index: number) => {
        const currentOptionList = childList[index].optionList ?? []

        if (questionType === QUESTION_TYPE_ENUM.SINGLE) {
            return (
                <SingleOptions
                    optionList={currentOptionList}
                    onChange={optionList => handleChangeOptions(optionList, index)}
                />
            )
        }

        if (questionType === QUESTION_TYPE_ENUM.MULTIPLE) {
            return (
                <MultipleOptions
                    optionList={currentOptionList}
                    onChange={optionList => handleChangeOptions(optionList, index)}
                />
            )
        }

        if (questionType === QUESTION_TYPE_ENUM.JUDGEMENT) {
            return (
                <JudgementOptions
                    optionList={currentOptionList}
                    onChange={optionList => handleChangeOptions(optionList, index)}
                />
            )
        }

        if (questionType === QUESTION_TYPE_ENUM.BLANK) {
            return (
                <BlankOptions
                    optionList={currentOptionList}
                    onChange={optionList => handleChangeOptions(optionList, index)}
                />
            )
        }
    }

    return (
        <div className={styles.component_basic_question}>
            <Form.Item name="childList">
                {/* 主题干 */}
                <Title
                    title="主题干"
                    onChange={_title => onChange('title', _title)}
                    value={title}
                />

                <div className={styles.child_list}>
                    {childList.map((item, index) => (
                        <div className={styles.child_item} key={item.type}>
                            <div className={styles.label}>子试题</div>
                            <div className={styles.child_content}>
                                <div className={styles.header}>
                                    <Typography>
                                        {`${index + 1}. ${QUESTION_TYPE_TEXT[item.type]}`}
                                    </Typography>
                                    <DeleteOutlined onClick={() => handleRemoveChild(index)} />
                                </div>

                                <div className={styles.content_wrapper}>
                                    <div className={styles.title_like}>
                                        <EditorInput
                                            placeholder="子题干，点击编辑（必填）"
                                            value={item.title}
                                            onChange={_title => handleChangeTitle(index, _title)}
                                        />
                                        <Divider dashed />
                                    </div>

                                    {item.type !== QUESTION_TYPE_ENUM.SHORT ? (
                                        <div className={styles.option_list_wrapper}>
                                            {renderOption(item.type, index)}
                                            <Divider dashed />
                                            {renderAddMore(item.type, index)}
                                        </div>
                                    ) : (
                                        <div className={styles.Answer}>
                                            <Answer
                                                showLabel={false}
                                                optionList={item.optionList}
                                                onChange={optionList =>
                                                    handleChangeOptions(optionList, index)
                                                }
                                            />
                                        </div>
                                    )}

                                    <div className={styles.analysis}>
                                        <EditorInput
                                            placeholder="解析，点击编辑"
                                            value={item.analysis}
                                            onChange={analysis =>
                                                handleChangeAnalysis(index, analysis)
                                            }
                                        />
                                        <Divider dashed />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.add_child_list}>
                    <div className={styles.title}>添加子试题</div>
                    {type === QUESTION_TYPE_ENUM.COMPOSE ? (
                        <Space size={32}>
                            {QUESTION_TYPE_OPTIONS.filter(item => isBasicQuestion(item.value)).map(
                                item => (
                                    <Typography.Link
                                        key={item.value}
                                        onClick={() => handleAddChild(item)}
                                    >
                                        {item.label}
                                    </Typography.Link>
                                ),
                            )}
                        </Space>
                    ) : (
                        <Space size={32}>
                            <Typography.Link
                                onClick={() =>
                                    handleAddChild({
                                        label: '简答题',
                                        value: QUESTION_TYPE_ENUM.SHORT,
                                    })
                                }
                            >
                                简答题
                            </Typography.Link>
                        </Space>
                    )}
                </div>
            </Form.Item>
        </div>
    )
}

export default ComposeQuestion
