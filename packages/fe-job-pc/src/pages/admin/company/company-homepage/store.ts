import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from './api'
import { getCookie } from '@/storage'

class Store {
    /** 进度条 */
    public rate: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    /** 获取进度条 */
    getRate = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data = await Http(`${Api.infoRete}/${organizationCode}`, 'get', {})
        this.rate = data as unknown as number
    }
}

export default Store
