// 单选题选项

import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Radio, message } from 'antd'

import { MIN_OPTION_COUNT } from '../constants'

import styles from './index.module.less'
import EditorInput from '@/components/EditorInput'
import { DeleteOutlined } from '@ant-design/icons'
import type { OptionInnerProps } from './interface'

const SingleOptions = (props: OptionInnerProps) => {
    const { optionList, onChange } = props

    const [currentCode, setCurrentCode] = useState<string | null>(null)
    const isDeleteRef = useRef(false)

    // 修改选项
    const handleChangeOptionList = (code: string, field: string, value?: string) => {
        if (field === 'isAnswer') {
            optionList.map(item => {
                item.isAnswer = item.code === code ? true : false
                return item
            })
        } else {
            optionList.map(item => {
                item.answer = item.code === code ? value : item.answer
                return item
            })
        }

        onChange(optionList)
    }

    // 删除选项
    const handleDeleteOption = (e: SyntheticEvent, childIndex: number) => {
        e.stopPropagation()
        setCurrentCode(null)

        if (optionList.length <= MIN_OPTION_COUNT) {
            message.error(`最少需要保留${MIN_OPTION_COUNT}个选项`)
            return
        }

        optionList.splice(childIndex, 1)

        onChange(optionList)
    }

    useEffect(() => {}, [])

    return (
        <div className={styles.option_list}>
            {optionList.map((item, childIndex) => (
                <div className={styles.option_item_inner} key={item.code}>
                    <Radio
                        checked={item.isAnswer}
                        onChange={() => handleChangeOptionList(item.code!, 'isAnswer')}
                    >
                        {String.fromCharCode(65 + childIndex)}.
                    </Radio>

                    <EditorInput
                        placeholder="点击编辑，选中即为正确答案"
                        value={item.answer}
                        onChange={answer => handleChangeOptionList(item.code!, 'answer', answer)}
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

export default SingleOptions
