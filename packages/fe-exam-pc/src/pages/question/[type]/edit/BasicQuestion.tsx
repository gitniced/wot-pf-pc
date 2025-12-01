// 基础题

import Title from './Title'
import OptionsComp from './Options'
import Analysis from './Analysis'
import Answer from './Answer'

import styles from './index.module.less'
import { QUESTION_TYPE_ENUM } from '../constants'
import type { BasicQuestionProps } from './interface'
import type { OptionItem } from '../interface'

export const hasRenderOption = (questionType: number) => {
    return [
        QUESTION_TYPE_ENUM.SINGLE,
        QUESTION_TYPE_ENUM.MULTIPLE,
        QUESTION_TYPE_ENUM.JUDGEMENT,
        QUESTION_TYPE_ENUM.BLANK,
    ].includes(questionType)
}

const BasicQuestion = ({ questionItem, onChange }: BasicQuestionProps) => {
    const { title, type, analysis, optionList } = questionItem
    // 修改单选题的选项
    const onChangeOptionList = (_optionList: OptionItem[]) => {
        onChange('optionList', _optionList)
    }

    return (
        <div className={styles.component_basic_question}>
            {/* 题干 */}
            <Title value={title} onChange={_title => onChange('title', _title)} />

            {/* 选项 */}
            {hasRenderOption(type) ? (
                <OptionsComp
                    questionType={type}
                    optionList={optionList}
                    onChange={onChangeOptionList}
                />
            ) : (
                <Answer optionList={optionList} onChange={onChangeOptionList} />
            )}

            {/* 解析 */}
            <Analysis value={analysis} onChange={_analysis => onChange('analysis', _analysis)} />
        </div>
    )
}

export default BasicQuestion
