// 投递记录

import type { IRoute } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Store from './store'
import { useEffect } from 'react'

import { setDocTitle } from '@/utils/setDocTitle'
import { Spin } from 'antd'
import CardList from '@/pages/square/job-list/components/CardList'

const Index = () => {
    const store = useLocalObservable(() => new Store())

    useEffect(() => {
        setDocTitle('投递记录')
        store.getJobList()
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.main}>
                {store.loading ? (
                    <div className={styles.loading}>
                        <Spin />
                    </div>
                ) : (
                    <CardList
                        data={store.jobList}
                        setJobParams={store.setJobParams}
                        source="delivery"
                    />
                )}
            </div>
        </div>
    )
}

const Page: IRoute = observer(Index)
export default Page
