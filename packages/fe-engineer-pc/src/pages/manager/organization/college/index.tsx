import React, { useRef, useState } from 'react'
import { Button, message, Modal, Form, Input } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type { ICollege, ICollegePageQuery, ISaveCollegeRequest } from './types'
import {
    getCollegeList,
    updateCollegeStatus,
    updateCollegeSort,
    deleteCollege,
    saveCollege,
} from './service'
import { getCollegeTableColumns } from './column'

const Index: React.FC = () => {
    useSaasTitle('学院管理')
    const actionRef = useRef({
        reload: () => {},
    })

    const [_loading, _setLoading] = useState(false)
    const [form] = Form.useForm()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [editingRecord, setEditingRecord] = useState<ICollege | null>(null)
    const isEditMode = !!editingRecord

    // 获取学院列表
    const _handleGetCollegeList = async (params: ICollegePageQuery) => {
        _setLoading(true)
        try {
            const res = await getCollegeList(params)
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

    // 状态切换处理
    const handleStatusChange = async (checked: boolean, record: ICollege) => {
        await updateCollegeStatus({
            code: record.code,
            status: checked ? 1 : 0,
        })
        message.success(`${checked ? '启用' : '禁用'}成功`)
        actionRef.current.reload()
    }

    // 排序更新处理
    const handleSortChange = async (value: number, record: ICollege) => {
        await updateCollegeSort({
            code: record.code,
            sortOrder: value,
        })
        message.success('排序更新成功')
        actionRef.current.reload()
    }

    // 编辑处理
    const handleEdit = (record: ICollege) => {
        setEditingRecord(record)
        form.setFieldsValue({
            name: record.name,
        })
        setModalVisible(true)
    }

    // 删除处理
    const handleDelete = (record: ICollege) => {
        Modal.confirm({
            type: 'warning',
            title: '确定要删除吗，该操作不可逆。',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await deleteCollege(record.code)
                message.success('删除成功')
                actionRef.current.reload()
            },
        })
    }

    // 新建处理
    const handleAdd = () => {
        setEditingRecord(null)
        form.resetFields()
        setModalVisible(true)
    }

    // 新建/编辑学院处理
    const handleSubmitCollege = async () => {
        try {
            const values = await form.validateFields()
            setModalLoading(true)

            const collegeData: ISaveCollegeRequest = {
                name: values.name,
                // 新建时使用默认值，编辑时保留原有值
                ...(!isEditMode && {
                    sortOrder: 0,
                    status: 1,
                }),
                // 编辑时需要传递 sid 和 code
                ...(isEditMode && {
                    sid: editingRecord!.sid,
                    code: editingRecord!.code,
                }),
            }

            await saveCollege(collegeData)
            message.success(`${isEditMode ? '编辑' : '新建'}学院成功`)
            setModalVisible(false)
            actionRef.current.reload()
        } catch (error: any) {
            if (error?.errorFields) {
                return
            }
        } finally {
            setModalLoading(false)
        }
    }

    // 取消操作
    const handleCancel = () => {
        setModalVisible(false)
        setEditingRecord(null)
        form.resetFields()
    }

    // 表格列定义
    const columns = getCollegeTableColumns(
        handleStatusChange,
        handleSortChange,
        handleEdit,
        handleDelete,
    )

    return (
        <div className={styles.page}>
            {/* @ts-ignore */}
            <CustomTitle title="学院管理" marginBottom={32} />

            <div className={styles.content}>
                {/* @ts-ignore */}
                <BusinessTable
                    actionRef={actionRef}
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleAdd}>
                            新建
                        </Button>
                    )}
                    columns={columns}
                    request={_handleGetCollegeList as any}
                    rowKey="code"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 个项目`,
                    }}
                    formProps={{
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        labelAlign: 'right',
                    }}
                />
            </div>

            <Modal
                title={isEditMode ? '编辑' : '新建'}
                open={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={modalLoading}
                        onClick={handleSubmitCollege}
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
                        label="学院名称"
                        rules={[
                            { required: true, message: '请输入学院名称' },
                            { max: 20, message: '学院名称不能超过20个字符' },
                        ]}
                    >
                        <Input placeholder="请输入学院名称" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default React.memo(Index)
