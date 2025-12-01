import type { AxiosRequestConfig, Canceler } from 'axios'

export type RequestList = Record<string, Canceler>

export interface RequestConfig extends AxiosRequestConfig {
    delayTime?: number
    noMsg?: boolean | undefined
    filterEmptyData?: boolean
    repeatFilter?: boolean

    customHeader?: Record<string, any>
}
