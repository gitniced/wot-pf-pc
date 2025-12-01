import { getCookie, getLocalStorage } from '@/storage'
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

    fixMenu = (currentCode: string | undefined, userPermission: string[], hasFace: boolean) => {
        //  站点关闭创建机构功能且没有机构的用户需隐藏机构管理页面
        this.initMenuData()
        let tempMenuData = JSON.parse(JSON.stringify(this.menuData))
        // 权限菜单列表
        let permissionMenu: any[] = []

        let orgUrl = '/organization/detail'
        const orgMenu = {
            icon: 'icon_zuzhi_n',
            name: '机构中心',
            url: orgUrl,
            active: false,
        }

        const faceMenu = {
            icon: 'icon_nav_renlianshibie',
            name: '人脸识别',
            url: '/face',
            active: false,
        }

        // 当站点拥有机构创建权限或者用户拥有机构管理和角色管理其中之一权限 并且不是”个人类型“时 就拥有机构中心菜单
        if (
            this.isCreateOrg ||
            userPermission?.includes('/organization/detail') ||
            userPermission?.includes('/organization/role')
        ) {
            if (getCookie('SELECT_USER_TYPE') !== 'user') {
                permissionMenu.push(orgMenu)
            }
        }

        if (hasFace) {
            permissionMenu.push(faceMenu)
        }

        //  资源方站点没有订单中心 只有交易中心
        const sid = getLocalStorage('SID')
        if (sid.toString() === '1') {
            // TODO permissionMenu中添加交易中心
        } else {
            // TODO
        }

        tempMenuData[2] = [...permissionMenu]

        this.menuData = tempMenuData
    }

    compare = (current: string, target: string, exact?: boolean): boolean => {
        if (exact) {
            return current === target
        } else {
            return current.includes(target)
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
                if (Array.isArray(item.url)) {
                    // 多个菜单path 情况
                    this.mathUrl(
                        item,
                        !!item.url.find(urlItem => this.compare(currentUrl, urlItem, item.exact)),
                    )
                } else {
                    //单个 菜单path 情况
                    this.mathUrl(item, this.compare(currentUrl, item.url, item.exact))
                }
            })
        })
        this.menuData = tempMenuData
    }
    initMenuData = () => {
        const defaultMenu: any[] = [
            [
                {
                    icon: 'icon_wode_n',
                    name: '我的账号',
                    url: '/account',
                    active: false,
                },
                {
                    icon: 'icon_message_n',
                    name: '基础信息',
                    url: '/baseinfo',
                    active: false,
                },
            ],
            [
                {
                    icon: 'icon_key_n',
                    name: '登录密码',
                    url: '/password',
                    active: false,
                },
                {
                    icon: 'icon_renzheng_n',
                    name: '认证绑定',
                    url: '/bind',
                    active: false,
                },
            ],
            [],
            [
                {
                    icon: 'icon_jilu_n',
                    name: '登录记录',
                    url: '/recode',
                    active: false,
                },
            ],
        ]

        this.menuData = defaultMenu
    }
}
