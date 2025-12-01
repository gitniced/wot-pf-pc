import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../../api'
import { toTree } from './utils'

class Store {
    /** 卡片数据 */
    public industryList: any = []

    /** 获取卡片数据 */
    getIndustryList = async () => {
        const data: any = (await Http(Api.industryList, 'get', { parentCode: 0 })) ?? []
        this.industryList = toTree(Object.keys(data).map(key => data[key]))
    }

    public experience = []

    /** 获取经验枚举下拉  */
    getExperience = async () => {
        const data: any = (await Http(Api.experience, 'get', {})) ?? []
        this.experience = data.map((item: any) => ({
            label: item.desc,
            code: item.code,
        }))
    }
    /** 薪资类型枚举下拉 */
    public education = []

    /** 获取薪资类型枚举下拉 */
    getEducation = async () => {
        const data: any = (await Http(Api.education, 'get', {})) ?? []
        this.education = data.map((item: any) => ({
            label: item.desc,
            code: item.code,
        }))
    }

    public category = []

    getCategory = async () => {
        const data: any = (await Http(Api.category, 'get', { alias: 'scale' })) ?? []
        this.category = data.map((item: any) => ({
            label: item.name,
            code: item.key,
        }))
    }

    public recruit = []

    getRecruit = async () => {
        const data: any = (await Http(Api.recruit, 'get', {})) ?? []
        this.recruit = data.map((item: any) => ({
            label: item.desc,
            code: item.code,
        }))
    }

    /** 职业分类 */
    public jobOptions: any = []

    /** 获取职业分类 */
    getJobOptions = async () => {
        const data = await Http(Api.listByTop, 'post', {
            pageNo: 1,
            pageSize: 999,
        })
        this.jobOptions = data?.data ?? []
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
