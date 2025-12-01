import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { SiteData } from '@/types'
import { getCookie, setCookie, setLocalStorage } from '@/storage'
import { getEvent } from '../utils/event'
// import { getLastPath } from '@/utils/pathUtils'c
import { assertCurrentOrigin, getDomain, setMerchantSiteData } from '@/utils/urlUtils'
import { message } from 'antd'
import { findSiteData, getSiteConfigData } from '@wotu/wotu-components'
import changeIco from '@/utils/changeIco'
// import Cookies from 'js-cookie'
// import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

/**站点信息类型 */
type CurrentSiteData = {
    data: Partial<SiteData> | undefined
    time: number
}
const event = getEvent()
export default class SiteStore {
    public siteData: CurrentSiteData = {
        data: {},
        time: 0,
    }
    public siteAvatar = ''
    public count = 0
    public up = {}
    public businessOpenList: string[] = []
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'workSiteStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['siteData', 'siteAvatar', 'businessOpenList'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**
     * 获取站点信息
     */
    getSiteConfigByDebounce = async () => {
        if (this.siteData.time) {
            if (new Date().getTime() - this.siteData.time > 60000) {
                await this.getSiteConfig()
            }
        } else {
            await this.getSiteConfig()
        }
        if (getCookie('TOKEN')) {
            await this.getSiteDetail()
        }
    }

    /**
     * 获取站点信息
     */
    getSiteConfig = async () => {
        const siteData = (await getSiteConfigData({
            domainUrl: getDomain(),
            all: true,
        })) as unknown as SiteData

        if (siteData === null) {
            message.error('找不到站点!')
            return
        }

        const merchantPath =
            findSiteData(siteData, 'merchantUserDomain', { findKey: 'baseInfo' }) || ''
        if (assertCurrentOrigin(merchantPath)) {
            setMerchantSiteData(siteData)
        }
        const { baseInfo = { alias: '' }, sid } = siteData || {}

        const { alias } = baseInfo
        setCookie('ALIAS', alias)
        setLocalStorage('SID', sid)
        const tempSiteConfig: CurrentSiteData = {
            time: new Date().getTime(),
            data: siteData,
        }
        // await this.getSiteDetail()
        this.updateSiteData(tempSiteConfig)
        this.getSiteAvatar(tempSiteConfig)
        changeIco(siteData)
    }

    siteDataTransition = (data: any) => {
        const { baseInfo, configList } = data
        const baseDomain = [
            'pcDomain',
            'wapDomain',
            'adminDomain',
            'padDomain',
            'loginUrl',
            'wapLoginUrl',
            'portalH5Url',
            'merchantDomain',
            'signInDomain',
            'orgDomain',
            'personalDomain',
            'midDomain',
            'midMobileDomain',
            'merchantMidDomain',
            'courseMerchantDomain',
            'merchantMidDomain',
            'merchantUserDomain',
            'lecturerDomain',
            'lecturerUserDomain',
            'lecturerMobileDomain',
            'lecturerMobileUserDomain',
            'burl',
        ]
        const domainList: string[] = []
        let baseInfoObj: Record<string, any> = {}
        configList.map((configItem: { key: string; value: any }) => {
            baseDomain.map(domainItem => {
                if (configItem.key === domainItem) {
                    baseInfoObj[domainItem] = configItem.value
                    domainList.push(configItem.value)
                }
            })
        })
        const finalData = {
            ...data,
            baseInfo: {
                ...baseInfo,
                ...baseInfoObj,
                domainList,
            },
        }
        return finalData
    }

    /**
     * 更新站点信息
     */
    updateSiteData = (params: CurrentSiteData) => {
        this.siteData = params
        this.count++
        event.emit('siteUpdate', params)
    }

    /**
     * 获取站点配置的默认头像
     */

    getSiteAvatar = (params: CurrentSiteData) => {
        const { data } = params || {}
        const { configList } = data || {}
        const avatarConfig = configList?.find(item => item?.key === 'avatar') || {}
        this.siteAvatar = avatarConfig?.value || ''
    }

    /** 查询站点详情
     * 看是否勾选勾选了【考评】-【职培】
     */
    getSiteDetail = async () => {
        const sid = this.siteData?.data?.sid
        if (!sid || new Date().getTime() - this.siteData.time > 60000) return
        const data: any = await Http(`${globalApi.getSiteDetail}`, 'POST', { sid }, {})
        const { businessOpenList = [] } = data || {}
        this.businessOpenList = businessOpenList
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
