import React, { useEffect } from 'react'
import { Empty, PTHistory } from '@wotu/wotu-components'
import { Pagination } from 'antd'
// @ts-ignore
import { PTListLayout } from '@wotu/pt-components'
import Enrollcard from '@/components/EnrollCard'
import type { ActivityPageFrontRespDto } from '@/pages/event-list/interface'
import { getSessionStorage } from '@/storage'

import styles from './index.module.less'
import packageInfo from '../../../../../package.json'
import { useLocation } from 'umi'
import { observer } from 'mobx-react'

function EnrollTab({ store }: any) {
    const { query } = useLocation()
    const { name: packageName } = packageInfo
    const platform = getSessionStorage('PLATFORM')

    const toDetail = (item: ActivityPageFrontRespDto) => {
        if (platform === 'middle') {
            PTHistory.push('history', `/enroll-detail?code=${item.code}`)
        } else {
            PTHistory.push('location', `/enroll-gateway/enroll-detail?code=${item.code}`)
        }
    }

    useEffect(() => {
        store.setQuery(query)
        store.getActiveList()
    }, [])

    return (
        <div className={styles.enroll_tab}>
            {store.activeList.length ? (
                <PTListLayout
                    dataSource={store.activeList}
                    containerStyle={{ width: '1152px', margin: '0 auto' }}
                    numWithOneLine={3}
                    extraData={{
                        onClickCard: () => {},
                    }}
                    itemRender={(data: any) => {
                        console.log(data)
                        return <Enrollcard data={data} onClick={() => toDetail(data)} />
                    }}
                    type="pc"
                    className={styles.pc_course_layout}
                    prefixCls={packageName}
                />
            ) : (
                <Empty />
            )}

            {!!store.activeList.length && (
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    current={store.count}
                    total={store.totalCount}
                    pageSize={9}
                    onChange={(current, pageSize) => {
                        store.updateSearchParam({
                            pageSize,
                            pageNo: current,
                        })
                    }}
                />
            )}
        </div>
    )
}

export default observer(EnrollTab)
