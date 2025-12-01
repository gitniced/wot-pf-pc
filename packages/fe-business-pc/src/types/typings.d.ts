interface menuDataType {
    key: string
    label: string
    icon?: string
    type?: string
    children?: menuDataType[]
}

declare interface Window {
    sitePermissionRouteList: any
    userPermissionRouteList: any
    permissionIdList: any
}
