import React, { useRef, useState } from 'react'
import { Button, message, Modal, Form, Input, Radio, Space } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import MoreSelect from '@/components/MoreSelect'
import styles from './index.module.less'
import type { IStudent, IStudentPageQuery, ISaveStudentRequest } from './types'
import { getStudentList, updateStudentStatus, deleteStudent, saveStudent } from './service'
import { getStudentTableColumns } from './column'
import BatchImport from '@/components/BatchImport'

const Index: React.FC = () => {
    useSaasTitle('学生管理')
    const actionRef = useRef({
        reload: () => {},
    })
    const [form] = Form.useForm()

    const [_loading, _setLoading] = useState(false)
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [addLoading, setAddLoading] = useState(false)

    const [visibleImport, setVisibleImport] = useState(false)
    const [visibilityState, setVisibilityState] = useState<Map<string, boolean>>(new Map())
    const [, forceUpdate] = useState({})

    const _handleGetStudentList = async (params: IStudentPageQuery) => {
        _setLoading(true)
        try {
            const res = await getStudentList(params)
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

    const handleStatusChange = async (checked: boolean, record: IStudent) => {
        await updateStudentStatus({
            code: record.code,
            status: checked ? 1 : 0,
        })
        message.success(`${checked ? '启用' : '禁用'}成功`)
        actionRef.current.reload()
    }

    const handleDelete = (record: IStudent) => {
        Modal.confirm({
            type: 'warning',
            title: '确定要删除吗，该操作不可逆。',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await deleteStudent(record.code)
                message.success('删除成功')
                actionRef.current.reload()
            },
        })
    }

    const handleAdd = () => {
        form.resetFields()
        setAddModalVisible(true)
    }

    const handleAddStudent = async () => {
        try {
            const values = await form.validateFields()
            setAddLoading(true)

            const studentData: ISaveStudentRequest = {
                name: values.name,
                mobile: values.mobile,
                certificateType: values.certificateType,
                idCard: values.idCard,
                classCode: values.classCode,
                status: 1,
            }

            await saveStudent(studentData)
            message.success('新建学生成功')
            setAddModalVisible(false)
            actionRef.current.reload()
        } catch (error: any) {
            if (error?.errorFields) {
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

    const handleToggleVisibility = (rowKey: string, visible: boolean) => {
        setVisibilityState(prev => {
            const newMap = new Map(prev)
            newMap.set(rowKey, visible)
            return newMap
        })
        forceUpdate({})
    }

    const columns = getStudentTableColumns(
        handleStatusChange,
        handleDelete,
        visibilityState,
        handleToggleVisibility,
    )

    return (
        <div className={styles.page}>
            <CustomTitle title="学生管理" marginBottom={32} />

            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    scroll={{ x: 1200 }}
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
                    request={_handleGetStudentList as any}
                    rowKey="code"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 名学生`,
                    }}
                    beforeSearchSubmit={v => {
                        return {
                            ...v,
                            enrollYear: v.enrollYear?.year(),
                            graduateYear: v.graduateYear?.year(),
                        }
                    }}
                />
            </div>

            <BatchImport
                importApi="/wil/student/import_excel"
                open={visibleImport}
                onCancel={() => {
                    setVisibleImport(false)
                }}
                onOk={(isSuccess: boolean) => {
                    if (isSuccess) actionRef.current.reload()
                }}
                importTemplate="https://static.zpimg.cn/public/fe-engineer-pc/import_template/%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx"
                businessType={49}
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
                        onClick={handleAddStudent}
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

                    <Form.Item
                        name="classCode"
                        label="班级"
                        rules={[{ required: true, message: '请选择班级' }]}
                    >
                        <MoreSelect
                            labelKey="name"
                            valueKey="code"
                            requestUrl={'/wil/class/page'}
                            requestMethod="post"
                            placeholder="请输入关键字搜索"
                            style={{ width: '100%' }}
                            isHasPage={true}
                            formattingResponseBody={(data: any[]) => {
                                return data.map(item => {
                                    // 构建详细信息
                                    const trainLevelMap: Record<number, string> = {
                                        10: '中级技能',
                                        20: '高级技能',
                                        30: '预备技师',
                                    }
                                    const startPointMap: Record<number, string> = {
                                        10: '初中起点',
                                        20: '高中起点',
                                    }

                                    const majorName = item.majorName || ''
                                    const trainLevelText = trainLevelMap[item.trainLevel] || ''
                                    const startPointText = startPointMap[item.startPoint] || ''
                                    const eduLenText = item.eduLen ? `${item.eduLen}年` : ''
                                    const enrollYearText = item.enrollYear || ''

                                    const subtitle = [
                                        majorName,
                                        trainLevelText,
                                        `${startPointText}${eduLenText}`,
                                        enrollYearText,
                                    ]
                                        .filter(Boolean)
                                        .join('-')

                                    return {
                                        ...item,
                                        label: (
                                            <div>
                                                <div>{item.name}</div>
                                                {subtitle && (
                                                    <div
                                                        style={{ fontSize: '12px', color: '#999' }}
                                                    >
                                                        {subtitle}
                                                    </div>
                                                )}
                                            </div>
                                        ),
                                        value: item.code,
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default React.memo(Index)
