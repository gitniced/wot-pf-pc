import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import { getLocalStorage } from '@/storage'

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
    public lastRecommend: any = {}
    public lastSecondrecommend: any = {}

    getRecommend = async () => {
        const data: any =
            (await Http(Api.recommendpage, 'post', {
                formAlias: 'EmploymentPcHomeBanner',
                pageNo: 1,
                pageSize: 20,
                sid: getLocalStorage('SID'),
                status: 0,
            })) ?? []
        const list = data?.data?.map((item: any) => ({
            id: item?.code,
            url: item?.customContent?.image?.[0]?.url,
            jumpUrl: item?.customContent?.jumpUrl,
        }))
        const defaultObj = {
            id: 'xxx',
            url: 'https://static.zpimg.cn/dev/fe_job_pc/img/jy/banner_moren.png',
        }
        this.lastRecommend = list.pop() || defaultObj
        this.lastSecondrecommend = list.pop() || defaultObj
        this.recommend = list?.length ? list : [defaultObj]
    }

    public recommendpage = []

    getRecommendPage = async () => {
        const data: any =
            (await Http(Api.recommendpage, 'post', {
                formAlias: 'EmploymentHotWord',
                pageNo: 1,
                pageSize: 20,
                sid: getLocalStorage('SID'),
                status: 0,
            })) ?? []
        this.recommendpage = data?.data?.map((item: any) => item?.customContent?.hotWord)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
