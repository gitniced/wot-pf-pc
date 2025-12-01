import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { CERTIFICATE_TYPE_TEXT, SING_TYPE_TEXT } from './consts'
import { Space, Typography } from 'antd'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelectUpdate'
import dayjs from 'dayjs'
import SignDetail from './SignDetail'

import Store from './store'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type { SignItem } from './interface'
import { getCookie, getSessionStorage } from '@/storage'
import CustomTitle from '@/components/CustomTitle'
import BusinessTable from '@/components/BusinessTable'
import { useModel } from 'umi'
import { getDecodeInfo } from '@wotu/wotu-components'

const SingManagement = (props: any) => {
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
    const [signDetailData, setSignDetailData] = useState<Partial<SignItem>>({})
    const organizationCode: string = getCookie('SELECT_ORG_CODE')
    const {
        location: { query },
    } = props

    const { taskCode } = query || {}

    const store = useLocalObservable(() => Store)

    const handleOpenDetailModal = (record: SignItem) => {
        setSignDetailData(record)
        setOpenDetailModal(true)
    }

    const columns = useMemo(() => {
        return [
            {
                title: '任务名称',
                dataIndex: 'taskName',
                formItemProps: {
                    name: 'taskCode',
                },
                renderFormItem: () => (
                    <MoreSelect
                        labelKey="title"
                        valueKey="code"
                        requestUrl="/activity/front/activity/task_name_page"
                        placeholder="请选择"
                        requestParams={{ organizationCode }}
                        style={{ width: '100%' }}
                        labelInValue
                    />
                ),
                search: true,
                formOrder: 1,
                width: 220,
            },
            {
                title: '姓名',
                dataIndex: 'userName',
                formItemProps: {
                    name: 'name',
                },
                search: true,
                formOrder: 3,
                width: 140,
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                search: true,
                formOrder: 4,
                width: 140,
            },
            {
                title: '证件号码',
                dataIndex: 'certificate',
                search: true,
                formOrder: 5,
                width: 180,
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
                title: '打卡类型',
                dataIndex: 'type',
                width: 180,
                render: val => SING_TYPE_TEXT[val],
            },
            {
                title: '打卡时间',
                dataIndex: 'signTime',
                width: 180,
                render: val => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: '操作',
                width: 180,
                render: (_, record) => (
                    <Space>
                        <Typography.Link onClick={() => handleOpenDetailModal(record)}>
                            详情
                        </Typography.Link>
                    </Space>
                ),
            },
        ] as ColumnsTypeItem<any>[]
    }, [])

    const getExtraInitParams = () => {
        return {
            taskCode: taskCode
                ? JSON.parse(decodeURIComponent(decodeURIComponent(taskCode)))
                : undefined,
        }
    }

    const { masterStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster')
    const platform = getSessionStorage('PLATFORM')
    let selectedOrganizationDetail: any = {}
    platform === 'workbench'
        ? (selectedOrganizationDetail = masterStore?.userStore?.selectedOrganizationDetail || '')
        : ''
    platform === 'portal'
        ? (selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail || '')
        : ''
    useEffect(() => {
        const { name: organizationName } = selectedOrganizationDetail || {}
        setTimeout(() => {
            document.title = organizationName ? `活动签到-${organizationName}` : '活动签到'
        }, 1000)
    }, [selectedOrganizationDetail])

    const desensitizationList = [
        {
            key: 'userName',
            type: '1',
            sign: true,
        },
        {
            key: 'userIdentify',
            type: '4',
        },
        {
            key: 'mobile',
            type: '2',
        },
    ]

    return (
        <div className={styles.page_sign_management}>
            <CustomTitle title="活动签到" marginBottom={18} />
            <BusinessTable
                rowKey={'code'}
                // @ts-ignore
                desensitizationList={desensitizationList}
                formItemsStyle={{
                    width: '398px',
                }}
                extraInitParams={getExtraInitParams()}
                params={{
                    sourceType: 3,
                    organizationCode,
                }}
                columns={columns}
                // @ts-ignore
                request={store.getSignListPage}
            />

            <SignDetail
                signDetailData={signDetailData}
                open={openDetailModal}
                onOk={() => setOpenDetailModal(false)}
                onCancel={() => setOpenDetailModal(false)}
            />
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(SingManagement))
