// import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import { checkDetailsDuringEdit, edit, save } from './api'
import dayjs from 'dayjs'
import { ACTIVITY_STEP_ENUM, ACTIVITY_STEP_ENUM_MAP } from './const'
import type { ActivityData } from './interface'
import { ACTIVITY_STATUS_ENUM } from '../const'
import { getCookie } from '@wotu/wotu-components'

export default class ActivityCreateStore {
    /**  新建时候的code  */
    // public createCode = ''
    /**  详情数据  */
    public activityData: ActivityData = {}
    /**  编辑的时候是否发布  */
    public editIsPublish = false

    constructor() {
        makeAutoObservable(this)
    }

    // getCode = (code: string) => {
    //     this.createCode = code
    // }

    /**  处理保存的数据  */
    transformSaveData = (values: any) => {
        const params = { ...values }
        const organizationCode: string = getCookie('SELECT_ORG_CODE')

        /**  时间处理 精确到秒 */
        const dateFields = ['startTime', 'endTime', 'signEndTime', 'signStartTime']
        dateFields.forEach(field => {
            params[field] = params[field] ? dayjs(params[field]).valueOf() : undefined
        })

        let temp = {}
        switch (params?.currentStep) {
            case ACTIVITY_STEP_ENUM.FIRST: {
                /**  封面  */
                params.coverUrl =
                    params?.coverUrl?.[0]?.response?.url || params?.coverUrl?.[0]?.url || undefined
                const [lng, lat] = params?.address?.value?.split(',') || []
                params.longitude = lng
                params.latitude = lat
                temp = {
                    // sid: params?.sids?.value,
                    siteName: params?.sids?.label,
                    activityName: params?.activityName,
                    coverUrl: params.coverUrl,
                    activityCatalogCode: params?.activityCatalogCode?.value,
                    sponsorName: params?.sponsorName,
                    startTime: params?.startTime,
                    endTime: params?.endTime,
                    activityForm: params?.activityForm,
                    address: params?.address?.label,
                    longitude: params?.longitude,
                    latitude: params?.latitude,
                    cityName: params?.address?.arg?.city,
                    cityCode: params?.address?.arg?.cityCode,
                    provinceName: params?.address?.arg?.province,
                    provinceCode: params?.address?.arg?.provinceCode,
                }
                break
            }
            case ACTIVITY_STEP_ENUM.SECOND: {
                temp = {
                    activityIntroduce: params?.activityIntroduce,
                }
                break
            }
            case ACTIVITY_STEP_ENUM.THIRD: {
                temp = {
                    relateSignStatus: params?.relateSignStatus ? 1 : 0,
                    signBeforeMinute: params?.signMinute?.[0],
                    signAfterMinute: params?.signMinute?.[1],
                    locationStatus: params?.locationStatus ? 1 : 0,
                    signDistanceRange: params?.signDistanceRange,
                    signStartTime: params?.signStartTime,
                    signEndTime: params?.signEndTime,
                    signMaxPeople: params?.signMaxPeople,
                    signAuditStatus: params?.signAuditStatus ? 1 : 0,
                }
                break
            }
            default:
                temp = {}
        }

        return {
            ...temp,
            step: ACTIVITY_STEP_ENUM_MAP?.[params?.currentStep],
            checkFlag: params?.checkFlag,
            code: params?.code || undefined,
            organizationCode,
        }
    }

    /**  处理回显的数据  */
    processDisplayedData = (params: any) => {
        const data = { ...params }
        /**  封面  */
        data.coverUrl = data.coverUrl
            ? [
                  {
                      uid: '-1',
                      name: 'image.png',
                      status: 'done',
                      url: data.coverUrl,
                  },
              ]
            : []

        /**  时间处理  */
        const dateFields = ['startTime', 'endTime', 'signStartTime', 'signEndTime']
        dateFields.forEach(field => {
            data[field] = data[field] ? dayjs(data[field]) : undefined
        })

        data.sids = {
            value: data?.sid,
            label: data?.siteName,
        }
        data.activityCatalogCode = {
            value: data?.activityCatalogCode,
            label: data?.activityCatalogName,
        }
        data.address = {
            label: data?.address,
            value: `${data?.longitude},${data?.latitude}`,
            arg: {
                cityName: data?.cityName,
                cityCode: data?.cityCode,
                provinceName: data?.provinceName,
                provinceCode: data?.provinceCode,
            },
        }
        data.relateProfessionStatus = data?.relateProfessionStatus === 1 ? true : false
        data.relateSignStatus = data?.relateSignStatus === 1 ? true : false
        data.locationStatus = data?.locationStatus === 1 ? true : false
        data.signMinute = [data?.signBeforeMinute || 0, data?.signAfterMinute || 0]
        // 最大报名人数-1就是没填
        data.signMaxPeople = data.signMaxPeople === -1 ? undefined : data.signMaxPeople

        data.professionCodes = data.professions || []

        return data
    }

    /**  新建  */
    saveActivity = async (data: any) => {
        let res: any = await save(this.transformSaveData(data))
        return res
    }
    /**  编辑  */
    editActivity = async (data: any) => {
        let res: any = await edit(this.transformSaveData(data))
        return res
    }

    /**  获取活动详情  */
    getActivityDetails = async (code: any) => {
        const res: any = await checkDetailsDuringEdit({ code })
        this.editIsPublish = res?.activityStatus !== ACTIVITY_STATUS_ENUM.UNPUBLISHED ? true : false

        this.activityData = this.processDisplayedData(res)
        return this.activityData
    }
}
