import type { ReactNode } from 'react'

export interface QuickEntryItem {
    image: string
    name: string | ReactNode
    link: string
    info: string
    key: string
}

export interface salaryCountProps {
    /** 薪水最小值 */
    salaryMin: number
    /** 薪水最大值 */
    salaryMax: number
    /** 薪水类型  */
    salaryType: number
    /** 薪资月数 */
    salaryMonth: number
    /** 单位 */
    uint: number
    salaryDesc?: string
}

export interface AreaData {
    code?: string
    name?: string
    level?: number
    parentCode?: string
}
