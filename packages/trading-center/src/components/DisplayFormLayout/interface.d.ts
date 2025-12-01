import type { ColProps, RowProps } from 'antd'
type RenderFunction = () => React.ReactNode

export interface DataType {
    /** label */
    label: string
    /** value */
    value: any
    /** 气泡提示，为true默认展示value内容，也可以自定义气泡内容 */
    tooltip?: boolean | React.ReactNode | RenderFunction
    /** 是否是时间戳 */
    timeStamp?: boolean
    /** dayjs的format */
    format?: string
}
export interface DisplayFormLayoutType {
    data: DataType[]
    col?: ColProps
    row?: RowProps
}
