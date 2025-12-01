import { makeAutoObservable } from 'mobx'
import { getShareCodeByUserApi } from './api'
import type { ShareCodeParams } from './interface'

class ActivityDetailStore {
    public shareCodeParams: Partial<ShareCodeParams> = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**  根据用户信息获就业援助分享链接参数  */
    getShareCodeByUser = async (organizationCode: string) => {
        this.shareCodeParams = (await getShareCodeByUserApi(
            organizationCode,
        )) as unknown as ShareCodeParams
    }
}

export default new ActivityDetailStore()
