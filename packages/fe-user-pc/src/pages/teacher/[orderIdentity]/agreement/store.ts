import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { AGREEMENT_TYPE_MAP } from './const'
import type { QUERY_TYPE } from './const'
import type { SiteAgreementDto } from '@/@types/auth'

export default class AgreementStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 用户协议
    agreementInfo: SiteAgreementDto | null = null
    // 用户协议是否请求完成
    agreementFlag: boolean = false

    // 获取用户协议
    getAgreementInfo = async (sid: number | undefined, type: QUERY_TYPE) => {
        let agreementList: SiteAgreementDto[] = []
        if (sid) {
            agreementList = (await http(
                `${api.getAgreementInfo}/${sid}`,
                'get',
                {},
                { repeatFilter: false },
            )) as unknown as SiteAgreementDto[]
        }

        // 遍历找出对应type的协议
        this.agreementInfo = agreementList?.find(item => item.type === AGREEMENT_TYPE_MAP?.[type])

        this.agreementFlag = true
    }
}
