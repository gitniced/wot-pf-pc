import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import { SELLER_KIND } from './const'
import type { SiteData } from '@/types'
import globalApi from '@/servers/globalApi'
import { getDomain } from '@/utils/urlUtils'

let singleSellerStore: sellerStore

class sellerStore {
    public sid: string = ''
    public kind: SELLER_KIND = SELLER_KIND.QUESTION
    public sellerSite = {}
    public linkSellerSite: SiteData = {}
    public selfType = 3
    constructor() {
        makeAutoObservable(this)
    }

    getLinkSellerSite() {
        return Http(globalApi.getDomainBySiteData, 'get', {
            // 域名
            domain: getDomain(),
        }).then(res => {
            console.log(res)
            this.linkSellerSite = res as SiteData
            return res
        })
    }

    getSellerSiteData = async (merchantDomain: string) => {
        const sellerSite = await Http(globalApi.getConfigByDomain, 'GET', {
            merchantUserDomain: merchantDomain,
        })
        this.sellerSite = sellerSite || {}
    }
}

singleSellerStore = new sellerStore()

export default singleSellerStore

export const getSingleSeller = () => {
    if (singleSellerStore) {
        return singleSellerStore
    } else {
        singleSellerStore = new sellerStore()
        return singleSellerStore
    }
}
