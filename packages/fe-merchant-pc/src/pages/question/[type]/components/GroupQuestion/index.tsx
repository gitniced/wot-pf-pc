import React, { useState } from 'react'
import styles from './index.module.less'
import ChildrenQuestion from '../ChildrenQuestion'
import { Form } from 'antd'
import { QUESTION_TYPE_ENUM } from '@/constants'

export default function Index() {
    const [questionList, setQuestionList] = useState<QUESTION_TYPE_ENUM[]>([])
    const WORK_LEVEL_LIST = [
        {
            title: '单选题',
            key: QUESTION_TYPE_ENUM.SINGLE,
        },
        {
            title: '多选题',
            key: QUESTION_TYPE_ENUM.MULTIPLE,
        },
        {
            title: '判断题',
            key: QUESTION_TYPE_ENUM.JUDGEMENT,
        },
        {
            title: '填空题',
            key: QUESTION_TYPE_ENUM.BLANK,
        },
        {
            title: '简答题',
            key: QUESTION_TYPE_ENUM.SHORT,
        },
    ]

    return (
        <div className={styles.content}>
            <div className={styles.question}>
                <Form.List name="childList">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((item, index) => {
                                return (
                                    <Form.Item {...item} key={item.name} noStyle>
                                        <ChildrenQuestion
                                            workLevel={questionList?.[index]}
                                            questionKey={item.key}
                                            sort={index}
                                            deleteQuestion={remove}
                                        />
                                    </Form.Item>
                                )
                            })}
                            <div className={styles.operation}>
                                <div className={styles.title}>添加子试题</div>
                                <div className={styles.type}>
                                    {WORK_LEVEL_LIST.map(item => {
                                        return (
                                            <span
                                                key={item.key}
                                                onClick={() => {
                                                    setQuestionList([...questionList, item.key])
                                                    add()
                                                }}
                                            >
                                                {item.title}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </Form.List>
            </div>
        </div>
    )
}
