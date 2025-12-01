import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import type { ProfessionOrgCardDto } from '@/@types/profession'

class Store {

    /** 卡片数据 */
    public cardItems: ProfessionOrgCardDto[] = []

    /** 获取卡片数据 */
    getCardItems = async () => {
        const data = await Http(Api.orgList, 'post', {}) ?? []
        this.cardItems = data as unknown as ProfessionOrgCardDto[]
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
