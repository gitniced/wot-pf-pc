import { inject, observer, useLocalObservable } from 'mobx-react'
import React, { useEffect } from 'react'
import { useLocation } from 'umi'
import type { QUERY_TYPE } from './const'
import { AGREEMENT_TYPE_MAP } from './const'
import AgreementStore from './store'
import styles from './index.module.less'
import DefaultAgreement from './components/DefaultAgreement'
import Header from '@/components/Global/Header'
import { AGREEMENT_TYPE_MAP_CHINESE } from './const'
import type SiteStore from '@/stores/siteStore'

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
      <Header noUser={false} padding={false} showSetting={false} />

      <div className={styles.main}>

        {
          store.agreementFlag && (!store.agreementInfo ? (<DefaultAgreement type={AGREEMENT_TYPE_MAP[query.type]} />) : (
            <>
              <div className={styles.title}>{title}</div>
              <div className={styles.content} >
                <div contentEditable='true' dangerouslySetInnerHTML={{ __html: context }} />
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export default inject('siteStore')(observer(Index))
