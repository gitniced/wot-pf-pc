// 选项
import { useRef } from 'react'
import { Checkbox, Radio } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useLocalObservable } from 'mobx-react'

import EditorInput from '../EditorInput'
import filterLetters, { generAtorItem } from '@/utils/filterLetters'
import type { OPTIONS_ITEM_TYPE } from '@/components/QuestionEdit/const'
import { getDetailStore } from '@/components/QuestionEdit/store'

import styles from './index.module.less'
import { QUESTION_TYPE_ENUM } from '@/constants'

type OptionItemProps = {
    type: QUESTION_TYPE_ENUM
    value: OPTIONS_ITEM_TYPE
    placeholder: string
    onRadioChange?: any
    onChange: any
    onDelete: any
    num: number
    current?: string
    setCurrent?: (v: string) => void
}

const BLANK_TEXT: Record<string, any> = {
    '0': '第一空',
    '1': '第二空',
    '2': '第三空',
    '3': '第四空',
    '4': '第五空',
}

const isBlank = [QUESTION_TYPE_ENUM.BLANK]
const hasRadio = [QUESTION_TYPE_ENUM.SINGLE, QUESTION_TYPE_ENUM.JUDGEMENT]
const hasCheck = [QUESTION_TYPE_ENUM.MULTIPLE]
const hasJudge = [QUESTION_TYPE_ENUM.JUDGEMENT]
const hasHideMove = [QUESTION_TYPE_ENUM.JUDGEMENT, QUESTION_TYPE_ENUM.SHORT]

const OptionItem: React.FC<OptionItemProps> = ({
    type,
    value,
    num,
    placeholder,
    onRadioChange,
    onChange,
    onDelete,
    current,
    setCurrent,
}) => {
    const store = useLocalObservable(() => getDetailStore())
    const isd = useRef(false)
    const onTitleChange = (e: string) => {
        const _value = store.nowquestion
        let { answer: oldAnswer } = _value
        oldAnswer = oldAnswer || {}
        const newAnswer = { ...oldAnswer, content: e }

        onChange?.({ ...value, answer: { ...newAnswer } })
    }

    return (
        <div className={styles.editor_radio_item}>
            {hasRadio.includes(type) ? (
                <Radio
                    className={styles.radio_self}
                    checked={value?.isAnswer}
                    onChange={() => {
                        onRadioChange(value)
                    }}
                >
                    {hasJudge.includes(type) ? generAtorItem(num || 0) : filterLetters(num)}
                </Radio>
            ) : null}

            {hasCheck.includes(type) ? (
                <Checkbox
                    checked={value?.isAnswer}
                    onChange={() => {
                        onRadioChange(value)
                    }}
                >
                    {filterLetters(num)}
                </Checkbox>
            ) : null}
            {hasJudge.includes(type) ? (
                <></>
            ) : (
                <EditorInput
                    hasBlock={isBlank.includes(type)}
                    BlockText={BLANK_TEXT[String(num)]}
                    value={value?.answer?.content}
                    onChange={onTitleChange}
                    placeholder={placeholder}
                    onFocus={() => {
                        setTimeout(() => {
                            setCurrent?.(value.code)
                        }, 30)
                    }}
                    onBlur={() => {
                        setImmediate(() => {
                            if (isd.current) {
                                isd.current = false
                                return
                            }
                            setCurrent?.('')
                        })
                    }}
                />
            )}
            {hasHideMove.includes(type) ? (
                <></>
            ) : (
                current === value.code && (
                    <DeleteOutlined
                        className={styles.delete_icon}
                        onMouseDown={() => {
                            isd.current = true
                        }}
                        onClick={() => {
                            onDelete(value)
                        }}
                    />
                )
            )}
        </div>
    )
}
export default OptionItem
