import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { salaryOptions } from './components/FilterButtons/const'
import { history, useLocation } from 'umi'
import type {
    ActivityApplyCheckRespDto,
    CompanyActivityListRespDto,
    JobActivityListRespDto,
} from './interface'

class Store {
    public query = useLocation().query ?? {}

    /** 职位列表参数 */
    public filterParams = {
        professionName: this.query.professionName,
        professionTypeIds: this.query.professionTypeId ? [Number(this.query.professionTypeId)] : [],
    }
    /** 职位列表参数 */
    public jobPage = {
        pageNo: 1,
        pageSize: 10,
    }

    /** 公司列表参数 */
    public companyPage = {
        pageNo: 1,
        pageSize: 16,
    }

    /** 职位列表 */
    public jobData: JobActivityListRespDto = {}

    /** 公司列表 */
    public companyData: CompanyActivityListRespDto = {}

    /** tab列表 */
    public tabList = [
        { key: 'company', name: '公司' },
        { key: 'job', name: '职位' },
    ]

    /** tab列表 */
    public activeTab = 'company'

    /** 是否请求活动名单 */
    public hasCheckRequest = false
    /** 用户是否在活动名单 */
    public hasCheck = false

    /**
     * 搜索 并且重置 页码和 职位列表
     */
    changeTab = async (tab: string) => {
        this.activeTab = tab
    }

    /** 修改职位列表参数 */
    setParams = (val: any, search = true) => {
        const salary = val?.salary?.[0]
        // @ts-ignore
        const [salaryMin, salaryMax] = salaryOptions?.[salary]?.value ?? []
        this.filterParams = {
            ...this.filterParams,
            ...val,
            salaryMin,
            salaryMax,
        }
        if (search) {
            this.getJobList()
            this.getCompanyList()
        }
    }

    /** 修改列表页码 */
    updatePageNo = (page: any) => {
        if (this.activeTab === 'job') {
            this.jobPage = {
                ...this.jobPage,
                ...page,
            }
            this.getJobList()
        } else {
            this.companyPage = {
                ...this.companyPage,
                ...page,
            }
            this.getCompanyList()
        }
    }

    /** 获取职位列表 */
    checkJoin = async () => {
        const {
            location: { query },
        } = history
        const { activityCode } = query || {}
        const checkJoinData = (await Http(api.checkUserJoin, 'post', {
            code: activityCode,
        })) as unknown as ActivityApplyCheckRespDto
        const { successFlag } = checkJoinData
        this.hasCheck = successFlag
        this.hasCheckRequest = true
    }

    /** 获取职位列表 */
    getJobList = async () => {
        const {
            location: { query },
        } = history
        const { activityCode } = query || {}
        const jobData = (await Http(api.getJobList, 'post', {
            ...this.filterParams,
            ...this.jobPage,
            activityCode,
        })) as unknown as JobActivityListRespDto
        this.jobData = jobData as JobActivityListRespDto
    }

    /** 获取公司列表 */
    getCompanyList = async () => {
        const {
            location: { query },
        } = history
        const { activityCode } = query || {}
        const companyData = (await Http(api.getCompanyList, 'post', {
            ...this.filterParams,
            ...this.companyPage,
            activityCode,
        })) as unknown as CompanyActivityListRespDto
        this.companyData = companyData as CompanyActivityListRespDto
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
