import { Observer, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import Store from './store'
import { useEffect, useState } from 'react'

import BasicInfo from './components/BasicInfo'
import JobDesc from './components/JobDesc'
import CompanyProfile from './components/CompanyProfile'
import SimilarPositions from './components/SimilarPositions'
import CompanyCard from '../components/CompanyCard'
import SubmitResume from './components/SubmitResume'
import Search from '../components/Search'
import type { IRoute } from 'umi'
import { history } from 'umi'
import { setDocTitle } from '@/utils/setDocTitle'
import { getLocalStorage } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'

const Index: React.FC = () => {
    const { code } = history.location.query as { code: string }
    const store = useLocalObservable(() => new Store())
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const init = async () => {
        await store.getJobData()
        store.getSimilarList()
        store.getOrgCard()
        store.getResumeList(code)
    }

    useEffect(() => {
        init()
        setDocTitle('就业服务')
    }, [])

    const getCompanyProfileVisible = () => {
        let { address, introductionDto, orgBusinessInfo } = store?.JobData || {}
        address = address || {}
        introductionDto = introductionDto || {}
        orgBusinessInfo = orgBusinessInfo || {}
        const hasAddress = address?.longitude && address?.latitude
        const hasIntroductionDto = Boolean(introductionDto?.introduction)
        const hasOrgBusinessInfo = Reflect.ownKeys(orgBusinessInfo).find(i => Boolean(i))
        return hasAddress || hasIntroductionDto || hasOrgBusinessInfo
    }

    const siteStore = getLocalStorage('SITE_STORE').siteData
    const cityCode =
        findSiteData(siteStore, 'city', {
            findKey: 'baseInfo',
        }) || '100000'
    const provinceCode =
        findSiteData(siteStore, 'province', {
            findKey: 'baseInfo',
        }) || '100001'

    return (
        <Observer>
            {() => (
                <div className={styles.page}>
                    <div className={styles.container}>
                        <BasicInfo
                            setIsOpen={setIsOpen}
                            data={store.JobData}
                            uploadResumeFile={store.uploadResumeFile}
                        />
                        <SubmitResume
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // @ts-ignore
                            onOk={store.submitResume}
                            data={store.JobData}
                            resumeList={store.resumeList}
                            uploadResumeFile={store.uploadResumeFile}
                        />
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <JobDesc data={store.JobData} />
                                {getCompanyProfileVisible() ? (
                                    <CompanyProfile data={store.JobData} />
                                ) : null}

                                <div className={styles.search_box}>
                                    <Search
                                        onSearch={e =>
                                            history.push(`/square/job-list?professionName=${e || ''}`)
                                        }
                                        displayRender={label => (
                                            <>
                                                <svg className={styles.icon} aria-hidden="true">
                                                    <use xlinkHref={`#dizhi`} />
                                                </svg>
                                                {label[label.length - 1]}
                                            </>
                                        )}
                                        defaultValue={{
                                            cityCode,
                                            provinceCode
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.right}>
                                <CompanyCard data={store.orgCard} className={styles.company_card} />
                                <SimilarPositions list={store.similarList} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Observer>
    )
}

const Page: IRoute = observer(Index)
export default Page
