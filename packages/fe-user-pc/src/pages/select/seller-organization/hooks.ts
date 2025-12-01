import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import sellerApi from '@/pages/seller/api'
import { getCompanyBackUrl, getPathParams, getSourceType } from '@/utils/urlUtils'
import { setSessionStorage } from '@/storage'
import { history } from 'umi'
import type SiteStore from '@/stores/siteStore'
import type UserStore from '@/stores/userStore'
import { SOURCE_TYPE_MAPPING } from '@wotu/wotu-components/dist/esm/Types'
import { getMerchantWorkBench } from '@wotu/wotu-components'

export default new (class loginHooks {
    public selectOrgList: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    // 入驻列表
    getByToSelectInOrgList(sourceType: React.Key) {
        if (!sourceType) return
        return Http(
            `${sellerApi.canJoinOrg}${getSourceType(sourceType as string)}`,
            'GET',
            {},
        ).then((res: any) => {
            if (!res?.length) {
                // 如果没有可以选的入驻机构 就去创建页面
                this.toCreate()
                return
            }
            this.selectOrgList = res
            return res
        })
    }
    // 登录的可选列表
    getByLoginSelectOrgCode(sourceType: React.Key) {
        if (!sourceType) return
        return Http(
            `${api.selectOrg}/${getSourceType(sourceType as string)}`,
            'GET',
            {},
            { repeatFilter: false },
        ).then((res: any) => {
            if (!res?.length) {
                // 如果没有可以选的机构 就去锁定页
                history.replace('/lock/person')
                return
            }
            this.selectOrgList = res
        })
    }

    // 去创建
    toCreate() {
        setSessionStorage('CREATE_SOURCE', 'merchant')
        history.push(`/organization/create${getPathParams()}`)
    }

    // 选择机构后选择对应资源方工作台地址
    toLoginFirstPath = (userStore: UserStore, siteStore: SiteStore, query: any) => {
        let { sourceType } = query || {}
        let companyBackUrl = getCompanyBackUrl(sourceType)
        // 有指定企业资源方回调地址时，跳转企业回调地址,优先级高于工作台地址
        const backUrl = companyBackUrl || getMerchantWorkBench(siteStore?.siteData, sourceType)

        console.log('选择机构后选择对应资源方工作台地址', backUrl)

        backUrl ? window.location.replace(backUrl) : history.replace('/account')
    }

    // 选择org
    toSelectOrg = async (
        item: Record<string, any>,
        query: any,
        userStore: UserStore,
        siteStore: SiteStore,
    ) => {
        let { organizationCode } = item || {}
        if (query.type === 'login') {
            await this.updateSelectOrg(item?.organizationCode)
            await userStore?.updateCurrentOrgCode(organizationCode)
            await this.toLoginFirstPath(userStore, siteStore, query)
        } else {
            await this.toAddSourceTypeOrg(item?.organizationCode, query.sourceType)

            await userStore?.getUserOrganization()
            await userStore?.updateCurrentOrgCode(organizationCode)
            await this.toLoginFirstPath(userStore, siteStore, query)
        }
    }

    toAddSourceTypeOrg = async (organizationCode: string, identity: string) => {
        if (!organizationCode || !identity) return
        await Http(api.addIdentity, 'POST', {
            organizationCode,
            identity: SOURCE_TYPE_MAPPING[identity],
        })
    }

    updateSelectOrg = async (code: string) => {
        await Http(
            `${api.updateSelectOrg}${code}`,
            'POST',
            { organizationCode: code },
            { repeatFilter: false },
        )
    }
})()
