import React from 'react'
import type { FillQuesCompProps } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import styles from './index.module.less'
import SwitchQuesFill from '../SwitchQuesFill'
import { Form } from 'antd'
import { QUESTION_TYPE } from '../../const'

export default function ComplexQuesFill({ data, showType, fieldsName }: FillQuesCompProps) {
    const { subQuestions } = data

    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            <div className={styles.sub_ques_container}>
                {subQuestions?.map((item, index) => {
                    return (
                        <div className={styles.sub_ques_wrapper} key={item.code}>
                            <div className={styles.sub_ques_title}>
                                <div>【小题{index + 1}】</div>
                                <div className={styles.sub_ques_title_wrapper}>
                                    <Form.Item
                                        name={[
                                            ...(fieldsName || []),
                                            'subQuestions',
                                            index,
                                            'value',
                                        ]}
                                        rules={[
                                            {
                                                required: [QUESTION_TYPE.fill].includes(item.type)
                                                    ? false
                                                    : true,
                                                message: [
                                                    QUESTION_TYPE.single,
                                                    QUESTION_TYPE.multiple,
                                                    QUESTION_TYPE.judgment,
                                                ].includes(item.type)
                                                    ? '请选择'
                                                    : '请输入',
                                            },
                                        ]}
                                    >
                                        <SwitchQuesFill
                                            data={item}
                                            fieldsName={[
                                                ...(fieldsName || []),
                                                'subQuestions',
                                                index,
                                            ]}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
