// 填空题选项

import type { OptionInnerProps } from './interface'

import styles from './index.module.less'
import EditorInput from '@/components/EditorInput'
import { BLANK_TEXT } from '../constants'

const Blank = ({ optionList, onChange }: OptionInnerProps) => {
    const handleChangeOptionList = (childIndex: number, value: string) => {
        optionList[childIndex].answer = value
        optionList[childIndex].isAnswer = !!value
        onChange(optionList)
    }

    return (
        <div className={styles.option_list}>
            {optionList.map((item, childIndex) => (
                <div className={styles.option_item_inner} key={item.code}>
                    <EditorInput
                        hasBlock
                        BlockText={BLANK_TEXT[childIndex]}
                        placeholder="点击编辑(必填)"
                        value={item.answer}
                        onChange={answer => handleChangeOptionList(childIndex, answer)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Blank
