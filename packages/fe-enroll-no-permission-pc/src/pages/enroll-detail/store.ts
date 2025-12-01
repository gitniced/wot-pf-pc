import http from '@/servers/http'
import api from './api'
import { makeAutoObservable } from 'mobx'
import * as Storage from '@/storage'
import type { ActivityUserDetailDto } from '@/@types/apply'
// @ts-ignore
import { findSiteData } from '@wotu/wotu-components'
import { message } from 'antd'
import { history } from 'umi'

class EnrollDetailsStore {
    public activityDetails: ActivityUserDetailDto | Record<string, any> = {}
    // 推荐机构列表
    public recommendActivity: ActivityUserDetailDto[] = []
    constructor() {
        makeAutoObservable(this)
    }
    async getActivityDetail(code: string) {
        // code 活动编码
        const userCode = Storage.getCookie('USER_CODE')
        const details = (await http(api.getActivityDetail, 'post', {
            code,
            userCode,
        }).catch(() => {
            history.replace('/404', {
                text: '抱歉，您访问的页面不存在',
                url: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_saas_pc/image/no_data_eecec2a1.png',
            })
        })) as unknown as ActivityUserDetailDto
        console.log(details)
        if (details?.organizationStatus === 1) {
            history.replace('/404')
        }
        this.activityDetails = details
    }

    async gotoPay(recordCode: string) {
        const siteStore = Storage.getLocalStorage('SITE_STORE') || {}
        const { siteData } = siteStore || {}
        const orgDomain =
            RUN_ENV === 'local'
                ? 'http://localhost:8021'
                : findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' }) || ''
        const { orderCode, identity: firstIdentity } = ((await http(
            api.createOrderPayApply,
            'get',
            {
                code: recordCode,
                // @ts-ignore
                identity: Storage.getCookie('SELECT_IDENTITY_CODE'),
            },
            {},
        )) || {}) as any

        if (orderCode && firstIdentity) {
            window.location.href = `${orgDomain}/trading-center/order/conduct?orderId=${orderCode}&identity=${firstIdentity}`
        } else {
            message.error('订单号不存在')
        }
    }

    // 获取推荐报名列表
    getRecommendActivity = async (code: string) => {
        let sid = Storage.getLocalStorage('SID')
        const platform = Storage.getSessionStorage('PLATFORM') || ''
        sid = platform === 'portal' ? undefined : sid

        const res = (await http(api.getRecommendActivity, 'POST', {
            sid,
            activityCode: code,
        })) as unknown as ActivityUserDetailDto[]
        this.recommendActivity = (res || []).slice(0, 3)
    }

    // 校验年龄限制
    checkEnrollDetails = async () => {
        const sid = Storage.getLocalStorage('SID')
        const userCode = Storage.getCookie('USER_CODE')
        return http(api.checkEnrollDetail, 'POST', {
            sid,
            userCode,
        })
    }
}

export default EnrollDetailsStore
