import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import type { valType } from './interface'
import { getSessionStorage, setSessionStorage } from '@/storage'

export default class PortalDetailHooks {
    public PortalInfoDetail: Partial<valType> = {} //门户信息
    // 自定义域名
    customDomain = ''

    constructor() {
        makeAutoObservable(this)
    }

    // 自定义域名
    setCustomDomain = async (e: React.ChangeEvent<HTMLInputElement>) => {
        this.customDomain = e.target.value || ''
    }

    // 获取门户信息
    getPortalInfo = async (organizationCode: string) => {
        const res: any = (await Http(`${api.getPortalInfo}`, 'get', { organizationCode })) || {}
        this.PortalInfoDetail = res
        this.customDomain = res.customDomain || ''
    }

    //修改门户信息
    editPortalInfo = async (data: valType) => {
        const { customDomain, organizationCode } = data || {}
        const currentPortalCodeObj = getSessionStorage('CURRENT_PORTAL_ALIAS_OBJ') || {}
        if (customDomain) {
            setSessionStorage('CURRENT_PORTAL_ALIAS_OBJ', {
                ...currentPortalCodeObj,
                [organizationCode]: customDomain,
            })
        }

        const res =
            (await Http(`${api.editPortal}`, 'post', { ...data }, { repeatFilter: false })) || {}
        return res
    }
}
