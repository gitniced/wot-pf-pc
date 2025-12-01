import { makeAutoObservable } from 'mobx'
import {
    getActivityList,
    getDetailData,
    getRelationData,
    getRelationSort,
    getReviewData,
} from './api'
import type { ACTIVITY_DETAILS } from './interface'

export default class ActivityDetailStore {
    public activityDetails: ACTIVITY_DETAILS = {}
    public reviewData: any = {}

    constructor() {
        makeAutoObservable(this)
    }
    /**  获取详情数据  */
    getActivityDetails = async (code: any) => {
        this.activityDetails = (await getDetailData({ code })) as ACTIVITY_DETAILS
    }

    /**  获取回顾数据  */
    getReviewDetails = async (code: any) => {
        this.reviewData = (await getReviewData({ activityCode: code })) as ACTIVITY_DETAILS
    }

    /** 活动详情-关联岗位   */
    getRelatedJob = async (params: any) => {
        return await getRelationData(params)
    }

    /**   活动详情-活动名单 */
    getActivityList = async (params: any) => {
        return await getActivityList(params)
    }

    /**  关联岗位排序  */
    sortRelatedJob = async (sort: number, code: string) => {
        await getRelationSort({ sort, code })
    }
}
