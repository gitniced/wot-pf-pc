import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import type { AnyObj } from '@/types'
import { getCookie } from '@/storage'

class Store {

    /** 产品介绍信息 */
    public productIntroductionInfo = {}

    /** 获取产品介绍信息 */
    getProductIntroductionInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: AnyObj = await Http(`${Api.productIntroductionInfo}/${organizationCode}`, 'get', {}) ?? {}
        data.productList = data.productList.map(item => ({
            ...item,
            logo: item.logo ? [{
                url: item.logo,
                name: item.logo,
            }] : []
        }))
        this.productIntroductionInfo = data
    }

    /** 编辑产品介绍信息 */
    editProductIntroductionInfo = async (data: AnyObj) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        await Http(Api.editProductIntroductionInfo, 'post', {
            organizationCode,
            productList: data.productList.map((item: AnyObj) => ({
                ...item,
                logo: item.logo?.[0]?.url ?? ''
            }))
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
