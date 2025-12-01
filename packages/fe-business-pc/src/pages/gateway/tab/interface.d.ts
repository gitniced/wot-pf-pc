export interface GlobalNav {
    [id: string]: any
    name: string
    id: any
    icon: string
    selectedIcon: string
}

export interface NAV_OBJECT {
    selectedIcon: string
    icon: string
    id: string | number
    name: string
    href: string
    defaultIcon: string
    activeIcon: string
    status?: any
    operateCode: string[]
    code: string
    readonly: number
    linkName: string
    isEdit: number
}
export enum LinkEnum {
    // 微页面
    MiCRO = 1,
    // 图文详情
    IMAGE_TEXT = 2,
    // 自定义链接
    CUSTOM_LINK = 3,
    // 图文列表
    IMAGE_LIST = 4,
}

export type UrlItem = {
    type?: LinkEnum
    label?: string
    code?: string
}
export interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    index: number
    moveRow: (dragIndex: number, hoverIndex: number) => void
}

export interface linkObjType {
    key: number | string
    value: any
}

export interface DataObj {
    id: string
    linkName?: string
    linkType?: string
    linkUrl?: string
    ids?: string
    [key: string]: any // 其它可能存在的属性
}
