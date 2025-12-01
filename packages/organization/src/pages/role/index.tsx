import React, { useEffect } from 'react'
import RoleStore from './store'
import styles from './index.module.less'
import { Modal, Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { observer, useLocalObservable } from 'mobx-react'
import { history } from 'umi'
import type { RoleDataType, StateType } from './interface'
import type { IRoute } from 'umi'
import OrgTop from '@/components/Pages/Organization/OrgTop'
// import { useUpdateEffect } from 'ahooks'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'

const { confirm } = Modal

const Page: IRoute = observer(() => {
    let store = useLocalObservable(() => new RoleStore())
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()

    let { getRoleList, deleteRole, getOrganizationCode, getOrganizationDetail } = store

    useEffect(() => {
        getOrganizationCode(currentOrganization)
    }, [currentOrganization])

    useEffect(() => {
        if (window.page_size) {
            store.pageHandler(1, window.page_size)
        } else {
            getRoleList()
        }
        if (store.organizationCode) {
            getOrganizationDetail()
        }
    }, [store.organizationCode])

    const gotoPage = (url: string, state?: StateType) => {
        history.push(url, state)
    }

    const clickDelete = (code: string) => {
        store.isHasUser(code).then(res => {
            if (res) {
                Modal.error({
                    centered: true,
                    title: '该角色下已有成员，不可删除。',
                    okText: '我知道了',
                })
            } else {
                confirm({
                    centered: true,
                    title: '确定要删除该角色吗，该操作不可逆。',
                    onOk() {
                        return deleteRole(code)
                    },
                })
            }
        })
    }

    const columns: ColumnsType<RoleDataType> = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',

            width: '25%',
        },
        {
            title: '角色描述',
            dataIndex: 'description',
            key: 'description',

            width: '50%',
        },
        {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',

            width: '25%',
            render: (_, { code, name, description, type }) => (
                <>
                    <div className={styles.operation}>
                        {type?.toString?.() === '1' && (
                            <>
                                <div
                                    onClick={() => {
                                        gotoPage(`/role/edit?type=edit&code=${code}`, {
                                            name,
                                            description,
                                        })
                                    }}
                                >
                                    编辑
                                </div>
                                <div
                                    onClick={() => {
                                        gotoPage(`/role/edit?type=edit&code=${code}&step=1`, {
                                            name,
                                        })
                                    }}
                                >
                                    权限配置
                                </div>
                                <div
                                    onClick={() => {
                                        clickDelete(code)
                                    }}
                                >
                                    删除
                                </div>
                            </>
                        )}
                    </div>
                </>
            ),
        },
    ]

    return (
        <div className={styles.page}>
            <OrgTop organizationDetail={store.organizationDetail} />
            <div className={styles.main}>
                <Button
                    type="primary"
                    onClick={() => gotoPage(`/role/edit?type=new`)}
                    className={styles.btn}
                >
                    + 新 建
                </Button>

                <Table
                    columns={columns}
                    dataSource={store.roleList}
                    pagination={{
                        pageSize: store.pageSize,
                        total: store.pageTotal,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: store.pageHandler,
                    }}
                />
            </div>
        </div>
    )
})

Page.title = '角色管理'
export default Page
