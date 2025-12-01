import type { IRoute } from 'umi'

// 自定义标题
export interface TitleAdvanceProps extends IRoute {
    title: string
    className?: string
}
