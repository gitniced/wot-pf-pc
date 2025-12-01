import { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import {
    CERTIFICATE_TYPE_TEXT,
    SIGN_STATUS_OPTIONS,
    SIGN_STATUS_TEXT,
    SOURCE_TYPE_TAG,
} from './consts'
import { Select, Space, Tooltip, Typography } from 'antd'
import { getDecodeInfo } from '@wotu/wotu-components'
import dayjs from 'dayjs'
import { DatePicker } from '@/components/Picker'
import Store from './store'
import { useLocalObservable } from 'mobx-react'
import type { SignItem } from './interface'
import CustomTitle from '@/components/CustomTitle'
import { InfoCircleOutlined } from '@ant-design/icons'
import BusinessTable from '@/components/BusinessTable'
import FollowModal from './components/FollowModal'
import { isEmpty } from 'lodash'
import { setPageTitle } from '@/utils/setDocTitle'

const SingManagement = () => {
    const [data, setData] = useState<Partial<SignItem>>()

    const store = useLocalObservable(() => Store)
    const actionRef = useRef<any>({})

    const handleOpenDetailModal = (record: SignItem) => {
        setData(record)
    }

    const desensitizationList = [
        {
            key: 'name',
            type: '1',
            sign: true,
        },
        {
            key: 'mobile',
            type: '2',
        },
    ]

    const columns = [
        {
            title: 'ID',
            dataIndex: 'code',
            search: false,
            formOrder: 1,
            width: 220,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            search: true,
            formOrder: 2,
            width: 140,
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            search: true,
            formOrder: 3,
            width: 140,
        },
        {
            title: '证件号码',
            dataIndex: 'idCardNo',
            search: true,
            formOrder: 4,
            width: 180,
            render: (val: string, item: any) => (
                <>
                    <Typography>
                        {CERTIFICATE_TYPE_TEXT[item.certificateType as unknown as number]}
                    </Typography>
                    <Typography>
                        {item.isHideMsg
                            ? getDecodeInfo(val || '', '4') || '-'
                            : getDecodeInfo(val || '') || '-'}
                    </Typography>
                </>
            ),
        },
        {
            title: '来源',
            dataIndex: 'applySourceTag',
            width: 180,
            formOrder: 5,
            render: (val: any) => SOURCE_TYPE_TAG[val],
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 180,
            formOrder: 6,
            render: (val: any) => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
            renderFormItem: () => {
                return <DatePicker.RangePicker />
            },
        },
        {
            search: true,
            title: '状态',
            dataIndex: 'status',
            formOrder: 7,
            width: 120,
            render: (_: any, { status, remark }: any) => {
                return (
                    <Space>
                        {SIGN_STATUS_TEXT[status] || '-'}
                        {remark && (
                            <Tooltip title={remark}>
                                <InfoCircleOutlined />
                            </Tooltip>
                        )}
                    </Space>
                )
            },
            renderFormItem: () => {
                return (
                    <Select
                        options={SIGN_STATUS_OPTIONS}
                        placeholder={'请选择'}
                        style={{ width: '100%' }}
                    />
                )
            },
        },
        {
            title: '操作',
            width: 180,
            fixed: 'right',
            render: (_: any, record: any) => (
                <Space>
                    <Typography.Link onClick={() => handleOpenDetailModal(record)}>
                        跟进
                    </Typography.Link>
                </Space>
            ),
        },
    ]

    const handleOk = (params: any) => {
        store.saveFollow({ ...params }).then(() => {
            actionRef?.current?.reload()
            setData(undefined)
        })
    }

    const handleCancel = () => {
        setData(undefined)
    }
    const beforeSearchSubmit = (params: any) => {
        const { createdAt, ...rest } = params

        const _params = { ...rest }

        const [createdStartDate, createdEndDate] = !isEmpty(createdAt) ? createdAt : []

        _params.createdStartDate = createdStartDate
            ? dayjs(createdStartDate).startOf('day').valueOf()
            : null
        _params.createdEndDate = createdEndDate
            ? dayjs(createdEndDate).endOf('day').valueOf()
            : null

        return _params
    }

    useEffect(() => {
        setPageTitle('学员池')
    }, [])

    return (
        <div className={styles.page_sign_management}>
            <CustomTitle title="学员池" />
            <BusinessTable
                formItemsStyle={{
                    width: '397px',
                }}
                actionRef={actionRef}
                rowKey={'code'}
                beforeSearchSubmit={beforeSearchSubmit}
                // @ts-ignore
                desensitizationList={desensitizationList}
                columns={columns}
                // @ts-ignore
                request={store.getListPageApi}
            />
            <FollowModal open={!!data} data={data} onOk={handleOk} onCancel={handleCancel} />
        </div>
    )
}

export default SingManagement
