import { Button, Tabs } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { observer, useLocalObservable } from 'mobx-react'
import ActivityClassifyStore from './store'
import type { IRoute } from 'umi'
// @ts-ignore
// import { useModel } from 'umi'
import BusinessTable from '@/components/BusinessTable'
import { history, useModel } from 'umi'
import { usePageListConfig } from '@wotu/wotu-components'
import { clearUrlParams } from '@wotu/wotu-components/dist/esm/Hooks/usePageListConfig'
import { tabsItems } from './const'
import { utils } from './utils'
import { getCookie, getSessionStorage } from '@/storage'
import CustomTitle from '@/components/CustomTitle'

const ActivityManagement = () => {
    const store = useLocalObservable(() => new ActivityClassifyStore())
    // const masterStore = useModel('@@qiankunStateFromMaster') || { globalStore: {} }
    const organizationCode: string = getCookie('SELECT_ORG_CODE')
    const { getPageListConfig } = usePageListConfig()
    const actionRef = useRef({
        reload: () => {},
    })
    const formRef = useRef<any>()

    const initKey = getPageListConfig('save_params')?.activityStatus?.toString() || 'all'
    const [currentKey, setCurrentKey] = useState(initKey)
    const [formSid, setFormSid] = useState('')
    // const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const columns: ColumnsType<any> = utils(store, actionRef, setFormSid, formSid, formRef)

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

    // const handlePublish = () => {
    //     Modal.confirm({
    //         centered: true,
    //         content: '确定要发布活动吗，发布后用户可以在活动列表查看并报名活动。',
    //         onOk: () => {
    //             store.batchPublish(selectedKeys).then(() => {
    //                 message.success('发布成功')
    //                 setSelectedKeys([])
    //             })
    //         },
    //     })
    // }

    // const renderFooterBar = () => {
    //     const selectedLength = selectedKeys.length
    //     return (
    //         <div className={styles.batch_wrapper}>
    //             <Space size={8}>
    //                 <Typography>已选择 {selectedLength} 项</Typography>
    //                 <Button
    //                     type="primary"
    //                     disabled={selectedLength <= 0}
    //                     onClick={() => handlePublish()}
    //                 >
    //                     批量发布
    //                 </Button>
    //             </Space>
    //         </div>
    //     )
    // }

    // const rowSelection = {
    //     selectedRowKeys: selectedKeys,
    //     onChange: (_selectedKeys: React.Key[]) => {
    //         setSelectedKeys(_selectedKeys as string[])
    //     },
    //     preserveSelectedRowKeys: true,
    // }

    return (
        <div className={styles.page}>
            <CustomTitle title="活动管理" marginBottom={32} />
            <BusinessTable
                formItemsStyle={{
                    width: '398px',
                }}
                formRef={formRef}
                actionRef={actionRef}
                columns={columns}
                request={store.tableRequest as any}
                params={{
                    activityStatus: currentKey,
                    organizationCode,
                }}
                layout="inline"
                renderOptionBar={() => {
                    return (
                        <>
                            <Button
                                type="primary"
                                onClick={() => {
                                    history.push('/activity-management/create')
                                }}
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                新建
                            </Button>
                            <Tabs
                                activeKey={currentKey}
                                items={tabsItems}
                                onChange={e => {
                                    setCurrentKey(e)
                                    // setSelectedKeys([])
                                }}
                            />
                        </>
                    )
                }}
                onReset={() => {
                    clearUrlParams()
                    setCurrentKey('all')
                }}
                rowKey={'code'}
                // rowSelection={currentKey === '0' ? rowSelection : undefined}
                // renderFooter={currentKey === '0' ? () => renderFooterBar() : undefined}
            />
        </div>
    )
}

const ObserverPage: IRoute = observer(ActivityManagement)
ObserverPage.title = '活动管理'
export default ObserverPage
