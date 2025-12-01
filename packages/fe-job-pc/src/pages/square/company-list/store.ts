import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../api'

class Store {

    /** 职位列表参数 */
    public companyParams = {
        pageNo: 1,
        pageSize: 20
    }
    /** 职位列表 */
    public companyList = []

    /** 修改职位列表参数 */
    setCompanyParams = (val, search = true) => {

        this.companyParams = {
            ...this.companyParams,
            ...val,
        }
        search && this.getCompany()
    }

    /** 获取职位列表 */
    getCompany = async () => {
        const data = await Http(Api.hotEnterprises, 'post', this.companyParams) ?? {}
        this.companyList = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
