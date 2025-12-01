import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { useLocation } from 'umi'
import Hooks from './hooks'
import SelectOrg from '@/components/Global/SelectOrg'
import type { IRoute } from 'umi'
import type { PageProps } from '@/types'
import { LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
import type UserStore from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
const Organization = ({ userStore, siteStore }: PageProps) => {
    const { query } = useLocation() as any

    useEffect(() => {
        if (query.type !== 'login') {
            Hooks.getByToSelectInOrgList(query.sourceType)
        }
    }, [])

    return (
        // @ts-ignore
        <SelectOrg
            orgList={query.type === 'login' ? userStore?.userOrg || [] : Hooks.selectOrgList}
            onClick={item => {
                Hooks.toSelectOrg(item, query, userStore as UserStore, siteStore as SiteStore)
            }}
            fromType={LOGIN_TYPE.SELLER_LOGIN}
        />
    )
}

const ObserverPage: IRoute = inject('siteStore', 'userStore')(observer(Organization))
ObserverPage.title = '选择机构'

export default ObserverPage
