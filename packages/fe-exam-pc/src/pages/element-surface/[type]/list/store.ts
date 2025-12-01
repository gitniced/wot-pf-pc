import { makeAutoObservable } from 'mobx'
import {
    createAuthenticatesApi,
    deleteAuthenticateApi,
    getAuthenticasApi,
    publishAuthenticateApi,
} from './api'
import type { AuthenticasQuery, CreateAuthenticates } from './interface'
import { omit } from 'lodash'
import { kpHttp } from '@/servers/http/kpHttp'

class Store {
    public planList = []
    constructor() {
        makeAutoObservable(this)
    }

    // 获取评价方案
    getPlanList = (params: any) => {
        kpHttp('/exam-programs', 'get', params).then((data) => {
            this.planList = data.map(({id, name}: any) => ({label: name, value: id}))
        }).catch(() => {
            this.planList = []
        })
    }

    // 获取要素细目表列表
    getAuthenticas = async (params: AuthenticasQuery) => {
        const res: any = await getAuthenticasApi(params)
        return res
    }

    // 新建要素细目表
    createAuthenticates = (params: CreateAuthenticates) => {
        return createAuthenticatesApi(params)
    }

    // 删除要素细目表
    deleteAuthenticate = (code: string) => {
        return deleteAuthenticateApi(code)
    }

    // 发布要素细目表
    publishAuthenticate = (authenticateCode: string, status: number) => {
        return publishAuthenticateApi(authenticateCode, status)
    }
}

export default new Store()
