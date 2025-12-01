// 获取站点信息
import getMasterProps from '@/stores/masterStore'

const useSiteStore = () => {
    const { masterStore } = getMasterProps()
    return masterStore?.siteStore
}

export default useSiteStore
