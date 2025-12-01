import { makeAutoObservable, runInAction } from 'mobx'
import Http from '@/servers/http'
import api from './api'

interface JobDetailResponse {
    name?: string
    id?: number
    fileList?: any[]
    code?: string
}

class OccupationDetailStore {
    public jobDetail: JobDetailResponse = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @description 获取职位详情
     * @author kaijiewang
     * @date 2023-08-23
     */
    getJobDetail = async (id = 0) => {
        const data = (await Http(
            api.job_detail,
            'get',
            {
                id,
            },
            { repeatFilter: false },
        )) as unknown
        runInAction(() => {
            this.jobDetail = data as unknown as JobDetailResponse
        })

        return Promise.resolve(data)
    }
}

export default OccupationDetailStore
