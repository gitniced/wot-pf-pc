// 刷题列表
import Clipboard from 'clipboard'
import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import { SuperProvider } from '@wotu/wotu-components'
import type {
    ColumnsSetting,
    ColumnsTypeItem,
} from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { PracticeListItem } from '../interface'
import { Badge, Button, Modal, Select, Space, Switch, Tooltip, Typography, message } from 'antd'
import { history } from 'umi'
import {
    ALL_STATE,
    PUBLISH_STATE_ENUM,
    PUBLISH_STATE_OPTIONS,
    PUSH_STATE_ENUM,
    PUSH_STATE_OPTIONS,
    PUSH_STATE_TEXT,
} from '../constants'
import { observer, useLocalObservable } from 'mobx-react'

import PracticeStore from '../store'
import { useEffect, useRef, useState } from 'react'

import useUserStore from '@/hooks/useUserStore'
import BusinessTable from '@/components/BusinessTable'
import { BELONG_TYPE_ENUM, SKILL_TYPE_ENUM, SUBJECT_TYPE_ENUM } from '@/constants'
import useUserColumns from '@/hooks/useUserColumns'

const PracticeList = () => {
    const userStore = useUserStore()

    const store = useLocalObservable(() => PracticeStore)

    const { columnsSettings } = useUserColumns(userStore)

    const actionRef = useRef({
        reload: () => {}, // 添加 reload 方法
    })

    useEffect(() => {
        document.title = '模拟练习'
    }, [])

    useEffect(() => {
        const linkCopyInstance = new Clipboard('.link_copy_btn')
        linkCopyInstance.on('success', (e: any) => {
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

    // 编辑
    const handleEdit = (code: string) => {
        history.push(`/practice/edit?code=${code}`)
    }

    // 新建刷题
    const handleCreate = () => {
        history.push('/practice/edit')
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
                actionRef.current.reload()
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
                    actionRef.current.reload()
                })
            },
        })
    }

    /** 处理 columns */
    const columnsInStore = (colItem: any) => {
        const column = columnsSettings.find(
            (item: ColumnsSetting) => item.key === (colItem.dataIndex as string),
        )
        return {
            ...column,
            hide: column?.hide || colItem.hide,
            order: column?.order,
        }
    }

    const [columns] = useState(
        (
            [
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
                    title: '试题数量',
                    dataIndex: 'questionCount',
                    search: false,
                    order: 5,
                    width: 120,
                },
                {
                    title: '推送状态',
                    dataIndex: 'publishOtherStatus',
                    order: 9,
                    width: 120,
                    renderFormItem: () => {
                        return (
                            <Select
                                placeholder="请选择"
                                options={PUSH_STATE_OPTIONS}
                                defaultValue={ALL_STATE.value}
                            />
                        )
                    },
                    render: val => (
                        <Space>
                            <Badge
                                status={val === PUSH_STATE_ENUM.NOT_PUSHED ? 'default' : 'success'}
                            />
                            {PUSH_STATE_TEXT[val]}
                        </Space>
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
                    render: (val, { code }) => {
                        return (
                            <Switch
                                checked={Boolean(val)}
                                checkedChildren="发布"
                                unCheckedChildren="草稿"
                                onChange={(checked: boolean) =>
                                    handleChangePublishStatus(checked, code)
                                }
                            />
                        )
                    },
                },
                {
                    title: '操作',
                    width: 160,
                    order: 11,
                    dataIndex: 'action',
                    fixed: 'right',
                    render: (_, { publishStatus, publishOtherStatus, code }) => {
                        if (
                            publishStatus === PUBLISH_STATE_ENUM.DRAFT &&
                            publishOtherStatus === PUSH_STATE_ENUM.NOT_PUSHED
                        ) {
                            return (
                                <Space size={8}>
                                    <Typography.Link onClick={() => handleEdit(code)}>
                                        编辑
                                    </Typography.Link>
                                    <Typography.Link onClick={() => handleDelete([code])}>
                                        删除
                                    </Typography.Link>
                                </Space>
                            )
                        }
                        return '-'
                    },
                },
            ] as ColumnsTypeItem<PracticeListItem>[]
        ).map(item => ({
            ...item,
            ...columnsInStore(item),
        })),
    )

    return (
        <div className={styles.page_practice_list}>
            <TitleBlock title="模拟练习" />

            <SuperProvider value={{ prefixCls: 'merchant-center' }}>
                <BusinessTable
                    params={{
                        belongType: BELONG_TYPE_ENUM.MERCHANT,
                        skill: SKILL_TYPE_ENUM.SKILL,
                        subject: SUBJECT_TYPE_ENUM.SIMULATION,
                        organizationCode: userStore?.selectedOrganization,
                    }}
                    actionRef={actionRef}
                    // @ts-ignore
                    request={store.getPracticeList}
                    columns={columns}
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleCreate}>
                            新建
                        </Button>
                    )}
                />
            </SuperProvider>
        </div>
    )
}

export default observer(PracticeList)
