import { makeAutoObservable } from 'mobx'
import type { MenuDataItem, MenuData } from './interface'

export default class menuHooks {
    public menuData: MenuDataItem[] = [
        [
            {
                icon: 'icon_dingdan_n',
                name: '我的订单',
                url: '/order',
                active: false,
            },
            {
                icon: 'icon_fapiao_n',
                name: '我的发票',
                url: '/invoice',
                active: false,
            },
            {
                icon: 'icon_shouhou_n',
                name: '售后管理',
                url: '/refund',
                active: false,
            },
        ],
    ]

    constructor() {
        makeAutoObservable(this)
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
                this.mathUrl(item, this.compare(currentUrl, item.url, item.exact))
            })
        })
        this.menuData = tempMenuData
    }
    initMenuData = () => {
        this.menuData = []
    }
}
