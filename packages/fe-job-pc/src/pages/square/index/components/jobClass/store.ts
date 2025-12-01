import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'

class Store {
    /** 查询参数 */
    public jobParams = {
        pageNo: 1,
        pageSize: 6,
    }
    /** 职业分类 */
    public jobOptions: any = {}

    /** 获取职业分类 */
    getJobOptions = async () => {
        const data = (await Http(Api.listByTop, 'post', this.jobParams)) ?? []
        this.jobOptions = data
    }

    setJobParams = (val: any) => {
        this.jobParams = {
            ...this.jobParams,
            ...val,
        }
        this.getJobOptions()
    }

    public recommend: any = []

    getRecommend = async () => {
        const data: any =
            (await Http(Api.recommend, 'post', {
                formAlias: 'pcJobNewJob',
                pageNo: 1,
                pageSize: 3,
            })) ?? []
        this.recommend = data?.map((item: any) => ({
            id: item?.customContent?.id,
            url: item?.customContent?.photo?.[0]?.url,
        }))
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
