import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { history } from 'umi'
import type { TaskRule, SignTypeTabItem } from './interface'
import type { TableData } from './interface'
import type { SIGN_TYPE} from '../face-sign-in/const';

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
    getTaskRule = async () => {
        const data = await http(`${api.taskRule}/${this.taskCode}`, 'get', {})
        this.taskRule = data as unknown as TaskRule
    }

    /**
     * 获取表格数据
     * @param params 请求参数
     */
    getTableData = async (params: any) => {
        const res = (await http(
            api.listTaskUser,
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

     /**
     * 更新基准照
     * @param params 请求参数
     */
     updatePhoto = async (params: any) => {
        const res = (await http(
            api.updateUserImg,
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
