/**
 * 添加试题
 */
import QuestionTable from './QuestionTable'
import useTableSearch from '../../hooks/useTableSearch'
import { history } from 'umi'
import { useContext, useEffect } from 'react'
import { ModalCallbackContext, ModalValueContext } from '@/components/ModalProvider'
import { ExamineEditValueContext } from '../../context'
import useUserStore from '@/hooks/useUserStore'

const AddQuestionModal = () => {
    const userStore = useUserStore()

    const { code } = history.location.query || {}
    const { confirmValueCallback } = useContext(ModalCallbackContext)
    const { examDetail } = useContext(ExamineEditValueContext)
    const { dataSource }: any = useContext(ModalValueContext) 
    const { jobNameCode, jobTypeCode, jobLevelCode } = examDetail?.customContent?.commonJob || {}

    const hooks = useTableSearch({
        searchUrl: `/exam/front/page_question/${code}`,
        initParams: {
            workName: jobNameCode,
            workType: jobTypeCode,
            workLevel: jobLevelCode,
            storageStartTime: examDetail?.receiptStartTime || undefined,
            storageEndTime: examDetail?.receiptEndTime || undefined,
            organizationCode: userStore?.selectedOrganization,
            pointCode: dataSource?.pointCode
        },
    })

    useEffect(() => {
        confirmValueCallback?.(hooks.selectedRowKeys)
    }, [hooks.selectedRowKeys, confirmValueCallback])

    return <QuestionTable hooks={hooks} />
}

export default AddQuestionModal
