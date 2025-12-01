import { makeAutoObservable } from 'mobx'
import type { MenuDataItem, MenuData } from './interface'
import { history } from 'umi'
import http from '@/servers/http'
import { getCookie } from '@/storage'

const api = {
    organizationPermissionList: '/organization/organization/v2/user_permission',
}

export default class menuHooks {
    public menuData: MenuDataItem[] = []

    constructor() {
        makeAutoObservable(this)
    }

    isCreateOrg: boolean = false

    setIsCreateOrg = (boolean: boolean) => {
        this.isCreateOrg = boolean
    }

    /**
     *
     * 获取机构权限列表
     * @return {*}
     * @memberof menuHooks
     */
    getOrganizationPermissionList() {
        // 没有机构或者身份就直接停止
        if (!getCookie('SELECT_IDENTITY_CODE') || !getCookie('SELECT_ORG_CODE')) return
        return http(api.organizationPermissionList, 'post', {
            organizationCode: getCookie('SELECT_ORG_CODE'),
            identity: getCookie('SELECT_IDENTITY_CODE'),
            organizationCenter: 1,
            type: 1,
        }).then((res: any) => {
            console.log(res, 'resdata')
            this.menuData = res[0]?.children || []
            this.matchRoute()
        })
    }

    fixMenu = (currentCode: string | undefined, userPermission: string[]) => {
        //  站点关闭创建机构功能且没有机构的用户需隐藏机构管理页面
        this.initMenuData()
        let tempMenuData = JSON.parse(JSON.stringify(this.menuData))
        tempMenuData.length > 0 ? '' : (tempMenuData[0] = [])
        const orgInfoMenu = {
            icon: 'icon_zuzhixinxi_n',
            name: '机构信息',
            url: '/detail',
            active: false,
            exact: true,
        }

        const orgManagerMenu = {
            icon: 'icon_chengyuan_n',
            name: '成员管理',
            url: '/member',
            active: false,
            exact: true,
        }

        const roleMenu = {
            icon: 'icon_juese_n',

            name: '角色管理',
            url: '/role',
            active: false,
            exact: true,
        }

        const actionMenu = {
            icon: 'icon_piliangcaozuo_n',

            name: '批量操作',
            url: '/action',
            active: false,
            exact: true,
        }
        if (currentCode) {
            if (this.isCreateOrg) {
                tempMenuData[0].push(orgInfoMenu, orgManagerMenu, roleMenu)
            } else {
                if (userPermission.includes('/organization/detail')) {
                    tempMenuData[0].push(orgInfoMenu, orgManagerMenu)
                }

                if (userPermission.includes('/organization/role')) {
                    tempMenuData[0].push(roleMenu)
                }
            }
            tempMenuData[0].push(actionMenu)
        } else {
            tempMenuData[0].push(orgInfoMenu)
        }

        this.menuData = tempMenuData

        const { location } = history
        const { pathname, search } = location || {}
        this.matchRoute(pathname + search)
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
        // const pathName = history.location.pathname
        if (!tempMenuData?.length) return
        // debugger
        // tempMenuData.map((item: any) => {
        //     this.mathUrl(item, this.compare(pathName, item.route, item.exact))
        // })
        // debugger
        tempMenuData.map((itemGroup: MenuDataItem) => {
            itemGroup.map(item => {
                this.mathUrl(
                    item,
                    this.compare(currentUrl?.split('?')?.[0] || currentUrl, item.url, item.exact),
                )
            })
        })

        this.menuData = tempMenuData
    }
    initMenuData = () => {
        this.menuData = []
    }
}
