import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { SiteData, SiteType } from '@/types'
import type { PortalData } from './interface'
import { getDomain } from '@/utils/urlUtils'
import { findSiteData, getSiteConfigData } from '@wotu/wotu-components'
import { setCookie, setLocalStorage } from '@/storage'
import { message } from 'antd'
import changeIco from '@/utils/changeIco'

export default class SiteStore {
    public siteAvatar = ''
    /** 父应用标识 */
    public tag: string = ''
    /** 父应用history */
    public masterHistory: History = history as unknown as History
    /**站点信息 */
    public siteData: SiteType = {} as SiteType
    /**门户code */
    public portalCode: string = ''
    /**门户详情 */
    public portalData: PortalData = {} as PortalData

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'transactionSiteStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: [
                'tag',
                'siteAvatar',
                'masterHistory',
                'siteData',
                'portalCode',
                'portalData',
            ], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

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
                updateTheme(tempThemeColor)
            }
        } else {
            await this.getSiteData(updateTheme)
        }
    }

    /**
     * 绑定父应用userData
     * @param {SiteType} tempSiteData 绑定父应用站点信息
     */
    getSiteData = async (updateTheme: (color: string) => void) => {
        const siteData = (await getSiteConfigData({
            domainUrl: getDomain(),
            // domainUrl: 'https://nxkp.cloud.wozp.cn',
            all: true,
        })) as unknown as SiteData

        if (siteData === null) {
            message.error('找不到站点!')
            return
        }
        const { baseInfo = { alias: '' }, sid } = siteData || {}
        const { alias } = baseInfo
        setCookie('ALIAS', alias)
        setLocalStorage('SID', sid)
        const tempSiteConfig: SiteType = {
            time: new Date().getTime(),
            data: siteData,
        }
        this.updateSiteData(tempSiteConfig)
        const tempThemeColor = findSiteData(siteData || {}, 'theme_color')?.value || ''
        updateTheme(tempThemeColor)
        changeIco(siteData)
    }

    /**
     * 更新当前父应用标识
     * @param {string} tag 需要清除字段的存储类型
     */
    updateTag = (tag: string) => {
        this.tag = tag
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
     * @param {SiteType} tempSiteData 绑定父应用站点信息
     */
    updateSiteData = (tempSiteData: SiteType) => {
        this.siteData = tempSiteData
    }
    /**
     * 获取门户code
     */
    updatePortalCode = (portalCode: string) => {
        this.portalCode = portalCode
    }
    /**
     * 绑定父应用门户信息
     * @param {PortalData} tempPortalData 绑定父应用history
     */
    updatePortalData = (tempPortalData: PortalData) => {
        this.portalData = tempPortalData
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
