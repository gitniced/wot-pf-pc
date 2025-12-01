import { Button, Tabs, Pagination, Space, Popconfirm, message } from 'antd'
import PositionManageStore from './store'
// @ts-ignore
import type { IRoute } from 'umi';
import { history } from 'umi'
import { useLocalStore, observer } from 'mobx-react'
import React, { useEffect, useState, useRef } from 'react'
import { SuperTable } from '@wotu/wotu-components'
import { tableColumns } from './config'
import type { ProfessionListFrontDto } from './interface'
import styles from './index.module.less'
import TitleBlock from '@/components/TitleBlock'
import { getSessionStorage } from '@/storage'
import classNames from 'classnames'

const Index = () => {
    const store = useLocalStore(() => PositionManageStore)

    const { pagination, totalCount } = store

    const [status, setStatus] = useState<string>()
    const [deleteRow, setDeleteRow] = useState<string[]>()

    // 是否是中台
    const isMiddle = getSessionStorage('PLATFORM') === 'middle'

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    useEffect(() => {
        store.queryCount()
        store.education()
        store.experience()
    }, [])

    const onTabsChange = (key: string) => {
        setStatus(key)
    }

    const addProfession = () => {
        history.push('/admin/company/position-manage/create')
    }

    //表格操作栏删除逻辑
    const deleteFunc = async (code: string) => {
        store.deleteByCodes([code]).then(() => {
            message.success('删除成功')
            actionRef.current.reload()
        })
    }

    // 表格操作栏编辑逻辑
    const editFunc = (code: string) => {
        history.push(`/admin/company/position-manage/edit?code=${code}`)
    }

    // 职位下架逻辑
    const closeFunc = (code: string) => {
        store.updateStatus({ code, status: 2 }).then(() => {
            message.success('操作成功')
            actionRef.current.reload()
        })
    }

    // 职位上架逻辑
    const publishFunc = (code: string) => {
        store.updateStatus({ code, status: 1 }).then(() => {
            message.success('操作成功')
            actionRef.current.reload()
        })
    }

    // 职位批量删除的逻辑
    const batchDelete = () => {
        store.deleteByCodes(deleteRow).then(() => {
            message.success('删除成功')
            setDeleteRow([])
            actionRef.current.reload()
        })
    }

    const onPaginationChange = (pageNo: number, pageSize: number) => {
        store.onChangePagination(pageNo, pageSize)
    }

    return (
        <div
            className={classNames(styles.container, {
                [styles.isMiddle]: isMiddle,
            })}
        >
            <TitleBlock title="职位管理" />
            <div className={styles.content}>
                <SuperTable
                    actionRef={actionRef}
                    rowKey="code"
                    params={{
                        status,
                        ...pagination,
                    }}
                    columns={tableColumns({
                        store,
                        deleteFunc,
                        editFunc,
                        closeFunc,
                        publishFunc,
                    })}
                    request={store.profession_page}
                    pagination={false}
                    renderOptionBar={{
                        top: () => (
                            <Button type="primary" onClick={addProfession}>
                                新增
                            </Button>
                        ),
                        center: () => (
                            <Tabs
                                items={JSON.parse(JSON.stringify(store.tabs))}
                                onChange={onTabsChange}
                            />
                        ),
                    }}
                    rowSelection={{
                        type: 'checkbox',
                        preserveSelectedRowKeys: true,
                        selectedRowKeys: deleteRow,
                        onChange: (_: React.Key[], allSelectedRows: ProfessionListFrontDto[]) => {
                            setDeleteRow(allSelectedRows.map(item => item.code!))
                        },
                    }}
                    scroll={{ x: 0 }}
                />
                <div className={styles.base}>
                    <Space>
                        {!deleteRow?.length ? (
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
                        <span>已选{deleteRow?.length || 0}项</span>
                    </Space>
                    <Pagination
                        showQuickJumper
                        showSizeChanger
                        current={pagination.pageNo}
                        pageSize={pagination.pageSize}
                        total={totalCount}
                        onChange={onPaginationChange}
                    />
                </div>
            </div>
        </div>
    )
}

const observePage: IRoute = observer(Index)
observePage.title = '职位管理'
export default observePage
