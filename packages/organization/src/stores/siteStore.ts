import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
// import type { GetSite } from './interface'
import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import type { SiteData, SiteType } from '@/types'
import { setCookie, setLocalStorage } from '@/storage'
import { getEvent } from '../utils/event'

/**站点信息类型 */
type CurrentSiteData = {
    data: SiteData | undefined
    time: number
}
const event = getEvent()
export default class SiteStore {
    public siteData: SiteType = {
        data: {},
        time: 0,
    }
    public siteAvatar = ''
    public count = 0
    public up = {}
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'SiteStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['siteData', 'siteAvatar'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })

        // .then(persistStore => {
        //     console.log('-----SiteStore本地化同步----')
        //     console.log(toJS(persistStore.target.siteData))
        // })
    }

    /**
     * 获取站点信息
     */
    getSiteConfigByDebounce = async callback => {
        if (this.siteData.time) {
            if (new Date().getTime() - this.siteData.time > 600000) {
                await this.getSiteConfig()
            }
            callback()
        } else {
            await this.getSiteConfig()
            callback()
        }
    }

    /**
     * 获取站点信息
     */
    getSiteConfig = async () => {
        const siteData = (await Http(globalApi.getSiteConfig, 'get', {})) as unknown as SiteData
        const { baseInfo, sid } = siteData || {}
        const { alias } = baseInfo
        setCookie('ALIAS', alias)
        setLocalStorage('SID', sid)

        const tempSiteConfig: CurrentSiteData = {
            time: new Date().getTime(),
            data: siteData,
        }
        this.updateSiteData(tempSiteConfig)
        this.getSiteAvatar(tempSiteConfig)
    }

    /**
     * 更新站点信息
     */
    updateSiteData = (params: CurrentSiteData) => {
        this.siteData = params
        this.count++
        event.emit('siteUpdate')
    }

    /**
     * 获取站点配置的默认头像
     */

    getSiteAvatar = (params: CurrentSiteData) => {
        let { data } = params || {}
        let { configList } = data
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
