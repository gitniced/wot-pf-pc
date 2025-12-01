import React from 'react'
import Hooks from './hooks'
import { Modal, Input, Form, InputNumber } from 'antd'
import { GlobalSelect } from '@wotu/kp-components'
const EditModal = (props: any) => {
    const { visible, handleCancel, editData } = props || {}
    const [form] = Form.useForm()
    const hooks = Hooks(form, props)
    const { handleOk, limitDecimals } = hooks || {}
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 19 },
    }
    type ObjType = Record<string, string>
    const obj: ObjType = {
        '0': '一级考评范围',
        '1': '一级考评范围',
        '2': '二级考评范围',
        '3': '三级考评范围',
        '4': '相关知识要求',
        '5': '考评点',
    }
    const { level = '2' } = editData || {}
    return (
        <Modal centered title="编辑" open={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form}>
                {Number(level) !== 4 && <Form.Item
                    {...formItemLayout}
                    label={obj[level]}
                    name="name"
                    initialValue={editData?.name}
                    rules={[{ required: true, message: '不能为空' }]}
                >
                    <Input autoComplete="off" placeholder="请输入" />
                </Form.Item>}
                {Number(level) < 4 && (
                    <Form.Item
                        {...formItemLayout}
                        label="权重"
                        name="rate"
                        initialValue={editData?.rate}
                        rules={[{ required: true, message: '不能为空' }]}
                    >
                        <InputNumber
                            placeholder="请输入"
                            min={0.5}
                            step={0.5}
                            style={{ width: '100%' }}
                            formatter={limitDecimals}
                        />
                    </Form.Item>
                )}

                {Number(level) === 4 && (<>
                    <Form.Item name="type" initialValue={3} noStyle/>
                    <Form.Item
                        {...formItemLayout}
                        label="相关知识要求"
                        name="name"
                        initialValue={editData?.name}
                    >
                        <Input placeholder="请输入" style={{ width: '100%' }} />
                    </Form.Item>
                </>
                )}

                {Number(level) === 5 && (
                    <Form.Item
                        label="重要程度"
                        {...formItemLayout}
                        name="important"
                        initialValue={editData?.important}
                        rules={[{ required: true, message: '不能为空' }]}
                    >
                        <GlobalSelect
                            placeholder="请选择重要程度"
                            options={[
                                {
                                    value: 'X',
                                    label: 'X',
                                },
                                {
                                    value: 'Y',
                                    label: 'Y',
                                },
                                {
                                    value: 'Z',
                                    label: 'Z',
                                },
                            ]}
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}
export default EditModal
