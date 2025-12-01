import { makeAutoObservable } from 'mobx'
import api from './api'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import http from '@/servers/http'
import type { ListItemProps } from './interface'

export default class baseHooks {
    constructor() {
        makeAutoObservable(this)
    }

    public queryCode = ''

    getList = async (params: any) => {
        const organizationCode = getPortalCodeFromUrl()
        if (!organizationCode) {
            message.error('获取机构信息失败')
            return
        }
        const res = (await http(
            api.getImageTextList,
            'post',
            { ...params, organizationCode },
            {
                repeatFilter: false,
            },
        )) as unknown as ListItemProps

        return res
    }
}
