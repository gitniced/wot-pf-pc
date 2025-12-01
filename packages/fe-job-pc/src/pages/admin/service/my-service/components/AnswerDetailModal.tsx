// 答题详情

import type { ModalProps } from 'antd'
import { Modal, Radio } from 'antd'

import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { LEVEL_TEXT } from '../../hierarchical-diagnosis/diagnosis/consts'
import { AssistanceFromQuestionDto } from '../../hierarchical-diagnosis/diagnosis/interface'

const AnswerDetailModal = ({
    open,
    onCancel,
    projectClassification,
    resultLabel,
    resultValue,
    questionList = [],
    type
}: ModalProps & {
    projectClassification?: string
    resultLabel?: string
    resultValue?: string | number
    questionList?: AssistanceFromQuestionDto[]
    type?: number
}) => {
    const store = useLocalObservable(() => Store)
    const projectClassificationList = [
        '就业心态',
        '就业条件',
        '求职能力',
    ]
    const index = projectClassificationList.findIndex((text) => text === projectClassification)

    let level = 2
    // 弱
    if ((Number(resultValue) < 1.5 && index === 2) || (Number(resultValue) > 30 && index === 1)) {
        level = 1
        // 强
    } else if ((Number(resultValue) > 2 && index === 0) || (Number(resultValue) > 2.5 && index === 2) || (Number(resultValue) > 70 && index === 1)) {
        level = 3
    }

    const typelevel = resultLabel === '求职者调查' ? level : resultValue


    return (
        <Modal
            width={764}
            title="答题详情"
            open={open}
            onCancel={onCancel}
            onOk={onCancel}
            footer={null}
            className={styles.answer_detail_modal}
        >
            <div className={styles.result_wrapper}>
                {resultLabel}：{projectClassification}
            </div>
            <div className={`${styles.result} ${styles[`result_${2}`]} ${styles[`level_${typelevel}`]}`}>结果：{type === 1 ? resultValue : LEVEL_TEXT[resultValue!]}</div>
            <div className={styles.question_list} key={(new Date().valueOf())}>
                {questionList.map(item => (
                    <div className={styles.question_item} key={item.questionCode}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.option_list}>
                            {item.options?.map((option) => (
                                <Radio checked={option.sequence === store.answerObj[item.code!]} key={option.sequence}>
                                    <div className={styles.option_item}>{option.title}</div>
                                </Radio>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default observer(AnswerDetailModal)
