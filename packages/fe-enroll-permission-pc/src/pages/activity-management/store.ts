import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { getCookie } from '@/storage'

export default class ActivityManagementStore {
    constructor() {
        makeAutoObservable(this)
    }

    /**  分页  */
    tableRequest = async (params?: any) => {
        const res: any = await http(
            api.activityList,
            'POST',
            {
                ...params,
                sid: params?.sid ? params?.sid?.value : undefined,
                catalogCode: params?.activityCatalogCode
                    ? params?.activityCatalogCode?.value
                    : undefined,
                activityStatus:
                    params?.activityStatus === 'all' ? undefined : params?.activityStatus,
            },
            { repeatFilter: false },
        )
        return res
    }

    /**  删除  */
    deleteItem(code?: string) {
        return http(api.deleteActivity, 'post', {
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
        })
    }

    /**  发布  */
    publishActivity = async (e: any) => {
        await http(api.publishActivity, 'post', {
            code: e,
            organizationCode: getCookie('SELECT_ORG_CODE'),
        })
    }
    // 批量发布
    batchPublish = async (e: any) => {
        return await http(api.publishActivity, 'post', {
            code: e,
            organizationCode: getCookie('SELECT_ORG_CODE'),
        })
    }

    /**  改变状态  */
    changeStatus = async (s: number, code: string) => {
        await http(api.activityStatus, 'post', {
            code,
            display: s === 1 ? 0 : 1,
            organizationCode: getCookie('SELECT_ORG_CODE'),
        })
    }
    /**  排序  */
    sortActivityClassify = async (sort: number, code: string) => {
        await http(api.activitySort, 'post', {
            sort,
            code,
            organizationCode: getCookie('SELECT_ORG_CODE'),
        })
    }
}
