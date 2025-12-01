/**
 * 试卷编辑详情
 */
import { useEffect } from 'react'
import EditTmp from '../editTmp'
import { ExamineTmpWrapperContext } from '../editTmp/context'

const ExamineDetail = () => {
    useEffect(() => {
        document.title = `查看试卷结构`
    }, [])
    return (
        <ExamineTmpWrapperContext.Provider value={{ isDetail: true }}>
            <EditTmp />
        </ExamineTmpWrapperContext.Provider>
    )
}

export default ExamineDetail
