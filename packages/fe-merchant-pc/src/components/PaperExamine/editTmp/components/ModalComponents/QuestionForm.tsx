import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import type { FC } from 'react'
import { discriminationList, questionLevelList, questionTypeList } from '../../enums'
import styles from './index.module.less'

interface QuestionFormType {
    // 点击查询 重置 按钮的回调函数
    callBack: (values?: any) => void
}

const QuestionForm: FC<QuestionFormType> = props => {
    const { callBack } = props
    const [form] = Form.useForm()
    // 查询
    const onFinish = () => {
        form.validateFields().then(values =>
            callBack({
                ...values,
                questionType: values.questionType ? Number(values.questionType) : undefined,
                questionLevel: values.questionLevel ? Number(values.questionLevel) : undefined,
                discrimination: values.discrimination ? Number(values.discrimination) : undefined,
            }),
        )
    }

    // 重置
    const onReset = () => {
        form.resetFields()
        callBack({ questionType: 0, questionLevel: 0, discrimination: 0 })
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 7 }}
            className={styles.question_form}
            initialValues={{ questionType: '0', questionLevel: '0', discrimination: '0' }}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item name="titleLike" label="题目/题干">
                        <Input placeholder="请输入" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="questionType" label="题型">
                        <Select
                            placeholder="请选择"
                            optionFilterProp="children"
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            options={questionTypeList}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} />
                <Col span={8}>
                    <Form.Item name="questionLevel" label="难易程度">
                        <Select
                            placeholder="请选择"
                            optionFilterProp="children"
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            options={questionLevelList}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="discrimination" label="区分度">
                        <Select
                            placeholder="请选择"
                            optionFilterProp="children"
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            options={discriminationList}
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Space size={8}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button onClick={onReset}>重置</Button>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default QuestionForm
