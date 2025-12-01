export type DemoProps = Record<string, any>
export type MenuDataItem = MenuData[]

export type MenuData = {
    icon: string
    name: string
    url: string | string[] // 支持一个菜单匹配多个路径
    active: boolean
    exact?: boolean // 是否开启绝对匹配 开启后需要路径一模一样才会命中
}

export type UserPermission = {
    title: string
    icon: string
    key: number
    moduleId: number
    pid: number
    route: string
    type: number
    typeName: string
    changeEnable: boolean
    has: boolean
    url: string
    children: UserPermission[]
}
