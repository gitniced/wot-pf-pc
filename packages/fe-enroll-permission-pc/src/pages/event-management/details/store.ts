import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import API from './api'
import type { ActivityUserDetailDto } from '@/@types/apply'
// import { getCookie } from '@/storage'

class EventDetailsStore {
    public eventDetails: ActivityUserDetailDto = {}
    public portalInfoDetail = {}
    constructor() {
        makeAutoObservable(this)
    }

    /** 获取活动详情 */
    getEventDetails = async (code: string) => {
        const res: any = await http(API.getEventDetails, 'post', { code })

        const filesLists = res?.attachmentJson ? JSON.parse(res.attachmentJson) : []
        this.eventDetails = { ...res, filesLists } as unknown as ActivityUserDetailDto
    }

    // 获取机构招生设置详情
    getPortalInfo = async () => {
        const res: any = (await http(`${API.getPortalInfo}`, 'get', {})) || {}
        this.portalInfoDetail = res
    }
}

export default EventDetailsStore
