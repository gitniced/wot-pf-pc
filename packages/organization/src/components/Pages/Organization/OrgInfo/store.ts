import { runInAction, makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import type { Scale } from './interface'

class InfoStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 机构规模列表
    scaleList: Scale[] = []

    // 获取机构规模列表
    getScaleList = async () => {
        const res: any = await http(api.scale, 'get', { alias: 'scale' })

        runInAction(() => {
            this.scaleList = res ?? []
        })
    }
}

export default InfoStore
