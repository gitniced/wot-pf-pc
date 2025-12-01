import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import RegisterApi from '@/pages/user/components/OrgJoinRegister/api'
import { getPathParams, getSourceTypeByType } from '@/utils/urlUtils'
import { history } from 'umi'
import type UserStore from '@/stores/userStore'
import api from './api'

export default class SelectOrgStore {
    public canJoinOrgList: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    // 入驻时可选择的列表（列表中的机构不包含当前身份）
    getCanJoinOrgList(sourceType: React.Key) {
        if (!sourceType) return
        return Http(
            `${RegisterApi.canJoinOrg}${getSourceTypeByType(sourceType as string)}`,
            'GET',
            {},
        ).then((res: any) => {
            if (res?.length) {
                this.canJoinOrgList = res
            } else {
                // 如果没有可以选的入驻机构 就去创建页面
                history.push(`/organization/create${getPathParams()}`)
                return
            }
        })
    }

    // 选择org
    toSelectOrg = async (
        item: Record<string, any>,
        query: any,
        userStore: UserStore | undefined,
    ) => {
        let identity = Number(getSourceTypeByType(query.sourceType))
        let currentOrgCode = item?.organizationCode
        if (query.type === 'login') {
            // 登录的选择机构：更新用户当前选中机构，并跳转到工作台
            await userStore?.updateCurrentOrgCode(currentOrgCode)
            // await userStore?.goWorkBench()
            await userStore?.afterSelectOrganization()
        } else {
            if (!currentOrgCode || !identity) return
            // 入驻的选择机构：选中机构添加身份，更新用户机构列表，更新用户当前选中机构，跳转到工作台
            await Http(api.addIdentity, 'POST', {
                organizationCode: currentOrgCode,
                identity,
            })
            await userStore?.getUserOrganization()
            await userStore?.updateCurrentOrgCode(currentOrgCode)
            // await userStore?.goWorkBench()
            await userStore?.afterSelectOrganization()
        }
    }
}
