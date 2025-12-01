import CustomTitle from '@/components/CustomTitle'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.modules.less'
import type { IRoute } from 'umi'
// @ts-ignore
import { useModel } from 'umi'
// import { Tabs } from 'antd'
import { STATUSENUM } from './const'
import { useState } from 'react'
import SuperTables from './components/superTables'
import { useEffect } from 'react'
import useStore from './store'
import { getSessionStorage } from '@/storage'
import { usePageListConfig } from '@wotu/wotu-components'
import { setPageTitle } from '@/utils/setDocTitle'

const EventManagement: React.FC = () => {
    const { getPageListConfig, setPageListConfig } = usePageListConfig()

    const { workUserStore, gatewayUserStore } = useModel('@@qiankunStateFromMaster')
    const platform = getSessionStorage('PLATFORM')
    let selectedOrganizationDetail: any = {}

    if (platform === 'workbench') {
        selectedOrganizationDetail = workUserStore?.selectedOrganizationDetail
    }
    if (platform === 'portal') {
        selectedOrganizationDetail = gatewayUserStore?.selectedOrganizationDetail
    }

    const store = useLocalObservable(() => new useStore())
    /**
     *  当前选中的key
     */
    const [currentKey, setCurrentKey] = useState<string>(getPageListConfig('save_listTab', '0'))

    useEffect(() => {
        store.getActivityStatusCount()
    }, [])

    useEffect(() => {
        setPageTitle('在线报名')
    }, [selectedOrganizationDetail])

    /**
     * tab 列表
     */
    const TabsList = () => [
        {
            tab: (
                <span>
                    全部{' '}
                    <span>
                        （{store.activityStatusCount?.reduce((prev, cur) => prev + cur.value, 0)}）
                    </span>
                </span>
            ),
            key: STATUSENUM.ALL_STATUS,
        },
        {
            tab: <span>未开始（{store.activityStatusCount[0]?.value ?? 0}）</span>,
            key: STATUSENUM.NOT_STARTED,
        },

        {
            tab: <span>报名中（{store.activityStatusCount[1]?.value ?? 0}）</span>,
            key: STATUSENUM.REGISTERING,
        },
        {
            tab: <span>已结束（{store.activityStatusCount[2]?.value ?? 0}）</span>,
            key: STATUSENUM.ENDED,
        },
        {
            tab: <span>已关闭（{store.activityStatusCount[3]?.value ?? 0}）</span>,
            key: STATUSENUM.CLOSE,
        },
    ]

    /**
     * tab 切换
     */
    const onChange = (key: string) => {
        setPageListConfig(key, 'save_listTab', true)
        setCurrentKey(key)
    }

    return (
        <div className={styles.enroll_setting}>
            <div className={styles.main}>
                <div className={styles.main_title}>
                    <CustomTitle title="在线报名" marginBottom={0} />
                </div>

                <SuperTables
                    store={store}
                    tabKey={currentKey}
                    onChange={onChange}
                    handleChangeStatus={store.updateStatus}
                    tabList={TabsList()}
                    deleteActive={store.deleteActive}
                />
            </div>
        </div>
    )
}

const ObserverPage: IRoute = inject('userStore')(observer(EventManagement))
ObserverPage.title = '在线报名'
export default ObserverPage
