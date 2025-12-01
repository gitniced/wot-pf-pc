import { makeAutoObservable } from 'mobx'
import api from './api'
import Http from '@/servers/http'
import { getCookie } from '@/storage'
import type {
    CustomerContractPageDto,
    CustomerContractPageUsingPOSTRequest,
} from '@/@types/finance'

class ContractStore {
    public contractList: CustomerContractPageDto[] = []

    constructor() {
        makeAutoObservable(this)
    }
    async getContractList() {
        let params: CustomerContractPageUsingPOSTRequest = {
            organizationCode: getCookie('SELECT_ORG_CODE'),
        }
        const res = (await Http(
            api.getContractList,
            'post',
            params,
        )) as unknown as CustomerContractPageDto[]
        this.contractList = res
    }
}

export default ContractStore
