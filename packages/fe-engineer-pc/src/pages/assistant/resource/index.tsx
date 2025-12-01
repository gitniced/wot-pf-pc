import styles from './index.module.less'
import { useCallback, useMemo, useState } from 'react'
import { Button, Input, message, Modal, Select, Table, Tabs } from 'antd'
import { usePagination } from 'ahooks'
import ResourceCreateDropdown from '../components/ResourceCreateDropdown'
import {
    deleteResource,
    getResourceDetail,
    getResourceList,
    updateResource,
} from '@/modules/resource/service'
import { RESOURCE_TYPE } from '@/modules/resource/const'
import { RESOURCE_FORMAT } from '@/modules/resource/const'
import {
    resourceFormatLabelAll,
    resourceTypeLabelAll,
    RESOURCE_FORMAT_LABEL,
    RESOURCE_TYPE_LABEL,
} from '@/modules/resource/const'
import type { IResource } from '@/modules/resource/types'
import { downloadFileByUrl } from '@/utils/file'
import ResourceRenameModal from './components/ResourceRenameModal'
import { useMajorList } from '@/modules/major/hooks'
import { getCookie } from '@/storage'
import http from '@/servers/http'
import { useSaasTitle } from '@wotu/wotu-components'
import HrefBreadcrumb from '@/components/HrefBreadcrumb'
import HrefLink from '@/components/HrefLink'

const Resource: React.FC = () => {
    useSaasTitle(`资源库`)
    const [name, setName] = useState('')
    const [format, setFormat] = useState<RESOURCE_FORMAT>()
    const [type, setType] = useState<RESOURCE_TYPE>()
    const [resourceRenameOpen, setResourceRenameOpen] = useState(false)
    const [renameResource, setRenameResource] = useState<IResource>()
    const { majorCode, setMajorCode, majorCodeItems } = useMajorList()

    const getDemandId = (code: string) => {
        return new Promise(resolve => {
            http('/wil/resource_library/detail', 'get', { code }).then((res: any) => {
                resolve(res?.content)
            })
        })
    }

    const crumbData = useMemo(
        () => [
            { name: '首页', link: `/assistant/home` },
            {
                name: '资源库',
                link: `/assistant/resource`,
            },
        ],
        [],
    )

    const getList = useCallback(
        async (params: Parameters<Parameters<typeof usePagination>[0]>[0]) => {
            if (!majorCode) return { total: 0, list: [] }

            const res = await getResourceList({
                pageNo: params.current,
                pageSize: params.pageSize,
                majorCode,
                name: name || undefined,
                format,
                type,
            })

            return {
                total: res.totalCount,
                list: res.data,
            }
        },
        [name, format, type, majorCode],
    )

    const { data, pagination, loading, run, refresh } = usePagination(getList, {
        refreshDeps: [name, format, type],
        debounceWait: 300,
    })

    const tablePagination = useMemo(
        () => ({
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number) => `共${total}个项目`,
        }),
        [pagination],
    )

    const formatOptions = useMemo(() => {
        return resourceFormatLabelAll.filter(v => v.value !== RESOURCE_FORMAT.device)
    }, [])

    return (
        <div className={styles.resource}>
            <HrefBreadcrumb crumbData={crumbData} />

            <div className={styles.resource_content}>
                <div className={styles.resource_content_title}>资源库</div>

                <Tabs
                    className={styles.resource_content_tabs}
                    activeKey={majorCode}
                    items={majorCodeItems}
                    onChange={value => {
                        setMajorCode(value)
                        refresh()
                    }}
                />

                <div className={styles.resource_content_control}>
                    <ResourceCreateDropdown
                        onRefresh={() => run({ current: 1, pageSize: 10 })}
                        majorCode={majorCode}
                    />

                    <div className={styles.resource_content_control_filter}>
                        <Input
                            className={styles.control_filter_input}
                            placeholder="输入资源名称搜索"
                            onChange={e => {
                                setName(e.target.value)
                            }}
                            onPressEnter={() => run({ current: 1, pageSize: 10 })}
                        />
                        <Select
                            className={styles.control_filter_select}
                            placeholder="全部格式"
                            options={formatOptions}
                            defaultValue="all"
                            onChange={value => {
                                if (value === 'all') {
                                    setFormat(undefined)
                                } else {
                                    setFormat(value as RESOURCE_FORMAT)
                                }
                            }}
                        />
                        <Select
                            className={styles.control_filter_select}
                            placeholder="全部类型"
                            options={resourceTypeLabelAll}
                            defaultValue="all"
                            onChange={value => {
                                if (value === 'all') {
                                    setType(undefined)
                                } else {
                                    setType(Number(value) as RESOURCE_TYPE)
                                }
                            }}
                        />
                    </div>
                </div>

                <Table<IResource>
                    loading={loading}
                    className={styles.resource_content_table}
                    columns={[
                        {
                            title: '名称',
                            dataIndex: 'name',
                            width: '40%',
                        },
                        {
                            title: '格式',
                            dataIndex: 'format',
                            width: '15%',
                            render: v => RESOURCE_FORMAT_LABEL[v as RESOURCE_FORMAT],
                        },
                        {
                            title: '类型',
                            dataIndex: 'type',
                            width: '15%',
                            render: v => RESOURCE_TYPE_LABEL[v as keyof typeof RESOURCE_TYPE_LABEL],
                        },
                        {
                            title: '关联课程',
                            dataIndex: 'courseCount',
                            width: '15%',
                        },
                        {
                            title: '操作',
                            dataIndex: 'action',
                            width: '15%',
                            render: (_, record) => (
                                <div className={styles.resource_content_table_action}>
                                    {(record.format === RESOURCE_FORMAT.word ||
                                        record.format === RESOURCE_FORMAT.excel ||
                                        record.format === RESOURCE_FORMAT.mind) && (
                                        <HrefLink
                                            url={`/office/${record.format}/${record.code}?preview=true&majorCode=${majorCode}`}
                                        >
                                            详情
                                        </HrefLink>
                                    )}
                                    {record.format === RESOURCE_FORMAT.demand && (
                                        <Button
                                            type="link"
                                            className={styles.action_btn}
                                            onClick={() => {
                                                getDemandId(record.code).then(res => {
                                                    if (getCookie('SELECT_USER_TYPE') === 'org') {
                                                        window.open(
                                                            `/engineer/train-center/mine/company/privatecourse/detail?id=${res}`,
                                                        )
                                                    } else {
                                                        window.open(
                                                            `/engineer/train-center/mine/student/privatecourse/detail?id=${res}`,
                                                        )
                                                    }
                                                })
                                            }}
                                        >
                                            详情
                                        </Button>
                                    )}
                                    {(record.format === RESOURCE_FORMAT.attachment ||
                                        record.format === RESOURCE_FORMAT.drawing) && (
                                        <Button
                                            type="link"
                                            className={styles.action_btn}
                                            onClick={() => {
                                                getResourceDetail(record.code).then(res => {
                                                    if (res.content) {
                                                        downloadFileByUrl(res.content, res.name)
                                                    } else {
                                                        message.error('资源内容为空')
                                                    }
                                                })
                                            }}
                                        >
                                            下载
                                        </Button>
                                    )}
                                    {record.canEdit === 1 && (
                                        <Button
                                            type="link"
                                            className={styles.action_btn}
                                            onClick={async () => {
                                                const res = await updateResource({
                                                    ...record,
                                                    majorCode,
                                                    type:
                                                        record.type === RESOURCE_TYPE.common
                                                            ? RESOURCE_TYPE.personal
                                                            : RESOURCE_TYPE.common,
                                                })
                                                if (res) {
                                                    refresh()
                                                }
                                            }}
                                        >
                                            设为
                                            {record.type === RESOURCE_TYPE.common
                                                ? RESOURCE_TYPE_LABEL[RESOURCE_TYPE.personal]
                                                : RESOURCE_TYPE_LABEL[RESOURCE_TYPE.common]}
                                        </Button>
                                    )}
                                    {record.canEdit === 1 && record.courseCount <= 0 && (
                                        <Button
                                            type="link"
                                            className={styles.action_btn}
                                            onClick={async () => {
                                                Modal.confirm({
                                                    content: '删除后无法找回，是否确定删除？',
                                                    onOk: async () => {
                                                        const res = await deleteResource(
                                                            record.code,
                                                        )
                                                        if (res) {
                                                            message.success('删除成功')
                                                            refresh()
                                                        }
                                                    },
                                                })
                                            }}
                                        >
                                            删除
                                        </Button>
                                    )}
                                    {record.canEdit === 1 &&
                                        (record.format === RESOURCE_FORMAT.word ||
                                            record.format === RESOURCE_FORMAT.excel ||
                                            record.format === RESOURCE_FORMAT.mind) &&
                                        record.courseCount <= 0 && (
                                            <HrefLink
                                                url={`/office/${record.format}/${record.code}?majorCode=${majorCode}`}
                                                className={styles.action_btn}
                                            >
                                                编辑
                                            </HrefLink>
                                        )}
                                    {record.canEdit === 1 &&
                                        record.format === RESOURCE_FORMAT.demand &&
                                        record.courseCount <= 0 && (
                                            <Button
                                                type="link"
                                                className={styles.action_btn}
                                                onClick={() => {
                                                    getDemandId(record.code).then(res => {
                                                        if (
                                                            getCookie('SELECT_USER_TYPE') === 'org'
                                                        ) {
                                                            window.open(
                                                                `/engineer/train-center/mine/company/privatecourse/edit/${res}`,
                                                            )
                                                        } else {
                                                            window.open(
                                                                `/engineer/train-center/mine/student/privatecourse/edit/${res}`,
                                                            )
                                                        }
                                                    })
                                                }}
                                            >
                                                编辑
                                            </Button>
                                        )}
                                    {record.canEdit === 1 &&
                                        (record.format === RESOURCE_FORMAT.attachment ||
                                            record.format === RESOURCE_FORMAT.drawing) &&
                                        record.courseCount <= 0 && (
                                            <Button
                                                type="link"
                                                className={styles.action_btn}
                                                onClick={() => {
                                                    setRenameResource(record)
                                                    setResourceRenameOpen(true)
                                                }}
                                            >
                                                重命名
                                            </Button>
                                        )}
                                </div>
                            ),
                        },
                    ]}
                    dataSource={data?.list || []}
                    rowKey="code"
                    pagination={tablePagination}
                />
            </div>

            {renameResource && (
                <ResourceRenameModal
                    resource={renameResource}
                    open={resourceRenameOpen}
                    onCancel={() => {
                        setResourceRenameOpen(false)
                    }}
                    onOk={() => {
                        refresh()
                        setResourceRenameOpen(false)
                    }}
                />
            )}
        </div>
    )
}

export default Resource
