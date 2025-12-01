import { Button, Tooltip, Select, message } from 'antd'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import type { IResource } from './types'
import {
    RESOURCE_FORMAT_OPTIONS,
    RESOURCE_TYPE_OPTIONS,
    RESOURCE_FORMAT_MAP,
    RESOURCE_TYPE_MAP,
    RESOURCE_FORMAT,
} from './const'
import { downloadFileByUrl } from '@/utils/file'
import { getResourceDetail } from '@/modules/resource/service'
import HrefLink from '@/components/HrefLink'
import http from '@/servers/http'

/**
 * 获取资源表格列定义
 */
export const getResourceTableColumns = (): ColumnsType<IResource> => [
    {
        search: true,
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        fixed: 'left',
        fieldProps: {
            placeholder: '请输入',
        },
        ellipsis: {
            showTitle: false,
        },
        render: (name: string) => (
            <Tooltip placement="topLeft" title={name}>
                {name}
            </Tooltip>
        ),
    },
    {
        search: true,
        title: '格式',
        dataIndex: 'format',
        key: 'format',
        width: 100,
        renderFormItem: () => (
            <Select placeholder="请选择" style={{ width: '100%' }} allowClear>
                {RESOURCE_FORMAT_OPTIONS.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.label}
                    </Select.Option>
                ))}
            </Select>
        ),
        render: (format: string) => RESOURCE_FORMAT_MAP[format].text,
    },
    {
        search: true,
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        renderFormItem: () => (
            <Select placeholder="请选择" style={{ width: '100%' }} allowClear>
                {RESOURCE_TYPE_OPTIONS.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.label}
                    </Select.Option>
                ))}
            </Select>
        ),
        render: (type: number) => RESOURCE_TYPE_MAP[type].text,
    },
    {
        title: '关联课程',
        dataIndex: 'courseCount',
        key: 'courseCount',
        width: 100,
        render: (courseCount: number) => courseCount || 0,
    },
    {
        search: true,
        title: '专业',
        dataIndex: 'majorCode',
        key: 'majorCode',
        width: 200,
        renderFormItem: () => (
            <MoreSelect
                labelKey="name"
                valueKey="code"
                searchKey="name"
                searchKeyBy="query"
                requestUrl={'/wil/major/list'}
                requestMethod="post"
                placeholder="请输入关键字搜索"
                style={{ width: '100%' }}
                isHasPage={false}
            />
        ),
        render: (_, record: IResource) => record.majorName || '-',
    },
    {
        title: '创建日期',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (createdAt: string) => {
            if (!createdAt) return '-'
            return new Date(createdAt).toLocaleDateString()
        },
    },
    {
        title: '创建者',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 180,
        render: (_: string, record: IResource) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{record.createdByName || '-'}</span>
            </div>
        ),
    },
    {
        title: '更新日期',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: 120,
        render: (updatedAt: string) => {
            if (!updatedAt) return '-'
            return new Date(updatedAt).toLocaleDateString()
        },
    },
    {
        title: '更新人',
        dataIndex: 'updatedBy',
        key: 'updatedBy',
        width: 180,
        render: (_: string, record: IResource) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{record.updatedByName || '-'}</span>
            </div>
        ),
    },
    {
        title: '操作',
        key: 'actions',
        width: 100,
        fixed: 'right',
        render: (_, record: IResource) => {
            if (record.format === RESOURCE_FORMAT.demand) {
                return (
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            http('/wil/resource_library/detail', 'get', { code: record.code }).then(
                                (res: any) => {
                                    const demandId = res?.content
                                    if (demandId) {
                                        const url = `/engineer/train-center/mine/company/privatecourse/detail?id=${demandId}`
                                        window.open(url, '_blank')
                                    } else {
                                        message.error('点播课ID不存在')
                                    }
                                },
                            )
                        }}
                    >
                        详情
                    </Button>
                )
            }

            if (
                [RESOURCE_FORMAT.word, RESOURCE_FORMAT.excel, RESOURCE_FORMAT.mind].includes(
                    record.format as RESOURCE_FORMAT,
                )
            ) {
                return (
                    <HrefLink
                        url={`/office/${record.format}/${record.code}?preview=true`}
                        target="_blank"
                    >
                        详情
                    </HrefLink>
                )
            }

            return (
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        getResourceDetail(record.code).then(res => {
                            if (res?.content) {
                                downloadFileByUrl(res.content, res.name)
                            } else {
                                message.error('资源内容为空')
                            }
                        })
                    }}
                >
                    下载
                </Button>
            )
        },
    },
]
