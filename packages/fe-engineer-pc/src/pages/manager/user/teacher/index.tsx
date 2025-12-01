import React, { useRef, useState } from 'react'
import { Button, message, Modal, Form, Input, Radio, Space } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type { ITeacher, ITeacherPageQuery, ISaveTeacherRequest } from './types'
import { getTeacherList, updateTeacherStatus, deleteTeacher, saveTeacher } from './service'
import { getTeacherTableColumns } from './column'
import BatchImport from '@/components/BatchImport'

const Index: React.FC = () => {
    useSaasTitle('教师管理')
    const actionRef = useRef({
        reload: () => {},
    })
    const [form] = Form.useForm()

    const [_loading, _setLoading] = useState(false)
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [addLoading, setAddLoading] = useState(false)

    const [visibleImport, setVisibleImport] = useState(false)

    const _handleGetTeacherList = async (params: ITeacherPageQuery) => {
        _setLoading(true)
        try {
            const res = await getTeacherList(params)
            _setLoading(false)
            return {
                data: res.data || [],
                totalCount: res.totalCount || 0,
                success: true,
            }
        } catch (error) {
            _setLoading(false)
            return {
                data: [],
                totalCount: 0,
                success: false,
            }
        }
    }

    const handleStatusChange = async (checked: boolean, record: ITeacher) => {
        await updateTeacherStatus({
            code: record.code,
            status: checked ? 1 : 0,
        })
        message.success(`${checked ? '启用' : '禁用'}成功`)
        actionRef.current.reload()
    }

    const handleDelete = (record: ITeacher) => {
        Modal.confirm({
            type: 'warning',
            title: '确定要删除吗，该操作不可逆。',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await deleteTeacher(record.code)
                message.success('删除成功')
                actionRef.current.reload()
            },
        })
    }

    const handleAdd = () => {
        form.resetFields()
        setAddModalVisible(true)
    }

    const handleAddTeacher = async () => {
        try {
            const values = await form.validateFields()
            setAddLoading(true)

            const teacherData: ISaveTeacherRequest = {
                name: values.name,
                mobile: values.mobile,
                certificateType: values.certificateType,
                idCard: values.idCard,
                status: 1, // 默认启用
            }

            await saveTeacher(teacherData)
            message.success('新建教师成功')
            setAddModalVisible(false)
            actionRef.current.reload()
        } catch (error: any) {
            if (error?.errorFields) {
                // 表单验证失败
                return
            }
        } finally {
            setAddLoading(false)
        }
    }

    const handleCancelAdd = () => {
        setAddModalVisible(false)
        form.resetFields()
    }

    const columns = getTeacherTableColumns(handleStatusChange, handleDelete)

    return (
        <div className={styles.page}>
            <CustomTitle title="教师管理" marginBottom={32} />

            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    scroll={{ x: 800 }}
                    desensitizationList={[
                        { key: 'name', type: '1', sign: true },
                        { key: 'mobile', type: '2', sign: false },
                        { key: 'idCard', type: '3', sign: false },
                    ]}
                    renderOptionBar={() => (
                        <Space>
                            <Button type="primary" onClick={handleAdd}>
                                新建
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setVisibleImport(true)
                                }}
                            >
                                批量导入
                            </Button>
                        </Space>
                    )}
                    columns={columns}
                    request={_handleGetTeacherList as any}
                    rowKey="code"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 名教师`,
                    }}
                />
            </div>

            <BatchImport
                importApi="/wil/teacher/import_excel"
                open={visibleImport}
                onCancel={() => {
                    setVisibleImport(false)
                }}
                onOk={(isSuccess: boolean) => {
                    if (isSuccess) actionRef.current.reload()
                }}
                importTemplate="https://static.zpimg.cn/public/fe-engineer-pc/import_template/%E6%95%99%E5%B8%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx"
                businessType={50}
            />

            <Modal
                title="新建"
                open={addModalVisible}
                onCancel={handleCancelAdd}
                footer={[
                    <Button key="cancel" onClick={handleCancelAdd}>
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={addLoading}
                        onClick={handleAddTeacher}
                    >
                        确定
                    </Button>,
                ]}
                width={520}
                destroyOnClose
            >
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="right"
                >
                    <Form.Item
                        name="name"
                        label="姓名"
                        rules={[
                            { required: true, message: '请输入姓名' },
                            { max: 50, message: '姓名不能超过50个字符' },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        name="mobile"
                        label="手机号"
                        rules={[
                            { required: true, message: '请输入手机号' },
                            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        name="certificateType"
                        label="证件类型"
                        rules={[{ required: true, message: '请选择证件类型' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>身份证</Radio>
                            <Radio value={2}>护照</Radio>
                            <Radio value={3}>其他证件</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="idCard"
                        label="证件号码"
                        rules={[
                            { required: true, message: '请输入证件号码' },
                            { max: 50, message: '证件号码不能超过50个字符' },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default React.memo(Index)
