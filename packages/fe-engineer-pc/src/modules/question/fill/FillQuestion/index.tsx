import React from 'react'
import type { FillQuesCompProps, IQuestion } from '../../types'
import QuesTitle from '../../components/QuesTitleRender'
import styles from './index.module.less'
import { Form, Input } from 'antd'

interface FillQuesInterface extends FillQuesCompProps {
    data: IQuestion
    showType?: boolean
    answerData?: any
}

export default function FillQues({ data, showType, fieldsName }: FillQuesInterface) {
    // 下标转汉字数字，例如 0 => 一，11 => 十一
    function indexToChinese(num: number): string {
        const cnNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
        if (num < 0) return ''
        if (num < 10) return cnNums[num]
        if (num < 20) return '十' + (num % 10 === 0 ? '' : cnNums[num % 10])
        if (num < 100) {
            const ten = Math.floor(num / 10)
            const unit = num % 10
            return cnNums[ten] + '十' + (unit === 0 ? '' : cnNums[unit])
        }
        // 超过99暂不处理
        return num.toString()
    }

    return (
        <div className={styles.question_wrapper}>
            <QuesTitle {...data} showType={showType} />
            {
                <div className={styles.fill_ques_options}>
                    <Form.List name={[...fieldsName!, 'options']} initialValue={data?.options}>
                        {fields => {
                            return (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => {
                                        return (
                                            <div className={styles.fill_ques_wrapper} key={key}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'value']}
                                                    label={<span>第{indexToChinese(index)}空</span>}
                                                    rules={[{ required: true, message: '请输入' }]}
                                                    required={false}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                        )
                                    })}
                                </>
                            )
                        }}
                    </Form.List>
                </div>
            }
        </div>
    )
}
