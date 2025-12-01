import { makeAutoObservable } from 'mobx'
import type { MenuDataItem, MenuData } from './interface'

export default class menuHooks {
    public menuData: MenuDataItem[] = []

    constructor() {
        makeAutoObservable(this)
    }

    isCreateOrg: boolean = false

    setIsCreateOrg = (boolean: boolean) => {
        this.isCreateOrg = boolean
    }

    fixMenu = (currentCode: string | undefined, userPermission?: string[]) => {
        //  站点关闭创建组织功能且没有组织的用户需隐藏组织管理页面
        this.initMenuData()
        let tempMenuData = JSON.parse(JSON.stringify(this.menuData))

        tempMenuData.length > 0 ? '' : (tempMenuData[0] = [])
        const orgInfoMenu = {
            icon: 'icon_zuzhixinxi_n',
            name: '机构信息',
            url: '/organization/detail',
            active: false,
            exact: true,
        }

        const orgManagerMenu = {
            icon: 'icon_chengyuan_n',
            name: '成员管理',
            url: '/organization',
            active: false,
            exact: true,
        }

        const roleMenu = {
            icon: 'icon_juese_n',

            name: '角色管理',
            url: '/organization/role',
            active: false,
            exact: true,
        }

        const actionMenu = {
            icon: 'icon_piliangcaozuo_n',

            name: '批量操作',
            url: '/organization/action',
            active: false,
            exact: true,
        }
        if (currentCode) {
            if (this.isCreateOrg) {
                tempMenuData[0].push(orgInfoMenu, orgManagerMenu, roleMenu)
            } else {
                if (userPermission?.includes('/organization/detail')) {
                    tempMenuData[0].push(orgInfoMenu, orgManagerMenu)
                }

                if (userPermission?.includes('/organization/role')) {
                    tempMenuData[0].push(roleMenu)
                }
            }
            tempMenuData[0].push(actionMenu)
        } else {
            tempMenuData[0].push(orgInfoMenu)
        }

        this.menuData = tempMenuData
    }
    compare = (current: string, target: string, exact?: boolean): boolean => {
        if (exact) {
            return current === target
        } else {
            return target.includes(current)
        }
    }
    mathUrl = (menuItem: MenuData, isMath: boolean) => {
        if (isMath) {
            menuItem.active = true
        } else {
            menuItem.active = false
        }
    }
    matchRoute = (currentUrl: string) => {
        const tempMenuData = JSON.parse(JSON.stringify(this.menuData))
        tempMenuData.map((itemGroup: MenuDataItem) => {
            itemGroup.map(item => {
                this.mathUrl(item, this.compare(currentUrl, item.url as string, item.exact))
            })
        })
        this.menuData = tempMenuData
    }
    initMenuData = () => {
        this.menuData = []
    }
}
