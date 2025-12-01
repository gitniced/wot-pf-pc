import Footer from '@/components/Global/Footer'
import Header from '@/components/Global/Header'
import { Layout } from 'antd'
import type { IRoute } from 'umi'
import { history } from 'umi'
import styles from './index.module.less'
import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
// import { useEffect, useState } from 'react'
// import { findSiteData } from '@wotu/wotu-components'

type LockLayoutProps = IRoute & {
    userStore: UserStore
    siteStore: SiteStore
}

const LockLayout = (props: LockLayoutProps) => {
    const minLengthPath = (minLength: number) => {
        const { pathname } = history.location || ''
        const pathnameSplitList = pathname?.replace(/([\w\W]+)\/$/, '$1')?.split('/') || []
        return pathnameSplitList.length > minLength
    }

    useEffect(() => {
        const { userOrg, userType } = props.userStore
        if (!minLengthPath(2)) {
            history.replace('/lock/person')
        }
        if (userType !== 'user' && !userOrg?.length && !minLengthPath(2)) {
            history.replace('/lock/person')
        }
    }, [history.location])

    return (
        <Layout className={styles.page}>
            <Header noUser={false} noBg={true} padding={false} noBack={true} showGoToHome={false} />
            <div className={styles.user_content}>{props.children}</div>
            <Footer noBg={true} />
        </Layout>
    )
}

const ObserverLockLayout = inject('userStore')(observer(LockLayout))

export default ObserverLockLayout
