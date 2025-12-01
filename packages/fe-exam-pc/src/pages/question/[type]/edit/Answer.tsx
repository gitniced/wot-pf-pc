import EditorInput from '@/components/EditorInput'
import styles from './index.module.less'
import { Divider } from 'antd'
import type { AnswerProps } from './interface'

const Answer = ({ optionList = [], onChange, showLabel = true }: AnswerProps) => {
    const answer = optionList[0]?.answer

    const handleChangeOptionList = (_answer: string) => {

        optionList[0] = { answer: _answer, isAnswer: !!_answer }
        
        onChange(optionList)
    }

    return (
        <div className={`${styles.answer} ${styles.flex}`}>
            {
                showLabel &&  <div className={styles.label}>答案</div>
            }
            
            <div className={styles.content}>
                <EditorInput
                    placeholder="点击编辑（必填）"
                    value={answer}
                    onChange={_answer => handleChangeOptionList(_answer)}
                />
                <Divider dashed />
            </div>
        </div>
    )
}

export default Answer
