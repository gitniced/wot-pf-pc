import React, { useEffect, useState } from 'react'
import ProposerStore from './store'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import { toJS } from 'mobx'
import { Button, Form, Input, Table, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CustomTitle from '@/components/CustomTitle'
import { useLocation } from 'umi'
import type { FormDataType, FormPropsType } from './interface'
import type { IRoute } from 'umi'
import dayjs from 'dayjs'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'

const Page: IRoute = observer(() => {
    let store = useLocalObservable(() => new ProposerStore())
    let { getProposeList, enterPage, deleteRole, deleteApply } = toJS(store)
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()
    let { query } = useLocation()

    useEffect(() => {
        enterPage(query, currentOrganization)
        if (window.page_size) {
            store.pageHandler(1, window.page_size)
        } else {
            getProposeList(1)
        }
    }, [currentOrganization])

    // from
    const [form] = Form.useForm()

    // 查询按钮
    const onFinish = (values: FormPropsType) => {
        if (values.name || values.mobile) {
            getProposeList(1, values)
        }
    }
    // 重置按钮
    const onReset = () => {
        form.resetFields()
        getProposeList(1, {})
    }

    // table
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [loading, setLoading] = useState(false)

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleOk = () => {
        setIsModalVisible(false)
        setLoading(true)

        deleteApply(selectedRowKeys)
        store.getProposeList()
        setSelectedRowKeys([])
        setLoading(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onDelete = () => {
        setIsModalVisible(true)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => {
            setSelectedRowKeys(keys)
        },
    }
    const hasSelected = selectedRowKeys.length > 0

    const columns: ColumnsType<FormDataType> = [
        {
            title: 'ID',
            key: 'code',
            dataIndex: 'code',

            width: '8%',
        },
        {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',

            width: '12%',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',

            width: '14%',
        },
        {
            title: '申请理由',
            dataIndex: 'reason',
            key: 'reason',

            width: '16%',
        },
        {
            title: '申请加入时间',
            dataIndex: 'createdAt',
            key: 'createdAt',

            render: (_, { createdAt }) => {
                return <div> {dayjs(createdAt).format('YYYY-MM-DD HH:mm') ?? '-'}</div>
            },
        },
        {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',

            width: '16%',

            render: (_, { code, status }) => (
                <div className={styles.operation}>
                    {status === 0 && (
                        <>
                            <div
                                onClick={() => {
                                    deleteRole(code, '1')
                                }}
                            >
                                通过
                            </div>

                            <div
                                onClick={() => {
                                    deleteRole(code, '2')
                                }}
                            >
                                拒绝
                            </div>
                        </>
                    )}
                </div>
            ),
        },
    ]

    return (
        <div className={styles.page}>
            <CustomTitle title="申请人列表" />
            {/* 分类表单 */}
            <div className={styles.classify}>
                <Form layout="inline" form={form} name="classify" onFinish={onFinish} colon>
                    <Form.Item name="name" label="姓名">
                        <Input className={styles.input} placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item name="mobile" label="手机号">
                        <Input className={styles.input} placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            className={styles.btn}
                            type="primary"
                            htmlType="submit"
                            loading={store.btnLoading}
                        >
                            查询
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="button" onClick={onReset} className={styles.btn}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* 表格 */}

            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={store.proposeList}
                pagination={{
                    pageSize: store.pageSize,
                    total: store.pageTotal,
                    showQuickJumper: true,
                    onChange: store.pageHandler,
                    showSizeChanger: true,
                    // onShowSizeChange: onShowSizeChange,
                }}
            />
            <div className={styles.content}>
                <Button
                    className={styles.delete}
                    type="primary"
                    onClick={onDelete}
                    disabled={!hasSelected}
                    loading={loading}
                >
                    批量删除
                </Button>
            </div>

            <Modal
                title="批量删除"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                确定删除所选择的申请吗？
            </Modal>
        </div>
    )
})

Page.title = '申请人列表'

export default Page
