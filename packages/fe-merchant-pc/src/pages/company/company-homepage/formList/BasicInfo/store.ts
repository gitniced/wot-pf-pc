import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'

import type { Scale } from '../../interface'
import { getCookie } from '@/storage'

class Store {
    /** 公司基本信息 */
    public baseInfo: any = {}

    /** 获取公司基本信息 */
    getBaseInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data =
            ((await Http(`${Api.baseInfo}/${organizationCode}`, 'get', {})) as unknown as any) ?? {}
        const { province, city, area, logo, industryPidId, industryId } = data
        this.baseInfo = {
            ...data,
            addressList: [province, city, area],
            industryId: [industryPidId, industryId],
            logo: [
                {
                    name: logo,
                    url: logo,
                    status: 'none',
                },
            ],
        }
    }
    /** 编辑公司基本信息 */
    editBaseInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const {
            industryId,
            addressList: [province, city, area],
        } = data
        await Http(Api.editBaseInfo, 'post', {
            organizationCode,
            ...data,
            province,
            city,
            area,
            industryId: industryId[industryId.length - 1],
            logo: data.logo[0].url,
        })
    }

    /** 组织规模列表 */
    scaleList: Scale[] = []

    /** 获取组织规模列表 */
    getScaleList = async () => {
        const res: any = await Http(Api.scale, 'get', { alias: 'scale' })
        this.scaleList = res ?? []
    }

    /** 所属行业下拉数据 */
    public financingOptions = []

    /** 获取所属行业下拉数据 */
    getFinancingOptions = async () => {
        const res: any = (await Http(Api.financingOptions, 'get', { alias: 'financing' })) ?? []
        this.financingOptions = res
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
