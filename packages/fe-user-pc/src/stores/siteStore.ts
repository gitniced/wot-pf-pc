// import Http from '@/servers/http'
// import globalApi from '@/servers/globalApi'
// import type { GetSite } from './interface'
import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { SiteData } from '@/types'
import { setCookie, setLocalStorage } from '@/storage'
import { getDomain } from '@/utils/urlUtils'
import { findSiteData, getSiteConfigData } from '@wotu/wotu-components'
import changeIco from '@/utils/changeIco'
import { message } from 'antd'
import type { History } from 'umi'
import { history } from 'umi'
import type { PortalData } from './interface'

/**站点信息类型 */
type CurrentSiteData = {
    data: SiteData
    time: number
}
export default class SiteStore {
    // 应用标签
    public tag: string = ''
    // 门户code
    public portalCode: string = ''
    // 门户详情
    public portalData: PortalData = {}
    // 门户站点信息
    public siteData: CurrentSiteData = {
        data: {},
        time: 0,
    }
    public siteAvatar = ''
    /** 主应用history*/
    public masterHistory: History = history
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'siteStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['tag', 'portalCode', 'portalData', 'siteData', 'siteAvatar'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })

        // .then(persistStore => {
        //     console.log('-----SiteStore本地化同步----')
        //     console.log(toJS(persistStore.target.siteData))
        // })
    }

    /**
     * 获取门户标识
     */
    updateTag = (tag: string) => {
        this.tag = tag
    }
    /**
     * 获取门户code
     */
    updatePortalCode = (portalCode: string) => {
        this.portalCode = portalCode
    }

    /**
     * 绑定父应用门户信息
     */
    updatePortalData = (portalData: PortalData) => {
        this.portalData = portalData
    }

    /**
     * 绑定父应用history
     * @param {History} tempHistory 绑定父应用history
     */
    updateHistory = (tempHistory: History) => {
        this.masterHistory = tempHistory
    }
    /**
     * 绑定父应用userData
     * @param {CurrentSiteData} tempSiteData 绑定父应用站点信息
     */
    updateSiteData = (tempSiteData: CurrentSiteData) => {
        const alias = findSiteData(tempSiteData, 'alias', { findKey: 'baseInfo' }) || ''
        setLocalStorage('ALIAS', alias)
        console.log({...JSON.parse(JSON.stringify(tempSiteData))})
        this.siteData = ({...JSON.parse(JSON.stringify(tempSiteData))})
    }

    /**
     * 获取站点信息
     */
    // getSiteConfigByDebounce = async () => {
    //     const doDebounce = async () => {
    //         if (this.siteData.time) {
    //             if (new Date().getTime() - this.siteData.time > 600000) {
    //                 await this.getSiteConfig()
    //             } else {
    //                 changeIco(this.siteData.data)
    //             }
    //         } else {
    //             await this.getSiteConfig()
    //         }
    //     }
    //     if (RUN_ENV === 'local') {
    //         doDebounce()
    //     } else {
    //         if (Object.keys(this.siteData.data).length > 0) {
    //             const siteDataStr = JSON.stringify(this.siteData.data)
    //             if (siteDataStr.includes(window.location.origin)) {
    //                 doDebounce()
    //             } else {
    //                 await this.getSiteConfig()
    //             }
    //         } else {
    //             await this.getSiteConfig()
    //         }
    //     }
    // }

    /**
     * 获取站点信息
     * @param {SiteType} tempSiteData 绑定父应用站点信息
     */
    getSiteConfigByDebounce = async (updateTheme: (color: string) => void) => {
        if (this.siteData.time) {
            if (new Date().getTime() - this.siteData.time > 600000) {
                await this.getSiteData(updateTheme)
            } else {
                const tempThemeColor = findSiteData(this.siteData || {}, 'theme_color')?.value || ''
                changeIco(this.siteData.data)
                updateTheme(tempThemeColor)
            }
        } else {
            await this.getSiteData(updateTheme)
        }
    }

    /**
     * 获取站点信息
     * @param {(color: string)=>void} updateTheme 更新主题色
     */
    getSiteData = async (updateTheme: (color: string) => void) => {
        const siteData = (await getSiteConfigData({
            domainUrl: getDomain(),
            all: true,
        })) as unknown as SiteData

        if (siteData === null) {
            message.error('找不到站点!')
            this.tag !== 'portal' ? history.replace('/404') : ''
            return
        }

        let { baseInfo = {}, configList = [], sid } = siteData || {}
        const { alias = '' } = baseInfo
        setLocalStorage('SID', sid)
        setCookie('ALIAS', alias)

        if (this.tag === 'portal') {
            const currentAlias = this.portalCode
            const currentPortalData = this.portalData?.[currentAlias]
            const { organizationName, organizationLogo } = currentPortalData || {}
            configList.map(item => {
                switch (item.key) {
                    case 'wap_logo':
                        item.value = organizationLogo
                        break
                    case 'pc_logo':
                        item.value = organizationLogo
                        break
                    default:
                }
            })
            baseInfo.name = organizationName
            siteData.baseInfo = baseInfo
            siteData.configList = configList
        }

        const tempSiteConfig: CurrentSiteData = {
            time: new Date().getTime(),
            data: siteData,
        }
        this.updateSiteData(tempSiteConfig)
        this.getSiteAvatar(tempSiteConfig)
        const tempThemeColor = findSiteData(siteData || {}, 'theme_color')?.value || ''
        updateTheme(tempThemeColor)
        changeIco(this.siteData?.data || {})
    }

    /**
     * 获取站点配置的默认头像
     */

    getSiteAvatar = (params: CurrentSiteData) => {
        let { data } = params || {}
        let { configList } = data || {}
        configList = configList || []
        configList.map(item => {
            if (item?.key === 'avatar') {
                this.siteAvatar = item?.value || ''
            }
        })
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
