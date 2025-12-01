import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { DatePicker, Dropdown, MenuProps, Select, Space, Tooltip, Typography } from 'antd'

import dayjs from 'dayjs'
import { history } from 'umi'
import EyeShowCom from '@/components/EyeShowCom'
import { useState } from 'react'
import type { AssistanceItem } from './interface'
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons'

import type Store from './store'
import {
    CERTIFICATE_TYPE_TEXT,
    JobStateText,
    ObjectCategoryTypeOptions,
    ObjectCategoryTypeText,
    SERVICE_STATE,
    ServiceStateText,
    SOURCE_TYPE,
} from '@/pages/admin/company/employment-assistance/list/consts'
import SuperAreaCascader from '@/components/SuperAreaCascader'
import { JobStateOptions } from './consts'

const { RangePicker } = DatePicker

const useColumns = (store: typeof Store, formRef: any) => {
    const [serviceUnitType, setServiceUnitType] = useState<number>(SOURCE_TYPE.CompetentAuthority)

    const items: MenuProps['items'] = [
        {
            label: '主管部门',
            key: 'default',
            onClick: () => {
                setServiceUnitType(SOURCE_TYPE.CompetentAuthority)
                formRef.current?.resetFields(['regionCodes'])
            },
        },
        {
            label: '机构',
            key: 'authenticates',
            onClick: () => {
                setServiceUnitType(SOURCE_TYPE.Organization)
                formRef.current?.resetFields(['organizationCode'])
            },
        },
    ]

    const columns = [
        {
            title: 'ID',
            dataIndex: 'code',
            search: true,
            width: 200,
        },
        {
            title: '姓名',
            dataIndex: 'candidateName',
            search: true,
            width: 120,
            render: val => <EyeShowCom fullStr={val} type='name' />,
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            search: true,
            width: 160,
            render: val => <EyeShowCom fullStr={val} type='phone' />,
        },
        {
            title: '证件号码',
            dataIndex: 'idCard',
            search: true,
            width: 220,
            render: (val, { certificateType }) => (
                <>
                    <Typography>{CERTIFICATE_TYPE_TEXT[certificateType]}</Typography>
                    <Typography> <EyeShowCom fullStr={val} type='idcard' /></Typography>
                </>
            ),
        },
        {
            title: '服务单位',
            dataIndex: 'serviceUnit',
            search: true,
            width: 200,
            formItemProps: {
                name:
                    serviceUnitType === SOURCE_TYPE.CompetentAuthority
                        ? 'regionCodes'
                        : 'organizationCode',
                label: (
                    <Dropdown
                        menu={{
                            items,
                            onClick: ({key}) => {
                                if(key=== 'default'){
                                    setServiceUnitType(SOURCE_TYPE.CompetentAuthority)
                                    formRef.current?.resetFields(['organizationCode'])
                                }else if(key=== 'authenticates'){
                                    setServiceUnitType(SOURCE_TYPE.Organization)
                                    formRef.current?.resetFields(['regionCodes'])
                                }
                            }
                        }}
                        trigger={['click']}
                    >
                        <Space>
                            <Typography>
                                {serviceUnitType === SOURCE_TYPE.CompetentAuthority
                                    ? '主管部门'
                                    : '机构'}
                            </Typography>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                ),
            },
            renderFormItem: () =>
                serviceUnitType === SOURCE_TYPE.Organization ? (
                    <Select placeholder="请选择" options={store.listRecordOrganization} />
                ) : (
                    <SuperAreaCascader
                        type="village"
                        userRegion={store.userRegin}
                        defaultValue={store.defaultServiceUnit}
                        allowValue={store.defaultServiceUnit}
                        changeOnSelect
                    />
                ),
        },
        {
            title: '对象类别',
            dataIndex: 'objectCategoryType',
            search: true,
            width: 150,
            formItemProps: {
                initialValue: null,
            },
            renderFormItem: () => (
                <Select placeholder="请选择" options={ObjectCategoryTypeOptions} />
            ),
            render: val => ObjectCategoryTypeText[val],
        },
        {
            title: '就业状态',
            dataIndex: 'jobState',
            width: 150,
            render: val => JobStateText[val],
            formItemProps: {
                initialValue: null,
            },
            renderFormItem: () => <Select placeholder="请选择" options={JobStateOptions} />,
        },
        {
            title: '服务记录',
            width: 150,
            dataIndex: 'serviceNum',
        },
        {
            title: '服务时间',
            dataIndex: 'serviceTime',
            width: 150,
            search: true,
            hide: true,
            renderFormItem: () => <RangePicker allowClear />,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            width: 180,
            render: (startTime: number) => <>{dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}</>,
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            width: 180,
            render: (endTime: number) => <>{endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</>,
        },
        {
            title: '服务状态',
            dataIndex: 'state',
            width: 120,
            fixed: 'right',
            render: (val, { jobState, remark }: any) => {
                if (val === SERVICE_STATE.Completed && [2, 3, 4].includes(jobState)) {
                    return (
                        <Tooltip title={remark}>
                            <span>{ServiceStateText[val]}</span>&nbsp;
                            <InfoCircleOutlined />
                        </Tooltip>
                    )
                }

                // 其他情况显示服务状态
                return ServiceStateText[val]
            },
        },
        {
            title: '操作',
            width: 120,
            fixed: 'right',
            render: (_, { code, state }) =>
                state === SERVICE_STATE.InService ? (
                    <Typography.Link onClick={() => {
                        store.getStatus(code).then((data) => {
                            if(data){history.push(`./diagnosis?code=${code}`)
                            }
                        })
                    }}>
                        服务
                    </Typography.Link>
                ) : (
                    <Typography.Link onClick={() => history.push(`./record?code=${code}`)}>
                        服务记录
                    </Typography.Link>
                ),
        },
    ] as ColumnsTypeItem<AssistanceItem>[]

    return columns
}

export default useColumns
