import { history } from 'umi'
import type { IRoute } from 'umi'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Store from './store'
import { useEffect, useState } from 'react'

import Search from './components/Search'
import JobCardList from './components/JobCardList'
import CompanyCardList from './components/CompanyCardList'
import FilterButtons from './components/FilterButtons'
import { Button } from 'antd'
import { findSiteData } from '@wotu/wotu-components'
import { getLocalStorage, getSessionStorage } from '@/storage'

const Index = () => {
    const store = useLocalObservable(() => new Store())

    const [top, setTop] = useState<boolean>(true)

    const {
        activeTab,
        tabList,
        companyData,
        jobData,
        filterParams,
        changeTab,
        setParams,
        updatePageNo,
    } = store || {}

    const func = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        setTop(scrollTop <= 228)
    }

    const initPage = async () => {
        await store.checkJoin()
        await store.getJobList()
        await store.getCompanyList()
    }

    useEffect(() => {
        window.addEventListener('scroll', func)
        initPage()
        return () => window.removeEventListener('scroll', func)
    }, [])

    const toActivity = () => {
        const {
            location: { query },
        } = history
        const { activityCode } = query as { activityCode: string }
        const platform = getSessionStorage('PLATFORM')
        const siteStore = getLocalStorage('SITE_STORE')
        const burl =
            RUN_ENV === 'local'
                ? 'http://localhost:8031'
                : findSiteData(siteStore.siteData, 'burl', { findKey: 'baseInfo' }) || ''
        const midDomain =
            RUN_ENV === 'local'
                ? 'http://localhost:9061'
                : findSiteData(siteStore.siteData, 'midDomain', { findKey: 'baseInfo' }) || ''
        switch (platform) {
            case 'portal':
                location.href = `${burl}/enroll-gateway/event-detail?code=${activityCode}`
                break
            default:
                location.href = `${midDomain}/enroll-gateway/event-detail?code=${activityCode}`
        }
    }

    return (
        <div className={styles.page}>
            {store.hasCheckRequest ? (
                <>
                    {!store.hasCheck ? (
                        <div className={styles.empty_content}>
                            <div className={styles.empty_content_img} />
                            <div className={styles.empty_content_text}>报名后参与活动哦～</div>
                            <Button className={styles.empty_content_btn} onClick={toActivity}>
                                立即报名
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.main}>
                            <div className={styles.search_content}>
                                {!top ? <div className={styles.search_box_bg} /> : null}
                                <div className={`${styles.search_box} ${!top && styles.no_top}`}>
                                    <Search
                                        defaultValue={filterParams.professionName}
                                        onSearch={(professionName: string) =>
                                            setParams({ professionName })
                                        }
                                    />
                                    <FilterButtons params={filterParams} setParams={setParams} />
                                </div>
                            </div>

                            <div className={styles.tab_content}>
                                <div className={[styles.tab_list].join(' ')}>
                                    {tabList.map(i => {
                                        return (
                                            <div
                                                key={i.key}
                                                className={[
                                                    styles.tab_list_item,
                                                    activeTab === i.key ? styles.active : '',
                                                ].join(' ')}
                                                onClick={() => {
                                                    changeTab(i.key)
                                                }}
                                            >
                                                {i.name}
                                            </div>
                                        )
                                    })}

                                    <div
                                        className={[
                                            styles.tab_list_item_line,
                                            activeTab === 'company' ? styles.company : '',
                                            activeTab === 'job' ? styles.job : '',
                                        ].join(' ')}
                                    />
                                </div>
                            </div>

                            <div className={styles.list_content}>
                                {activeTab === 'job' ? (
                                    <JobCardList data={jobData} updatePageNo={updatePageNo} />
                                ) : null}
                                {activeTab === 'company' ? (
                                    <CompanyCardList
                                        data={companyData}
                                        updatePageNo={updatePageNo}
                                    />
                                ) : null}
                            </div>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    )
}

const Page: IRoute = observer(Index)
Page.title = '线上会场'
export default Page
