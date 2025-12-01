import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import { AnyObj } from '@/types'
import { getCookie } from '@/storage'

class Store {

    /** 主营业务信息 */
    public mainBusinessInfo = {}

    /** 获取主营业务信息 */
    getMainBusinessInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: any = await Http(`${Api.mainBusinessInfo}/${organizationCode}`, 'get', {}) ?? {}
        this.mainBusinessInfo = data
    }
    
    /** 编辑主营业务信息 */
    editMainBusinessInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        await Http(Api.editMainBusinessInfo, 'post', {
            organizationCode,
            ...data
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
