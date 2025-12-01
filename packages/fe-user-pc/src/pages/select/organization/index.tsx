import React, { useEffect } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import type { IRoute } from 'umi'
import { useModel } from 'umi'
import { useLocation } from 'umi'
import SelectOrg from '@/components/Global/SelectOrg'
import SelectOrgStore from './hooks'
import { setCurrentIdentityCode } from '@/utils/setWorkBenchUtils'
import { LOGIN_TYPE } from '@wotu/wotu-components/dist/esm/Types'
const Organization = (props: PageProps) => {
    const { userStore } = props || {}
    let { query } = useLocation()
    let { type, sourceType } = query || {}
    const masterStore = useModel('@@qiankunStateFromMaster')
    let { setSelectIdentity } = masterStore || {}
    const store = useLocalObservable(() => new SelectOrgStore())
    useEffect(() => {
        if (type === 'register') {
            // 注册时可入驻的列表（列表中的机构不包含当前身份）
            store.getCanJoinOrgList(sourceType)
        }
    }, [])

    // 选择机构
    const selectOrg = async (item: Record<string, any>) => {
        await store.toSelectOrg(item, query, userStore)
        sourceType && setCurrentIdentityCode(setSelectIdentity, sourceType)
    }

    return (
        // @ts-ignore
        <SelectOrg
            // 注册时可入驻的列表（列表中的机构不包含当前身份），其他场景为选择机构（列表中的机构包含当前身份）
            orgList={type === 'register' ? store.canJoinOrgList : userStore?.userOrg || []}
            onClick={selectOrg}
            fromType={LOGIN_TYPE.ORG_LOGIN}
        />
    )
}

const ObserverPage: IRoute = inject('siteStore', 'userStore')(observer(Organization))
ObserverPage.title = '选择机构'

export default ObserverPage
