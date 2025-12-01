import { makeAutoObservable } from 'mobx'
import { BUSINESS_API_BY_TYPE_MAP, BUSINESS_LOGIN_API_BY_TYPE_MAP } from './const'
import { BUSINESS_TYPE_MAP } from './const'
import http from '@/servers/http'
import type { EXAMINATION_CONFIG, QuickLogin, QuickSeat } from './interface'
import { setCookie } from '@/storage'
import { message } from 'antd'
// import { history } from 'umi'
import { getLocalStorage } from '@/storage'
import api from './api'
import Cookies from 'js-cookie'
import type UserStore from '@/stores/userStore'

export default class bindHooks {
    // 业务类型：默认考试
    public businessType: BUSINESS_TYPE_MAP = BUSINESS_TYPE_MAP.EXAMINATION
    // 业务code
    public businessCode: string | undefined
    // 登录后指定要跳转的地址
    public backUrl: string | undefined
    // 登录成功后需要跳转的地址
    public padDomain: string | undefined
    // 座位号
    public seat: number | string | undefined
    // 是否免密登录
    public quick: boolean = true
    // 业务配置信息
    public pageConfig: Partial<EXAMINATION_CONFIG> = {
        endTime: 0,
        enterSeat: 1,
        sid: getLocalStorage('SID'),
        startTime: 0,
    }

    constructor() {
        makeAutoObservable(this)
    }

    // 绑定回跳地址
    bindBackUrl = (url: string) => {
        this.backUrl = decodeURIComponent(url)
    }

    // 绑定pad端地址
    bindPad = (domain: string) => {
        this.padDomain = domain
    }

    // 根据业务类型 更换请求url和请求传参
    getConfig = async (type: BUSINESS_TYPE_MAP, code: string) => {
        this.businessType = type
        this.businessCode = code
        let apiUrl = BUSINESS_API_BY_TYPE_MAP[type]
        const pageConfig: any = (await http(`${apiUrl}${code}`, 'get', {})) || {}
        if (pageConfig.loginType === 'password') {
            this.quick = false
        } else {
            this.quick = true
        }
        this.pageConfig = pageConfig
    }

    nextHandler = (params: QuickSeat) => {
        const { seat } = params
        this.seat = seat
    }

    // 抽离之前的登录逻辑，两种登录 examCode 获取方式不同
    dealFinalBackUrl = ({ userCode, examCode }: any) => {
        let finalBackUrl = ''
        if (this.backUrl) {
            // 当指定backUrl时 优先前往backUrl
            if (this.backUrl.includes('https://') || this.backUrl.includes('http://')) {
                if (this.backUrl.indexOf('?') > -1) {
                    finalBackUrl = `${this.backUrl}&userCode=${userCode}&examCode=${examCode}`
                } else {
                    finalBackUrl = `${this.backUrl}?userCode=${userCode}&examCode=${examCode}`
                }
            } else {
                finalBackUrl = this.backUrl
            }
        } else {
            // 当不存在backUrl时 前往站点配置中的padDomain
            if (this.padDomain) {
                finalBackUrl = `${this.padDomain}/exam-center/test-manage/candidate?userCode=${userCode}&examCode=${examCode}&examIdentity=5`
            } else {
                message.error('请先配置pad端地址!')
                return false
            }
        }
        Cookies.set('loginBackUrl', finalBackUrl, { expires: 7 })
    }

    // 登录方法
    loginHandler = (params: QuickLogin, user?: UserStore) => {
        const sid = this.pageConfig?.sid
        // 没有业务id 即独立站点考试端
        if (!this.businessCode) {
            return http(`${api.examLoginNoCode}`, 'post', { ...params, sid, appKey: 'WEB' }).then(
                (res: any) => {
                    const { accessToken, userCode, examCode, tokenExpire = 7 } = res || {}
                    setCookie(`TOKEN`, accessToken, tokenExpire)
                    this.dealFinalBackUrl({ userCode, examCode })
                    user?.updateUserAccount(res, 1).then(() => {})
                },
            )
        }

        let apiUrl = BUSINESS_LOGIN_API_BY_TYPE_MAP[this.businessType]
        const requestParams = {
            ...params,
            sid,
            appKey: 'WEB',
            dataCode: this.businessCode,
            type: 1, // 考试只能是个人身份
        }

        return http(`${apiUrl}`, 'post', requestParams).then((res: any) => {
            const { accessToken, userCode, tokenExpire = 7 } = res || {}
            setCookie(`TOKEN`, accessToken, tokenExpire)

            this.dealFinalBackUrl({ userCode, examCode: this.businessCode })

            user?.updateUserAccount(res, 1).then(() => {})
        })
    }
}
