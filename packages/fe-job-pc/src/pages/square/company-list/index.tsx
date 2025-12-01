import type { IRoute } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Store from './store'
import { useEffect, useState } from 'react'


import CardList from './components/CardList'
import FilterButtons from './components/FilterButtons'
import Search from '../components/Search'
import { setDocTitle } from '@/utils/setDocTitle'

const Index = () => {
    const store = useLocalObservable(() => new Store())

    const [top, setTop] = useState<boolean>(true)

    const func = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setTop(scrollTop <= 228)
    }
    useEffect(() => {
        setDocTitle('热门企业')
    })
    useEffect(() => {
        store.getCompany()
        window.addEventListener('scroll', func)
        return () => window.removeEventListener('scroll', func)
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.search_content}>
                    <div className={`${styles.search_box} ${!top && styles.no_top}`}>
                        <Search
                            onSearch={(keywords, cityCode) => store.setCompanyParams({ keywords, cityCode })}
                            displayRender={label => (
                                <>
                                    <svg className={styles.icon} aria-hidden="true">
                                        <use xlinkHref={`#dizhi`} />
                                    </svg>
                                    {label[label.length - 1]}
                                </>
                            )}
                            hiddenArea
                        />
                        <FilterButtons setParams={store.setCompanyParams} />
                    </div>
                </div>
                <CardList data={store.companyList} setParams={store.setCompanyParams} />
            </div>
        </div>
    )
}

const Page: IRoute = observer(Index)
export default Page
