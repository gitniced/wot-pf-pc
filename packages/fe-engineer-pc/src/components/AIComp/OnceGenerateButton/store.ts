import { makeAutoObservable } from 'mobx'
import sseClient from '../service/sse'
import type { AiSessionDto, SSEResult } from '../service/types'

export class Store {
    public isGenerating: boolean = false
    private streamRef: SSEResult | null = null

    // 历史生成记录
    public historyList: AiSessionDto[] = []
    // 自定义生成数据
    public customGeneratedData: any = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    // 自定义生成
    customGenerate = (
        url: string,
        params: any = {},
        onStart?: () => void,
        onFinish?: (data: any) => void,
        onFinally?: () => void,
    ) => {
        if (this.isGenerating) return
        this.isGenerating = true
        onStart?.()
        const sse = sseClient<any, any>(url, params)
        this.streamRef = sse
        sse.subscribe(({ data }: any) => {
            if (data?.finishStatus === 3) {
                this.customGeneratedData = data.actionJson
                onFinish?.(data.actionJson)
            }
        })
        sse.onClose(() => {
            this.finishStream()
            onFinally?.()
        })
    }

    finishStream(): void {
        this.isGenerating = false
        if (this.streamRef) {
            this.streamRef.close()
            this.streamRef = null
        }
    }
}
