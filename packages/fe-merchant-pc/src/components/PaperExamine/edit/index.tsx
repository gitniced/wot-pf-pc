/**
 * 编辑考试
 */
import { useEffect } from 'react'
import EditTmp from '../editTmp'
import { ExamineTmpWrapperContext } from '../editTmp/context'

const ExamineEdit = () => {
    useEffect(() => {
        document.title = `编辑试卷`
    }, [])

    return (
        <ExamineTmpWrapperContext.Provider value={{ isDetail: false }}>
            <EditTmp />
        </ExamineTmpWrapperContext.Provider>
    )
}

export default ExamineEdit
