/**
 * ModalProvider 确认\取消操作
 */
import type { ModalProviderType } from '@/components/ModalProvider'
import { useState } from 'react'
import { ModalType } from '../enums'
import http from '@/servers/http'
import type { ExamineDetailType, TableDataType } from '../interface'
import { getLocalStorage } from '@/storage'
import { message } from 'antd'

type ModalDataType = Omit<ModalProviderType, 'handleClose' | 'handleConfirm'>

// 添加试题
const confirmAddQuestion = (
    data: TableDataType[],
    code?: string,
    getPaperDetail?: () => void,
    getAuthDetail?: () => void,
    getQuestionList?: () => void,
) => {
    http(
        '/exam/front/add_question',
        'post',
        data.map(v => ({
            paperCode: code,
            questionCode: v.code,
            questionType: v.type,
            userCode: getLocalStorage('WORK_SITE_STORE')?.userData?.code,
        })),
    ).then(() => {
        getPaperDetail?.()
        getAuthDetail?.()
        getQuestionList?.()
    })
}

// 移除试题
const confirmRemoveQuestion = (
    data: TableDataType[],
    code?: string,
    getPaperDetail?: () => void,
    getAuthDetail?: () => void,
    getQuestionList?: () => void,
) => {
    http(
        '/exam/front/delete_question',
        'post',
        data.map(v => ({
            paperCode: code,
            questionCode: v.code,
            questionType: v.type,
            userCode: getLocalStorage('WORK_SITE_STORE')?.userData?.code,
        })),
    ).then(() => {
        getPaperDetail?.()
        getAuthDetail?.()
        getQuestionList?.()
    })
}

// 保存注意事项
const confirmNote = (
    data: string,
    code: string,
    setExamDetail: React.Dispatch<React.SetStateAction<ExamineDetailType>>,
) => {
    http('/exam/front/update_precautions', 'post', {
        paperCode: code,
        precautions: data,
    }).then(() => {
        setExamDetail(v => ({ ...v, precautions: data }))
        message.success('保存成功')
    })
}

// 批量设置分数
const confirmBatchSetScore = (
    data: any[],
    code?: string,
    getPaperDetail?: () => void,
    getQuestionList?: () => void,
) => {
    http('/exam/front/batch_set_question_score', 'post', {
        paperCode: code,
        questionScoreConfig: data.map(v => ({
            quesetionType: v.questionType,
            score: v.unificationScore ? Number(v.unificationScore) : v.unificationScore,
        })),
    }).then(() => {
        getPaperDetail?.()
        getQuestionList?.()
    })
}

const useModalControl = (
    code: string,
    setExamDetail: React.Dispatch<React.SetStateAction<ExamineDetailType>>,
    getPaperDetail: () => void,
    getAuthDetail: () => void,
    getQuestionList: () => void,
) => {
    const [modalData, setModalData] = useState<ModalDataType>({
        visible: false,
        dataSource: {},
        type: ModalType.BATCH_SET_SCORE,
    })

    const handleClose = () => {
        setModalData({ visible: false, dataSource: {}, type: ModalType.ADD_REQUESTION })
    }

    // 保存弹窗数据
    const handleConfirm = (data: any) => {
        if (modalData.type === ModalType.ADD_REQUESTION) {
            confirmAddQuestion(data, code, getPaperDetail, getAuthDetail, getQuestionList)
        }
        if (modalData.type === ModalType.REMOVE_REQUESTION) {
            confirmRemoveQuestion(data, code, getPaperDetail, getAuthDetail, getQuestionList)
        }
        if (modalData.type === ModalType.NOTE) {
            confirmNote(data, code, setExamDetail)
        }
        if (modalData.type === ModalType.BATCH_SET_SCORE) {
            confirmBatchSetScore(data, code, getPaperDetail, getQuestionList)
        }

        handleClose()
    }

    return {
        handleClose,
        handleConfirm,
        modalData,
        setModalData,
    }
}

export default useModalControl
