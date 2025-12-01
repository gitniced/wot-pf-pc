import { Input, Form, Button, Tabs, Pagination, Space, Popconfirm, message } from 'antd'
import PositionManageStore from './store'
import type { ProfessionListFrontDto } from '@/@types/profession'
import { history } from 'umi'
import { useLocalStore, observer } from 'mobx-react'
import { useEffect, useState, useCallback } from 'react'
import { SuperTable } from '@wotu/wotu-components'
import { tableColumns } from './config'
import styles from './index.module.less'
import CommonTitle from '@/components/CommonTitle'

type FieldType = {
    professionName?: string
}

const Index = () => {
    const [form] = Form.useForm()
    const store = useLocalStore(() => new PositionManageStore())

    const [autoIncrement, setAutoIncrement] = useState(0)
    const [auth, setAuth] = useState(false)
    const [status, setStatus] = useState('')
    const [PageNo, setPageNo] = useState(1)
    const [PageSize, setPageSize] = useState(10)
    const [formData, setFormData] = useState({})
    const [deleteRow, setDeleteRow] = useState<string[]>([])
    const professionName = Form.useWatch('professionName', form)

    useEffect(() => {
        document.title = '职位管理'
        store.education()
        store.experience()
        store.queryCount({})
        store.profession_page({})
        store.auth().then((response: any) => {
            if (typeof response === 'number') {
                setAuth(response === 100)
            } else {
                console.error('Unexpected response data type:')
            }
        })
    }, [])

    useEffect(() => {
        store.profession_page({
            ...formData,
            ...(/\d/.test(status) ? { status: Number(status) } : {}),
            pageNo: 1,
            pageSize: PageSize,
        })
        setPageNo(1)
    }, [status])

    useEffect(() => {
        store.queryCount(formData)
        store.profession_page({
            ...formData,
            ...(/\d/.test(status) ? { status: Number(status) } : {}),
            pageNo: PageNo,
            pageSize: PageSize,
        })
    }, [formData, PageNo, PageSize, autoIncrement])

    const onFinish = (value: object) => {
        setPageNo(1)
        setFormData(value)
        setAutoIncrement(autoIncrement + 1)
    }

    const onTabsChange = (key: string) => {
        setStatus(key)
        setPageNo(1)
    }

    const addProfession = useCallback(() => {
        if (!auth) return message.warning('您需要完善公司主页信息后才能发布职位')
        history.push('/company/position-manage-add')
    }, [auth])

    const onPaginationChange = (pageNo: number, pageSize: number) => {
        setPageNo(pageNo)
        setPageSize(pageSize)
    }

    // 更新页面的通用方法
    const updatePage = () => {
        store.profession_page({
            ...formData,
            ...(/\d/.test(status) ? { status: Number(status) } : {}),
            pageNo: PageNo,
            pageSize: PageSize,
        })
        store.queryCount({ professionName })
    }

    // 搜索框重置按钮
    const onReset = () => {
        form.resetFields()
        setPageNo(1)
        setFormData({ professionName: '' })
        setAutoIncrement(autoIncrement + 1)
    }

    //表格操作栏删除逻辑
    const deleteFunc = async (code: string) => {
        store.deleteByCodes([code]).then(() => {
            message.success('删除chengg')
            updatePage()
        })
    }

    //表格操作栏编辑逻辑
    const editFunc = (code: string) => {
        history.push(`/company/position-manage-add?code=${code}`)
    }

    // 职位下架逻辑
    const closeFunc = (code: string) => {
        store.updateStatus({ code, status: 2 }).then(() => {
            updatePage()
        })
    }

    // 职位上架逻辑
    const publishFunc = (code: string) => {
        store.updateStatus({ code, status: 1 }).then(() => {
            message.success('操作成功')
            updatePage()
        })
    }

    // 职位批量删除的逻辑
    const batchDelete = () => {
        store.deleteByCodes(deleteRow).then(() => {
            message.success('删除成功')
            setDeleteRow([])
            updatePage()
        })
    }

    return (
        <div className={styles.container}>
            <CommonTitle style={{ marginBottom: 24 }}>职位管理</CommonTitle>
            <div style={{ height: 32 }}>
                <Form
                    name="basic"
                    form={form}
                    layout="inline"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16, offset: 1 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType> label="职业名称" name="professionName">
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
            <div className={styles.add}>
                <Button type="primary" onClick={addProfession}>
                    新增
                </Button>
            </div>
            <Tabs
                defaultActiveKey=""
                items={JSON.parse(JSON.stringify(store.tabs))}
                onChange={onTabsChange}
            />
            <div className={styles.content}>
                <SuperTable
                    columns={tableColumns({
                        store,
                        deleteFunc,
                        editFunc,
                        closeFunc,
                        publishFunc,
                        // @ts-ignore
                        keyWord: formData?.professionName,
                    })}
                    dataSource={store.dataSource?.data}
                    pagination={false}
                    search={false}
                    rowKey="code"
                    rowSelection={{
                        type: 'checkbox',
                        preserveSelectedRowKeys: true,
                        selectedRowKeys: deleteRow,
                        onChange: (_: React.Key[], allSelectedRows: ProfessionListFrontDto[]) => {
                            setDeleteRow(allSelectedRows.map(item => item.code!))
                        },
                    }}
                />
                <div className={styles.base}>
                    <div>
                        <Space>
                            {deleteRow.length === 0 ? (
                                <Button disabled={true} type="primary">
                                    批量删除
                                </Button>
                            ) : (
                                <Popconfirm
                                    placement="topLeft"
                                    title={'是否确认删除所选中职位?'}
                                    onConfirm={batchDelete}
                                    okText="删除"
                                    cancelText="取消"
                                >
                                    <Button type="primary">批量删除</Button>
                                </Popconfirm>
                            )}
                            <span>已选{deleteRow.length}项</span>
                        </Space>
                    </div>
                    <Pagination
                        showQuickJumper
                        current={PageNo}
                        showSizeChanger
                        total={store.dataSource?.totalCount}
                        onChange={onPaginationChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Index)
