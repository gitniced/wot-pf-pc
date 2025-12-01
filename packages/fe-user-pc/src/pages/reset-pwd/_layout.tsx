import Footer from '@/components/Global/Footer'
import Header from '@/components/Global/Header'
import { Layout } from 'antd'
import type { IRoute } from 'umi'
import { useLocation } from 'umi'
import styles from './index.module.less'
import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import { LOGIN_TYPE_STR_TO_NUM, USER_LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import { getCookie } from '@/storage'
// import { useEffect, useState } from 'react'
// import { findSiteData } from '@wotu/wotu-components'

type LockLayoutProps = IRoute & {
    userStore: UserStore
    siteStore: SiteStore
}

const LockLayout = (props: LockLayoutProps) => {
    const { userStore } = props
    const { state = {} } = useLocation()
    const selectUserType = getCookie('SELECT_USER_TYPE')
    const userTypeNumber = Number(LOGIN_TYPE_STR_TO_NUM[selectUserType])

    useEffect(() => {
        if (!(
            (userStore.userData?.isInitPassword && [USER_LOGIN_TYPE.ORG_LOGIN, USER_LOGIN_TYPE.SELLER_LOGIN].indexOf(state?.currentUserType || userTypeNumber) > -1) ||
            (userStore.userData?.personageInitPassWord && [USER_LOGIN_TYPE.USER_LOGIN, USER_LOGIN_TYPE.PERSON_TEACHER].indexOf(state?.currentUserType || userTypeNumber) > -1)
        )) {
            window.history.back()
        }
    }, [userStore])

    return (
        <Layout className={styles.page_container}>
            <Header noUser={false} noBg={true} padding={false} noBack={true} showGoToHome={false} />
            <div className={styles.user_content}>{props.children}</div>
            <Footer noBg={true} />
        </Layout>
    )
}

const ObserverLockLayout = inject('userStore')(observer(LockLayout))

export default ObserverLockLayout
