import React from 'react'
import useComponentValue from '@/hooks/useComponentValue'
import type { FillQuesCompProps } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import QuesOptions from '../../components/QuesOptionsRender'
import { QUESTION_TYPE } from '../../const'

/**
 * 单选题
 */
const ObjectiveQuestion = ({ data, value, onChange, showType }: FillQuesCompProps) => {
    const { value: formValue, onChange: handleChange } = useComponentValue<string | string[]>({
        value,
        onChange,
    })

    const handleClick = (code: string) => {
        // 判断当前 value 是否包含 code，包含则删除，不包含则添加
        if (data.type === QUESTION_TYPE.multiple) {
            let newValue: any = formValue || []
            if (newValue.includes(code)) {
                newValue = newValue.filter((item: string) => item !== code)
            } else {
                newValue = [...newValue, code]
            }
            handleChange(newValue)
            return
        }
        handleChange(code)
    }

    return (
        <div>
            <QuesTitle {...data} showType={showType} />
            <QuesOptions {...data} onClick={handleClick} value={formValue} edit />
        </div>
    )
}

export default React.memo(ObjectiveQuestion)
