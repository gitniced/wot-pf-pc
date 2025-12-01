import React, { useEffect } from 'react'
import { inject } from 'mobx-react'
import { observer, useLocalObservable } from 'mobx-react'
import { PTCaseList } from '@wotu/pt-components'
import type { IRoute } from 'umi'
import { history } from 'umi'
import CaseStore from '../store'
import type { UserStore } from '@/stores/userStore'

const Page = ({ userStore }: { userStore: UserStore }) => {
    const store = useLocalObservable(() => new CaseStore())

    useEffect(() => {
        setTimeout(() => {
            document.title = '标杆案例'
        }, 1000)
    }, [])

    useEffect(() => {
        store.setSelectedIdentity(userStore?.selectedIdentity)
        store.getRecommendPage()
    }, [userStore?.selectedIdentity])

    const onItemClick = (code: string) => {
        history.push(`/case/detail?code=${code}`)
    }
    return (
        <>
            <PTCaseList
                dataSource={store.caseList}
                onPageChange={store.pageHandel}
                current={store.pageParma.pageNo}
                total={store.pageParma.totalCount}
                onItemClick={onItemClick}
                defaultImage={defaultImage}
            />
        </>
    )
}

const ObserverPage: IRoute = inject('userStore')(observer(Page))
ObserverPage.title = '标杆案例'
export default ObserverPage
