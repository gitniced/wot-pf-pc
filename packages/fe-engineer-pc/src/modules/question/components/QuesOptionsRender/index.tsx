import React from 'react'
import styles from './index.module.less'
import type { IQuestion } from '../../types'
import classNames from 'classnames'
import { QUESTION_TYPE } from '../../const'

interface QuesOptionsProps extends IQuestion {
    edit?: boolean
    answerData?: any
    onClick?: (code: string) => void
    value?: string | string[]
}

export default function QuesOptions({
    options,
    type,
    edit,
    onClick,
    value,
    answerData,
}: QuesOptionsProps) {
    const getResultClz = (item: any) => {
        if (type === QUESTION_TYPE.multiple) {
            return answerData?.includes(item.code!)
        }
        return answerData && answerData === item.code
    }

    return (
        <div className={styles.ques_options}>
            {options?.map(item => {
                return (
                    <div
                        className={classNames(styles.option, { [styles.edit]: edit })}
                        key={item.code}
                        onClick={() => onClick?.(item.code!)}
                    >
                        <span
                            className={classNames(styles.sort_item, {
                                [styles.multiple]: type === QUESTION_TYPE.multiple,
                                [styles.selected]:
                                    value &&
                                    (type === QUESTION_TYPE.multiple
                                        ? value?.includes(item.code!)
                                        : value === item.code),
                                [styles.correct]: getResultClz(item) ? item.isAnswer : false,
                                [styles.error]: getResultClz(item) ? !item.isAnswer : false,
                            })}
                        >
                            {item.sort}
                        </span>
                        <span
                            className={styles.html}
                            dangerouslySetInnerHTML={{ __html: item.answer || '' }}
                        />
                    </div>
                )
            })}
        </div>
    )
}
