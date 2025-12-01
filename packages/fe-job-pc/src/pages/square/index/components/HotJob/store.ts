import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import type { ProfessionCardDto } from '@/@types/profession'

class Store {
    /** 职业一级分类 */
    public jobTypeOptions: any = []

    /** 获取职业一级分类 */
    getJobType = async () => {
        const data: any = (await Http(Api.listByPid, 'get', {})) ?? []
        this.jobTypeOptions = data.slice(0, 5).map((item: any) => ({
            key: item.id,
            label: item.name,
        }))
    }

    /** 卡片数据 */
    public cardItems: ProfessionCardDto[] = []

    /** 获取卡片数据 */
    getCardItems = async (expectProfessionTypeId: string) => {
        const data = (await Http(Api.hotList, 'post', { expectProfessionTypeId })) ?? []
        this.cardItems = data as unknown as ProfessionCardDto[]
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
