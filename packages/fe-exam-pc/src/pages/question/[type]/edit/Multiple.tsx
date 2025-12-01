// 多选选项

import { useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Checkbox, message } from 'antd'

import { MIN_OPTION_COUNT } from '../constants'

import styles from './index.module.less'
import EditorInput from '@/components/EditorInput'
import { DeleteOutlined } from '@ant-design/icons'
import type { OptionInnerProps } from './interface'

const Multiple = (props: OptionInnerProps) => {
    const { optionList, onChange } = props

    const [currentCode, setCurrentCode] = useState<string | null>(null)
    const isDeleteRef = useRef(false)

    const handleChangeOptionList = (code: string, field: string, value: string | boolean) => {
        const findIndex = optionList.findIndex(item => item.code === code)
        if (field === 'isAnswer') {
            optionList[findIndex].isAnswer = value as boolean
        } else {
            optionList[findIndex].answer = value as string
        }

        onChange(optionList)
    }

    // 删除选项
    const handleDeleteOption = (e: SyntheticEvent, childIndex: number) => {
        e.stopPropagation()
        setCurrentCode(null) // 确认删除之后重置当前的index

        if (optionList.length <= MIN_OPTION_COUNT) {
            message.error(`最少需要保留${MIN_OPTION_COUNT}个选项`)
            return
        }

        optionList.splice(childIndex, 1)
        onChange(optionList)
    }

    return (
        <div className={styles.option_list}>
            {optionList.map((item, childIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className={styles.option_item_inner} key={item.code}>
                    <Checkbox
                        checked={item.isAnswer}
                        onChange={e =>
                            handleChangeOptionList(item.code!, 'isAnswer', e.target.checked)
                        }
                    >
                        {String.fromCharCode(65 + childIndex)}.
                    </Checkbox>
                    <EditorInput
                        placeholder="点击编辑，选中即为正确答案"
                        value={item.answer}
                        onChange={answer => {
                            handleChangeOptionList(item.code!, 'answer', answer)
                        }}
                        onFocus={() => setTimeout(() => setCurrentCode(item.code!), 30)}
                        onBlur={() => {
                            setImmediate(() => {
                                if (isDeleteRef.current) {
                                    isDeleteRef.current = false
                                    return
                                }
                                setCurrentCode(null)
                            })
                        }}
                    />
                    {currentCode === item.code && (
                        <DeleteOutlined
                            onClick={e => handleDeleteOption(e, childIndex)}
                            className={styles.delete_icon}
                            onMouseDown={() => (isDeleteRef.current = true)}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Multiple
