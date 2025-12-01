import { inject, observer, useLocalObservable } from 'mobx-react'
import React, { useEffect } from 'react'
import { useLocation } from 'umi'
import type { QUERY_TYPE } from './const'
import { AGREEMENT_TYPE_MAP } from './const'
import AgreementStore from './store'
import styles from './index.module.less'
// import Header from '@/components/Global/Header'
import { AGREEMENT_TYPE_MAP_CHINESE } from './const'
import type SiteStore from '@/stores/siteStore'
import { findSiteData } from '@wotu/wotu-components'
import Header from '../components/AdminHeader'
import DefaultAgreement from './components/DefaultAgreement'

const Index = ({ siteStore }: { siteStore: SiteStore }) => {
    const store = useLocalObservable(() => new AgreementStore())
    let { query }: { query: { type: QUERY_TYPE } } = useLocation() || {}
    let sid = siteStore?.siteData?.data?.sid

    useEffect(() => {
        store.getAgreementInfo(sid, query.type)
        document.title = AGREEMENT_TYPE_MAP_CHINESE?.[query.type]
    }, [])

    let { title, context } = store.agreementInfo || {}

    return (
        <div className={styles.page}>
            <Header
                logo={
                    findSiteData(siteStore?.siteData, 'merchant_logo')?.value
                    // 'https://static.zpimg.cn/public/business_pc/gz_logo.png'
                }
                pcDomain={''}
                showBack={false}
                noBg={false}
                backLogin={true}
            />

            <div className={styles.main}>
                {store.agreementFlag &&
                    (!store.agreementInfo ? (
                        <DefaultAgreement type={AGREEMENT_TYPE_MAP[query.type]} />
                    ) : (
                        <>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.content}>
                                <div
                                    contentEditable="true"
                                    dangerouslySetInnerHTML={{ __html: context }}
                                />
                            </div>
                        </>
                    ))}
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(Index))
