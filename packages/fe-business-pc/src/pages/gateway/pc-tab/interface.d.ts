import type { FOOTER_LINK_TYPE } from './const'
export interface SortableItemType {
    title?: string
    link?: string
    sort?: number
    disableState?: number
    id?: string
    marketingType?: string
}

export interface SortableItemProps {
    data: SortableItemType
    deleteLink?: (id?: string) => void
    onLinkEdit?: () => void
    /**  判断是导航链接 还是友情链接  */
    flag: FOOTER_LINK_TYPE
    onCustomLinkChange: any //选择跳转链接change事件
    customLinkList: any[] //选择跳转链接数据
}

export interface IFooterSortTableProps {
    /**  判断是导航链接 还是友情链接  */
    flag: FOOTER_LINK_TYPE
    dataList: any
    onAddLinks: any
    onDeleteLinks: any
    onEditLinks: any
    updateList: any
    customLinkList: any[] //选择跳转链接数据
}
