import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Space, Button, Table } from 'antd'
import styles from './index.module.less'
import { useLocalObservable, Observer } from 'mobx-react'
import type { ColumnsType } from 'antd/es/table'
import type { ItemType } from './interface'
import Hooks from './store'
import dayjs from 'dayjs'

interface PropsType {
    visible: boolean
    onCancel: () => void
    onSubmit: (data: any) => void
    type: 'pc' | 'mobile'
}

export default (props: PropsType) => {
    const { visible, type, onCancel, onSubmit } = props

    const hooks = useLocalObservable(() => new Hooks(type))

    const [choiceVal, setChoiceVal] = useState<any>() //选择得数据
    const [okButton, setOkButton] = useState<boolean>(true) //确定有没有选择数据 没有设置为true

    const [form] = Form.useForm()

    const Finish = () => {
        onSubmit(choiceVal)
    }

    useEffect(() => {
        if (!visible) {
            form.resetFields()
            hooks.resetData()
            hooks.rowKeys = []
            setOkButton(true)
        } else {
            hooks.getWeicData()
        }
    }, [visible])

    const rowSelection = {
        selectedRowKeys: hooks.rowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            if (selectedRowKeys.length !== 0) {
                setOkButton(false)
            }
            setChoiceVal(selectedRows)
            hooks.rowKeys = selectedRowKeys
        },
        getCheckboxProps: (record: any) => ({
            code: record?.code,
        }),
    }

    //表格数据
    const columns: ColumnsType<ItemType> = [
        {
            title: '页面名称',
            dataIndex: 'name',
            width: '45%',
            render(col: string) {
                return <>{col ? col : '-'}</>
            },
        },
        {
            title: '发布时间',
            align: 'center',
            dataIndex: 'publishTime',
            width: '45%',
            render(col: number) {
                return <>{col ? dayjs(col).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
    ]

    return (
        <div className={styles.page}>
            <Modal
                forceRender
                title={'选择微页面'}
                visible={visible}
                onCancel={onCancel}
                width={1000}
                onOk={Finish}
                className={styles.boxModal}
                destroyOnClose
                okButtonProps={{
                    disabled: okButton,
                }}
            >
                <div style={{ marginBottom: 24 }}>
                    <Form layout="inline" form={form}>
                        <Form.Item label="页面名称" name="name">
                            <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => hooks.searchData(form.getFieldsValue())}
                                >
                                    查询
                                </Button>
                                <Button
                                    onClick={() => {
                                        form.resetFields()
                                        hooks.resetData()
                                    }}
                                >
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
                <Observer>
                    {() => {
                        return (
                            <Table
                                columns={columns}
                                dataSource={hooks.dataSource}
                                pagination={{
                                    current: hooks.pageNo,
                                    pageSize: hooks.pageSize,
                                    total: hooks.totalCount,
                                    onChange: hooks.pageHandelr,
                                    showQuickJumper: true,
                                    showSizeChanger: true,
                                }}
                                rowSelection={{
                                    preserveSelectedRowKeys: true,
                                    type: 'radio',
                                    ...rowSelection,
                                }}
                                rowKey={record => record?.code}
                            />
                        )
                    }}
                </Observer>
            </Modal>
        </div>
    )
}
