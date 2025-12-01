import { makeObservable, observable } from 'mobx'
import _PageStore from '@/pages/gateway/web/create/store'

import http from '@/servers/http'
import api from './../pc-tab/api'
import { getNowSelectOrgCode } from '@/utils/parseValue'

export default class extends _PageStore {
    public getawayData: Record<string, string | number> = {}
    public navList = []
    public pageColor: string = ''

    constructor() {
        super('pc')
        makeObservable(this, {
            getawayData: observable,
            navList: observable,
        })
    }

    /**
     * 获取门户信息
     */
    getGatewayData() {
        return http(api.getGateway, 'GET', {
            organizationCode: getNowSelectOrgCode(),
        }).then((res: any) => {
            console.log(res)
            this.getawayData = res || {}
            return res
        })
    }

    /**
     *  获取所有的导航数据
     * @param organizationCode
     */
    getNavData() {
        http(api.getNav, 'GET', { organizationCode: getNowSelectOrgCode() }).then((res: any) => {
            this.navList = res || []
        })
    }

    /**
     *  设置页面颜色
     * @param color
     */
    setPageColor(color: string) {
        this.pageColor = color
    }
}
