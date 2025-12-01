export interface PluginsConfigType {
    title: string
    component: any
    type: string
    width?: number
    height?: number
    centered?: boolean
    okText?: string
    cancelText?: string
}

export type ComponentMapType = Record<string, PluginsConfigType>
export type ComponentMapValueType = ComponentMapType[keyof ComponentMapType]

export interface ModalProviderType {
    visible: boolean
    dataSource: any
    type: string
    handleClose: () => void
    handleConfirm: (data: any) => void
}

export interface ModalProviderWrapperType extends ModalProviderType {
    config: ComponentMapType
}
