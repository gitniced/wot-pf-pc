/**
 * @ Author: congrong
 * @ Create Time: 2022-12-22 14:50:29
 * @ Modified by: cqh
 * @ Modified time: 2023-01-13 23:23:47
 */
import { Modal, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import type { IProps } from './interface'

export default (props: IProps) => {
    const { visible, onCancel, onSubmit, records, radioVal } = props
    const title = records?.code ? '编辑抬头信息' : '新增抬头信息'
    const [selectVal, setSelectVal] = useState<number>(1) // 1企业 2个人
    const [loading, setLoading] = useState<boolean>(false) //加载
    const [editForSelect, setEditForSelect] = useState<boolean>(false) //编辑禁止修改抬头类型

    const [form] = Form.useForm()

    const Finish = () => {
        form.validateFields()
            .then(values => {
                let tempValues = values
                if (records) {
                    tempValues = { ...records, ...values }
                }
                if (!loading) {
                    setLoading(true)
                    onSubmit(tempValues, () => setLoading(false))
                }
            })
            .catch(err => {
                return err
            })
    }

    useEffect(() => {
        if (!visible) {
            form.resetFields()
            return
        }
        if (records) {
            form.setFieldsValue(records)
            setEditForSelect(true)
            const { type } = records || {}
            setSelectVal(Number(type))
        } else {
            form.resetFields()
            setEditForSelect(false)
        }
    }, [visible, records])

    // Select onChange事件
    const handleChange = (value: number) => {
        setSelectVal(value)
    }

    useEffect(() => {
        // 判断抬头类型
        if (visible && radioVal) {
            setSelectVal(radioVal)
            form.setFieldsValue({ type: radioVal })
        }
    }, [visible, radioVal])

    return (
        <>
            <Modal
                centered
                destroyOnClose
                title={title}
                visible={visible}
                onCancel={onCancel}
                onOk={Finish}
                confirmLoading={loading}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    initialValues={{
                        type: 1,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="抬头类型"
                        name="type"
                        rules={[{ required: true, message: '请选择抬头类型' }]}
                    >
                        <Select
                            disabled={editForSelect}
                            value={selectVal}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 1,
                                    label: '企业',
                                },
                                {
                                    value: 2,
                                    label: '个人',
                                },
                            ]}
                        />
                    </Form.Item>
                    {/* 判断是企业还是个人 */}
                    {selectVal === 1 ? (
                        <>
                            <Form.Item
                                label="抬头名称"
                                name="titleName"
                                rules={[{ required: true, message: '请输入抬头名称' }]}
                            >
                                <Input placeholder="请输入" maxLength={20} />
                            </Form.Item>
                            <Form.Item
                                label="税号"
                                name="taxNum"
                                rules={[
                                    { required: true, message: '请输入税号' },
                                    {
                                        pattern: /^[A-Za-z0-9]+$/,
                                        message: '请输入25字以内的税号',
                                        max: 25,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={25} />
                            </Form.Item>
                            <Form.Item
                                label="地址"
                                name="address"
                                rules={[
                                    { required: true, message: '请输入地址' },
                                    {
                                        pattern:
                                            /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g,
                                        message: '请输入25字以内的地址',
                                        max: 25,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={25} />
                            </Form.Item>
                            <Form.Item
                                label="电话"
                                name="phone"
                                rules={[
                                    {
                                        pattern:
                                            /^((0\d{2,3}(-)?\d{7,8})|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/,
                                        message: '请输入正确的手机号或座机号',
                                        max: 25,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={25} />
                            </Form.Item>
                            <Form.Item
                                label="银行账号"
                                name="bankAccount"
                                rules={[
                                    {
                                        pattern: /^\d{16,19}$/,
                                        message: '请输入正确的银行账号',
                                        max: 20,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={20} />
                            </Form.Item>
                            <Form.Item label="开户行" name="openningBank">
                                <Input placeholder="请输入" maxLength={20} />
                            </Form.Item>
                        </>
                    ) : selectVal === 2 ? (
                        <>
                            <Form.Item
                                label="姓名"
                                name="name"
                                rules={[
                                    { required: true, message: '请输入姓名' },
                                    {
                                        pattern:
                                            /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g,
                                        message: '请输入15字以内的的姓名',
                                        max: 15,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={15} />
                            </Form.Item>
                            <Form.Item
                                label="身份证号"
                                name="idCard"
                                rules={[
                                    {
                                        pattern:
                                            /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: '请输入18字以内的身份证号',
                                        max: 18,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={18} />
                            </Form.Item>
                            {/* <Form.Item
                                label="地址"
                                name="address"
                                rules={[
                                    {
                                        pattern:
                                            /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g,
                                        message: '请输入25字以内的地址',
                                        max: 25,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={25} />
                            </Form.Item> */}
                            <Form.Item
                                label="电话"
                                name="phone"
                                rules={[
                                    {
                                        pattern:
                                            /^((0\d{2,3}(-)?\d{7,8})|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/,
                                        message: '请输入正确的手机号或座机号',
                                        max: 25,
                                    },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={25} />
                            </Form.Item>
                        </>
                    ) : null}
                </Form>
            </Modal>
        </>
    )
}
