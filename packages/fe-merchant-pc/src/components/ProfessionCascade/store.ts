import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { JobParams, AuthenticateParams, AuthenticateData } from './interface'
import { getCommonJobListApi, authenticatePage } from './api'
import {
    initJobParams,
    initAuthenticateParams,
    authenticateChildrenName,
    handlerData,
} from './const'
import { getCookie } from '@/storage'
import { generateCommonJobList } from './utils'
import { BELONG_TYPE_ENUM } from '@/constants'

class useHook {
    constructor() {
        makeAutoObservable(this)
    }

    // 职业/工种/等级 搜索条件
    public commonJobParams: JobParams = initJobParams
    // 职业/工种/等级 下拉数据
    public commonJobList = []

    /** 鉴定点请求参数  */
    public authenticateParams: AuthenticateParams = initAuthenticateParams
    /** 鉴定点等级数据  */
    public authenticateData = {} as AuthenticateData

    //获取职业/工种/等级下拉列表
    async getCommonJobList(params: Partial<JobParams>) {
        this.commonJobParams = { ...this.commonJobParams, ...params }

        const { pageNo = 1 } = this.commonJobParams
        // @ts-ignore
        const { data, totalCount, pageSize = 10 } = await getCommonJobListApi(this.commonJobParams)

        return {
            data: generateCommonJobList(data) || [],
            nextPage: pageNo + 1,
            isNext: params.name ? true : pageNo * pageSize < totalCount,
        }
    }

    // 搜索额外的职业/工种/等级
    async getExtraCommonJobList(workCode: number) {
        // @ts-ignore
        const { data } = await getCommonJobListApi({ ...initJobParams, workCode })

        this.commonJobList = generateCommonJobList(data) || []
    }

    /**
     * 获取获取鉴定点数据
     */
    getAuthenticateData = async (levelCode: number) => {
        let res = {} as AuthenticateData as any
        const orgCode = getCookie('SELECT_ORG_CODE')
        if (!orgCode) return
        res = await http(authenticatePage, 'post', {
            ...this.authenticateParams,
            orgCode,
            levelCode,
            belongType: BELONG_TYPE_ENUM.MERCHANT,
        })
        const data = handlerData(res.data, 0, authenticateChildrenName, 'code')
        this.authenticateData = { ...res, data } as unknown as AuthenticateData
    }
}

export default new useHook()
