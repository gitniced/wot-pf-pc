import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { Image, message, Modal, Select, Space, Switch, Tooltip, Typography } from 'antd'
import { history } from 'umi'

import type Store from './store'
import type { MutableRefObject } from 'react'
import type { ListItem } from './interface'
import {
    CERTIFICATE_TYPE_TEXT,
    SOURCE_TYPE_TEXT,
    SourceTypeOptions,
} from '../../employment-assistance/list/consts'
import { getCookie } from '@/storage'
import { getDecodeInfo } from '@wotu/wotu-components'

const serviceManagementColumns = (
    store: typeof Store,
    actionRef: MutableRefObject<{ reload: () => void }>,
    onEdit: (record: ListItem) => void,
) => {
    const organizationCode = getCookie('SELECT_ORG_CODE')
    const handleDelete = (record: ListItem) => {
        Modal.confirm({
            title: '删除后无法找回，是否确定删除？',
            onCancel: () => {},
            onOk: () => {
                store.deleteServiceStaff(record.code, organizationCode).then(() => {
                    message.success('删除成功')
                    actionRef.current.reload()
                })
            },
        })
    }

    const handleChangeServiceStaffStatus = (checked: boolean, code: string) => {
        store.changeServiceStaffStatus(code, Number(!checked), organizationCode).then(() => {
            actionRef.current.reload()
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'code',
            width: 200,
            render: val => val || '-',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            search: true,
            width: 140,
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            search: true,
            width: 160,
        },
        {
            title: '证件号码',
            dataIndex: 'idCardNo',
            search: true,
            width: 220,
            render: (val, { certificateType, isHideMsg }) => (
                <>
                    <Typography>{CERTIFICATE_TYPE_TEXT[certificateType]}</Typography>
                    <Typography>
                        {isHideMsg ? getDecodeInfo(val || '', '4') : getDecodeInfo(val || '')}
                    </Typography>
                </>
            ),
        },
        {
            title: '电子照片',
            dataIndex: 'photo',
            search: true,
            width: 140,
            formItemProps: {
                name: 'existPhoto',
                initialValue: null,
            },
            renderFormItem: () => (
                <Select
                    options={[
                        { label: '全部', value: null },
                        { label: '有', value: 1 },
                        { label: '无', value: 0 },
                    ]}
                />
            ),
            render: val => (val ? <Image src={val} width={80} /> : '-'),
        },
        {
            title: '人员归属',
            dataIndex: 'sourceType',
            search: true,
            width: 140,
            formItemProps: {
                initialValue: null,
            },
            renderFormItem: () => (
                <Select options={[{ label: '全部', value: null }, ...SourceTypeOptions]} />
            ),
            render: val => SOURCE_TYPE_TEXT[val],
        },
        {
            title: '服务单位',
            dataIndex: 'serviceUnit',
            width: 200,
        },
        {
            title: (
                <Space size={4}>
                    <Typography>状态</Typography>
                    <Tooltip title="禁用后，不支持进行新的求职者服务对接">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'status',
            width: 120,
            fixed: 'right',
            render: (val, { code }) => (
                <Switch
                    checked={!val}
                    onChange={checked => handleChangeServiceStaffStatus(checked, code)}
                />
            ),
        },
        {
            title: '操作',
            width: 220,
            fixed: 'right',
            render: (_, record) => (
                <Space size={8}>
                    <Typography.Link onClick={() => onEdit(record)}>编辑</Typography.Link>
                    <Typography.Link
                        disabled={record.serviceNum !== 0}
                        onClick={() => handleDelete(record)}
                    >
                        删除
                    </Typography.Link>
                    <Typography.Link
                        disabled={record.serviceNum === 0}
                        onClick={() => {
                            history.push(
                                `/admin/company/employment-assistance/list?serviceStaffUserCode=${record.userCode}`,
                            )
                        }}
                    >
                        {`服务信息（${record.serviceNum}）`}
                    </Typography.Link>
                </Space>
            ),
        },
    ] as ColumnsTypeItem<ListItem>[]

    return columns
}

export default serviceManagementColumns
