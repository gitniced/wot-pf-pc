import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import { SIGN_TYPE, SIGN_TYPE_TEXT } from '../face-sign-in/const'
import type { TabCounts, TaskRule, TaskSignTable } from './interface'
import { initTaskSignParams } from './const'
import type { TabCount, TaskSignParams } from './interface'
import { history } from 'umi'
import { getLocalStorage } from '@/storage'

class useHook {
    /** 任务code */
    public taskCode: string = history.location.query?.taskCode as string
    /**签到类型 */
    public signType: SIGN_TYPE = Number(history.location.query?.signType ?? 1) as SIGN_TYPE.SIGN_IN
    /** 任务规则 */
    public taskRule: TaskRule = {} as TaskRule
    /** 签到计数 */
    public tabCounts: TabCounts[] = []
    /** 查询名单信息参数 */
    public taskSignParams: TaskSignParams = initTaskSignParams
    /** 名单信息列表 */
    public taskSignTable: TaskSignTable = {} as TaskSignTable
    /** 是否展示打卡类型切换 */
    public showSignTypeToggle: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    /** 切换签到类型 */
    toggleSignType = (num: number) => {
        this.signType = num
    }

    /** 修改名单请求参数 */
    setTaskSignParams = (value: TaskSignParams) => {
        this.taskSignParams = {
            ...this.taskSignParams,
            ...value,
        }
    }

    /** 获取任务规则 */
    getTaskRule = async () => {
        const data = await http(`${api.taskRule}/${this.taskCode}`, 'get', {})
        this.taskRule = data as unknown as TaskRule
        const { rule } = (data as unknown as TaskRule) || {}
        const { signStart, signEnd } = rule || {}

        // 存在签到和签退时 展示tab切换 打卡类型默认签到
        if (signStart & signEnd) {
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

    /** 获取签到计数信息 */
    getTabCounts = async () => {
        const sid = getLocalStorage('SID') ?? ''
        const data = (await http(api.tabCounts, 'get', {
            signMode: this.signType,
            taskCode: this.taskCode,
            sid,
        })) as unknown as TabCount
        this.tabCounts = [
            {
                key: '',
                name: '全部',
                length: data.allCount,
            },
            {
                key: '1',
                name: `已${SIGN_TYPE_TEXT[this.signType]}`,
                length: data.signedCount,
            },
            {
                key: '0',
                name: `未${SIGN_TYPE_TEXT[this.signType]}`,
                length: data.unSignedCount,
            },
        ]
    }

    /** 获取名单信息 */
    getTaskSignTable = async () => {
        const sid = getLocalStorage('SID') ?? ''
        const tempParams = {
            sid,
            ...this.taskSignParams,
            taskCodes: [this.taskCode],
            type: this.signType,
        }

        if (this.signType === SIGN_TYPE.SIGN_IN) {
            // 4为补卡  已签到传[1,4]  未签到不需要传补卡
            const requestArr =
                Number(tempParams.signStatus) === 0 ? [0] : [Number(tempParams.signStatus), 4]
            delete tempParams.signOutStatus
            //@ts-ignore
            tempParams.signStatus === ''
                ? (tempParams.signStatus = undefined)
                : //@ts-ignore   4 补卡
                  (tempParams.signStatus = requestArr)
        }

        if (this.signType === SIGN_TYPE.SIGN_OUT) {
            // 4为补卡  已签到传[1,4]  未签到不需要传补卡
            const requestArr =
                Number(tempParams.signOutStatus) === 0 ? [0] : [Number(tempParams.signOutStatus), 4]
            delete tempParams.signStatus
            //@ts-ignore
            tempParams.signOutStatus === ''
                ? (tempParams.signOutStatus = undefined)
                : //@ts-ignore 4 补卡
                  (tempParams.signOutStatus = requestArr)
        }

        const data = await http(
            api.nameListPage,
            'post',
            {
                ...tempParams,
            },
            { repeatFilter: false },
        )

        this.taskSignTable = data as unknown as TaskSignTable
    }
}

export default useHook
