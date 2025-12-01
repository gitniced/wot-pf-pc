import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from './api'
import { AreaData } from '../interface'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    public loading: boolean = true

    /** 省份列表 */
    public provinceList: AreaData[] = []

    /** 职位列表参数 */
    public jobParams = {
        pageNo: 1,
        pageSize: 10,
    }
    /** 职位列表 */
    public jobList = []

    /** 修改职位列表参数 */
    setJobParams = (params: any, search = true) => {
        this.jobParams = {
            ...this.jobParams,
            ...params,
        }
        search && this.getJobList()
    }

    /** 获取职位列表 */
    getJobList = async () => {
        const data: any = await Http(Api.jobList, 'post', {
            ...this.jobParams,
        })
        this.jobList = data
        this.loading = false
    }
}

export default Store
