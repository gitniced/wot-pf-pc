/**
 * 查看要素细目表
 */
import { useEffect } from 'react'
import EditTmp from '../editTmp'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'
import { ElementTmpWrapperContext } from '../editTmp/context'

const ElementEdit = () => {
    const siteStore = useSiteStore()

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `详情-${siteName}`
    }, [])
    return (
        <ElementTmpWrapperContext.Provider value={{ isDetail: true }}>
            <EditTmp />
        </ElementTmpWrapperContext.Provider>
    )
}

export default ElementEdit
