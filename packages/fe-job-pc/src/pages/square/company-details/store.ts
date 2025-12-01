import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../api'
import { useLocation } from 'umi'
import { CompanyData } from './interface'
import { salaryOptions } from '../job-list/components/FilterButtons/const'
class Store {
    public code = useLocation().query?.code

    public loading: boolean = true

    /** 企业详情 */
    public companyData: Partial<CompanyData> = {}

    /** 职位列表参数 */
    public jobParams = {
        pageNo: 1,
        pageSize: 10,
        professionTypeIds: [],
        recruitTypes: [],
        cityCode: '100001',
    }
    /** 职位列表 */
    public jobData: any = {}
    public totalCount: number = 0

    /** 获取企业详情 */
    getCompanyData = async () => {
        const data = (await Http(`${Api.companyDetail}/${this.code}`, 'get', {})) ?? {}
        this.companyData = data as unknown as CompanyData
        this.loading = false
    }

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
        Http(Api.jobList, 'post', {
            ...this.jobParams,
            organizationCodes: [this.code],
        }).then((res: any) => {
            this.jobData = res
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
