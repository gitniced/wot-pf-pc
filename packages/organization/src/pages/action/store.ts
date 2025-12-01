import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { ACTION_STATUS_TYPE } from './interface.d'

let timer: NodeJS.Timer | null = null
class ImportStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 机构id 'ORG220727W1FBX8G'
    organizationCode: string = ''
    // 机构name 'ORG220727W1FBX8G'
    organizationName: string = ''

    // 成员编码
    userCode: string = ''

    // 是否开启轮询，默认false
    isPolling: boolean = false

    // 轮询的定时器
    timer: NodeJS.Timer | null = null

    // 导入详情
    importDetail: any = {}

    // 获取机构 code
    getOrganizationCode = (code: string) => {
        this.organizationCode = code
    }

    // 下载列表
    getImportList = async (params: any) => {
        timer && clearTimeout(timer)
        if (!params?.organizationCode) return
        const res: any = await http(
            api.importList,
            'POST',
            {
                ...params,
            },
            { repeatFilter: false },
        )

        // status为 1 | 2 的时候，开启轮询
        this.isPolling = res?.data.some((item: any) =>
            [ACTION_STATUS_TYPE.PENDING, ACTION_STATUS_TYPE.WAITING].includes(item.status),
        )

        // if (this.isPolling) {
        //     this.timer = setTimeout(() => {
        //         this.getImportList(params)
        //     }, 2 * 1000)
        // } else {
        //     this.clearTimer()
        // }

        return res
        // if (window?.update_page_size && Number.isInteger(res?.pageSize)) {
        //     window?.update_page_size?.(res?.pageSize)
        // }
    }

    doTimer = (ref: any) => {
        // this.timer = setInterval(() => {
        //     ref.current.reload?.()
        // }, 2 * 1000)
    }

    clearTimer = () => {
        // this.timer && clearTimeout(this.timer)
    }

    // 获取导入详情
    getImportDetail = async (code: string) => {
        if (!code) return
        this.importDetail = await http(`${api.importDetail}/${code}`, 'get', {}, {})
    }
}

export default ImportStore
