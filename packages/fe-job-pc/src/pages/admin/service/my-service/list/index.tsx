import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import { useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd'
import { SuperTable } from '@wotu/wotu-components'
import useColumns from './useColumns'
import { observer, useLocalObservable } from 'mobx-react'

import Store from './store'
import { setDocTitle } from '@/utils/setDocTitle'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'
import { SERVICE_STATE } from '@/pages/admin/company/employment-assistance/list/consts'

const HierarchicalDiagnosis = () => {
    const store = useLocalObservable(() => Store)
    const [state, setState] = useState<number | string>(SERVICE_STATE.ALL)
    const formRef = useRef<any>(null)

    useEffect(() => {
        setDocTitle('分级诊断')
        // 获取服务状态对应的数量
        store.getServiceStatusCount()
        // 获取用户区域信息
        store.getUserRegin()
        store.getListRecordOrganization()
    }, [])

    const columns = useColumns(store, formRef)

    const beforeSearchSubmit = (params: any) => {
        const { serviceTime, ...rest } = params
        const _params = { ...rest }

        const [startTime, endTime] = !isEmpty(serviceTime) ? serviceTime : []

        if (startTime) {
            _params.startTime = dayjs(startTime).startOf('day').valueOf()
        }

        if (endTime) {
            _params.endTime = dayjs(endTime).endOf('day').valueOf()
        }

        return _params
    }

    return (
        <div className={styles.hierarchical_diagnosis}>
            <TitleBlock title="我的服务" />
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
                params={{ state }}
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
                search={{
                    onExpandChange: (expend: boolean) => {
                        if (!expend) {
                            formRef.current?.setFieldsValue({
                                regionCodes: store.defaultServiceUnit.filter(item => Boolean(item)),
                            })
                        }
                    },
                }}
            />
        </div>
    )
}

export default observer(HierarchicalDiagnosis)
