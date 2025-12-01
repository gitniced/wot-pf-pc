import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
// import type { SearchParams, TableData, RecordStatusCount } from './interface'
// import dayjs from 'dayjs'
import API from './api'
import { getCookie } from '@/storage'

class useHook {
    /** 请求参数 */
    public activityStatusCount: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取活动状态数量
     */
    getActivityStatusCount = async () => {
        const organizationCode: string = getCookie('SELECT_ORG_CODE') || ''
        const res: any = await http(
            API.activityStatusCount,
            'get',
            { organizationCode },
            {
                repeatFilter: false,
            },
        )
        this.activityStatusCount = res
    }

    // 修改活动状态
    updateStatus = ({ code, flag }: any) => {
        return http(
            `${API.updateStatus}?code=${code}&status=${flag}`,
            'post',
            {},
            {
                repeatFilter: false,
            },
        )
    }

    // 修改活动状态
    deleteActive = (code: any) => {
        return http(
            `${API.deleteApply}/${code}`,
            'post',
            {},
            {
                repeatFilter: false,
            },
        )
    }
}

export default useHook
