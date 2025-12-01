/**
 * 试卷编辑详情
 */
import { useEffect } from 'react'
import EditTmp from '../editTmp'
import { ExamineTmpWrapperContext } from '../editTmp/context'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'

const ExamineDetail = () => {
    const siteStore = useSiteStore()

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `查看试卷结构-${siteName}`
    }, [])
    return (
        <ExamineTmpWrapperContext.Provider value={{ isDetail: true }}>
            <EditTmp />
        </ExamineTmpWrapperContext.Provider>
    )
}

export default ExamineDetail
