import http from '@/servers/http'
import api from './api'
import { makeAutoObservable, runInAction } from 'mobx'
import type { ActivityApplyCheckRespDto, ActivityDetailFrontRespDto } from './interface'
import { history } from 'umi'

class EventDetailStore {
    public activeDetail: ActivityDetailFrontRespDto = {}
    public reviewInfo: any = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 活动列表
     */
    getActiveDetail = async (code: string) => {
        const res = (await http(api.getActivity, 'post', { code })) || {}
        runInAction(() => {
            if (res?.organizationStatus === 1) {
                history.replace('/404')
            }
            this.activeDetail = res as unknown as ActivityDetailFrontRespDto
        })
    }

    getActiveReview = async (activityCode: string) => {
        const reviewInfo = (await http(api.getReviewInfo, 'post', { activityCode })) || {}
        runInAction(() => {
            this.reviewInfo = reviewInfo
        })
    }

    /** 获取职位列表 */
    checkJoin = async (code: string) => {
        const checkJoinData = (await http(api.checkUserJoin, 'post', {
            code,
        })) as unknown as ActivityApplyCheckRespDto
        const { successFlag } = checkJoinData
        return successFlag
    }
}

export default EventDetailStore
