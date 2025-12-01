import type { AiSessionDto } from '../service/types'

interface GenerateInterface {
    open: boolean
    historyList: AiSessionDto[]
    onCancel?: () => void
    getHistory?: () => void
    /** 需要包含一剑生成的参数和生成历史的参数 */
    params?: any
    title?: string
    onOptionsClick?: (type: string) => void
    sseData?: any
}
