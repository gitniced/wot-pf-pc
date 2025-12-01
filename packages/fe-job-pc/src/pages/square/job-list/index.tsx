// @ts-ignore
import { history } from 'umi'
import type { IRoute } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Store from './store'
import { useEffect, useState } from 'react'

import Search from '../components/Search'
import CardList from './components/CardList'
import FilterButtons from './components/FilterButtons'
import { setDocTitle } from '@/utils/setDocTitle'
import { Spin } from 'antd'

const Index = () => {
    const {
        location: { query },
    } = history
    const store = useLocalObservable(() => new Store())

    const [top, setTop] = useState<boolean>(true)

    const func = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        setTop(scrollTop <= 228)
    }

    useEffect(() => {
        setDocTitle('职位列表')
        store.getJobList()
        window.addEventListener('scroll', func)
        return () => window.removeEventListener('scroll', func)
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.main}>
                {query?.organizationCode ? null : (
                    <div className={styles.search_content}>
                        <div className={`${styles.search_box} ${!top && styles.no_top}`}>
                            <Search
                                defaultValue={{
                                    provinceCode: store.jobParams.provinceCode,
                                    professionName: store.jobParams.professionName,
                                    cityCode: store.jobParams.cityCode,
                                }}
                                onSearch={(professionName: any, cityCode?: string) =>
                                    store.setJobParams({ professionName, cityCode, pageNo: 1 })
                                }
                                displayRender={label => (
                                    <>
                                        <svg className={styles.icon} aria-hidden="true">
                                            <use xlinkHref={`#dizhi`} />
                                        </svg>
                                        {label[label.length - 1]}
                                    </>
                                )}
                            />
                            <FilterButtons
                                jobParams={store.jobParams}
                                setJobParams={store.setJobParams}
                            />
                        </div>
                    </div>
                )}
                {store.loading ? (
                    <div className={styles.loading}>
                        <Spin />
                    </div>
                ) : (
                    <CardList data={store.jobList} setJobParams={store.setJobParams} />
                )}
            </div>
        </div>
    )
}

const Page: IRoute = observer(Index)
export default Page
