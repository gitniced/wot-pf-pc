import { Modal, Select, Form, Button, Space } from 'antd'
import { QUESTION_TYPE, questionTypeOptions } from '../../const'
import { useEffect, useState } from 'react'
import React from 'react'
import type { IQuestion } from '../../types'
import SwitchQuestion from '../../views/SwitchQuestion'
import { getQuestionDefaultValue } from '../../utils'

interface IQuestionAddModalProps {
    visible: boolean
    onCancel: () => void
    onSubmit: (values: IQuestion) => void
    defaultValue?: any
}

const QuestionAddModal = (props: IQuestionAddModalProps) => {
    const [form] = Form.useForm<IQuestion>()
    const [questionType, setQuestionType] = useState<QUESTION_TYPE>(QUESTION_TYPE.single)

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            console.log('表单数据：', values)
            props.onSubmit({
                ...values,
                belongType: 10,
                serialNumber: 0,
            })
        } catch (error) {
            console.error('表单验证失败：', error)
        }
    }

    const handleCancel = () => {
        props.onCancel()
    }

    const handleQuestionTypeChange = (value: QUESTION_TYPE) => {
        setQuestionType(value)
        form.resetFields()

        if (value === QUESTION_TYPE.judgment) {
            const newQuestionData = getQuestionDefaultValue(value)
            form.setFieldsValue({ type: value, ...newQuestionData })
        } else {
            form.setFieldsValue({ type: value })
        }
    }

    useEffect(() => {
        if (props.visible && props.defaultValue) {
            console.log(props.defaultValue)
            setQuestionType(props.defaultValue.type)
            form.setFieldsValue(props.defaultValue)
        }

        return () => {
            setQuestionType(QUESTION_TYPE.single)
            form.resetFields()
        }
    }, [props.visible, props.defaultValue])

    return (
        <Modal
            open={props.visible}
            onCancel={handleCancel}
            title="添加试题"
            width={800}
            maskClosable={false}
            footer={
                <Space>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button type="primary" onClick={handleSubmit}>
                        确定
                    </Button>
                </Space>
            }
            modalRender={modal => <div onClick={e => e.stopPropagation()}>{modal}</div>}
        >
            <Form
                form={form}
                layout="horizontal"
                labelCol={{ span: 2 }}
                labelAlign="right"
                initialValues={{
                    type: QUESTION_TYPE.single,
                }}
            >
                <Form.Item
                    label="题型"
                    name="type"
                    rules={[{ required: true, message: '请选择题型' }]}
                    style={{ marginBottom: 24 }}
                >
                    <Select
                        options={questionTypeOptions}
                        placeholder="请选择题型"
                        onChange={handleQuestionTypeChange}
                    />
                </Form.Item>

                <SwitchQuestion
                    value={props.defaultValue}
                    questionType={questionType}
                    form={form}
                />
            </Form>
        </Modal>
    )
}

export default React.memo(QuestionAddModal)
