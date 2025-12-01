import BlockBox from '@/components/BlockBox'
import styles from './index.module.less'
import { Tabs } from 'antd'
import { RELATED_JOB_ENUM } from './const'
import { observer, useLocalObservable } from 'mobx-react'
import ActivityDetailStore from './store'
import { useEffect, useRef, useState } from 'react'
import { history } from 'umi'
import type { IRoute } from 'umi'
import { cloneDeep } from 'lodash'
import { utils } from './utils'

/**  详情   */

const ActivityManagementDetails = () => {
    const store = useLocalObservable(() => new ActivityDetailStore())
    const { activityDetails = {}, reviewData = {} } = store || {}
    const { code = '' } = history.location?.query || {}
    const actionRef = useRef({
        reload: () => {},
    })

    useEffect(() => {
        code && store.getActivityDetails(code)
        code && store.getReviewDetails(code)
    }, [])

    const {
        RichTextContentComponent,
        RelatedPositionsComponent,
        ActivityListComponent,
        ActivityDetailBox,
        ActivityReview,
    } = utils(activityDetails, store, actionRef, code, reviewData)

    let Items = [
        {
            label: `活动介绍`,
            key: '1',
            children: <RichTextContentComponent />,
        },
        {
            label: `关联岗位`,
            key: '2',
            children: <RelatedPositionsComponent />,
        },
        {
            label: `活动名单`,
            key: '3',
            children: <ActivityListComponent />,
        },
        {
            label: `活动回顾`,
            key: '4',
            children: <ActivityReview />,
        },
    ]
    const [tabsItems, setTabItems] = useState<any>()

    /**   当活动关联了岗位时，展示该tab，不关联不展示  */
    useEffect(() => {
        const s = activityDetails?.relateProfessionStatus
        if (s === RELATED_JOB_ENUM.UNRELATED) {
            /**  未关联  */
            const updatedTabsItems = cloneDeep(Items)
            const item = updatedTabsItems.find(i => i.key === '2')
            if (item) {
                updatedTabsItems.splice(updatedTabsItems.indexOf(item), 1)
            }
            setTabItems(updatedTabsItems)
        } else if (s === RELATED_JOB_ENUM.RELATED) {
            /**  关联  */
            setTabItems(Items)
        }
    }, [activityDetails?.relateProfessionStatus])

    return (
        <div className={styles.activity_management_details_page}>
            <BlockBox style={{ marginBottom: '24px' }}>
                <ActivityDetailBox />
            </BlockBox>
            <BlockBox>
                <div className={styles.bottom}>
                    <Tabs defaultActiveKey="1" items={tabsItems} />
                </div>
            </BlockBox>
        </div>
    )
}

const ObserverPage: IRoute = observer(ActivityManagementDetails)
ObserverPage.title = '活动详情'
export default ObserverPage
