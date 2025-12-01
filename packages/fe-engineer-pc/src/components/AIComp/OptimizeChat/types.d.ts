export interface OptimizeResult {
    sessionCode: string
    role?: 'user' | 'assistant'
    content: string
    code: string
    messageSerialnumber: string
    messageRole: string
    likeState: number
    actionJson: any
    timestamp?: number
    userPrompt?: string // 存储对应的用户指令
}

export interface Store {
    inputText: string
    streaming: boolean
    messages: OptimizeResult[]
    currentOptimizeResult: OptimizeResult | null
    isGenerating: boolean
    currentStreamingMessageId: string | null
    setInput: (val: string) => void
    sendMessage: () => Promise<void>
    regenerate: () => void
    regenerateMessage: (index: number) => void
    useOptimizeResult: (id: string) => void
    toggleLike: (likeState: number) => void
    toggleMessageLike: (messageId: string, likeState: number) => void
}
