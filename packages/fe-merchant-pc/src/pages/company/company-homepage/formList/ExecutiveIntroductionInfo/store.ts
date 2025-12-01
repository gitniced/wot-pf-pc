import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import { initFormData } from './const'
import type { AnyObj } from '@/types'
import { getCookie } from '@/storage'

class Store {

    /** 高管介绍信息 */
    public executiveIntroductionInfo = {}

    /** 获取高管介绍信息 */
    getExecutiveIntroductionInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: any = await Http(`${Api.executiveIntroductionInfo}/${organizationCode}`, 'get', {}) ?? {}
        data.executiveList = data.executiveList.map(item => ({
            ...item,
            imgUrl: item.imgUrl ? [{
                url: item.imgUrl,
                name: item.imgUrl,
            }] : []
        }))
        this.executiveIntroductionInfo = data
    }

    /** 编辑高管介绍信息 */
    editExecutiveIntroductionInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        await Http(Api.editExecutiveIntroductionInfo, 'post', {
            organizationCode,
            executiveList: data.executiveList.map((item: AnyObj) => ({
                ...item,
                imgUrl: item.imgUrl?.[0]?.url ?? ''
            }))
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
