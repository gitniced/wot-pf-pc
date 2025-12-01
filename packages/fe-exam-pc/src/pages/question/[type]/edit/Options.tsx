// 选项

import { Divider, Space, Typography, message } from 'antd'

import type { OptionsProps } from './interface'

import { MAX_OPTION_COUNT, MAX_OPTION_COUNT_BLANK, QUESTION_TYPE_ENUM } from '../constants'

import styles from './index.module.less'
import classNames from 'classnames'
import { PlusOutlined } from '@ant-design/icons'

import SingleOptions from './Single'
import MultipleOptions from './Multiple'
import JudgementOptions from './Judgement'
import BlankOptions from './Blank'
import { nanoid } from 'nanoid'

const OptionsComp = ({ questionType, onChange, optionList = [] }: OptionsProps) => {
    const renderOptions = () => {
        if (questionType === QUESTION_TYPE_ENUM.SINGLE) {
            return <SingleOptions optionList={optionList} onChange={onChange} />
        }

        if (questionType === QUESTION_TYPE_ENUM.MULTIPLE) {
            return <MultipleOptions optionList={optionList} onChange={onChange} />
        }

        if (questionType === QUESTION_TYPE_ENUM.JUDGEMENT) {
            return <JudgementOptions optionList={optionList} onChange={onChange} />
        }

        if (questionType === QUESTION_TYPE_ENUM.BLANK) {
            return <BlankOptions optionList={optionList} onChange={onChange} />
        }
    }

    // 新增选项
    const handleAddOption = (_questionType: number) => {
        const maxCount =
            _questionType === QUESTION_TYPE_ENUM.BLANK ? MAX_OPTION_COUNT_BLANK : MAX_OPTION_COUNT

        if (optionList.length >= maxCount) {
            message.error(`最多添加${maxCount}个选项`)
            return
        }

        optionList?.push({ isAnswer: false, code: nanoid() })

        onChange(optionList)
    }

    // 渲染增加更多
    const renderAddMore = () => {
        if ([QUESTION_TYPE_ENUM.SHORT, QUESTION_TYPE_ENUM.JUDGEMENT].includes(questionType)) {
            return null
        }
        return (
            <div className={styles.add_more_option}>
                <Space onClick={() => handleAddOption(questionType)}>
                    <PlusOutlined size={18} className={styles.add_icon} />
                    {questionType !== QUESTION_TYPE_ENUM.BLANK ? (
                        <Typography.Link>添加选项</Typography.Link>
                    ) : (
                        <Typography.Link>添加填空</Typography.Link>
                    )}
                </Space>
            </div>
        )
    }

    return (
        <div
            className={classNames(styles.option_list, styles.flex, {
                [styles.blank]: questionType === QUESTION_TYPE_ENUM.BLANK,
            })}
        >
            <div
                className={classNames(styles.label, {
                    [styles.judgement]: questionType === QUESTION_TYPE_ENUM.JUDGEMENT,
                })}
            >
                选项
            </div>
            <div className={styles.content}>
                {renderOptions()}
                {renderAddMore()}
                <Divider dashed />
            </div>
        </div>
    )
}

export default OptionsComp
