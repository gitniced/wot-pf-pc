import QuestionTable from './QuestionTable'
import useTableSearch from '../../hooks/useTableSearch'
import { useContext, useEffect } from 'react'
import { ModalCallbackContext, ModalValueContext } from '@/components/ModalProvider'
import { ExamineEditValueContext } from '../../context'
import { history } from 'umi'
import { getCookie } from '@/storage'

const RemoveQuestionModal = () => {
    const { code } = history.location.query || {}
    const { dataSource } = useContext(ModalValueContext)
    const { confirmValueCallback } = useContext(ModalCallbackContext)
    const { examDetail } = useContext(ExamineEditValueContext)
    const { jobNameCode, jobTypeCode, jobLevelCode } = examDetail?.customContent?.commonJob || {}

    const hooks = useTableSearch({
        searchUrl: `/exam/front/page_exam_question/${code}`,
        initParams: {
            workName: jobNameCode,
            workType: jobTypeCode,
            workLevel: jobLevelCode,
            authenticateCode: examDetail?.authenticateCode,
            pointCode: dataSource?.pointCode,
            merchantCode: getCookie('SELECT_ORG_CODE'),
        },
    })

    useEffect(() => {
        confirmValueCallback?.(hooks.selectedRowKeys)
    }, [hooks.selectedRowKeys, confirmValueCallback])

    return (
        <>
            <QuestionTable hooks={hooks} />
        </>
    )
}

export default RemoveQuestionModal
