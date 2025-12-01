import { SuperTable } from '@wotu/wotu-components'
import styles from './index.module.less'
import { Button, Spin, Tabs } from 'antd'
import useColumns from './useColumns'
import { useEffect, useRef, useState } from 'react'
import { history } from 'umi'

import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import TitleBlock from '@/components/TitleBlock'
import { setDocTitle } from '@/utils/setDocTitle'
import { getCookie } from '@/storage'
import { SERVICE_STATE } from './consts'

const EmploymentAssistance = () => {
    const store = useLocalObservable(() => Store)
    const { serviceStaffUserCode } = history.location.query as any
    const [state, setState] = useState<number>(SERVICE_STATE.ALL)
    const formRef = useRef<any>(null)
    const tabRef = useRef<any>(null)

    useEffect(() => {
        serviceStaffUserCode && formRef.current?.setFieldsValue({ serviceStaffUserCode })
        serviceStaffUserCode && tabRef.current.reload(formRef.current?.getFieldsValue)
    }, [serviceStaffUserCode])

    useEffect(() => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        setDocTitle('就业援助')
        // 获取服务状态对应的数量
        store.getServiceStatusCount(organizationCode)
        store.getListRecordUser(organizationCode)
    }, [])

    const columns = useColumns(store, formRef, tabRef)

    const beforeSearchSubmit = (params: any) => {
        const { serviceTime, ...rest } = params
        const _params = { ...rest }

        const [startTime, endTime] = !isEmpty(serviceTime) ? serviceTime : []

        _params.startTime = startTime ? dayjs(startTime).startOf('day').valueOf() : null
        _params.endTime = endTime ? dayjs(endTime).endOf('day').valueOf() : null

        return _params
    }

    const desensitizationList = [
        {
            key: 'candidateName',
            type: '1',
            sign: true,
        },
        {
            key: 'mobile',
            type: '2',
        },
        {
            key: 'idCardNo',
            type: '4',
        },
    ]

    return (
        <Spin spinning={store.loading}>
            <div className={styles.page_employment_assistance}>
                <TitleBlock title="就业援助" />
                <Tabs
                    onChange={(activeKey: string) => setState(Number(activeKey))}
                    activeKey={state.toString()}
                >
                    {store.tabItems.map(item => (
                        <Tabs.TabPane
                            tab={`${item.tab}(${store.statusCountMap[item.key]})`}
                            key={item.key}
                        />
                    ))}
                </Tabs>
                <SuperTable
                    params={{
                        state,
                        organizationCode: getCookie('SELECT_ORG_CODE'),
                    }}
                    renderOptionBar={() => (
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push('./service-code')
                            }}
                        >
                            服务码
                        </Button>
                    )}
                    actionRef={tabRef}
                    formRef={formRef}
                    columns={columns}
                    // @ts-ignore
                    request={store.getServiceList}
                    scroll={{ x: 0 }}
                    formProps={{
                        labelCol: { span: 9 },
                        wrapperCol: { span: 15 },
                    }}
                    beforeSearchSubmit={beforeSearchSubmit}
                    rowKey={'code'}
                    // @ts-ignore
                    desensitizationList={desensitizationList}
                />
            </div>
        </Spin>
    )
}

export default observer(EmploymentAssistance)
