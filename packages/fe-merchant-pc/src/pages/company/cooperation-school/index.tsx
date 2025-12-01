import { SuperTable } from '@wotu/wotu-components'
import { Button, Pagination, Form, Input, Space, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { tableColumns } from './config'
import { useLocalStore, observer } from 'mobx-react'
import CooperationSchoolStore from './store'
import styles from './index.module.less'

const Index = () => {
    const [form] = Form.useForm()
    const [deleteRow, setDeleteRow] = useState<string[]>([])
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [keywords, setKeywords] = useState('')
    const [autoIncrement, setAutoIncrement] = useState(0)

    const store = useLocalStore(() => new CooperationSchoolStore())

    const batchDelete = async () => {
        await store.deleteCooperation(deleteRow as [])
        await store.getCooperationList({ keywords, pageSize, pageNo })
    }

    useEffect(() => {
        document.title = '合作院校'
    }, [])

    useEffect(() => {
        store.getCooperationList({ keywords, pageSize, pageNo })
    }, [keywords, pageSize, pageNo, autoIncrement])

    // 清空搜索框内容
    const onReset = () => {
        form.resetFields()
        if (keywords === '' && pageNo === 1) {
            store.getCooperationList({ keywords, pageSize, pageNo: 1 })
        } else {
            setKeywords(() => '')
            setPageNo(1)
        }
    }

    // 提交表单数据
    const onFinish = (value: any) => {
        if (keywords === value?.keywords && pageNo === 1) {
            store.getCooperationList({ keywords: value.keywords, pageSize, pageNo: 1 })
        } else {
            setKeywords(value?.keywords)
            setPageNo(1)
        }
    }

    // 分页器
    const onPaginationChange = (pageNo: number, pageSize: number) => {
        setPageNo(pageNo)
        setPageSize(pageSize)
    }

    return (
        <div className={styles.cooperation_container}>
            <div className={styles.title}>
                <div />
                <span>合作院校</span>
            </div>
            <div className={styles.search}>
                <Form
                    name="basic"
                    form={form}
                    layout="inline"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="院校名称" name="keywords">
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={styles.content}>
                <SuperTable
                    columns={tableColumns({
                        terminateCooperation: store.deleteCooperation,
                        setAutoIncrement,
                        autoIncrement,
                    })}
                    // @ts-ignore
                    dataSource={store.CooperationList?.page?.data}
                    pagination={false}
                    search={false}
                    rowKey="code"
                    rowSelection={{
                        type: 'checkbox',
                        preserveSelectedRowKeys: true,
                        selectedRowKeys: deleteRow,
                        // @ts-ignore
                        onChange: (_: string[], allSelectedRows: any[]) => {
                            setDeleteRow(allSelectedRows.map((item: any) => item.code))
                        },
                    }}
                />
                <div className={styles.base}>
                    <div>
                        <Space>
                            {deleteRow.length === 0 ? (
                                <Button disabled={true}>批量解除合作</Button>
                            ) : (
                                <Popconfirm
                                    placement="topLeft"
                                    title={'是否确认解除所有选中的院校的合作关系?'}
                                    onConfirm={batchDelete}
                                    okText="删除"
                                    cancelText="取消"
                                >
                                    <Button disabled={deleteRow.length === 0} type="primary">
                                        批量解除合作
                                    </Button>
                                </Popconfirm>
                            )}
                            <span>已选{deleteRow.length}项</span>
                        </Space>
                    </div>
                    <Pagination
                        showQuickJumper
                        current={pageNo || 1}
                        showSizeChanger
                        // @ts-ignore
                        total={store.CooperationList?.page?.totalCount}
                        onChange={onPaginationChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Index)
