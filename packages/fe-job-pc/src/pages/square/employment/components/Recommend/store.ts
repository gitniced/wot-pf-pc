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
            (await Http(Api.hotEnterprises, 'post', {
                sid: getLocalStorage('SID'),
                pageNo: 1,
                pageSize: 16,
            })) ?? []
        this.cardItems = data?.data as unknown as ProfessionOrgCardDto[]
    }

    public translateX = 0

    setTranslateX = (val: number) => {
        this.translateX = val
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
