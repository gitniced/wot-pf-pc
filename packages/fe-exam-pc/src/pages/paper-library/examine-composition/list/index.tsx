/**
 * 组卷
 */
import { Badge, Button, Modal, Space, Typography, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ProfessionCascade from '@/components/ProfessionCascade'
import { composeEnum, reviewStatusEnums, statusEnum, tenplateTypeEnum } from './const'
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import styles from './index.module.less'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'
import ComposeStore from './store'
import { toJS } from 'mobx'
import type { TableItem, UserDataType } from './interface'
import CopyTemplate from './components/CopyTemplate'
import { findSiteData } from '@/utils/valueGet'
import TitleBlock from '@/components/TitleBlock'
import useUserStore from '@/hooks/useUserStore'
import useSiteStore from '@/hooks/useSiteStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import BusinessTable from '@/components/BusinessTable'
import { composeOptions, reviewStatusOptions, statusOptions } from './components/SearchForm/const'
import { getCookie } from '@/storage'

const ExamineComposition = () => {
    const userStore = useUserStore()
    const siteStore = useSiteStore()
    const masterHistory = useMasterHistory()
    const actionRef = useRef<any>()

    const [recordData, setRecordData] = useState<TableItem>() // 行数据
    const [temVisible, setTemVisible] = useState<boolean>(false) // 复制模板弹窗
    const userData = userStore?.userData ?? ({} as UserDataType)
    const { siteData } = siteStore ?? {}
    const { setPaginationObj, setUserData, getTableList, delTableItem } = toJS(ComposeStore) || {}

    useEffect(() => {
        setUserData(userData)

        const siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''
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
                actionRef.current.reload()
            },
        })
    }
    const tableColumns: ColumnsTypeItem<TableItem>[] = [
        {
            title: '模板名称',
            dataIndex: 'title',
            key: 'title',
            width: 240,
            search: true,
            render: (text: string, record) => (
                <Typography.Link
                    onClick={() => {
                        masterHistory.push(`./platform/detail?code=${record.code}`)
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
            search: true,
            valueType: 'select',
            formItemProps: {
                initialValue: 'authenticate,questiontype,fromfile',
            },
            fieldProps: {
                options: composeOptions,
            },
            render: text => <>{composeEnum[text]}</>,
        },
        {
            title: '类型',
            dataIndex: 'subject',
            width: 152,
            search: false,
            hide: getCookie('ALIAS') !== 'esh',
            render: text => <>{tenplateTypeEnum[text]}</>,
        },
        {
            title: '评价/竞赛方案',
            dataIndex: 'programName',
            width: 152,
            search: false,
            hide: getCookie('ALIAS') !== 'esh',
            render: text => text || "-",
        },
        {
            title: '职业',
            dataIndex: 'customContent',
            key: 'workName',
            width: 247,
            search: true,
            render: (customContent: any) => customContent?.commonJob?.jobName || '--',
            formItemProps: {
                // @ts-ignore
                tooltipSliceLen: 10,
                label: '职业/工种/等级',
                name: 'commonJob',
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
            },
            renderFormItem: () => <ProfessionCascade />,
        },
        {
            title: '工种',
            dataIndex: 'jobType',
            key: 'workType',
            width: 206,
            render: (_, { customContent }: any) => customContent?.commonJob?.jobType || '--',
        },
        {
            title: '等级',
            dataIndex: 'jobLevel',
            key: 'workLevel',
            width: 131,
            render: (_, { customContent }: any) => customContent?.commonJob?.jobLevel || '--',
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
            title: '使用状态',
            dataIndex: 'usedState',
            key: 'usedState',
            width: 120,
            search: true,
            valueType: 'select',
            formItemProps: {
                initialValue: '0,1',
            },
            fieldProps: {
                options: statusOptions,
            },
            render: text => (
                <>
                    <Badge status={text === 1 ? 'success' : 'default'} />
                    {statusEnum[text]}
                </>
            ),
        },
        {
            // TODO
            title: '评审状态',
            dataIndex: 'reviewState',
            key: 'reviewState',
            width: 120,
            search: true,
            // 上海站点显示
            // hide: getCookie('ALIAS') !== 'esh',
            valueType: 'select',
            formItemProps: {
                initialValue: null,
            },
            fieldProps: {
                options: reviewStatusOptions,
            },
            render: text => reviewStatusEnums[text],
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'options',
            fixed: 'right',
            width: 200,
            render: (_, item: TableItem) => {
                const { usedState, reviewState, code } = item || {}
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
                        {/* 未使用+未提交可以编辑和删除 */}
                        {usedState === 0 && reviewState === 0 && (
                            <>
                                <Typography.Link
                                    onClick={() => {
                                        masterHistory.push(`./edit?code=${code}`)
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
            <BusinessTable
                className={styles.table}
                columns={tableColumns}
                actionRef={actionRef}
                renderOptionBar={{
                    top: () => (
                        <Button
                            type="primary"
                            className={styles.new_btn}
                            onClick={() => masterHistory.push('./create')}
                        >
                            <PlusOutlined />
                            新建
                        </Button>
                    ),
                }}
                rowKey="code"
                request={params => {
                    const { composition, usedState } = params
                    return getTableList({
                        ...params,
                        organizationCode: userStore?.selectedOrganization,
                        userCode: userData.code,
                        composition: composition
                            ? composition
                            : 'authenticate,questiontype,fromfile',
                        usedState: usedState ? usedState : '0,1',
                    })
                }}
                scroll={{ x: 1251 }}
            />
            {temVisible && (
                <CopyTemplate
                    visible={temVisible}
                    recordData={recordData}
                    userCode={userData.code}
                    handleOk={() => {
                        setTemVisible(false)
                        setPaginationObj({ current: 1 })
                        actionRef.current.reload()
                    }}
                    handleCancel={() => setTemVisible(false)}
                />
            )}
        </div>
    )
}

export default observer(ExamineComposition)
