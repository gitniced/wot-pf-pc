import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { ItemInfoData, IGatewayDetail, SubmitData, UserinfoData } from './interface'
import API from './api'
import { TYPE_ENUM_CODE, TYPE_TAG_TRANSFORMED, ENROLL_CHANNEL_TEXT } from './const'
import { getCookie } from '@/storage'
import { findSiteData } from '@wotu/wotu-components'
import { message } from 'antd'
import type { SiteData } from '@/types'

class useHook {
    /** 提交数据 */
    public submitData = {} as SubmitData
    public itemInfo = {} as ItemInfoData
    /**  报名记录code  */
    public recordCode = ''

    /** 报名身份证是否为手动填写 报名手机号是否为手动填写  */
    public isWrite = {
        userIdentify: '',
        userMobile: '',
    }
    /**  创建订单的 orderId  */
    public orderId = ''

    /**  判断是哪种类型  机构  评价 培训   */
    public enrollType: number | undefined = undefined

    /**  门户信息详情  */
    public gatewayDetail = {} as IGatewayDetail
    /**  navList 导航数据  */
    public centerNavList = []

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 更新提价数据
     * @param searchParams
     */
    updateSubmitData = (submitData: SubmitData) => {
        this.submitData = {
            ...this.submitData,
            ...submitData,
        }
    }

    /**
     * 提交数据
     * type  ORG = 'org', // 机构报名 PLAN = 'plan', //计划报名
     */
    onSubmitData = async (type: string) => {
        const { submitData } = this

        /**  报名身份证是否为手动填写 	报名手机号是否为手动填写  */
        const isMobileChanged = submitData.userMobile !== this.isWrite.userMobile
        const isIdentifyChanged = submitData.userIdentify !== this.isWrite.userIdentify

        enum ENROLL_TYPE_ENUM {
            ORG = 'org', //机构报名
            PLAN = 'plan', //计划报名
        }

        const params = {
            activityCode: submitData.code,
            applyChannel: ENROLL_CHANNEL_TEXT[submitData.applyChannel],
            isIdentifyManual: isIdentifyChanged,
            isMobileManual: isMobileChanged,
            organizationCode:
                type === ENROLL_TYPE_ENUM.ORG ? submitData.code : this.itemInfo.organizationCode,
            remark: submitData.remark,
            userIdentify: submitData.userIdentify,
            userMobile: submitData.userMobile,
            userName: submitData.userName,
            //	报名项目类型，1计划、2机构
            type:
                submitData.type === ENROLL_TYPE_ENUM.ORG ? TYPE_ENUM_CODE.ORG : TYPE_ENUM_CODE.PLAN,
        }
        const res: any = await http(API.frontSubmit, 'post', params)
        this.recordCode = res
        return res
    }

    /** 查询用户数据 */
    getUserinfoData = async () => {
        const res = (await http(
            API.userinfo,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as UserinfoData
        // 用户中心数据写入
        this.updateSubmitData({
            userName: res.name,
            userIdentify: res.idCardNo,
            userMobile: res.mobile,
            userCode: res?.code,
        } as SubmitData)
        this.isWrite = {
            userIdentify: res.idCardNo,
            userMobile: res.mobile,
        }
    }

    /**
     * 报名项目的code查询报名项目
     * @param itemCode  报名项目的code
     */
    getItemInfo = async (itemCode: string) => {
        const res = (await http(
            `${API.itemInfo}?code=${itemCode}`,
            'get',
            {},
            { repeatFilter: false },
        )) as unknown as ItemInfoData
        this.itemInfo = res
        this.enrollType = TYPE_TAG_TRANSFORMED[res.entryCode] as number
    }

    /**
     * 获取机构信息
     * entityCode 机构code
     */
    getOrgInfo = async (entityCode: string) => {
        const res: any = await http(`${API.orgInfo}/${entityCode}`, 'get', {}, {})

        const { provinceName = '', cityName = '', areaName = '', name = '' } = res || {}

        // @ts-ignore
        this.itemInfo = {
            name,
            address: `${provinceName}${cityName}${areaName}`,
        }
        this.enrollType = TYPE_TAG_TRANSFORMED.ORGANIZATION as number
    }

    /**  去支付  */
    goToPay = async (code: string, siteData: SiteData) => {
        let params = {
            code,
            identity: getCookie('SELECT_IDENTITY_CODE') || '',
        }

        /** 获取loginUrl */
        const orgDomain =
            RUN_ENV === 'local'
                ? 'http://localhost:8021'
                : findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' }) || ''

        const { orderCode, identity: firstIdentity } = ((await http(
            `${API.createOrder}`,
            'get',
            params,
            {},
        )) || {}) as any

        if (orderCode && firstIdentity) {
            window.location.href =
                orgDomain &&
                `${orgDomain}/trading-center/order/conduct?orderId=${orderCode}&identity=${firstIdentity}`
        } else {
            message.error('订单号不存在')
        }
    }

    /**  获取门户信息  */
    getGatewayInfo = async (orgCode: string) => {
        const res = (await http(
            API.getGatewayInfo,
            'get',
            { organizationCode: orgCode },
            {},
        )) as unknown as IGatewayDetail
        this.gatewayDetail = res || {}
    }

    /**  获取导航数据  */
    getNavList = async (orgCode: string) => {
        const res = (await http(
            API.getNavList,
            'get',
            { organizationCode: orgCode },
            {},
        )) as unknown as any
        this.centerNavList = res || []
    }
}

export default useHook
