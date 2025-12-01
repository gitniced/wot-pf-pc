import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { CERTIFICATE_TYPE_TEXT, SING_TYPE_TEXT, TAB_ENUM } from './consts'
import { Space, Tabs, Typography } from 'antd'
import { getDecodeInfo, SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import MoreSelect from '@/components/MoreSelect'
import dayjs from 'dayjs'
import SignDetail from './SignDetail'

import Store from './store'
import { useLocalObservable } from 'mobx-react'
import type { SignItem } from './interface'

const SingManagement = () => {
    const [currentTab, setCurrentTab] = useState<string>(TAB_ENUM.SITE)
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
    const [signDetailData, setSignDetailData] = useState<Partial<SignItem>>({})

    const store = useLocalObservable(() => Store)

    useEffect(() => {
        store.getSingCount()
    }, [])

    const handleOpenDetailModal = (record: SignItem) => {
        setSignDetailData(record)
    }

    const desensitizationList = [
        {
            key: 'userName',
            type: '1',
            sign: true,
        },
        {
            key: 'mobile',
            type: '2',
        },
    ]

    const columns = useMemo(() => {
        return [
            {
                title: '任务名称',
                dataIndex: 'taskName',
                renderFormItem: () => (
                    <MoreSelect
                        labelKey="title"
                        valueKey="code"
                        requestUrl="/activity/front/activity/task_name_page"
                        placeholder="请选择"
                        style={{ width: '100%' }}
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
                render: (val: string, item: any) => (
                    <>
                        <Typography>{CERTIFICATE_TYPE_TEXT[val as unknown as number]}</Typography>
                        <Typography>
                            {item.isHideMsg
                                ? getDecodeInfo(val || '', '4')
                                : getDecodeInfo(val || '')}
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
    }, [currentTab])

    const { siteSignCount, organizeSignCount } = store

    return (
        <div className={styles.page_sign_management}>
            <Tabs activeKey={currentTab} onChange={value => setCurrentTab(value)}>
                <Tabs.TabPane key={TAB_ENUM.SITE} tab={`站点活动签到（${siteSignCount}）`} />
                <Tabs.TabPane
                    key={TAB_ENUM.ORGANIZE}
                    tab={`机构活动签到（${organizeSignCount}）`}
                />
            </Tabs>

            <SuperTable
                rowKey={'code'}
                // @ts-ignore
                desensitizationList={desensitizationList}
                params={{
                    sourceType: 2,
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

export default SingManagement
