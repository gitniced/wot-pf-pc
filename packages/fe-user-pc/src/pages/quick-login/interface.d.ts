import type UserStore from '@/stores/userStore'
import type { IRoute } from 'umi'

export type DemoProps = Record<string, any>

export type QuickSeat = {
    seat: string
}

export type QuickLogin = {
    code: string
    password?: string
}

export interface BindProps extends IRoute {
    userStore: UserStore
}

export type EXAMINATION_CONFIG = {
    code: string
    endTime: number //考试结束时间
    loginType: string //登录方式,可用值:certnumber,password
    logoUrl: string //logo地址
    occupantUrl: string //占位图地址
    seatNumber?: number //座位号
    sid: number //站点id
    sidName: string //站点名称
    startTime: number //考试开始时间
    title: string //考试名称
    enterSeat: number // 是否需要输入座位号
    isShowLogoName?: boolean // 是否展示标题
    logoName?: string
}
