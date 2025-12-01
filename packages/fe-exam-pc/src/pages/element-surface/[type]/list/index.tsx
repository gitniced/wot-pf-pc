// 理论知识要素细目表

import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import {
    Button,
    Descriptions,
    Modal,
    Popconfirm,
    Select,
    Space,
    Switch,
    Typography,
    message,
} from 'antd'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { AuthenticasListItem, RouteQuery } from './interface'
import Tooltip from 'antd/es/tooltip'
import BusinessTable from '@/components/BusinessTable'
import { useEffect, useRef, useState } from 'react'
import CreateElementModal from './CreateElementModal'
import { history } from 'umi'
import { CheckCircleFilled, ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { findSiteData, getCookie } from '@wotu/wotu-components'
import useSiteStore from '@/hooks/useSiteStore'

import Store from './store'
import { useLocalObservable } from 'mobx-react-lite'
import { observer } from 'mobx-react'
import {
    PUBLISH_STATE_ENUM,
    PUBLISH_STATE_OPTIONS,
    REFERENCE_STATE_OPTIONS,
    REFERENCE_STATE_TEXT,
} from '../constants'
import useUserStore from '@/hooks/useUserStore'
import useCommonParams from '@/hooks/useCommonParams'
import { getSessionStorage, setSessionStorage } from '@/storage'

const List = () => {
    const siteStore = useSiteStore()
    const userStore = useUserStore()
    const store = useLocalObservable(() => Store)
    const { belongType, subject } = useCommonParams()

    const [openModal, setOpenModal] = useState<boolean>(false)

    const routeQuery = history.location.query as unknown as RouteQuery
    const { jobName, jobNameCode, jobType, jobTypeCode, jobLevel, jobLevelCode } = {
        ...(getSessionStorage('AUTHENTICATE_PAGE_QUERY') || {}),
        ...routeQuery,
    }

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `理论知识要素细目表-${siteName}`
    }, [])

    useEffect(() => {
        setSessionStorage('AUTHENTICATE_PAGE_QUERY', {
            jobName,
            jobNameCode,
            jobType,
            jobTypeCode,
            jobLevel,
            jobLevelCode,
        })
    }, [jobName, jobType, jobLevel])

    // 确认删除要素细目表
    const handleDeleteElement = (code: string) => {
        store.deleteAuthenticate(code).then(() => {
            message.success('删除成功')
            actionRef.current.reload()
        })
    }

    // 编辑要素细目表
    const handleLinkToEdit = (code: string) => {
        history.push(
            `./edit?recordId=${code}&jobLevelCode=${jobLevelCode}&jobTypeCode=${jobTypeCode}`,
        )
    }

    // 查看要素细目表
    const handleLinkToDetail = (code: string) => {
        history.push(
            `./detail?recordId=${code}&jobLevelCode=${jobLevelCode}&jobTypeCode=${jobTypeCode}`,
        )
    }

    // 发布要素细目表
    const handlePublishAuthenticates = (code: string, checked: boolean) => {
        store
            .publishAuthenticate(
                code,
                checked ? PUBLISH_STATE_ENUM.PUBLISHED : PUBLISH_STATE_ENUM.DRAFT,
            )
            .then(() => {
                actionRef.current.reload()
                message.success(checked ? '发布成功' : '取消发布')
            })
            .catch(() => {
                Modal.confirm({
                    centered: true,
                    title: '要素细目表内容不完整',
                    content: '请按要求完整编辑后再操作启用',
                    icon: <ExclamationCircleFilled />,
                    okText: '去编辑',
                    onOk: async () => {
                        handleLinkToEdit(code)
                    },
                    cancelText: '取消',
                })
            })
    }

    const columns: ColumnsTypeItem<AuthenticasListItem>[] = [
        {
            title: '要素细目表名称',
            dataIndex: 'name',
            width: 220,
            search: true,
            formItemProps: {
                // @ts-ignore
                tooltipSliceLen: 10,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
            },
        },
        {
            title: subject === 10 ? '评价方案' : '竞赛方案',
            dataIndex: 'programName',
            width: 150,
            search: false,
            ellipsis: true,
            hide: getCookie('ALIAS') !== 'esh',
            render: val => val || '--',
        },
        {
            title: '引用状态',
            dataIndex: 'publishStatus',
            width: 120,
            search: true,
            formItemProps: {
                initialValue: null,
            },
            renderFormItem: () => <Select options={REFERENCE_STATE_OPTIONS} />,
            render: val => REFERENCE_STATE_TEXT[val],
        },
        {
            // @ts-ignore
            title: (
                <Space>
                    发布状态
                    <Tooltip title="草稿状态下不可被引用">
                        <InfoCircleOutlined style={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'status',
            formItemProps: {
                label: '发布状态',
                initialValue: null,
            },
            width: 120,
            search: true,
            renderFormItem: () => <Select options={PUBLISH_STATE_OPTIONS} />,
            render: (val, { code, publishStatus }) => (
                <Switch
                    checked={Boolean(val)}
                    checkedChildren="发布"
                    unCheckedChildren="草稿"
                    // 已经引用的情况下不允许发布
                    disabled={publishStatus === PUBLISH_STATE_ENUM.PUBLISHED}
                    onChange={checked => handlePublishAuthenticates(code, checked)}
                />
            ),
        },
        {
            title: '操作',
            dataIndex: 'opereate',
            width: 160,
            fixed: 'right',
            render: (_, { code, status }) => (
                <Space>
                    <Typography.Link
                        href={`./detail?recordId=${code}&jobLevelCode=${jobLevelCode}&jobTypeCode=${jobTypeCode}`}
                        onClick={() => handleLinkToDetail(code)}
                    >
                        查看
                    </Typography.Link>
                    {/* 草稿状态下才能编辑和删除 */}
                    {status === PUBLISH_STATE_ENUM.DRAFT && (
                        <>
                            <Typography.Link
                                href={`./edit?recordId=${code}&jobLevelCode=${jobLevelCode}&jobTypeCode=${jobTypeCode}`}
                                onClick={() => handleLinkToEdit(code)}
                            >
                                编辑{' '}
                            </Typography.Link>
                            <Popconfirm
                                title="是否确定删除"
                                onConfirm={() => handleDeleteElement(code)}
                            >
                                <Typography.Link>删除</Typography.Link>
                            </Popconfirm>
                        </>
                    )}
                </Space>
            ),
        },
    ]

    // 新建成功
    const handleCreateDone = (code: string) => {
        setOpenModal(false)
        actionRef.current.reload()

        Modal.confirm({
            centered: true,
            icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            title: '理论知识细目表新建成功',
            content: '您可以直接前往编辑要素细目表内容',
            onOk: () => {
                handleLinkToEdit(code)
            },
        })
    }

    return (
        <div className={styles.element_surface_list}>
            <TitleBlock title="理论知识要素细目表" />

            <Descriptions title="基础信息">
                <Descriptions.Item label="职业">{jobName}</Descriptions.Item>
                <Descriptions.Item label="工种">{jobType}</Descriptions.Item>
                <Descriptions.Item label="等级">{jobLevel || '--'}</Descriptions.Item>
            </Descriptions>

            <BusinessTable
                params={{
                    belongType,
                    subject,
                    workCode: jobNameCode,
                    typeCode: jobTypeCode,
                    levelCode: jobLevelCode,
                    organizationCode: userStore?.selectedOrganization,
                }}
                actionRef={actionRef}
                columns={columns}
                renderOptionBar={() => (
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpenModal(true)
                            if (getCookie('ALIAS') === 'esh') {
                                store.getPlanList({
                                    type: subject === 10 ? 0 : 1,
                                    level_id: jobLevelCode,
                                    is_select: 1,
                                })
                            }
                        }}
                    >
                        新建
                    </Button>
                )}
                // @ts-ignore
                request={store.getAuthenticas}
            />

            <CreateElementModal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={handleCreateDone}
                levelCode={jobLevelCode!}
                typeCode={jobTypeCode!}
            />
        </div>
    )
}

export default observer(List)
