import { makeAutoObservable } from 'mobx'
import { SIGN_TYPE } from '../../const'
import { SIGN_TYPE_TEXT } from '../../const'
import type { TabCounts, TaskSignTable } from '../../interface'
import api from './api'
import http from '@/servers/http'
import { history } from 'umi'
import type { TabCount } from './interface'
// import { getLocalStorage } from '@/storage'

class useHook {
    /** 任务code */
    public taskCode: string = history.location.query?.taskCode as string
    /** 签到计数 */
    public tabCounts: TabCounts[] = []
    /** 名单信息列表 */
    public taskSignTable: TaskSignTable[] = []
    /** 签到状态 */
    public signStatus: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    /** 获取签到计数信息 */
    getTabCounts = async (signType: SIGN_TYPE) => {
        const data = (await http(api.tabCounts, 'get', {
            signMode: signType,
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
                name: `已${SIGN_TYPE_TEXT[signType]}`,
                length: data.signedCount,
            },
            {
                key: '0',
                name: `未${SIGN_TYPE_TEXT[signType]}`,
                length: data.unSignedCount,
            },
        ]
    }

    /** 修改签到状态 */
    setSignStatus = (e: string) => {
        this.signStatus = e
    }

    /** 获取名单信息 */
    getTaskSignTable = async (signType: SIGN_TYPE) => {
        // const sid = getLocalStorage('SID') ?? ''
        // 4为补卡  已签到传[1,4]  未签到不需要传补卡
        const requestArr = Number(this.signStatus) === 0 ? [0] : [Number(this.signStatus), 4]

        const res = await http(api.nameListPage, 'post', {
            // sid,
            pageNo: 1,
            pageSize: 999999, // 不分页
            [signType === SIGN_TYPE.SIGN_IN ? 'signStatus' : 'signOutStatus']: this.signStatus
                ? requestArr
                : undefined,
            taskCodes: [this.taskCode],
        })
        this.taskSignTable = res.data as TaskSignTable[]
    }
}

export default new useHook()
