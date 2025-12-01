import Http from '@/servers/http'
import { makeAutoObservable , toJS} from 'mobx'
import type { Objtype } from './interface'
import api from './api'

export default class businessHooks {
    public merchantInfo: Partial<Objtype> = {}

    constructor() {
        makeAutoObservable(this)
    }

    // 获取商家详情
    getMerchantDetails = async (code: string, settlementCode: string) => {
        const res =
            (await Http(
                api.getMerchants,
                'post',
                { merchantOrgCode: code, settleTargetCode: settlementCode },
                { repeatFilter: false },
            )) || {}
        console.log('res', toJS(res));
        this.merchantInfo = { ...res }
    }
}
