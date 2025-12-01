import type { TGroupQuesResult } from '@/utils/questionSort'
import React from 'react'

import styles from './index.module.less'
import { Collapse } from 'antd'
import type { IQuestion } from '@/modules/question/types'

const { Panel } = Collapse

const sortLabel = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
export default function Thumbnail({
    questionList,
    onClick,
}: {
    questionList: TGroupQuesResult[]
    onClick: (data: IQuestion, groupType?: number, questionIndex?: number) => void
}) {
    return (
        <div className={styles.thumbnail_wrapper}>
            {questionList.map((item, idx) => {
                return (
                    <Collapse
                        key={item.type}
                        defaultActiveKey={questionList.map(i => i.type)}
                        ghost
                    >
                        <Panel
                            header={`${sortLabel[idx]}、${item.title}（${item?.questionList?.length}）`}
                            key={item.type}
                        >
                            {item.questionList?.map((ques, index) => {
                                return (
                                    <div
                                        className={styles.num}
                                        key={ques.code || `${item.type}_${index}`}
                                        onClick={() => onClick(ques, item.type, index)}
                                    >
                                        {index + 1}
                                    </div>
                                )
                            })}
                        </Panel>
                    </Collapse>
                )
            })}
        </div>
    )
}
