import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { message } from 'antd'
import { useLocalObservable } from 'mobx-react'
import OptionItem from '../OptionItem'
import MoreOption from '../MoreOption'
import EditorInput from '../EditorInput'
import styles from './index.module.less'
import { DEFAULT_OPTION_ITEM } from '@/components/QuestionEdit/const'

import type { DEFAULT_QUESTION_ITEM_TYPE, OPTIONS_ITEM_TYPE } from '@/components/QuestionEdit/const'

import { getDetailStore } from '@/components/QuestionEdit/store'
import { QUESTION_TYPE_ENUM } from '@/constants'

/**
 * @param noSign  是否去除题干等标志
 * @param value  题目数据
 * @param onChange  题目更新后触发回调
 */
type QuestionItemProps = {
    noSign?: boolean
    value: DEFAULT_QUESTION_ITEM_TYPE
    onChange: any
    placeholder?: {
        question?: string
        analysis?: string
    }
    addButtonStyle?: React.CSSProperties
}
const singleCheck = [QUESTION_TYPE_ENUM.SINGLE, QUESTION_TYPE_ENUM.JUDGEMENT]
const mulitCheck = [QUESTION_TYPE_ENUM.MULTIPLE, QUESTION_TYPE_ENUM.BLANK, QUESTION_TYPE_ENUM.SHORT]
const editCheck = [
    QUESTION_TYPE_ENUM.BLANK,
    QUESTION_TYPE_ENUM.SHORT,
    QUESTION_TYPE_ENUM.CALCULATE,
    QUESTION_TYPE_ENUM.DISCOURSE,
]
const hideAdd = [
    QUESTION_TYPE_ENUM.JUDGEMENT,
    QUESTION_TYPE_ENUM.SHORT,
    QUESTION_TYPE_ENUM.CALCULATE,
    QUESTION_TYPE_ENUM.ANALYSIS,
    QUESTION_TYPE_ENUM.DISCOURSE,
]

const customTip: Record<string, Record<string, string>> = {
    [QUESTION_TYPE_ENUM.SHORT]: { option: '答案' },
    [QUESTION_TYPE_ENUM.CALCULATE]: { option: '答案' },
    [QUESTION_TYPE_ENUM.DISCOURSE]: { option: '答案' },
    [QUESTION_TYPE_ENUM.ANALYSIS]: { option: '题干案例' },
}

const QuestionItem: React.FC<QuestionItemProps> = props => {
    const { value, onChange, noSign = false, placeholder = {}, addButtonStyle } = props
    let { title, optionList, analysis, code } = value || {}
    const [current, setCurrent] = useState<string>('')
    optionList = optionList || []

    const globalStore = useLocalObservable(() => getDetailStore())

    /**
     * 获取选项placeholder
     */
    const getPlaceholder = (): string => {
        if (singleCheck.includes(value.type!)) {
            return '点击编辑，选中即为正确答案 (必填)'
        }
        if (mulitCheck.includes(value.type!)) {
            return '点击编辑 (必填)'
        }
        return '点击编辑 (必填)'
    }

    /**
     * 选择选项答案
     */
    const onRadioChange = (option: OPTIONS_ITEM_TYPE) => {
        // const nowValue = globalStore.nowquestion.status === 2 ? globalStore.getSelfChildren(code!) : globalStore.nowquestion
        const _optionList = value.optionList || []
        const tempOption = cloneDeep(_optionList) || []

        if (singleCheck.includes(value.type!)) {
            tempOption.map(item => {
                if (item.code === option.code) {
                    item.isAnswer = true
                } else {
                    item.isAnswer = false
                }
            })
        }

        if (mulitCheck.includes(value.type!)) {
            tempOption.map(item => {
                if (item.code === option.code) {
                    if (item.isAnswer) {
                        item.isAnswer = false
                    } else {
                        item.isAnswer = true
                    }
                }
            })
        }

        onChange?.({ ...value, optionList: tempOption })
    }

    /**
     * 更新选项描述
     */
    const onInputChange = (option: OPTIONS_ITEM_TYPE) => {
        const nowValue =
            globalStore.nowquestion.status === 2
                ? globalStore.getSelfChildren(code!)
                : globalStore.nowquestion
        const _optionList = nowValue?.optionList || []
        const tempOption = cloneDeep(_optionList) || []
        if (nowValue?.type && editCheck.includes(nowValue.type)) {
            tempOption.map(item => {
                if (item.code === option.code) {
                    item.answer = option.answer
                    item.isAnswer = true
                }
            })
        } else {
            tempOption.map(item => {
                if (item.code === option.code) {
                    item.answer = option.answer
                }
            })
        }

        onChange?.({ ...nowValue, optionList: tempOption })
    }

    /**
     * 增加选项
     */
    const onOptionAdd = () => {
        const nowValue =
            globalStore.nowquestion.status === 2
                ? globalStore.getSelfChildren(code!)
                : globalStore.nowquestion
        const maxLength: Record<string, number> = {
            [QUESTION_TYPE_ENUM.BLANK]: 5,
            [QUESTION_TYPE_ENUM.SINGLE]: 20,
            [QUESTION_TYPE_ENUM.MULTIPLE]: 20,
        }
        const maxCount = (nowValue?.type && maxLength[nowValue.type]) || 0
        if (nowValue?.optionList && nowValue.optionList.length >= maxCount) {
            message.warn(`最多只能添加${maxCount}个选项`)
            return
        }
        onChange?.({ ...value, optionList: optionList?.concat(DEFAULT_OPTION_ITEM()) })
    }

    /**
     * 删除选项
     */
    const onOptionDel = (option: OPTIONS_ITEM_TYPE) => {
        const nowValue =
            globalStore.nowquestion.status === 2
                ? globalStore.getSelfChildren(code!)
                : globalStore.nowquestion

        const minLength: Record<string, number> = {
            [QUESTION_TYPE_ENUM.BLANK]: 1,
            [QUESTION_TYPE_ENUM.SINGLE]: 2,
            [QUESTION_TYPE_ENUM.MULTIPLE]: 2,
        }

        const minCount = nowValue?.type && minLength[nowValue.type]
        if (nowValue?.type && minCount && (nowValue.optionList?.length || 0) <= minCount) {
            message.warn(`最少需要保留${minCount}个选项`)
            return
        }
        onChange?.({
            ...nowValue,
            optionList: nowValue?.optionList?.filter(item => item.code !== option.code) || [],
        })
    }

    const onTitleChange = (e: string) => {
        const nowValue =
            globalStore.nowquestion.status === 2
                ? globalStore.getSelfChildren(code!)
                : globalStore.nowquestion
        let { title: oldTitle } = nowValue!
        const newTitle = { ...oldTitle, content: e }
        onChange?.({ ...nowValue, title: { ...newTitle } })
    }

    const onAnalysis = (e: string) => {
        const nowValue =
            globalStore.nowquestion.status === 2
                ? globalStore.getSelfChildren(code!)
                : globalStore.nowquestion
        const _analysis = { ...nowValue?.analysis, content: e }
        onChange?.({ ...nowValue, analysis: { ..._analysis } })
    }
    return (
        <div className={styles.question_item}>
            <div className={styles.question_item_title_content}>
                {noSign ? null : <div className={styles.title_content}>题干</div>}
                <div className={styles.content_warp}>
                    <EditorInput
                        placeholder={placeholder.question || '点击编辑 (必填)'}
                        value={title?.content}
                        onChange={onTitleChange}
                    />
                </div>
            </div>

            <div className={styles.question_item_option_content}>
                <div className={styles.question_item_option_content_input}>
                    {noSign ? null : (
                        <div className={styles.title_content}>
                            {customTip[value.type!]?.option || '选项'}
                        </div>
                    )}
                    <div className={styles.option_content}>
                        {optionList?.map((item: OPTIONS_ITEM_TYPE, index) => {
                            return (
                                <OptionItem
                                    num={index}
                                    key={item.code}
                                    type={value.type!}
                                    value={item}
                                    placeholder={getPlaceholder()}
                                    onRadioChange={onRadioChange}
                                    onChange={onInputChange}
                                    onDelete={onOptionDel}
                                    current={current}
                                    setCurrent={setCurrent}
                                />
                            )
                        })}
                    </div>
                </div>
                {!hideAdd.includes(value.type!) && (
                    <div className={styles.question_item_more_option} style={addButtonStyle}>
                        <MoreOption type={value.type!} click={onOptionAdd} />
                    </div>
                )}
            </div>

            <div className={styles.question_item_title_content}>
                {noSign ? null : <div className={styles.title_content}>解析</div>}
                <div className={styles.title_content_warp}>
                    <EditorInput
                        placeholder={placeholder.analysis || '点击编辑'}
                        value={analysis?.content}
                        onChange={onAnalysis}
                    />
                </div>
            </div>
        </div>
    )
}
export default QuestionItem
