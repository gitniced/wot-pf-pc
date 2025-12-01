import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { AuthenticateParams, AuthenticateData } from './interface'
import { authenticatePage } from './api'
import { initAuthenticateParams, authenticateChildrenName, handlerData } from './constant'
import { getCookie } from '@/storage'
import { BELONG_TYPE_ENUM } from '@/pages/question/[type]/constants'

class useHook {
    constructor() {
        makeAutoObservable(this)
    }

    /** 考评点请求参数  */
    public authenticateParams: AuthenticateParams = initAuthenticateParams
    /** 考评点等级数据  */
    public authenticateData = {} as AuthenticateData

    /**
     * 获取获取考评点数据
     */
    getAuthenticateData = async (params: any) => {
        let res = {} as AuthenticateData as any
        const orgCode = getCookie('SELECT_ORG_CODE')
        if (!orgCode) return
        res = await http(authenticatePage, 'post', {
            ...this.authenticateParams,
            ...params,
            orgCode,
            belongType: BELONG_TYPE_ENUM.ORGANIZE,
        })
        const data = handlerData(res.data, 0, authenticateChildrenName, 'code')
        this.authenticateData = { ...res, data } as unknown as AuthenticateData
    }
}

export default new useHook()
