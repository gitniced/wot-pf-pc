/**
 * @ Author: congrong
 * @ Create Time: 2022-12-22 14:50:29
 * @ Modified by: feeling
 * @ Modified time: 2023-04-21 13:47:48
 */
import { Modal, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import type { IProps } from './interface'
import { getLocalStorage } from '@/storage'

export default (props: IProps) => {
    const { visible, onCancel, onSubmit, records, radioVal, isCreate } = props
    const userStore = getLocalStorage('USER_STORE')
    const { selectedOrganizationDetail } = userStore || {}
    const { companyCode, name: companyName } = selectedOrganizationDetail || {}
    const title = isCreate ? '新增抬头信息' : '编辑抬头信息'
    const [selectVal, setSelectVal] = useState<number>(1) // 1企业 2个人
    const [loading, setLoading] = useState<boolean>(false) //加载
    const [editForSelect, setEditForSelect] = useState<boolean>(false) //编辑禁止修改抬头类型

    const [form] = Form.useForm()

    const Finish = () => {
        form.validateFields()
            .then(values => {
                let tempValues = values
                if (!isCreate && records) {
                    switch (Number(records.type || 0)) {
                        case 1:
                            delete records.userCode
                            delete records.idCard
                            delete records.name
                            break
                        case 2:
                            delete records.userCode
                            delete records.bankAccount
                            delete records.openningBank
                            delete records.taxNum
                            delete records.titleName
                            break
                    }
                    tempValues = { ...records, ...values }
                }
                if (!loading) {
                    setLoading(true)
                    // onSubmit(values, () => setLoading(false))
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
        if (!isCreate && records) {
            form.setFieldsValue(records)
            setEditForSelect(true)
            const { type } = records || {}
            setSelectVal(Number(type))
        } else {
            form.resetFields()
            setEditForSelect(false)
            console.log(companyName, companyCode)
            form.setFieldValue('titleName', companyName)
            form.setFieldValue('taxNum', companyCode)
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
                                    {
                                        required: true,
                                        validator(_: any, value: any) {
                                            if (!value) {
                                                return Promise.reject('请输入税号')
                                            }
                                            if (!/^[a-zA-Z0-9]{6,20}$/.test(value)) {
                                                return Promise.reject(
                                                    '请输入正确的税号，只支持大小写、数字',
                                                )
                                            }
                                            return Promise.resolve()
                                        },
                                    },
                                    // { min: 6, message: '请输入6-20字以内的税号' },
                                    // { max: 20, message: '请输入6-20字以内的税号' },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={20} />
                            </Form.Item>
                            <Form.Item
                                label="地址"
                                name="address"
                                // rules={[
                                //     { required: true, message: '请输入地址' },
                                //     {
                                //         pattern:
                                //             /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g,
                                //         message: '请输入25字以内的地址',
                                //     },
                                //     {
                                //         max: 50,
                                //         message: '请输入25字以内的地址',
                                //     },
                                // ]}
                            >
                                <Input placeholder="请输入" maxLength={50} />
                            </Form.Item>
                            <Form.Item
                                label="电话"
                                name="phone"
                                rules={[
                                    {
                                        pattern:
                                            /^((0\d{2,3}(-)?\d{7,8})|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/,
                                        message: '请输入正确的手机号或座机号',
                                    },
                                    {
                                        max: 25,
                                        message: '请输入25字以内的手机号或座机号',
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
                                    },
                                    {
                                        max: 20,
                                        message: '请输入20字以内的银行账号',
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
                                label="抬头名称"
                                name="name"
                                rules={[
                                    { required: true, message: '请输入您的姓名' },
                                    {
                                        pattern:
                                            /[(\u4e00-\u9fa5)(\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e)]+/g,
                                        message: '请输入15字以内的的姓名',
                                    },
                                    {
                                        max: 15,
                                        message: '请输入15字以内的的姓名',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入您的姓名" maxLength={15} />
                            </Form.Item>
                            <Form.Item
                                label="税号"
                                name="idCard"
                                rules={[
                                    {
                                        pattern:
                                            /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: '请输入正确的身份证号',
                                    },
                                    {
                                        max: 18,
                                        message: '请输入正确的身份证号',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入您的身份证号" maxLength={18} />
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
                            {/* <Form.Item
                                label="电话"
                                name="phone"
                                rules={[
                                    {
                                        pattern:
                                            /^((0\d{2,3}(-)?\d{7,8})|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/,
                                        message: '请输入正确的手机号或座机号',
                                    },
                                    { message: '请输入25字以内的手机号或座机号', max: 25 },
                                ]}
                            >
                                <Input placeholder="请输入" maxLength={25} />
                            </Form.Item> */}
                        </>
                    ) : null}
                </Form>
            </Modal>
        </>
    )
}
