import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import type { AnyObj } from '@/types'
import { getCookie } from '@/storage'
import type { BusinessIntroductionInfo } from './interface'

class Store {
    /** 工商信息信息 */
    public businessIntroductionInfo: BusinessIntroductionInfo = {}

    /** 获取工商信息信息 */
    getBusinessIntroductionInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: AnyObj =
            (await Http(`${Api.businessIntroductionInfo}/${organizationCode}`, 'get', {})) ?? {}
        this.businessIntroductionInfo = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
