import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
// import type { GetSite } from './interface'
import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { SiteData } from '@/types'
import { setCookie, setLocalStorage } from '@/storage'
import { getDomain } from '@/utils/urlUtils'
import { findSiteData } from '@wotu/wotu-components'
import changeIco from '@/utils/changeIco'
import { message } from 'antd'
import type { PortalData } from '@/types/interface'
import type { History } from 'umi'
import { history } from 'umi'
import { cloneDeep } from 'lodash'

/**站点信息类型 */
type CurrentSiteData = {
    data: SiteData
    time: number
}

/**门户信息类型 */
type PortalDataMap = Record<string, PortalData>

export default class SiteStore {
    /** 路由指定机构code*/
    public orgCode: string = ''
    /** 站点信息*/
    public siteData: CurrentSiteData = {
        data: {},
        time: 0,
    }
    /** 门户信息*/
    public portalData: PortalDataMap = {}
    /** 主应用history*/
    public masterHistory: History = history

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'gatewaySiteStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['siteData', 'portalData'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })

        // .then(persistStore => {
        //     console.log('-----SiteStore本地化同步----')
        //     console.log(toJS(persistStore.target.siteData))
        // })
    }
    /**
     * 路由变化时 更新机构code
     */
    updateOrgCode = (orgCode: string) => {
        this.orgCode = orgCode
    }

    /**
     * 获取站点信息
     */
    getSiteConfigByDebounce = async () => {
        const doDebounce = async () => {
            if (this.siteData.time) {
                if (new Date().getTime() - this.siteData.time > 600000) {
                    await this.getSiteConfig()
                }
            } else {
                await this.getSiteConfig()
            }
        }
        if (RUN_ENV === 'local') {
            doDebounce()
        } else {
            if (Object.keys(this.siteData.data).length > 0) {
                const siteDataStr = JSON.stringify(this.siteData.data)
                if (siteDataStr.includes(window.location.origin)) {
                    doDebounce()
                } else {
                    await this.getSiteConfig()
                }
            } else {
                await this.getSiteConfig()
            }
        }
    }

    /**
     * 获取站点信息
     */
    getSiteConfig = async () => {
        const siteData = (await Http(globalApi.getDomainBySiteData, 'get', {
            domain: getDomain(),
        })) as unknown as SiteData

        if (siteData === null) {
            message.error('找不到站点!')
            return
        }

        const alias = findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''
        const sid = siteData?.sid || ''
        setLocalStorage('ALIAS', alias)
        setCookie('ALIAS', alias)
        setLocalStorage('SID', sid)

        const tempSiteConfig: CurrentSiteData = {
            time: new Date().getTime(),
            data: siteData,
        }

        this.updateSiteData(tempSiteConfig)
    }

    /**
     * 更新站点信息
     */
    updateSiteData = (params: CurrentSiteData) => {
        this.siteData = params
    }

    /**
     * 获取站点信息
     */
    getPortalData = async (orgCode: string) => {
        if (!orgCode) return
        const portalData: any = (await Http(`${globalApi.businessVisit}`, 'get', {
            organizationCode: orgCode,
        })) as unknown as PortalData

        if (!portalData) {
            message.error('机构信息有误!')
            return
        } else {
            let tempPortalData = cloneDeep(this.portalData)
            tempPortalData = { ...tempPortalData, [orgCode]: portalData }
            this.portalData = tempPortalData
            changeIco(tempPortalData)
            if(portalData.status === 1){
                history.replace(`/${portalData?.customDomain}/prohibit`)
            }
        }
    }

    /**
     * 更新门户信息
     */
    updatePortalData = (params: PortalDataMap) => {
        this.portalData = params
    }

    /**
     *
     * @param his history
     * 将主应用的history注入到masterHistory
     */
    update_master_history = (his: History) => {
        this.masterHistory = his
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
