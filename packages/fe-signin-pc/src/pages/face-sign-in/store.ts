import { makeAutoObservable } from 'mobx'
import { SIGN_TIME_TYPE, SIGN_TYPE, SIGN_TYPE_TEXT } from './const'
import type { TabCount, TabCounts, TaskRule, TaskSignTable } from './interface'
import api from './api'
import http from '@/servers/http'
import { history } from 'umi'

class useHook {
    public taskCode: string = history.location.query?.taskCode as string
    /**签到类型 */
    public signType: SIGN_TYPE | null = null
    /** 签到/退 时间状态 */
    public signTimeType: SIGN_TIME_TYPE = SIGN_TIME_TYPE.AFTER
    /** 任务规则 */
    public taskRule: TaskRule = {} as TaskRule
    /** 签到计数 */
    public tabCounts: TabCounts[] = []
    /** 名单信息列表 */
    public taskSignTable: TaskSignTable[] = []
    /** 签到状态 */
    public signStatus: string = ''
    /** 是否展示打卡类型切换 */
    public showSignTypeToggle: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    /** 切换签到类型 */
    toggleSignType = (num: number) => {
        this.signType = num
        this.getTaskRule(false)
    }

    /** 获取任务规则 */
    getTaskRule = async (isFirst: boolean = true) => {
        let data = (await http(
            `${api.taskRule}/${this.taskCode}`,
            'get',
            {},
        )) as unknown as TaskRule
        // @ts-ignore
        const { rule, signInAfterTime, signInBeforeTime, signOutAfterTime, signOutBeforeTime } =
            data || {}

        /**签到最后面时间 */
        data.signInEndTime = signInAfterTime
        /**签到最前面时间 */
        data.signInStartTime = signInBeforeTime
        /**签退最后面时间 */
        data.signOutEndTime = signOutAfterTime
        /**签退最前面时间 */
        data.signOutStartTime = signOutBeforeTime

        const { signStart, signEnd } = rule || {}
        this.taskRule = data

        if (isFirst) {
            if (signStart & signEnd) {
                // 存在签到和签退时 展示tab切换 打卡类型默认签到
                this.showSignTypeToggle = true
                this.signType = SIGN_TYPE.SIGN_IN
            } else {
                // 签到和签退不同时存在时 隐藏tab切换
                this.showSignTypeToggle = false
                if (signStart) {
                    // signStart打开 类型默认签到
                    this.signType = SIGN_TYPE.SIGN_IN
                } else {
                    // signEnd打开 类型默认签退
                    this.signType = SIGN_TYPE.SIGN_OUT
                }
            }
        }

        this.signTimeType =
            this.signType === SIGN_TYPE.SIGN_IN ? data.inSignTime : data.inSignOutTime
    }

    /** 获取签到计数信息 */
    getTabCounts = async () => {
        const data = (await http(api.tabCounts, 'get', {
            signMode: this.signType,
            taskCode: this.taskCode,
        })) as unknown as TabCount
        this.tabCounts = [
            {
                key: '',
                name: '全部',
                length: data.allCount,
            },
            {
                key: '1',
                name: `已${SIGN_TYPE_TEXT[this.signType!]}`,
                length: data.signedCount,
            },
            {
                key: '0',
                name: `未${SIGN_TYPE_TEXT[this.signType!]}`,
                length: data.unSignedCount,
            },
        ]
    }

    /** 修改签到状态 */
    setSignStatus = (e: string) => {
        this.signStatus = e
    }

    /** 获取名单信息 */
    getTaskSignTable = async () => {
        // 4为补卡  已签到传[1,4]  未签到不需要传补卡
        const requestArr = Number(this.signStatus) === 0 ? [0] : [Number(this.signStatus), 4]

        const res = await http(api.nameListPage, 'post', {
            // sid,
            pageNo: 1,
            pageSize: 999999, // 不分页
            [this.signType === SIGN_TYPE.SIGN_IN ? 'signStatus' : 'signOutStatus']: this.signStatus
                ? requestArr
                : undefined,
            taskCodes: [this.taskCode],
        })
        this.taskSignTable = res.data as TaskSignTable[]
    }
}

export default useHook
