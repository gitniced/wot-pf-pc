import { makeAutoObservable } from 'mobx'
import sseClient from '../service/sse'
import type { AiSessionDto, SSEResult } from '../service/types'
import { api } from '../service/api'
import http from '@/servers/http'
import { runInAction } from 'mobx'

export class Store {
    public isGenerating: boolean = false
    private streamRef: SSEResult | null = null
    public params: any = {}
    // 历史生成记录
    public historyList: AiSessionDto[] = []
    // 自定义生成数据
    public customGeneratedData: any = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setParams = (params: any = {}) => {
        this.params = params
    }

    // 一键生成带历史
    generate = (cb: () => void) => {
        if (this.isGenerating) return
        let isFirst = false
        this.isGenerating = true
        const sse = sseClient<any, any>(api.courseGenerator, this.params)
        this.streamRef = sse
        sse.subscribe(({ data }: any) => {
            this.customGeneratedData = data

            if (!isFirst) {
                isFirst = true
                this.getListSession().then(() => cb())
            }
        })
        sse.onClose(() => {
            this.finishStream()
        })
    }

    // 自定义生成
    customGenerate = (url: string, params: any = {}) => {
        if (this.isGenerating) return
        this.isGenerating = true
        const sse = sseClient<any, any>(url, params)
        this.streamRef = sse
        sse.subscribe(({ data }: any) => {
            if (data?.finishStatus === 3) {
                this.customGeneratedData = data
            }
        })
        sse.onClose(() => {
            this.finishStream()
        })
    }

    finishStream(): void {
        this.isGenerating = false
        if (this.streamRef) {
            this.streamRef.close()
            this.streamRef = null
        }
    }

    getListSession = () => {
        return http<any, AiSessionDto[]>(api.listSession, 'GET', { type: 3, ...this.params }).then(
            data => {
                runInAction(() => {
                    this.historyList = data
                })
            },
        )
    }
}
