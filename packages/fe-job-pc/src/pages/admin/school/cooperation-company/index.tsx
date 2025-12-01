/* eslint-disable */
import { SuperTable } from '@wotu/wotu-components'
import { Button, Pagination, Form, Input, Space, Tabs, Modal, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { useModel } from 'umi'
import UserStore from '@/stores/userStore'
import type { MasterStore } from '@/types'
import { tableColumns } from './config'
import { useLocalStore, inject, observer } from 'mobx-react'
import CooperationSchoolStore from './store'
import styles from './index.module.less'

const Index = () => {
    const masterStore: MasterStore = useModel('@@qiankunStateFromMaster')

    const [orgName, setOrgName] = useState('')
    const [autoIncrement, setAutoIncrement] = useState(0)
    const [form] = Form.useForm()

    const [deleteRow, setDeleteRow] = useState<any[]>([])
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [keywords, setKeywords] = useState('')
    const [activeKey, setActiveKey] = useState('1')
    const [inviteCode, setInviteCode] = useState('')
    const [inviteOpen, setInviteOpen] = useState(false)

    const store = useLocalStore(() => new CooperationSchoolStore())
    const _userStore = useLocalStore(() => new UserStore())

    // 批量解除合作
    const batchDelete = async () => {
        await store.deleteCooperation(deleteRow as unknown as [])
        store.getCooperationList({ pageSize, pageNo, waitCheck: activeKey === '2', keywords })
        setDeleteRow([])
    }

    useEffect(() => {
        document.title = '合作企业'
        // {process.env.BUILD_ENV === 'development' && <p>这是开发环境</p>}
        // {process.env.NODE_ENV === 'production' && <p>这是生产环境</p>}
        // {process.env.NODE_ENV === 'test' && <p>这是测试环境</p>}
    }, [])

    const masterStoreStr = JSON.stringify(masterStore)

    useEffect(() => {
        if (masterStoreStr && masterStore?.masterStore?.userStore) {
            const {
                selectedOrganizationDetail: { name },
                userData: { name: userName, nickname, mobile },
            } = masterStore?.masterStore?.userStore

            const regex = /^(\d{3})\d{4}(\d{4})$/
            const applyName = userName || nickname || mobile.replace(regex, '$1****$2')

            setOrgName(`${name}-${applyName}`)
        }
    }, [masterStoreStr])

    useEffect(() => {
        let waitCheck = false
        if (activeKey === '2') {
            waitCheck = true
        }
        store.getCooperationList({ pageSize, pageNo, waitCheck, keywords })
    }, [keywords, pageSize, pageNo, activeKey, autoIncrement])

    // 拒绝操作
    const saveOperate = async ({ code, status }: { code: string; status: number }) => {
        await store.saveOperate({ code, status })
        store.getCooperationList({ pageSize, pageNo, waitCheck: activeKey === '2', keywords })
    }

    // 清空搜索框内容
    const onReset = () => {
        setKeywords('')
        setPageNo(1)
        form.resetFields()
        setAutoIncrement(autoIncrement + 1)
    }

    // 提交表单数据
    const onFinish = (value: object) => {
        setKeywords(value?.keywords)
        setPageNo(1)
        setAutoIncrement(autoIncrement + 1)
    }

    // 分页器
    const onPaginationChange = (pageNo: number, pageSize: number) => {
        setPageNo(pageNo)
        setPageSize(pageSize)
    }

    // tab切换回调
    const tabChange = (activeKey: string) => {
        setActiveKey(activeKey)
        setPageNo(1)
    }

    // 学校邀请企业
    const inviteFunc = async () => {
        const resp = await store.getInvite({
            applyName: orgName,
            redirection: inviteCode?.merchantUserDomain,
        })
        setInviteCode(resp as unknown as string)
        setInviteOpen(true)
    }

    const clipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(
                    `${inviteCode?.courseMerchantDomain}/invite/login?inviteCode=` +
                        encodeURIComponent(inviteCode?.code),
                )
                .then(
                    () => {
                        message.success('复制成功')
                    },
                    () => {
                        message.error('复制失败')
                    },
                )
        }
    }

    // 解除合作
    const deleteCooperation = async (code: string) => {
        await store.deleteCooperation([code] as unknown as [])
        store.getCooperationList({ pageSize, pageNo, waitCheck: activeKey === '2', keywords })
    }

    const rowSelection =
        activeKey === '1'
            ? {
                  rowSelection: {
                      type: 'checkbox',
                      preserveSelectedRowKeys: true,
                      selectedRowKeys: deleteRow,
                      onChange: (_: string[], allSelectedRows: any[]) => {
                          setDeleteRow(allSelectedRows.map(item => item.code))
                      },
                  },
              }
            : {}

    return (
        <div className={styles.cooperation_container}>
            <Modal
                footer={null}
                onCancel={() => setInviteOpen(false)}
                open={inviteOpen}
                title="合作邀请"
                width={520}
            >
                <div className={styles.cooperation_modal}>
                    <div className={styles.apply_person}>{orgName}</div>
                    <div>邀请你加入智慧就业平台进行校企合作，一起进入智慧就业时代</div>
                    <div className={styles.invite_url}>
                        <span>邀请链接：</span>
                        <span>访问链接申请加入合作</span>
                    </div>
                    <div className={styles.copy}>
                        <div className={styles.url}>
                            <span>
                                {
                                    `${inviteCode?.courseMerchantDomain}/invite/login?inviteCode=` +
                                        encodeURIComponent(inviteCode?.code)
                                    //  +
                                    // '&applyName=' +
                                    // encodeURIComponent(orgName) +
                                    // '&redirection=' +
                                    // encodeURIComponent(inviteCode?.merchantUserDomain)
                                }
                            </span>
                        </div>
                        <Button onClick={clipboard} type="primary">
                            复制
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className={styles.title}>
                <div />
                <span>合作企业</span>
            </div>
            <div className={styles.search}>
                <Form
                    name="basic"
                    form={form}
                    layout="inline"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16, offset: 1 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item label="企业名称" name="keywords">
                        <Input />
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
            <div>
                <Button type="primary" onClick={inviteFunc}>
                    合作邀请
                </Button>
            </div>
            <Tabs onChange={tabChange} items={store.items} />
            <div className={styles.content}>
                <SuperTable
                    columns={tableColumns({
                        terminateCooperation: deleteCooperation,
                        activeKey,
                        saveOperate,
                    })}
                    dataSource={store.CooperationList?.page?.data}
                    pagination={false}
                    search={false}
                    rowKey="code"
                    {...rowSelection}
                />
                <div className={styles.base}>
                    <div>
                        {activeKey === '1' && (
                            <Space>
                                {deleteRow.length === 0 ? (
                                    <Button disabled={true}>批量解除合作</Button>
                                ) : (
                                    <Popconfirm
                                        placement="topRight"
                                        title={'确认要解除合作么?'}
                                        onConfirm={batchDelete}
                                        okText="解除"
                                        cancelText="取消"
                                    >
                                        <Button type="primary">批量解除合作</Button>
                                    </Popconfirm>
                                )}
                                <span>已选{deleteRow.length}项</span>
                            </Space>
                        )}
                    </div>
                    <Pagination
                        showQuickJumper
                        defaultCurrent={1}
                        showSizeChanger
                        total={store.dataSource?.totalCount}
                        onChange={onPaginationChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')<any>(observer(Index))
