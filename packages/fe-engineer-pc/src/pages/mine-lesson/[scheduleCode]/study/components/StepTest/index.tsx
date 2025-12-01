import { Form, Button, Modal } from 'antd'
import React from 'react'

import styles from './index.module.less'
import SwitchQuesFill from '@/modules/question/fill/SwitchQuesFill'
import SwitchQuesRender from '@/modules/question/render/SwitchQuesRender'
import { QUESTION_TYPE } from '@/modules/question/const'
import { sortQuestionsByType } from '@/utils/questionSort'
import { useDeepCompareEffect } from 'ahooks'

export default function StepTest({ questionList, answerList, commentList, onSubmit }: any) {
    const [form] = Form.useForm()

    const handleFinish = (values: any) => {
        // 递归处理每个题目，只保留 type, code, subQuestions, value 字段
        function filterQuestionFields(question: any) {
            const { type, code, value, subQuestions, options } = question
            let filtered: any = { type, questionCode: code }
            if (value !== undefined) filtered.value = value
            if (type === QUESTION_TYPE.fill) {
                filtered.value = options.map((item: any) => item.value)
            }
            if (Array.isArray(subQuestions)) {
                filtered.subAnswer = subQuestions.map(filterQuestionFields)
            }
            return filtered
        }

        // 处理所有题目
        if (Array.isArray(values.grade)) {
            values.grade = values.grade.map(filterQuestionFields)
        }

        Modal.confirm({
            title: '确定要提交吗？',
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                onSubmit(values.grade)
            },
        })
    }

    useDeepCompareEffect(() => {
        form.setFieldsValue({
            grade: sortQuestionsByType(questionList),
        })
    }, [questionList])

    return (
        <div className={styles.grade_content_middle}>
            <Form form={form} labelCol={{ span: 4 }} onFinish={handleFinish}>
                <Form.List name="grade" initialValue={sortQuestionsByType(questionList)}>
                    {fields => (
                        <>
                            {fields.map(({ key, name, ...restField }) => {
                                const { fieldKey } = restField
                                const data = form.getFieldValue(['grade', fieldKey])
                                return (
                                    <div className={styles.ques_container} key={key}>
                                        <Form.Item
                                            name={[name, 'value']}
                                            rules={[
                                                {
                                                    required: [
                                                        QUESTION_TYPE.combination,
                                                        QUESTION_TYPE.case,
                                                        QUESTION_TYPE.fill,
                                                    ].includes(data.type)
                                                        ? false
                                                        : true,
                                                    message: [
                                                        QUESTION_TYPE.single,
                                                        QUESTION_TYPE.multiple,
                                                        QUESTION_TYPE.judgment,
                                                    ].includes(data.type)
                                                        ? '请选择'
                                                        : '请输入',
                                                },
                                            ]}
                                        >
                                            {answerList?.length > 0 ? (
                                                <SwitchQuesRender
                                                    data={data}
                                                    showType
                                                    showAnalysis
                                                    answerData={
                                                        answerList.filter(
                                                            (item: any) =>
                                                                item.questionCode === data.code,
                                                        )?.[0]
                                                    }
                                                    correct={
                                                        commentList?.filter(
                                                            item => item.questionCode === data.code,
                                                        )?.[0]
                                                    }
                                                />
                                            ) : (
                                                <SwitchQuesFill
                                                    fieldsName={[fieldKey]}
                                                    data={data}
                                                    showType
                                                />
                                            )}
                                        </Form.Item>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </Form.List>
                {answerList?.length === 0 && (
                    <div className={styles.footer_wrapper}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    )
}
