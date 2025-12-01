import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../api'
import { salaryOptions } from './components/FilterButtons/const'
import { useLocation } from 'umi'
import { AreaData } from '../interface'
import { findSiteData } from '@wotu/wotu-components'
import { getLocalStorage } from '@/storage'


class Store {
    public query = useLocation().query ?? {}
    public loading: boolean = false

    /** 省份列表 */
    public provinceList: AreaData[] = []

    /** 职位列表参数 */
    public jobParams = {}
    /** 职位列表 */
    public jobList = []

    /** 修改职位列表参数 */
    setJobParams = (val: any, search = true) => {
        const salary = val?.salary?.[0]
        // @ts-ignore
        const [salaryMin, salaryMax] = salaryOptions?.[salary]?.value ?? []

        this.jobParams = {
            ...this.jobParams,
            ...val,
            salaryMin,
            salaryMax,
        }
        search && this.getJobList()
    }

    /** 获取职位列表 */
    getJobList = async () => {
        this.loading = true
        const data: any = await Http(Api.jobList, 'post', {
            ...this.jobParams,
            organizationCode: this.query.organizationCode ? this.query.organizationCode : undefined,
        })
        this.jobList = data
        this.loading = false
    }

    /**
     *  获取省数据
     * @param area
     */
    getProvinceList = async (area: AreaData) => {
        const { code } = area
        const provinceData =
            (await Http(Api.city, 'get', { parentCode: code, nationwideState: 1 })) || []
        this.provinceList = provinceData as unknown as AreaData[]
    }

    constructor() {
        makeAutoObservable(this)
        const siteStore = getLocalStorage('SITE_STORE').siteData
        const cityCode =
            findSiteData(siteStore, 'city', {
                findKey: 'baseInfo',
            }) || ''
        const provinceCode =
            findSiteData(siteStore, 'province', {
                findKey: 'baseInfo',
            }) || ''
        this.jobParams = {
            pageNo: 1,
            pageSize: 10,
            professionName: this.query.professionName,
            professionTypeIds: this.query.professionTypeId ? [Number(this.query.professionTypeId)] : [],
            recruitTypes: this.query.recruitType ? [Number(this.query.recruitType)] : [],
            cityCode: cityCode || '100001',
            provinceCode: provinceCode || '100000'
        }
    }
}

export default Store
