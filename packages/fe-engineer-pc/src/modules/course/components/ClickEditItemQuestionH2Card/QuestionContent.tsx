import Thumbnail from '@/components/Questions/Thumbnail'
import SwitchQuesRender from '@/modules/question/render/SwitchQuesRender'
import { groupQuestionsByType } from '@/utils/questionSort'
import { FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Empty } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import type { IQuestion } from '@/modules/question/types'
import QuestionAddModal from '@/modules/question/modal/QuestionAddModal'

export default function QuestionContent({
    value: questionData,
    onChange,
}: IUseComponentValueProps<IQuestion[]>) {
    const [visible, setVisible] = useState(false)
    const [editCode, setEditCode] = useState<string>()

    const questionList = groupQuestionsByType(questionData!)
    const sortLabel = ['一', '二', '三', '四', '五', '六', '七', '八', '九']

    const handleDel = (code: string) => {
        const newValues = [...questionData!].filter(item => item.code !== code)
        onChange?.(newValues || [])
    }

    return (
        <div className={styles.questions_list}>
            {questionList.length > 0 ? (
                <>
                    <div className={styles.left_container}>
                        <Button
                            className={styles.add_button}
                            onClick={() => {
                                setVisible(true)
                            }}
                        >
                            <PlusOutlined />
                            添加试题
                        </Button>
                        <div className={styles.thumbnail_wrapper}>
                            <Thumbnail
                                questionList={questionList}
                                onClick={(data, groupType, questionIndex) => {
                                    if (groupType !== undefined && questionIndex !== undefined) {
                                        const target = document.getElementById(
                                            `ques_${groupType}_${questionIndex}`,
                                        )

                                        if (target) {
                                            target.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start',
                                            })
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.right_container} id="scroll_wrap">
                        {questionList.map((item, idx) => {
                            return (
                                <div className={styles.questype_wrapper} key={item.type}>
                                    <div className={styles.title}>
                                        {`${sortLabel[idx]}、${item?.title}（共${item?.questionList?.length}题）`}
                                    </div>
                                    {item.questionList?.map((ques, i) => {
                                        return (
                                            <div
                                                className={styles.ques_wrapper}
                                                key={ques.code || `${item.type}_${i}`}
                                                id={`ques_${item.type}_${i}`}
                                            >
                                                <div className={styles.options_fixed}>
                                                    <FormOutlined
                                                        onClick={() => {
                                                            setEditCode(ques.code)
                                                            setVisible(true)
                                                        }}
                                                    />
                                                    <Divider type="vertical" />
                                                    <DeleteOutlined
                                                        onClick={() => handleDel(ques.code!)}
                                                    />
                                                </div>
                                                <SwitchQuesRender
                                                    data={{ ...ques, sort: i + 1 }}
                                                    showAnalysis
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className={styles.empty_container}>
                    <Empty
                        image="https://static.zpimg.cn/public/fe-engineer-pc/images/not_found.png"
                        description="暂无内容"
                    />
                    <Button
                        type="primary"
                        onClick={() => setVisible(true)}
                        className={styles.add_question_button}
                    >
                        添加试题
                    </Button>
                </div>
            )}
            <QuestionAddModal
                visible={visible}
                defaultValue={
                    editCode ? questionData?.find(item => item.code === editCode) : undefined
                }
                onCancel={() => {
                    setVisible(false)
                    setEditCode(undefined)
                }}
                onSubmit={v => {
                    if (editCode) {
                        const newValues = questionData?.map(item => {
                            if (item.code === editCode) {
                                return { code: item.code, ...v }
                            }
                            return item
                        })
                        onChange?.(newValues || [])
                        setVisible(false)
                        setEditCode(undefined)
                    } else {
                        const newValues = [
                            ...(questionData || []),
                            { code: `code_${new Date().getTime()}`, ...v },
                        ]
                        onChange?.(newValues)
                        setVisible(false)
                    }
                }}
            />
        </div>
    )
}
