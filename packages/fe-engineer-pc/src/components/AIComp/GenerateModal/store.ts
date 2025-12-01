import { makeAutoObservable } from 'mobx'
import sseClient from '../service/sse'
import type { AiSessionDto, ChatMessageDto, SSEResult } from '../service/types'
import { api } from '../service/api'
import { aiLike, converterContent, getAnswer } from '../service/service'
import { message } from 'antd'

export class Store {
    public isGenerating: boolean = false
    private streamRef: SSEResult | null = null
    public params: any = {}
    // 历史生成记录
    public historyList: AiSessionDto[] = []
    public currentCode: string = ''
    public currentData: ChatMessageDto = {}

    public timer: any = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setParams = (params: any = {}) => {
        this.params = params
    }

    setCurrentCode = (code: string) => {
        this.currentCode = code
    }

    setCurrentData = (data: any) => {
        this.currentData = data
        if (data?.finishStatus === 3 || !data) {
            this.isGenerating = false
        } else {
            this.isGenerating = true
        }
    }

    generate = (cb?: () => void) => {
        if (this.isGenerating) return
        this.isGenerating = true
        let isFirst = false
        const sse = sseClient<any, any>(api.courseGenerator, this.params)
        this.streamRef = sse
        this.currentCode = ''
        this.currentData = {}
        sse.subscribe(({ data }: any) => {
            if (!isFirst) {
                isFirst = true
                this.currentCode = ''
                cb?.()
            }
            if (this.currentCode === data.sessionCode) {
                this.currentData = data
                this.isGenerating = true
            }
        })
        sse.onClose(() => {
            cb?.()
            this.finishStream()
        })
    }

    getSSEMessage = (sessionCode: string) => {
        if (this.isGenerating) return
        this.isGenerating = true
        const sse = sseClient<any, any>(api.courseGenerator, { sessionCode })
        this.streamRef = sse
        sse.subscribe(({ data }: any) => {
            this.currentData = data
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

    // 切换指定消息的点赞状态
    toggleMessageLike(code: string, likeState: number): void {
        aiLike({ code, likeState }).then(() => {
            this.getAnswerData(this.currentCode)
        })
    }

    // 获取生成详情
    getAnswerData(code: string): void {
        if (this.currentCode !== code) {
            clearTimeout(this.timer)
        }
        this.currentCode = code
        getAnswer({ sessionCode: code }).then(data => {
            if (!data) {
                if (this.currentData.sessionCode) return
                this.isGenerating = true
                this.timer = setTimeout(() => {
                    this.getAnswerData(code)
                }, 1000)
                this.currentData = {}
            } else {
                this.isGenerating = false
                this.currentData = data
            }
        })
    }

    converterContent() {
        return converterContent({ messageCode: this.currentData.code! }).then(() => {
            message.success('使用成功')
        })
    }
}
