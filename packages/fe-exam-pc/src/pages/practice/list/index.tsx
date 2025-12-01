// 刷题列表
import Clipboard from 'clipboard'
import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'

import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { PracticeListItem } from '../interface'
import {
    Badge,
    Button,
    Modal,
    Select,
    Space,
    Switch,
    Tag,
    Tooltip,
    Typography,
    message,
} from 'antd'
// @ts-ignore
import { history } from 'umi'
import dayjs from 'dayjs'
import {
    ALL_STATE,
    PRACTICE_STATE_OPTIONS,
    PRACTICE_STATE_TEXT,
    PUBLISH_STATE_ENUM,
    PUBLISH_STATE_OPTIONS,
    PRACTICE_SOURCE,
    PRACTICE_SOURCE_OPTIONS,
    SHELVES_STATE_ENUM,
    PRACTICE_SOURCE_TEXT,
    PRACTICE_STATE_ENUM,
} from '../constants'
import { observer, useLocalObservable } from 'mobx-react'

import PracticeStore from '../store'
import { useEffect, useRef, useState } from 'react'
import PublishModal from '../edit/components/PublishModal'

import { getCookie } from '@/storage'
import { JOIN_USER_TEXT } from '../edit/constants'
import useUserStore from '@/hooks/useUserStore'
import useSiteStore from '@/hooks/useSiteStore'
import { findSiteData } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import {
    BELONG_TYPE_ENUM,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '@/pages/question/[type]/constants'

const PracticeList = () => {
    const userStore = useUserStore()
    const siteStore = useSiteStore()
    const store = useLocalObservable(() => PracticeStore)

    const [visible, setVisible] = useState<boolean>(false)

    const [currentCode, setCurrentCode] = useState<string>()

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    useEffect(() => {
        document.title = '练习'
    }, [])

    useEffect(() => {
        const linkCopyInstance = new Clipboard('.link_copy_btn')
        linkCopyInstance.on('success', e => {
            message.success('复制成功')
            e.clearSelection()
        })

        linkCopyInstance.on('error', () => {
            message.error('复制失败')
        })

        return () => {
            linkCopyInstance.destroy()
        }
    }, [])

    // 进入详情页
    const handleLinkToDetail = (code: string) => {
        history.push(`/practice/detail/${code}`)
    }

    // 分享
    const handleShare = (record: PracticeListItem) => {
        // 如果草稿状态，需要先更新发布状态，再弹出分享弹窗
        if (record.publishStatus === PUBLISH_STATE_ENUM.DRAFT) {
            Modal.confirm({
                centered: true,
                title: '当前练习未发布，是否要发布并分享',
                onOk: () => {
                    store
                        .updatePublishStatus(PUBLISH_STATE_ENUM.PUBLISHED, record.code)
                        .then(() => {
                            message.success('发布成功')
                            setCurrentCode(record.code)
                            setVisible(true)
                            actionRef.current?.reload()
                        })
                },
            })
        } else {
            setCurrentCode(record.code)
            setVisible(true)
        }
    }

    // 编辑
    const handleEdit = (code: string, sourceType: number) => {
        history.push(`/practice/edit?code=${code}&sourceType=${sourceType}`)
    }

    // 自建刷题
    const handleCreate = () => {
        history.push(`/practice/edit?sourceType=${PRACTICE_SOURCE.SELF_BUILT}`)
    }

    // 从资源方新建刷题
    const handleCreateByMerchant = () => {
        history.push(`/practice/edit?sourceType=${PRACTICE_SOURCE.MERCHANT_PUSH}`)
    }

    // 修改发布状态
    const handleChangePublishStatus = (checked: boolean, code: string) => {
        store
            .updatePublishStatus(
                checked ? PUBLISH_STATE_ENUM.PUBLISHED : PUBLISH_STATE_ENUM.DRAFT,
                code,
            )
            .then(() => {
                if (checked) {
                    message.success('发布成功')
                }
                actionRef.current?.reload()
            })
    }

    // 批量删除刷题
    const handleDelete = (codeList: string[]) => {
        Modal.confirm({
            centered: true,
            title: '删除后无法恢复，是否确定 删除 ？',
            onOk: () => {
                store.deletePractice(codeList).then(() => {
                    message.success('删除成功')
                    actionRef?.current?.reload()
                })
            },
        })
    }

    // 查看统计数据
    const handleLinlToStatistics = (code: string) => {
        history.push(`/practice/statistics/${code}`)
    }

    const [columns] = useState([
        {
            title: '练习标题',
            dataIndex: 'title',
            order: 1,
            search: true,
            width: 240,
            formItemProps: {
                name: 'titleLike',
            },
            ellipsis: true,
            render: (val, { code }) => (
                <Tooltip title={val} placement="topLeft">
                    <Typography.Link onClick={() => handleLinkToDetail(code)}>
                        {val}
                    </Typography.Link>
                </Tooltip>
            ),
        },
        {
            title: '来源',
            dataIndex: 'sourceType',
            order: 2,
            search: true,
            width: 120,
            renderFormItem: () => (
                <Select options={PRACTICE_SOURCE_OPTIONS} defaultValue={ALL_STATE.value} />
            ),
            render: val => {
                return (
                    <Tag color={val === PRACTICE_SOURCE.SELF_BUILT ? 'green' : 'gold'}>
                        {PRACTICE_SOURCE_TEXT[val]}
                    </Tag>
                )
            },
        },
        {
            title: '试题数量',
            dataIndex: 'questionCount',
            search: false,
            order: 5,
            width: 120,
        },
        {
            title: '参与用户',
            dataIndex: 'joinStatus',
            search: false,
            order: 6,
            width: 120,
            render: val => JOIN_USER_TEXT[val],
        },
        {
            title: '开始日期',
            dataIndex: 'startTime',
            search: false,
            order: 7,
            width: 240,
            render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : '未设置'),
        },
        {
            title: '结束日期',
            dataIndex: 'endTime',
            search: false,
            order: 8,
            width: 240,
            render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : '未设置'),
        },
        {
            title: '练习状态',
            dataIndex: 'status',
            search: true,
            order: 9,
            width: 120,
            formItemProps: {
                name: 'practiceStatus',
            },
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        options={PRACTICE_STATE_OPTIONS}
                        defaultValue={ALL_STATE.value}
                    />
                )
            },
            render: val => (
                <Badge
                    color={val === PRACTICE_STATE_ENUM.ON_GOING ? '#1678FF' : '#D9D9D9'}
                    text={PRACTICE_STATE_TEXT[val]}
                />
            ),
        },
        {
            title: '发布状态',
            dataIndex: 'publishStatus',
            search: true,
            order: 10,
            width: 120,
            fixed: 'right',
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        options={PUBLISH_STATE_OPTIONS}
                        defaultValue={ALL_STATE.value}
                    />
                )
            },
            render: (val, { code, shelvesStatus }) => {
                // 如果推送刷题为已下架，禁止发布
                return (
                    <Switch
                        disabled={shelvesStatus === SHELVES_STATE_ENUM.DOWN}
                        checked={Boolean(val)}
                        checkedChildren="发布"
                        unCheckedChildren="草稿"
                        onChange={(checked: boolean) => handleChangePublishStatus(checked, code)}
                    />
                )
            },
        },
        {
            title: '操作',
            dataIndex: 'operate',
            width: 220,
            order: 11,
            fixed: 'right',
            render: (_, record) => {
                const { code, publishStatus, shelvesStatus, sourceType } = record

                if (shelvesStatus === SHELVES_STATE_ENUM.DOWN) return '--'
                return (
                    <Space size={8}>
                        <Typography.Link onClick={() => handleLinlToStatistics(code)}>
                            数据
                        </Typography.Link>
                        <Typography.Link onClick={() => handleShare(record)}>分享</Typography.Link>
                        {/* 草稿状态下才能编辑和删除 */}
                        {publishStatus === PUBLISH_STATE_ENUM.DRAFT && (
                            <>
                                <Typography.Link
                                    onClick={() =>
                                        handleEdit(code, sourceType ?? PRACTICE_SOURCE.SELF_BUILT)
                                    }
                                >
                                    编辑
                                </Typography.Link>
                                <Typography.Link onClick={() => handleDelete([code])}>
                                    删除
                                </Typography.Link>
                            </>
                        )}
                    </Space>
                )
            },
        },
    ] as ColumnsTypeItem<PracticeListItem>[])

    // 复制机构BSaaS门户H5刷题列表地址
    const getCopyH5PracticeUrl = () => {
        const { siteData } = siteStore
        const portalH5Url = findSiteData(siteData, 'portalH5Url', { findKey: 'baseInfo' })
        const orgCode = getCookie('SELECT_ORG_CODE')

        return `${portalH5Url}/${orgCode}/exam-center/practice-list?type=all`
    }

    return (
        <div className={styles.page_practice_list}>
            <TitleBlock title="练习" />
            <BusinessTable
                rowKey="code"
                params={{
                    belongType: BELONG_TYPE_ENUM.ORGANIZE,
                    skill: SKILL_TYPE_ENUM.THEORY,
                    subject: SUBJECT_TYPE_ENUM.SIMULATION,
                    organizationCode: userStore?.selectedOrganization,
                }}
                actionRef={actionRef}
                // @ts-ignore
                request={store.getPracticeList}
                columns={columns}
                renderOptionBar={() => (
                    <Space size={16}>
                        <Button type="primary" onClick={handleCreate}>
                            新建
                        </Button>
                        <Button type="primary" onClick={handleCreateByMerchant}>
                            从资源库新建
                        </Button>
                        <Button
                            className="link_copy_btn"
                            data-clipboard-text={getCopyH5PracticeUrl()}
                        >
                            移动端练习列表
                        </Button>
                    </Space>
                )}
            />

            <PublishModal
                open={visible}
                onCancel={() => setVisible(false)}
                practiceCode={currentCode}
            />
        </div>
    )
}

export default observer(PracticeList)
