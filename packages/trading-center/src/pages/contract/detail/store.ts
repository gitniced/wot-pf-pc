import { makeAutoObservable } from 'mobx'
import api from '../api'
import Http from '@/servers/http'
import type { ContractDetailType } from './interface'

class ContractDetailStore {
    public contractDetail: ContractDetailType = {}
    public contractGoods: any[] = []
    constructor() {
        makeAutoObservable(this)
    }
    async getContractDetail(code: string) {
        const res = await Http(`${api.getContractDetail}/${code}`, 'get', {})
        this.contractDetail = res as unknown as ContractDetailType
    }
    async getContractGoodsList(code: string) {
        const res = await Http(`${api.getContractGoodsList}/${code}`, 'get', {})
        this.contractGoods = (res || []) as unknown as any
    }
}

export default ContractDetailStore
