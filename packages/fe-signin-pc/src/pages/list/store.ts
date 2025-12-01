import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { history } from 'umi'
import type { TaskRule, SignTypeTabItem } from './interface'
import type { TableData } from './interface'
import { SIGN_TYPE, SIGN_TYPE_TEXT } from '../face-sign-in/const'

class useHook {
    /** 任务code */
    public taskCode: string = (history.location.query?.taskCode as string) || ''
    /** 任务规则 */
    public taskRule: TaskRule = {} as TaskRule
    /** 是否展示打卡类型切换 */
    public showSignTypeToggle: boolean = false
    /**签到类型 */
    public signType: SIGN_TYPE = Number(history.location.query?.signType ?? 1) as SIGN_TYPE.SIGN_IN
    /** 请求参数 */
    public activityStatusCount: any[] = []
    /** 请求参数 */
    public signTypeTab: SignTypeTabItem[] = []

    constructor() {
        makeAutoObservable(this)
    }

    /** 获取任务规则 */
    getTaskRule = async (callback: any) => {
        const data = await http(`${api.taskRule}/${this.taskCode}`, 'get', {})
        this.taskRule = data as unknown as TaskRule
        const { rule } = (data as unknown as TaskRule) || {}
        const { signStart, signEnd } = rule || {}

        // 存在签到和签退时 展示tab切换 打卡类型默认签到
        if (signStart & signEnd) {
            this.showSignTypeToggle = true
            this.signTypeTab = [
                {
                    tab: SIGN_TYPE_TEXT[SIGN_TYPE.SIGN_IN],
                    key: SIGN_TYPE.SIGN_IN.toString(),
                },
                {
                    tab: SIGN_TYPE_TEXT[SIGN_TYPE.SIGN_OUT],
                    key: SIGN_TYPE.SIGN_OUT.toString(),
                },
            ]
            // signStart打开 类型默认签到
            callback(SIGN_TYPE.SIGN_IN)
        } else {
            // 签到和签退不同时存在时 隐藏tab切换
            this.showSignTypeToggle = false
            if (signStart) {
                this.signTypeTab = [
                    {
                        tab: SIGN_TYPE_TEXT[SIGN_TYPE.SIGN_IN],
                        key: SIGN_TYPE.SIGN_IN.toString(),
                    },
                ]
                // signStart打开 类型默认签到
                callback(SIGN_TYPE.SIGN_IN)
            } else {
                this.signTypeTab = [
                    {
                        tab: SIGN_TYPE_TEXT[SIGN_TYPE.SIGN_OUT],
                        key: SIGN_TYPE.SIGN_OUT.toString(),
                    },
                ]
                // signStart打开 类型默认签到
                callback(SIGN_TYPE.SIGN_OUT)
            }
        }
    }

    /**
     * 获取表格数据
     * @param params 请求参数
     */
    getTableData = async ({titleDisplay, ...params}: any) => {
        console.log(titleDisplay)
        const res = (await http(
            api.listTask,
            'post',
            {
                ...params,
            },
            {
                repeatFilter: false,
            },
        )) as unknown as TableData
        return res
    }
}

export default useHook
