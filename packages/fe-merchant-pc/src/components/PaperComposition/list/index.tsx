/**
 * 组卷
 */
import { Badge, Button, Modal, Space, Table, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { initSearchParams, composeEnum, statusEnum } from './const'
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import type { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'
import ComposeStore from './store'
import { toJS } from 'mobx'
import type { SearchParams, TableItem, UserDataType } from './interface'
import SearchForm from './components/SearchForm'
import CopyTemplate from './components/CopyTemplate'
import { findSiteData } from '@/utils/valueGet'
import TitleBlock from '@/components/TitleBlock'
import useSiteStore from '@/hooks/useSiteStore'
import useUserStore from '@/hooks/useUserStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import useCommonParams from '@/hooks/useCommonParams'

const ExamineComposition = () => {
    const masterHistory = useMasterHistory()
    const siteStore = useSiteStore()
    const userStore = useUserStore()

    const commonParams = useCommonParams()

    const [recordData, setRecordData] = useState<TableItem>() // 行数据
    const [temVisible, setTemVisible] = useState<boolean>(false) // 复制模板弹窗
    const userData = userStore?.userData ?? ({} as UserDataType)
    const { siteData } = siteStore ?? {}
    const {
        searchParams,
        paginationObj,
        tableData,
        setSearchParams,
        setPaginationObj,
        setUserData,
        getTableList,
        tableChange,
        delTableItem,
    } = toJS(ComposeStore) || {}

    useEffect(() => {
        setUserData(userData)
        getTableList()
        setSearchParams(commonParams)

        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' })
        document.title = `组卷模板管理-${siteName}`
    }, [])
    /**
     * 删除
     * @param code
     */
    const deleteItem = (code: string) => {
        Modal.confirm({
            title: '删除组卷模板',
            icon: <ExclamationCircleFilled />,
            centered: true,
            content: '删除后无法找回，是否确定删除？',
            onOk: async () => {
                await delTableItem(code)
                message.success('删除成功')
                getTableList()
            },
        })
    }
    const tableColumns: ColumnsType<TableItem> = [
        {
            title: '模板名称',
            dataIndex: 'title',
            key: 'title',
            width: 432,
            render: (text: string, record) => (
                <Typography.Link
                    onClick={() => {
                        masterHistory.push(
                            `/merchant-center/paper-library/examine-composition/detail?code=${record.code}`,
                        )
                    }}
                >
                    {text}
                </Typography.Link>
            ),
        },
        {
            title: '组卷方式',
            dataIndex: 'composition',
            key: 'composition',
            width: 152,
            render: text => <>{composeEnum[text]}</>,
        },
        {
            title: '职业',
            dataIndex: 'customContent',
            key: 'workName',
            width: 247,
            render: (customContent: any) => <>{customContent?.commonJob?.jobName}</>,
        },
        {
            title: '工种',
            dataIndex: 'customContent',
            key: 'workType',
            width: 206,
            render: (customContent: any) => <>{customContent?.commonJob?.jobType}</>,
        },
        {
            title: '等级',
            dataIndex: 'customContent',
            key: 'workLevel',
            width: 131,
            render: (customContent: any) => <>{customContent?.commonJob?.jobLevel}</>,
        },
        {
            title: '创建人',
            dataIndex: 'createBy',
            key: 'point',
            width: 112,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'type',
            width: 180,
            render: (text: number) => <>{dayjs(text).format('YYYY-MM-DD HH:mm')}</>,
        },
        {
            title: '状态',
            dataIndex: 'usedState',
            key: 'usedState',
            width: 120,
            render: text => (
                <>
                    <Badge status={text === 1 ? 'success' : 'default'} />
                    {statusEnum[text]}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (_, item: TableItem) => {
                const { usedState, code } = item || {}
                return (
                    <Space size="middle">
                        <Typography.Link
                            onClick={() => {
                                setRecordData(item)
                                setTemVisible(true)
                            }}
                        >
                            复制
                        </Typography.Link>
                        {usedState === 0 && (
                            <>
                                <Typography.Link
                                    onClick={() => {
                                        masterHistory.push(
                                            `/merchant-center/paper-library/examine-composition/edit?code=${code}`,
                                        )
                                    }}
                                >
                                    编辑
                                </Typography.Link>

                                <Typography.Link onClick={() => deleteItem(code)}>
                                    删除
                                </Typography.Link>
                            </>
                        )}
                    </Space>
                )
            },
        },
    ]

    return (
        <div className={styles.list}>
            <TitleBlock title="组卷模板管理" />
            <SearchForm
                initSearchParams={initSearchParams}
                searchParams={searchParams}
                onSearch={(values: SearchParams) => {
                    setSearchParams(values)
                    setPaginationObj({ current: 1 })
                    getTableList()
                }}
            />
            <Button
                type="primary"
                className={styles.new_btn}
                onClick={() =>
                    masterHistory.push('/merchant-center/paper-library/examine-composition/create')
                }
            >
                <PlusOutlined />
                新建
            </Button>
            <Table
                className={styles.table}
                columns={tableColumns}
                rowKey="code"
                dataSource={tableData}
                scroll={{ x: 1251 }}
                pagination={{
                    onChange: tableChange,
                    current: paginationObj.current,
                    total: paginationObj.total,
                    pageSize: paginationObj.pageSize,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: total => <span>{`共${total}条`}</span>,
                }}
            />
            {temVisible && (
                <CopyTemplate
                    visible={temVisible}
                    recordData={recordData}
                    userCode={userData.code}
                    handleOk={() => {
                        setTemVisible(false)
                        setPaginationObj({ current: 1 })
                        getTableList()
                    }}
                    handleCancel={() => setTemVisible(false)}
                />
            )}
        </div>
    )
}

export default observer(ExamineComposition)
