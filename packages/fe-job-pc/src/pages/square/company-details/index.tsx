import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Store from './store'
import { useEffect, useState } from 'react'

import BasicInfo from './components/BasicInfo'
import CompanyDesc from './components/CompanyDesc'
import Welfare from './components/Welfare'
import HotJob from './components/HotJob'
import Executive from './components/Executive'
// @ts-ignore
import { history } from 'umi'
import type { IRoute } from 'umi'
import { Spin, Tabs } from 'antd'

const Index: React.FC = () => {
    const { key = 'recruit_position', code } = history.location.query as {
        key?: string
        code: string
    }
    const [activeTab, setActiveTab] = useState<string>(key)
    const store = useLocalObservable(() => new Store())

    const init = async () => {
        await store.getCompanyData()
        store.getJobList()
    }

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        setActiveTab(key)
    }, [history.location])

    const onChangeActiveTab = (key: string) => {
        history.push(`/square/company-details?code=${code}&key=${key}`)
    }

    return (
        <div className={styles.page}>
            {store.loading ? (
                <Spin />
            ) : (
                <div className={styles.container}>
                    <BasicInfo data={store.companyData} />
                    <Tabs activeKey={activeTab} onChange={onChangeActiveTab}>
                        <Tabs.TabPane tab="企业简介" key="company_intro" />
                        <Tabs.TabPane
                            tab={`招聘职位（${store.jobData.totalCount || 0}）`}
                            key="recruit_position"
                        />
                    </Tabs>

                    {activeTab === 'company_intro' && (
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <CompanyDesc data={store.companyData} />
                            </div>
                            <div className={styles.right}>
                                {/* @ts-ignore */}
                                <Welfare data={store.companyData} />
                                {/* @ts-ignore */}
                                <Executive dataList={store.companyData?.executiveList} />
                            </div>
                        </div>
                    )}
                    {activeTab === 'recruit_position' && (
                        <HotJob
                            jobData={store.jobData}
                            jobParams={store.jobParams}
                            setJobParams={store.setJobParams}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

const Page: IRoute = observer(Index)
Page.title = '企业详情-四川就业平台'
export default Page
