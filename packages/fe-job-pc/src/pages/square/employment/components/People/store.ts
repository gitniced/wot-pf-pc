import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import type { ProfessionOrgCardDto } from '@/@types/profession'
import { getLocalStorage } from '@/storage'

class Store {
    /** 卡片数据 */
    public cardItems: ProfessionOrgCardDto[] = []

    /** 获取卡片数据 */
    getCardItems = async () => {
        const data =
            (await Http(Api.recommendpage, 'post', {
                sid: getLocalStorage('SID'),
                formAlias: 'HRFlagshipStore',
                pageNo: 1,
                pageSize: 12,
                status: 0,
            })) ?? []
        this.cardItems = data?.data as unknown as ProfessionOrgCardDto[]
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
