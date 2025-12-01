import React, { useState } from 'react'
import type { FormInstance } from 'antd'
import { Form, Input, Radio, Button, Modal, message, Select, Space } from 'antd'
import { FIELD_TYPE } from './const'
import styles from './index.module.less'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

interface IProps {
    fieldType: string
    form: FormInstance
}

const FormItems: React.FC<IProps> = ({ form }) => {
    const [batchModalVisible, setBatchModalVisible] = useState(false)
    const [batchOptions, setBatchOptions] = useState('')

    // 监听渲染类型的变化
    const renderType = Form.useWatch('renderType', form)

    const renderFormItems = () => {
        const baseItems = (
            <>
                <Form.Item
                    label="字段组件"
                    name="renderType"
                    rules={[{ required: true, message: '请选择字段组件' }]}
                >
                    <Select
                        placeholder="请选择字段组件"
                        options={[
                            { label: '单行文本', value: FIELD_TYPE.SINGLE_TEXT },
                            { label: '多行文本', value: FIELD_TYPE.MULTI_TEXT },
                            { label: '单选框', value: FIELD_TYPE.SINGLE_CHOICE },
                            { label: '多选框', value: FIELD_TYPE.MULTI_CHOICE },
                            { label: '单项选择器', value: FIELD_TYPE.SINGLE_SELECT },
                            { label: '多项选择器', value: FIELD_TYPE.MULTI_SELECT },
                            { label: '图片', value: FIELD_TYPE.IMAGE },
                            { label: '附件', value: FIELD_TYPE.ATTACHMENT },
                            { label: '链接', value: FIELD_TYPE.LINK },
                        ]}
                        onChange={() => {
                            // 切换组件类型时，清空相关字段
                            form.setFieldsValue({
                                options: [''],
                                max: 9999,
                                maxSize: 9999,
                            })
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="字段名称"
                    name="name"
                    rules={[{ required: true, message: '请输入字段名称' }]}
                >
                    <Input placeholder="请输入字段名称" />
                </Form.Item>
            </>
        )

        const footFields = (
            <>
                <Form.Item label="字段说明" name="extra">
                    <Input.TextArea placeholder="请输入字段说明" />
                </Form.Item>
            </>
        )

        // 使用渲染类型来决定显示哪些表单项
        switch (renderType) {
            case FIELD_TYPE.SINGLE_TEXT:
            case FIELD_TYPE.MULTI_TEXT:
                return (
                    <>
                        {baseItems}
                        {footFields}
                    </>
                )

            case FIELD_TYPE.SINGLE_CHOICE:
            case FIELD_TYPE.MULTI_CHOICE:
            case FIELD_TYPE.SINGLE_SELECT:
            case FIELD_TYPE.MULTI_SELECT:
                return (
                    <>
                        {baseItems}
                        <Form.Item label="选项设置" required className={styles.optionsSetting}>
                            <Form.List name="options">
                                {(fields, { add, remove }) => {
                                    const handleBatchAdd = () => {
                                        const options = batchOptions
                                            .split('\n')
                                            .map(item => item.trim())
                                            .filter(Boolean)
                                            .filter(
                                                (item, index, self) => self.indexOf(item) === index,
                                            )

                                        if (options.length === 0) {
                                            message.error('请至少输入一个选项')
                                            return
                                        }

                                        const currentFields = form.getFieldValue('options') || []
                                        for (let i = currentFields.length - 1; i >= 0; i--) {
                                            remove(i)
                                        }

                                        options.forEach(option => add(option))

                                        setBatchModalVisible(false)
                                        setBatchOptions('')
                                    }

                                    return (
                                        <>
                                            {fields.map(field => (
                                                <Form.Item required={false} key={field.key}>
                                                    <div className={styles.optionItem}>
                                                        <Form.Item
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message: '请输入选项内容',
                                                                },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input
                                                                placeholder="请输入"
                                                                style={{ width: '90%' }}
                                                            />
                                                        </Form.Item>
                                                        {fields.length > 1 && (
                                                            <DeleteOutlined
                                                                className={styles.deleteIcon}
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        )}
                                                    </div>
                                                </Form.Item>
                                            ))}
                                            <Space>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    icon={<PlusOutlined />}
                                                >
                                                    新建选项
                                                </Button>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => setBatchModalVisible(true)}
                                                >
                                                    批量新建选项
                                                </Button>
                                            </Space>

                                            <Modal
                                                title="批量新建选项"
                                                open={batchModalVisible}
                                                onCancel={() => {
                                                    setBatchModalVisible(false)
                                                    setBatchOptions('')
                                                }}
                                                onOk={handleBatchAdd}
                                                destroyOnClose
                                            >
                                                <Form.Item
                                                    label="选项"
                                                    required
                                                    extra="不同选项间使用换行区分，1行代表1个选项，重复选项将被自动去重"
                                                >
                                                    <Input.TextArea
                                                        value={batchOptions}
                                                        onChange={e =>
                                                            setBatchOptions(e.target.value)
                                                        }
                                                        placeholder="请输入"
                                                        autoSize={{ minRows: 4, maxRows: 8 }}
                                                    />
                                                </Form.Item>
                                            </Modal>
                                        </>
                                    )
                                }}
                            </Form.List>
                        </Form.Item>
                        {footFields}
                    </>
                )

            case FIELD_TYPE.IMAGE:
            case FIELD_TYPE.ATTACHMENT:
                return (
                    <>
                        {baseItems}
                        <Form.Item required label="数量限制" name="max">
                            <Radio.Group>
                                <Radio value={1}>1个</Radio>
                                <Radio value={2}>2个</Radio>
                                <Radio value={3}>3个</Radio>
                                <Radio value={9999}>不限制</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item required label="大小限制" name="maxSize">
                            <Radio.Group>
                                <Radio value={1}>1M</Radio>
                                <Radio value={2}>2M</Radio>
                                <Radio value={3}>3M</Radio>
                                <Radio value={9999}>不限制</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {footFields}
                    </>
                )

            case FIELD_TYPE.LINK:
                return (
                    <>
                        {baseItems}
                        {footFields}
                    </>
                )

            default:
                return (
                    <>
                        {baseItems}
                        {footFields}
                    </>
                )
        }
    }

    return <>{renderFormItems()}</>
}

export default FormItems
