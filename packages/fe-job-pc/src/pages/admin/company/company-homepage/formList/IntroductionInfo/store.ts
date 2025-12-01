import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import { getCookie } from '@/storage'

class Store {

    /** 公司介绍信息 */
    public introductionInfo = {}

    /** 获取公司介绍信息 */
    getIntroductionInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: any = await Http(`${Api.introductionInfo}/${organizationCode}`, 'get', {}) ?? {}
        this.introductionInfo = data
    }
    /** 编辑公司介绍信息 */
    editIntroductionInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        await Http(Api.editIntroductionInfo, 'post', {
            organizationCode,
            ...data
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
