/**
 * 编辑考试
 */
import { useEffect } from 'react'
import EditTmp from '../editTmp'
import { ExamineTmpWrapperContext } from '../editTmp/context'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'

const ExamineEdit = () => {
    const siteStore = useSiteStore()

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `编辑试卷-${siteName}`
    }, [])
    return (
        <ExamineTmpWrapperContext.Provider value={{ isDetail: false }}>
            <EditTmp />
        </ExamineTmpWrapperContext.Provider>
    )
}

export default ExamineEdit
