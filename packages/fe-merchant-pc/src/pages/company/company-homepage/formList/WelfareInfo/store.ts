import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import dayjs from 'dayjs'
import { handlerTime } from './utils'
import { getCookie } from '@/storage'

class Store {
    /** 公司福利信息 */
    public welfareInfo = {}

    /** 获取公司福利信息 */
    getWelfareInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: any = (await Http(`${Api.welfareInfo}/${organizationCode}`, 'get', {})) ?? {}
        const { workStartTime, workEndTime } = data
        this.welfareInfo = {
            ...data,
            workTime: [handlerTime(workStartTime), handlerTime(workEndTime)],
        }
    }
    /** 编辑公司福利信息 */
    editWelfareInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const [workStartTime, workEndTime] = data.workTime
        await Http(Api.editWelfareInfo, 'post', {
            organizationCode,
            ...data,
            workStartTime: dayjs(workStartTime).format('HH:mm'),
            workEndTime: dayjs(workEndTime).format('HH:mm'),
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
